import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color,
    PrimitiveCollection,
    GeoJsonDataSource,
    JulianDate,
    PolygonGeometry,
    GeometryInstance,
    MaterialAppearance,
    Material,
    GroundPrimitive,
    Primitive
  } from "cesium";
import Layer from "./layer";
import { Feature, FeatureCollection } from "geojson";
import { v4 as uuidv4 } from 'uuid';

class VectorPolygon implements Layer{
    viewer: Viewer;
    features: Feature[] = [];
    primitiveCollection: PrimitiveCollection
    constructor(viewer: Viewer) {
        this.viewer = viewer
        this.primitiveCollection = new PrimitiveCollection()
    }
    /**
     * init polygon layer, implementing method of layer interface.
     * @param geojson geojson feature collection or nothing, if want to add feature later.
     * @param configs config array for display. 
     * Usable configs:
     * height: number, default to 0
     * clampToGround: if Polygon is clamped to ground, defaults to false.
     * extrudedHeight: number, will extrude from height to extruded height.
     * color: string, takes CSS hex color string, defaults to red.
     * alpha: number, alpha value of fill color
     * outline: boolean, whether or not it will show outline
     * outlineColor: string, CSS color, for outline
     * outlineWidth: number
     * closeTop: boolean, if extruded and top is closed, defaults to true,
     * closeBottom: boolean, if extruded and bottom is closed, defaults to true,
     * @returns This VectorPolygon object
     */
    init(geojson: FeatureCollection | undefined, configs: Array<PageConfigItem>): Layer {
        let layerId = uuidv4()
        if(geojson && geojson.features){
            this.features.push(...geojson.features)
        }
        let polygonConfig:any = {}
        for(let i = 0; i < configs.length; i++){
            let config = configs[i];
            polygonConfig[config.name] = config.value
        }
        if(this.features.length > 0){
            // create geometry instance for polygons
            let datasource = GeoJsonDataSource.load(geojson);
            datasource.then(ds => {
                // use cesium's datasource to parse geojson and get basic info on polygon(hierarchy and stuff), not actually load entities but use primitives
                // as it performs better and easier for further operations

                let entities = ds.entities.values
                let instances = []
                for (let index = 0; index < entities.length; index++) {
                    const entity = entities[index];
                    const hierarchy = entity.polygon?.hierarchy?.getValue(JulianDate.now())
                    if(hierarchy){
                        let geometry = new PolygonGeometry({
                            polygonHierarchy: hierarchy,
                            height: polygonConfig.height || 0,
                            extrudedHeight: polygonConfig.extrudedHeight || 0,
                            closeTop: polygonConfig.closeTop || true,
                            closeBottom: polygonConfig.closeBottom || true,
                        })
                        let polygonGeometry = PolygonGeometry.createGeometry(geometry)
                        if(polygonGeometry){
                            let instance = new GeometryInstance({
                                geometry: polygonGeometry,
                                id : layerId + "-" + index
                            });
                            instances.push(instance)
                        }
                    }
                }
                let apperance = new MaterialAppearance({
                    material: new Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color : Color.fromCssColorString(polygonConfig.color || "#ff0000"),
                                alpha: polygonConfig.color || 1
                            }
                        }
                    })
                })
                if(polygonConfig.clampToGround){
                    // clamp to ground primitive
                    let groundPrimitive = new GroundPrimitive({
                        geometryInstances: instances,
                        appearance: apperance,
                        show: true,
                        asynchronous: false
                    })
                    this.viewer.scene.primitives.add(groundPrimitive)
                }else{
                    // normal polygon
                    
                    let primitive = new Primitive({
                        geometryInstances: instances,
                        appearance: apperance,
                        show: true,
                        asynchronous: false
                    })
                    this.viewer.scene.primitives.add(primitive)
                }
            })
        }
        return this
    }
    get(id: number): void {
        
    }
    addNewFeature(geojson: Object | undefined, config: Array<PageConfigItem>): void {
        
    }
    removeFeature(id: number): void {
        
    }
    removeAllFeature(): void {
        
    }
    updateFeature(config: Array<PageConfigItem>, id: number): void {
        
    }
    switchLayerDisplay(): boolean {
        return true
    }
}

export default VectorPolygon
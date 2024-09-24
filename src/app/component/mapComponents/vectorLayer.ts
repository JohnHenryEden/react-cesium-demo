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
    Primitive,
    PolylineGeometry,
    PolylineMaterialAppearance,
    PointPrimitiveCollection
  } from "cesium";
import Layer from "./layer";
import { Feature, FeatureCollection } from "geojson";
import { v4 as uuidv4 } from 'uuid';
import { featureCollection } from "@turf/turf";

class VectorLayer implements Layer{
    viewer: Viewer;
    features: Feature[] = [];
    primitiveCollection: PrimitiveCollection
    pointPrimitiveCollection: PointPrimitiveCollection
    layerId: string;
    layerName: string = "";
    primitiveCollectionAdded: boolean = false;
    pointCollectionAdded: boolean = false;
    isDisplay: boolean = true;
    constructor(viewer: Viewer) {
        this.layerId = uuidv4()
        this.viewer = viewer
        this.primitiveCollection = new PrimitiveCollection()
        this.pointPrimitiveCollection = new PointPrimitiveCollection({
            show: true
        })
    }
    /**
     * init vector layer, implementing method of layer interface.
     * @param geojson geojson feature collection or nothing, if want to add feature later.
     * @param configs config array for display. 
     * Usable configs:
     * height: number, default to 0
     * clampToGround: if feature layer is clamped to ground, defaults to false.
     * extrudedHeight: number, will extrude from height to extruded height.
     * color: string, takes CSS hex color string, defaults to red, fill color.
     * alpha: number, alpha value of fill color
     * outline: boolean, whether or not it will show outline, polygon only.
     * outlineColor: string, CSS color, for outline, polygon only.
     * outlineWidth: number, polygon only.
     * closeTop: boolean, if extruded and top is closed, defaults to true, polygon only.
     * closeBottom: boolean, if extruded and bottom is closed, defaults to true, polygon only.
     * width: number, polyline width, polyline only.
     * @returns This VectorLayer object
     */
    init(geojson: FeatureCollection | undefined, configs: Array<PageConfigItem>): Layer {
        this.addNewFeature(geojson, configs)
        return this
    }
    get(id: number): Feature | undefined {
        return this.features[id]
    }
    getAll(): Array<Feature> | undefined {
        return this.features
    }
    addNewFeature(geojson: FeatureCollection | undefined, configs: Array<PageConfigItem>): void {
        if(geojson && geojson.features){
            this.features = [...geojson.features]
        }
        // todo find a way to replace any, maybe define a type for it?
        let vectorConfig:any = {}
        for(let i = 0; i < configs.length; i++){
            let config = configs[i];
            vectorConfig[config.name.split("_")[1]] = config.value
        }
        if(this.features.length > 0){
            // create geometry instance for polygons
            let datasource = GeoJsonDataSource.load(geojson);
            datasource.then(ds => {
                // use cesium's datasource to parse geojson and get basic info on polygon(hierarchy and stuff), not actually load entities but use primitives
                // as it performs better and easier for further operations

                let entities = ds.entities.values
                let polygonInstances = []
                let polylineInstances = []

                for (let index = 0; index < entities.length; index++) {
                    const entity = entities[index];
                    // polygon
                    if(entity.polygon){
                        const hierarchy = entity.polygon?.hierarchy?.getValue(JulianDate.now())
                        if(hierarchy){
                            let geometry = new PolygonGeometry({
                                polygonHierarchy: hierarchy,
                                height: parseFloat(vectorConfig.height) || 0,
                                extrudedHeight: parseFloat(vectorConfig.extrudedHeight) || 0,
                                closeTop: vectorConfig.closeTop || true,
                                closeBottom: vectorConfig.closeBottom || true,
                            })
                            let polygonGeometry = PolygonGeometry.createGeometry(geometry)
                            if(polygonGeometry){
                                let instance = new GeometryInstance({
                                    geometry: polygonGeometry,
                                    id : this.layerId + "-" + index
                                });
                                polygonInstances.push(instance)
                            }
                        }
                    }
                    // polyline
                    if(entity.polyline){
                        let positions = entity.polyline.positions?.getValue(JulianDate.now())
                        if(positions){
                            const polyline = new PolylineGeometry({
                                positions: positions,
                                width: parseFloat(vectorConfig.width) || 1.0
                              });
                            const polylineGeometry = PolylineGeometry.createGeometry(polyline);
                            if(polylineGeometry){
                                let instance = new GeometryInstance({
                                    geometry: polylineGeometry,
                                    id : this.layerId + "-" + index
                                });
                                polylineInstances.push(instance)
                            }
                        }
                    }
                    // Point
                    if(entity.billboard && entity.position){
                        let position = entity.position?.getValue(JulianDate.now())
                        if(position){
                            this.pointPrimitiveCollection.add({
                                color : Color.fromCssColorString(vectorConfig.color || "#ff0000").withAlpha(parseFloat(vectorConfig.alpha) || 1),
                                outlineColor: Color.fromCssColorString(vectorConfig.outlineColor || "#000000").withAlpha(parseFloat(vectorConfig.alpha) || 1),
                                outlineWidth: parseFloat(vectorConfig.alpha) || 1,
                                pixelSize: parseFloat(vectorConfig.pointSize) || 10,
                                show: true,
                                position: position
                            })
                        }
                    }
                }
                let apperance = new MaterialAppearance({
                    material: new Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color : Color.fromCssColorString(vectorConfig.color || "#ff0000").withAlpha(parseFloat(vectorConfig.alpha) || 1)
                            }
                        }
                    })
                })
                let polylineApperance = new PolylineMaterialAppearance({
                    material: new Material({
                        fabric : {
                            type : 'Color',
                            uniforms : {
                                color : Color.fromCssColorString(vectorConfig.color || "#ff0000").withAlpha(parseFloat(vectorConfig.alpha) || 1)
                            }
                        }
                    })
                })
                if(polygonInstances.length > 0){
                    if(vectorConfig.clampToGround){
                        // clamp to ground primitive
                        let groundPrimitive = new GroundPrimitive({
                            geometryInstances: polygonInstances,
                            appearance: apperance,
                            show: true,
                            asynchronous: false
                        })
                        this.primitiveCollection.add(groundPrimitive)
                    }else{
                        // normal polygon
                        let primitive = new Primitive({
                            geometryInstances: polygonInstances,
                            appearance: apperance,
                            show: true,
                            asynchronous: false
                        })
                        this.primitiveCollection.add(primitive)
                    }
                }
                if(polylineInstances.length > 0){
                    if(vectorConfig.clampToGround){
                        // clamp to ground primitive
                        let groundPrimitive = new GroundPrimitive({
                            geometryInstances: polylineInstances,
                            appearance: polylineApperance,
                            show: true,
                            asynchronous: false
                        })
                        this.primitiveCollection.add(groundPrimitive)
                    }else{
                        // normal polyline
                        let primitive = new Primitive({
                            geometryInstances: polylineInstances,
                            appearance: polylineApperance,
                            show: true,
                            asynchronous: false
                        })
                        this.primitiveCollection.add(primitive)
                    }
                }
                if(this.primitiveCollection.length > 0 && this.primitiveCollectionAdded === false){
                    this.viewer.scene.primitives.add(this.primitiveCollection)
                    this.primitiveCollectionAdded = true
                }
                if(this.pointPrimitiveCollection.length > 0 && this.pointCollectionAdded === false){
                    this.viewer.scene.primitives.add(this.pointPrimitiveCollection)
                    this.pointCollectionAdded = true
                }
            })
        }
    }
    removeFeature(id: number): void {
        
    }
    removeAllFeature(): void {
        this.primitiveCollection.removeAll()
        this.pointPrimitiveCollection.removeAll()
        this.viewer.scene.primitives.remove(this.primitiveCollection)
        this.viewer.scene.primitives.remove(this.pointPrimitiveCollection)
        this.pointCollectionAdded = false
        this.primitiveCollectionAdded = false
    }
    updateFeature(config: Array<PageConfigItem>, id: number): void {
        
    }
    updateLayer(config: Array<PageConfigItem>): void {
        if(!this.primitiveCollection.isDestroyed() && !this.pointPrimitiveCollection.isDestroyed()){
            // remove all first, then load again
            this.removeAllFeature()
            
            this.primitiveCollection = new PrimitiveCollection()
            this.pointPrimitiveCollection = new PointPrimitiveCollection({
                show: true
            })
            let features = featureCollection(this.features)
            this.addNewFeature(features, config)
        }
    }
    switchLayerDisplay(): boolean {
        if(this.isDisplay){
            this.primitiveCollection.show = false
            this.pointPrimitiveCollection.show = false
            this.isDisplay = false
            return false
        }else{
            this.primitiveCollection.show = true
            this.pointPrimitiveCollection.show = true
            this.isDisplay = true
            return true
        }
    }
}

export default VectorLayer
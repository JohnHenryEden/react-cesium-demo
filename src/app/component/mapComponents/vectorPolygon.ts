import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color,
    PrimitiveCollection,
    GeoJsonDataSource
  } from "cesium";
import Layer from "./layer";
import { Feature, FeatureCollection } from "geojson";

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
     * color: string, takes CSS hex color string
     * alpha: number, alpha value of fill color
     * outline: boolean, whether or not it will show outline
     * outlineColor: string, CSS color, for outline
     * outlineWidth: number
     * closeTop: boolean, if extruded and top is closed, defaults to true,
     * closeBottom: boolean, if extruded and bottom is closed, defaults to true,
     * @returns This VectorPolygon object
     */
    init(geojson: FeatureCollection | undefined, configs: Array<PageConfigItem>): Layer {
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

                debugger
                if(polygonConfig.clampToGround){
                    // clamp to ground primitive
                }else{
                    // normal polygon
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
}

export default VectorPolygon
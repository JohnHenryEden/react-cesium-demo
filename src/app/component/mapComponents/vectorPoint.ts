import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color
  } from "cesium";

class VectorPoint {
    viewer: Viewer;
    constructor(viewer: Viewer) {
        this.viewer = viewer
    }
    init(geojson: Object){

    }
    /**
     * Add a billboard
     * @param config 
     * @param position 
     * @param id 
     */
    addNewFeature(config:Array<PageConfigItem>, position:Cartesian3, id: string){
    }
    removeFeature(){

    }
    removeAllFeature(){

    }
    /**
     * Update a Feature
     * @param config 
     * @param id 
     */
    updateFeature(config:Array<PageConfigItem>, id: void|String|undefined){

    }
}

export default VectorPoint
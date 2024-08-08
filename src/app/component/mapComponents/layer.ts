// todo create a class for map layers, so other layer types use common functions from this class.

import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color
  } from "cesium";

class Layer {
    viewer: Viewer;
    constructor(viewer: Viewer) {
        this.viewer = viewer
    }
    /**
     * Init layer using data, or no data
     * @param geojson 
     */
    init(geojson: Object | undefined){

    }
    /**
     * Add a feature to the layer
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

export default Layer
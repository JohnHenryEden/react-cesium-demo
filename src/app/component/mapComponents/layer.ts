// todo create a class for map layers, so other layer types use common functions from this class.

import {
    Viewer,
  } from "cesium";
import { Feature } from "geojson";

interface Layer {
    viewer: Viewer | any;
    features: Array<Feature>;
    layerId: string;
    layerName: string;
    isDisplay: boolean;
    /**
     * Init layer using data, or no data
     * @param geojson 
     * @param config display config for feature(s)
     * @returns Layer object
     */
    init(geojson: Object | undefined, config: Array<PageConfigItem>): Layer
    /**
     * Add a feature to the layer
     * @param geojson Spatial data in GeoJSON format
     * @param config display config for feature(s)
     */
    addNewFeature(geojson: Object | undefined, config:Array<PageConfigItem>): void
    
    /**
     * get feature by index
     */
    get(id: number): Feature | undefined
    /**
     * Remove feature by id
     */
    removeFeature(id: number): void
    /**
     * Remove all feature
     */
    removeAllFeature(): void
    /**
     * Update a Feature
     * @param config Display config for feature(s)
     * @param id feature index
     */
    updateFeature(config:Array<PageConfigItem>, id: number): void
    /**
     * Update layer
     * @param config Display config for feature(s)
     * @param id feature index
     */
    updateLayer(config:Array<PageConfigItem>): void
    /**
     * Switch layer display, call to change current display status
     * @returns boolean value indicating whether the layer is displaying
     */
    switchLayerDisplay():boolean
}

export default Layer
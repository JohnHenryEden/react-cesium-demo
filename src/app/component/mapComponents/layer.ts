// todo create a class for map layers, so other layer types use common functions from this class.

import {
  Cartesian3,
    Viewer,
  } from "cesium";
import { Feature, FeatureCollection } from "geojson";

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
    init(config: Array<PageConfigItem>, geojson?: FeatureCollection | undefined): Layer
    /**
     * Init layer using a position on map
     * @param geojson 
     * @param config display config for feature(s)
     * @returns Layer object
     */
    init(config: Array<PageConfigItem>, position?: Cartesian3): Layer
    /**
     * Add a feature to the layer
     * @param geojson Spatial data in GeoJSON format
     * @param config display config for feature(s)
     */
    addNewFeature(config:Array<PageConfigItem>, geojson: FeatureCollection | undefined): void

    /**
     * Add a point feature to the layer
     * @param config display config for feature(s)
     * @param position Position of the feature
     * @param id ID of the layer
     */
    addNewFeature(config:Array<PageConfigItem>, position:Cartesian3): void
    
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
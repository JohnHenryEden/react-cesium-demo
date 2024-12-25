"use client";
import mapPin from "../../../public/assets/map-pin.svg";
import { v4 as uuidv4 } from 'uuid';
import Billboard from "./mapComponents/billboard";
import Layer from "./mapComponents/layer";
import VectorLayer from "./mapComponents/vectorLayer";
import { defaultBillboardConfigItems, defaultPolygonConfigItems } from "../defaults";

declare global {
  interface Window {
    CESIUM_BASE_URL: String;
  }
}

import React, { useRef, useEffect, useState } from "react";
import {
  Cartesian2,
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer,
  BillboardCollection,
  Color,
  ImageryLayer,
  IonImageryProvider,
  Ion,
  defined,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ComponentTypes } from "@/app/enums";

// Define objects
let viewer: Viewer;
let billboards: Billboard;
let layers: Array<Layer> = []
let pConfigItemList: Array<PageConfigItem>
let setPConfigItemList: Function
let setLayerDisplayFunc: Function
let setLayerListFunc: Function
let setIndexInPageConfigFunc: Function

/**
 * Drop and add a billboard
 * @param event 
 * @param pageConfigItemList 
 * @param setPageConfigItemList 
 */
function handleDrop(event: React.DragEvent<HTMLDivElement>, pageConfigItemList: Array<PageConfigItem>, setPageConfigItemList:Function): void {
  event.preventDefault();
  if (viewer.scene && viewer.scene.pickPositionSupported) {
    if(!billboards){
      billboards = new Billboard(viewer)
    }
    let car3Position = getClickPosition(event);
    let billboardId = uuidv4();
    if (car3Position) {
      billboards.addNewBillboard(defaultBillboardConfigItems, car3Position, billboardId);
    }
    let elementConfList: Array<PageConfigItem> = [];
    defaultBillboardConfigItems.forEach(element => {
        let newPageConfigItem = {} as PageConfigItem;
        newPageConfigItem.name = element.name;
        newPageConfigItem.value = element.value
        newPageConfigItem.type = element.type
        elementConfList.push(newPageConfigItem)
    });
    let pageConfList = pageConfigItemList;
    pageConfList.push({name: "billboard-" + billboards.billboardCollection.length.toString(), value: elementConfList, type: ComponentTypes.BILLBOARD, id: billboardId})
    setPageConfigItemList(pageConfList)
    setIndexInPageConfigFunc(pageConfigItemList.length - 1)
  }
}
function getClickPosition(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.DragEvent<HTMLDivElement>): Cartesian3 | undefined {
  if (viewer.scene && viewer.scene.pickPositionSupported) {
    let widthDiff = window.innerWidth - viewer.container.clientWidth;
    let currentPosition = new Cartesian2(
      event.clientX - widthDiff,
      event.clientY
    );
    return viewer.scene.pickPosition(
      currentPosition,
      new Cartesian3()
    );
  }
  return undefined;
}
/**
 * Drop and add a billboard
 * @param event 
 * @param pageConfigItemList 
 * @param setPageConfigItemList 
 */
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, pageConfigItemList: Array<PageConfigItem>, setPageConfigItemList:Function, setIsEditDisplay: Function, popupPromptDisplay: boolean, popupFunctionName: String): void {
  event.preventDefault();
  /**
   * popup design: 
   * 1. click on map
   * 2. Check if clicked on a map object, if is, the popup is linked to map object(shares property and removed together). 
   * 3. check popup type(image/html)
   * 4. add popup
   *  */ 
  if (viewer.scene && viewer.scene.pickPositionSupported) {
    // get click position, test if there's an object
    let widthDiff = window.innerWidth - viewer.container.clientWidth;
    let currentPosition = new Cartesian2(
      event.clientX - widthDiff,
      event.clientY
    );
    const pickedFeature = viewer.scene.pick(currentPosition);
    if (defined(pickedFeature)) {
      // TODO: its possible that its clicked on a billboard, that has a popup, if so, do the invoke popup subroutine.
      if(popupPromptDisplay){
        // add popup
        // Bind popup to object
        let pickedObject = pickedFeature.id;
        // individual id is at the 5th index
        let pickedObjectId = pickedObject.split("-")[5];
        layers.forEach(layer => {
          debugger
        })
      }
    }else {
      const worldPosition = getClickPosition(event);
      if(popupPromptDisplay){
        // add popup
      }
    }
  }
}
/**
 * Load previously stored page configure array
 * @param viewer
 * @param pageConfigItemList
 */
function loadPageConfig(
  viewer: Viewer,
  pageConfigItemList: Array<PageConfigItem>
) {
  pageConfigItemList.forEach(configItem => {
    switch (configItem.type) {
      case ComponentTypes.BILLBOARD:
        if(billboards && configItem.value instanceof Array){
          billboards.updateBillboard(configItem.value, configItem.id)
        }
        break;
      case ComponentTypes.VECTOR:
        if(layers.length > 0 && configItem.value instanceof Array){
          for (let index = 0; index < layers.length; index++) {
            const layer = layers[index];
            if(layer.layerId && layer.layerId === configItem.id){
              layer.updateLayer(configItem.value)
            }
          }
        }
        break;
      default:
        break;
    }
  })
}

/**
 * Read GeoJSON and pass to appropriate component
 * @param geoJsonContent
 * @returns success indicator for validation and external use, 0 for success, 1 for fail
 */
export function readGeoJson(geoJsonContent: string, fileName: string): number{
  try {
    let jsonObj = JSON.parse(geoJsonContent)
    if(jsonObj.type && jsonObj.type === "FeatureCollection"){
      
      let layer = new VectorLayer(viewer)
      layer.layerName = fileName.split(".")[0]
      layer.init(jsonObj, defaultPolygonConfigItems)

      let elementConfList: Array<PageConfigItem> = [];
      defaultPolygonConfigItems.forEach(element => {
        let newPageConfigItem = {} as PageConfigItem;
        newPageConfigItem.name = element.name;
        newPageConfigItem.value = element.value
        newPageConfigItem.type = element.type
        elementConfList.push(newPageConfigItem)
      });
      layers.push(layer)
      let pageConfList = pConfigItemList;  
      pageConfList.push({name: "layer-vector-" + layers.length.toString(), value: elementConfList, type: ComponentTypes.VECTOR, id: layer.layerId})
      setPConfigItemList(pageConfList)
      setLayerListFunc(layers)
      setLayerDisplayFunc(true)
      
      setIndexInPageConfigFunc(pageConfList.length - 1)
      return 0
    }
    return 1
  } catch (error) {
    return 1
  }
}

/**
 * JSX for the map component
 * @param param0 
 * @returns 
 */
export default function MapContainer({
  setIsEditDisplay,
  pageConfigItemList,
  setPageConfigItemList,
  layerList,
  setLayerList,
  setLayerDisplay,
  setIndexInPageConfig,
  popupPromptDisplay,
  popupFunctionName
}: {
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>;
  setPageConfigItemList: Function;
  layerList: Array<Layer>;
  setLayerList: Function;
  setLayerDisplay: Function;
  setIndexInPageConfig: Function;
  popupPromptDisplay: boolean;
  popupFunctionName: string;
}) {
  pConfigItemList = pageConfigItemList;
  setPConfigItemList = setPageConfigItemList;
  setLayerDisplayFunc = setLayerDisplay;
  setLayerListFunc = setLayerList;
  setIndexInPageConfigFunc = setIndexInPageConfig;
  layers = layerList;
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const [pageConfigList, setPageConfigList] = useState(pageConfigItemList)
  
  
  useEffect(() => {
    window.CESIUM_BASE_URL = "/Cesium";
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkZjEwYjdhYS1lYzQ4LTQ5M2EtYTg5My02MDhhMTE1YTJlYmYiLCJpZCI6MTA0MSwiaWF0IjoxNTI2Nzg4NTcwfQ.3T6RRTRCIXu08pYcznhkseiYsLRgQxI3eq4ziLMcvtY"
    viewer = new Viewer(cesiumContainerRef.current as Element, {
      terrain: Terrain.fromWorldTerrain(),
      animation: false,
      baseLayerPicker: false,
      baseLayer: ImageryLayer.fromProviderAsync(
        IonImageryProvider.fromAssetId(3954), {}
      ),
      // fullscreenButton: false,
      vrButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      scene3DOnly: true,
    });
    // cleanup
    return () => {
      if (viewer !== undefined) {
        viewer.destroy();
      }
    };
  }, []);
  useEffect(() => {  
    loadPageConfig(viewer, pageConfigItemList);
  }, [pageConfigItemList, pageConfigList])
  return (
    <div
      id="mapContainer"
      className="map-container"
      ref={cesiumContainerRef}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        handleDrop(e, pageConfigItemList, setPageConfigItemList);
        setIsEditDisplay(true);
      }}
      onClick={(e) => {
        handleClick(e, pageConfigItemList, setPageConfigItemList, setIsEditDisplay, popupPromptDisplay, popupFunctionName);
      }}
    ></div>
  );
}

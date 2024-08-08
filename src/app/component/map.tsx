"use client";
import mapPin from "../../../public/assets/map-pin.svg";
import { v4 as uuidv4 } from 'uuid';
import Billboard from "./mapComponents/billboard";
import Layer from "./mapComponents/layer";
import VectorPoint from "./mapComponents/vectorPoint";
import VectorLine from "./mapComponents/vectorLine";
import VectorPolygon from "./mapComponents/vectorPolygon";
import { defaultBillboardConfigItems } from "../defaults";

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
  Color
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ComponentTypes } from "@/app/enums";

// Define objects
let viewer: Viewer;
let billboards: Billboard;

/**
 * Drop and add a billboard
 * @param event 
 * @param pageConfigItemList 
 * @param setPageConfigItemList 
 */
function handleDrop(event: any, pageConfigItemList: Array<PageConfigItem>, setPageConfigItemList:Function): void {
  event.preventDefault();
  if (viewer.scene && viewer.scene.pickPositionSupported) {
    // Move point considering the width of list on the right
    let widthDiff = window.innerWidth - viewer.container.clientWidth;
    let currentPosition = new Cartesian2(
      event.clientX - widthDiff,
      event.clientY
    );
    if(!billboards){
      billboards = new Billboard(viewer)
    }
    let car3Position = viewer.scene.pickPosition(
      currentPosition,
      new Cartesian3()
    );
    let billboardId = uuidv4();
    billboards.addNewBillboard(defaultBillboardConfigItems, car3Position, billboardId)
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
export function readGeoJson(geoJsonContent: string): number{
  try {
    let jsonObj = JSON.parse(geoJsonContent)
    if(jsonObj.type && jsonObj.type === "FeatureCollection"){
      let featureType = jsonObj.features[0].geometry.type
      featureType = featureType.toLowerCase()
      switch(true){
        case featureType.includes('polygon'):
          break
        case featureType.includes('line'):
          break
        case featureType.includes('point'):
          break
        default:
          break
      }
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
}: {
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>;
  setPageConfigItemList: Function;
}) {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const [pageConfigList, setPageConfigList] = useState(pageConfigItemList)
  useEffect(() => {
      
    window.CESIUM_BASE_URL = "/Cesium";
    viewer = new Viewer(cesiumContainerRef.current as Element, {
      terrain: Terrain.fromWorldTerrain(),
      animation: false,
      baseLayerPicker: false,
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
  }, [pageConfigItemList])
  useEffect(() => {  
    loadPageConfig(viewer, pageConfigItemList);
  }, [pageConfigList])
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
    ></div>
  );
}

"use client";
import mapPin from "../../../public/assets/map-pin.svg";
import { v4 as uuidv4 } from 'uuid';
import Billboard from "./mapComponents/billboard";

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
let viewer: Viewer;

let billboards: Billboard;

let defaultBillboardConfigItems = [{
    name: "billboard_color",
    value: "#ff0000",
    type: "color", id: uuidv4()
},{
    name: "billboard_icon",
    value: "/assets/map-pin.svg",
    type: "file", id: uuidv4()
},{
    name: "billboard_size",
    value: 1,
    type: "number", id: uuidv4()
}]

enum ComponentTypes {
  BILLBOARD = "BILLBOARD",
  POINT = "POINT",
  LINESTRING = "LINESTRING",
  POLYGON = "POLYGON",
  IMAGE_POPUP = "IMAGE_POPUP",
  HTML_POPUP = "HTML_POPUP",
  GLTF = "GLTF",
  THREEDTILES = "THREEDTILES",
}

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

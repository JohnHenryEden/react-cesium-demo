"use client";
import mapPin from "../../../public/assets/map-pin.svg";

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

let billboardCollection: BillboardCollection;

let defaultBillboardConfigItems = [{
    name: "billboard_color",
    value: "#ff0000",
    type: "color"
},{
    name: "billboard_icon",
    value: "/assets/map-pin.svg",
    type: "file"
},{
    name: "billboard_size",
    value: 1,
    type: "number"
}]

function handleDrop(event: any, pageConfigItemList: Array<PageConfigItem>, setPageConfigItemList:Function): void {
  event.preventDefault();
  if (viewer.scene && viewer.scene.pickPositionSupported) {
    // Move point considering the width of list on the right
    let widthDiff = window.innerWidth - viewer.container.clientWidth;
    let currentPosition = new Cartesian2(
      event.clientX - widthDiff,
      event.clientY
    );
    if (billboardCollection === undefined) {
      billboardCollection = new BillboardCollection();
      viewer.scene.primitives.add(billboardCollection);
    }
    let car3Position = viewer.scene.pickPosition(
      currentPosition,
      new Cartesian3()
    );
    
    let icon = defaultBillboardConfigItems.find(i => i.name === "billboard_icon")?.value
    let color = defaultBillboardConfigItems.find(i => i.name === "billboard_color")?.value
    let size = defaultBillboardConfigItems.find(i => i.name === "billboard_size")?.value || 1
    if(typeof size === "string"){
        size = parseInt(size);
    }
    let billboard = billboardCollection.add({
      position: car3Position,
      pixelOffset: new Cartesian2(0, -30 * size),
      image: icon,
      color: Color.fromCssColorString(color),
      scale: size
    });
    let elementConfList: Array<PageConfigItem> = [];
    defaultBillboardConfigItems.forEach(element => {
        let newPageConfigItem = {} as PageConfigItem;
        newPageConfigItem.name = element.name;
        newPageConfigItem.value = element.value
        newPageConfigItem.type = element.type
        elementConfList.push(newPageConfigItem)
    });
    let pageConfList = pageConfigItemList;
    pageConfList.push({name: "billboard", value: elementConfList, type: null})
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
    debugger
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
    ></div>
  );
}

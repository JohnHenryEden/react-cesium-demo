"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";
import Layer from "./mapComponents/layer";
import { Eye, EyeSlash, PencilSquare, Trash3 } from 'react-bootstrap-icons';
let setIsEditDisplayFunc: Function
let pConfigItemList: Array<PageConfigItem>
let setPConfigItemList: Function
let setIdxInPageConfig: Function
let setLayerListFunc: Function

function getLayerListContent(
  layerList: Array<Layer>, 
  currLayer: number, 
  setCurrLayer: Function
): React.JSX.Element[]{
  return layerList.map((layer, index) => {
    return <div className={currLayer === index ? "layer-list-item selected": "layer-list-item"} key={layer.layerId}>
      <div className="layer-title"> 
        {layer.layerName}
      </div>
      <div className="layer-btns">
        <div className="layer-btn" onClick={(e) => switchLayerDisplay(layer, layerList)}>
          {layer.isDisplay ? <Eye /> : <EyeSlash />}
        </div>
        <div className="layer-btn" onClick={(e) => showEditPanel(index, setCurrLayer)}><PencilSquare /></div>
        <div className="layer-btn" onClick={(e) => deleteLayer(layer, layerList)}><Trash3 /></div>
      </div>
    </div>
  })
}
/**
 * Change layer display status
 * @param layer layer to be changed
 */
function switchLayerDisplay(layer: Layer, layerList: Array<Layer>):void{
  layer.switchLayerDisplay()
  // copy the array so it updates correctly
  let newArray: Array<Layer> = []
  layerList.forEach(item => {
    newArray.push(item)
  })
  layerList = []
  setLayerListFunc(newArray)
}
/**
 * Show edit panel for layer
 * @param index layer index for it to be edited
 */
function showEditPanel(index: number, setCurrLayer:Function){
  pConfigItemList
  // reset the index so the edit panel correctly reflect the layer to change
  setIdxInPageConfig(index)
  setCurrLayer(index)
  setIsEditDisplayFunc(true)
}
/**
 * Delete layer, release memory
 * @param layer layer to be removed
 */
function deleteLayer(layer: Layer,layerList: Array<Layer>){
  layer.removeAllFeature()
  setLayerListFunc(layerList.filter(a => a.layerId !== layer.layerId))
}



export default function LayerList({
  layerList,
  layerDisplay,
  setLayerList,
  setLayerDisplay,
  setIsEditDisplay,
  pageConfigItemList,
  setPageConfigItemList,
  setIndexInPageConfig
}: {
  layerList: Array<Layer>;
  layerDisplay: boolean;
  setLayerList: Function;
  setLayerDisplay: Function;
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>;
  setPageConfigItemList: Function;
  setIndexInPageConfig: Function
}) {
  let [currLayer, setCurrLayer] = useState(-1)
  setLayerListFunc = setLayerList
  setIsEditDisplayFunc = setIsEditDisplay
  pConfigItemList = pageConfigItemList
  setPConfigItemList = setPageConfigItemList
  setIdxInPageConfig = setIndexInPageConfig
  let layerListContent = getLayerListContent(layerList,currLayer,setCurrLayer)
  return (layerDisplay ? 
    <div className={"layer-list-display"}>
    <div
      className="close-button"
      onClick={(e) => {
        setLayerDisplay(false);
      }}
    >
      {"<<"}
    </div>
    <div style={{
      marginBottom: "15px",
      fontSize: "24px"
    }}>
      Layers
    </div>
    {layerListContent}
    </div>
    :
    <div
      className="open-button"
      onClick={(e) => {
        setLayerDisplay(true);
      }}
    >
      {">>"}
    </div>
  );
}

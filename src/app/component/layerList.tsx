"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";
import Layer from "./mapComponents/layer";
import { Eye, EyeSlash, PencilSquare, Trash3 } from 'react-bootstrap-icons';

let isLayerShowing = true
function getLayerListContent(layerList: Array<Layer>): React.JSX.Element[]{
  return layerList.map((layer, index) => {
    return <div className="layer-list-item" key={layer.layerId}>
      {layer.layerName}
      <div className="layer-btns">
        <div className="layer-btn" onClick={(e) => switchLayerDisplay(layer)}>
          {isLayerShowing ? <Eye /> : <EyeSlash />}
        </div>
        <div className="layer-btn" onClick={(e) => showEditPanel(layer)}><PencilSquare /></div>
        <div className="layer-btn" onClick={(e) => deleteLayer(layer)}><Trash3 /></div>
      </div>
    </div>
  })
}
/**
 * Change layer display status
 * @param layer layer to be changed
 */
function switchLayerDisplay(layer: Layer):boolean{
  debugger
  isLayerShowing = layer.switchLayerDisplay()
  return isLayerShowing
}
/**
 * Show edit panel for layer
 * @param layer layer to be changed
 */
function showEditPanel(layer: Layer){
  
}
/**
 * Delete layer, release memory
 * @param layer layer to be removed
 */
function deleteLayer(layer: Layer){
  
}



export default function LayerList({
  layerList,
  layerDisplay,
  setLayerList,
  setLayerDisplay
}: {
  layerList: Array<Layer>;
  layerDisplay: boolean;
  setLayerList: Function;
  setLayerDisplay: Function;
}) {
  let layerListContent = getLayerListContent(layerList)
  return (layerDisplay && 
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
  );
}

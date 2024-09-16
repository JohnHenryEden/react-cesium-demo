"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";
import Layer from "./mapComponents/layer";
import { Eye, PencilSquare, Trash3 } from 'react-bootstrap-icons';

function getLayerListContent(layerList: Array<Layer>): React.JSX.Element[]{
  return layerList.map((layer, index) => {
    return <div className="layer-list-item" key={layer.layerId}>
      {layer.layerName}
      <div className="layer-btn"><Eye /></div>
      <div className="layer-btn"><PencilSquare /></div>
      <div className="layer-btn"><Trash3 /></div>
    </div>
  })
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

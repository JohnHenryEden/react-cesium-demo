"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";
import Layer from "./mapComponents/layer";

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
  let layerListContent = {}
  return (layerDisplay && 
    <div className={"config-list-display"}>
    <div
      className="close-button"
      onClick={(e) => {
        setIsEditDisplay(false);
      }}
    >
      X
    </div>
      {layerListContent}
    </div>
  );
}

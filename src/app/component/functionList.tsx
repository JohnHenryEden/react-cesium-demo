"use client"

import React, {useRef, useEffect, useState} from 'react'

let basicFunctionList = [
    "Drag & Drop Point Marker", 
    "Load GeoJSON file", 
    "Add Image Popup To Feature",
    "Add HTML Popup To Feature",
    "Add GLTF Model",
    "Add 3DTiles Service",
    "Add WMTS Service",
    "Add WMS Service",
    "Clear Map",
]
let setUploadDisplay:Function
let setFuncName:Function

function clickButton(item: string){
    setUploadDisplay(true)
    setFuncName(item)
}

export default function FunctionList({
    setIsUploadDisplay,
    setFunctionName
  }: {
    setIsUploadDisplay: Function;
    setFunctionName: Function
  }){

    useEffect(() => {
        setUploadDisplay = setIsUploadDisplay;
        setFuncName = setFunctionName;
    }, [])
    return (
      <div className="function-list">
          {
            basicFunctionList.map((item:string, index:number) => {
                if(item === "Drag & Drop Point Marker"){ 
                    return <div className='list-item' key={index}  draggable="true"
                    onDragStart={e => console.log('onDragStart')}
                    onDragEnd={e => console.log('onDragEnd')}>
                        {item}
                    </div>
                }
                return <div className='list-item' key={index} onClick={e => clickButton(item)}>
                    {item}
                </div>
            })
          }
      </div>
    );
}
  
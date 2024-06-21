"use client"

import React, {useRef, useEffect, useState} from 'react'

let basicFunctionList = [
    "Drag & Drop Point Marker", 
    "Load GeoJSON file", 
    "Load WMTS Map Service",
    "Add Image Popup To Feature",
    "Add HTML Popup To Feature",
    "Add GLTF Model",
    "Add 3DTiles Service",
    "Clear Map",
]

export default function FunctionList(){
    
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
                return <div className='list-item' key={index}>
                    {item}
                </div>
            })
          }
      </div>
    );
}
  
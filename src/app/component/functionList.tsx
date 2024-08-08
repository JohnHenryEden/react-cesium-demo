"use client"

import React, {useRef, useEffect, useState} from 'react'
import {BasicFunctionList} from "../enums"

// iterate the enum
let basicFunctions: keyof typeof BasicFunctionList
let basicFunctionList:string[] = []
for(basicFunctions in BasicFunctionList){
    basicFunctionList.push(BasicFunctionList[basicFunctions])
}
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
                if(item === BasicFunctionList.POINT_DRAG_DROP){ 
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
  
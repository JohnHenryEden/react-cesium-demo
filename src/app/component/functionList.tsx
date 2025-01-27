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
let setIsPromptDisplay:Function
let localSetPromptContent:Function
let localSetPopupFunctionName:Function

function clickButton(item: string){
    switch (item) {
        case BasicFunctionList.HTML_POPUP:
            setIsPromptDisplay(true)
            localSetPromptContent("Click at map location or layer object to set HTML Popup");
            localSetPopupFunctionName(BasicFunctionList.HTML_POPUP)
            break;
        case BasicFunctionList.IMAGE_POPUP:
            setIsPromptDisplay(true)
            localSetPromptContent("Click at map location or layer object to set Image Popup");
            localSetPopupFunctionName(BasicFunctionList.IMAGE_POPUP)
            break;
        default:
            setUploadDisplay(true)
            setFuncName(item)
            break;
    }
}

// Function lists on the top of the page
export default function FunctionList({
    setPromptContent,
    setIsUploadDisplay,
    setUploadFunctionName,
    setPopupFunctionName,
    setPromptDisplay
  }: {
    setPromptContent: Function;
    setIsUploadDisplay: Function;
    setUploadFunctionName: Function;
    setPopupFunctionName: Function;
    setPromptDisplay: Function
  }){
    useEffect(() => {
        setUploadDisplay = setIsUploadDisplay;
        setFuncName = setUploadFunctionName;
        setIsPromptDisplay = setPromptDisplay;
        localSetPromptContent = setPromptContent;
        localSetPopupFunctionName = setPopupFunctionName;
    })
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
  
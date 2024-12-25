"use client"

import React, {useRef, useEffect, useState} from 'react'
import { BasicFunctionList } from "../enums"
import { readGeoJson } from "./map"

let setPromptDisplay: Function;

/**
 * Upload/input data prompt
 * @param promptDisplay if the prompt shows
 * @param promptContent prompt to tell user what to do
 * @param popupFunctionName function name to determine what popup to add
 * @returns 
 */
export default function PopupFunction({
    promptDisplay,
    promptContent,
    popupFunctionName,
    setPromptDisplay
  }: {
    promptDisplay: boolean;
    promptContent: String
    popupFunctionName: String;
    setPromptDisplay: Function
  }){
    let functionContent:React.JSX.Element

    switch(popupFunctionName){
      case BasicFunctionList.HTML_POPUP:
        break
      case BasicFunctionList.IMAGE_POPUP:
        break
      default:
        functionContent = (<div></div>)
        break
    }
    
    return (
      <div className={promptDisplay ? "popup-prompt-display" : "popup-prompt"}>
        <div className="prompt-content">{promptContent}</div>
        <div className='prompt-exit' onClick={()=>{setPromptDisplay(false)}}>Click here to stop creating popups</div>
      </div>
    );
}
  
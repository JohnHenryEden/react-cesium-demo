"use client"

import React, {useRef, useEffect, useState} from 'react'
import { BasicFunctionList } from "../enums"
import { readGeoJson } from "./map"

function clickButton(item: string){
    console.log(item)
}

function processInputFile(){

}

/**
 * Show upload window and get uploaded file
 */
function getUploadFileGeoJson(e: any, setIsUploadDisplay: Function){
  const input = e.target
  const files = input.files
  if(files){
    let file = files[0]
    let reader = new FileReader()
    reader.onload = function(){
      let result = readGeoJson(this.result?.toString() || "")
      if(result !== 0){
        alert("File content is not GeoJSON format, please check uploaded file.") // todo replace with better alert
      }else {
        setIsUploadDisplay(false);
      }
    }
    reader.readAsText(file)
  }
  e.target.value = null
}

/**
 * Upload/input data prompt
 * @param isDisplay if the prompt shows
 * @param setIsUploadDisplay function to set isDisplay
 * @param functionItem function name to determine the actual content
 * @returns 
 */
export default function UploadPrompt({
    isDisplay,
    setIsUploadDisplay,
    functionItem
  }: {
    isDisplay: boolean;
    setIsUploadDisplay: Function;
    functionItem: string
  }){

    let functionContent:React.JSX.Element

    switch(functionItem){
      case BasicFunctionList.LOAD_GEOJSON:
        functionContent = (
        <div>
          <label className="button" htmlFor="geojsonUpload">Select GeoJSON file...</label>
          <input type="file" id="geojsonUpload" name="geojsonUpload" accept=".json,.geojson" onChange={e => getUploadFileGeoJson(e, setIsUploadDisplay)} style={{opacity: 0, width: "1px"}}/>
        </div>
      )
        break
      default:
        functionContent = (<div>content</div>)
        break
    }
    
    return (
      <div className={isDisplay ? "upload-prompt-display" : "upload-prompt"}>
        
        <div
            className="close-button"
            onClick={(e) => {
                setIsUploadDisplay(false);
            }}
        >
            X
        </div>
        <div className="prompt-title">{functionItem}</div>
        <div className="prompt-content">{functionContent}</div>
      </div>
    );
}
  
"use client"

import React, {useRef, useEffect, useState} from 'react'

function clickButton(item: string){
    console.log(item)
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
        {functionItem}
      </div>
    );
}
  
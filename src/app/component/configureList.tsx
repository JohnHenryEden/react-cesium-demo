"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";

interface Config {
  name: string;
  value: string | number | readonly string[] | boolean | undefined;
  type: string;
}

function camelToNormal(s: string, isFirstToCapital: boolean = false){
  let newStringCharArray = []
  let newStrIndex = 0
  for(let i = 0; i < s.length; i++){
    newStringCharArray[newStrIndex] = s[i]
    if(isFirstToCapital && i === 0){
      newStringCharArray[newStrIndex] = s[i].toUpperCase()
    }
    if(s[i] === s[i].toUpperCase()){
      newStringCharArray[newStrIndex] = " "
      newStrIndex++
      newStringCharArray[newStrIndex] = s[i]
    }
    newStrIndex++
  }
  return newStringCharArray.join("")
}

function getConfigItemTemplate(
  pageConfigItemList: Array<PageConfigItem>,
  configItemList: Array<Config>,
  setConfigItemList: Function,
  setPageConfigItemList: Function,
  indexInPageConfig: number,
) {
    return configItemList.map((item: Config, index: number) => {
        if(item.type.includes("file")){
            return (
                <div className='conf-list-item' key={index}>
                {camelToNormal(item.name.split("_")[1], true)}:{item.value}
                <input
                    className="list-input"
                    type={item.type}
                    defaultValue=""
                    onChange={(e) => {
                        let fullList = deepClone(pageConfigItemList)
                        let localList = deepClone(configItemList)
                        localList[index].value = e.target.value;
                        fullList[indexInPageConfig].value = localList
                        setConfigItemList(localList)
                        setPageConfigItemList(fullList)
                    }}
                ></input>
                </div>
            ); 
        }
        if(typeof item.value === 'boolean'){
          return (
            <div className='conf-list-item' key={index}>
                {camelToNormal(item.name.split("_")[1], true)}:{" "}
                <input
                className="list-input"
                type={item.type}
                checked={item.value}
                onChange={(e) => {
                  let fullList = deepClone(pageConfigItemList)
                  let localList = deepClone(configItemList)
                  localList[index].value = e.target.value;
                  fullList[indexInPageConfig].value = localList
                  setConfigItemList(localList)
                  setPageConfigItemList(fullList)
                }}
                ></input>
            </div>
          );
        }
        return (
          <div className='conf-list-item' key={index}>
              {camelToNormal(item.name.split("_")[1], true)}:{" "}
              <input
              className="list-input"
              type={item.type}
              defaultValue={item.value}
              onChange={(e) => {
                let fullList = deepClone(pageConfigItemList)
                let localList = deepClone(configItemList)
                localList[index].value = e.target.value;
                fullList[indexInPageConfig].value = localList
                setConfigItemList(localList)
                setPageConfigItemList(fullList)
              }}
              ></input>
          </div>
        );
    })
}
export default function ConfigList({
  isDisplay,
  setIsEditDisplay,
  pageConfigItemList,
  setPageConfigItemList
}: {
  isDisplay: boolean;
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>
  setPageConfigItemList: Function
}) {
  const [configItemList, setConfigItemList] = useState<Array<Config>>([]);
  debugger
  let lastConfig = pageConfigItemList[pageConfigItemList.length - 1];
  if(configItemList.length !== 0){
    setConfigItemList([])
  }
  if(lastConfig && lastConfig.value instanceof Array && lastConfig.value.length > 0 && configItemList.length === 0){
    lastConfig.value.forEach(item => {
        let configObj = {} as Config
        configObj.name = item.name
        configObj.value = item.value
        configObj.type = item.type || "text";
        configItemList.push(configObj)
    })
  }
  let configElements = getConfigItemTemplate(
      pageConfigItemList,
      configItemList,
      setConfigItemList,
      setPageConfigItemList,
      pageConfigItemList.length - 1
    );

  return (isDisplay && 
    <div className={"config-list-display"}>
    <div
      className="close-button"
      onClick={(e) => {
        setIsEditDisplay(false);
      }}
    >
      X
    </div>
      {configElements}
    </div>
  );
}

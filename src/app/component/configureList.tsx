"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";

interface Config {
  name: string;
  value: string | number | readonly string[] | boolean | undefined;
  type: string;
}
let lastConfig:PageConfigItem
let configItemList: Array<Config>

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
  setPageConfigItemList: Function,
  pageConfigIndex: number,
) {
    if(pageConfigItemList.length > 0){
      return pageConfigItemList[pageConfigIndex].value.map((item: Config, index: number) => {
          if(item.type.includes("file")){
              return (
                  <div className='conf-list-item' key={item.name}>
                  {camelToNormal(item.name.split("_")[1], true)}:{item.value}
                  <input
                      className="list-input"
                      type={item.type}
                      defaultValue=""
                      onChange={(e) => {
                          let fullList = deepClone(pageConfigItemList)
                          let localList = deepClone(configItemList)
                          localList[index].value = e.target.value;
                          fullList[pageConfigIndex].value = localList
                          configItemList = localList
                          setPageConfigItemList(fullList)
                      }}
                  ></input>
                  </div>
              ); 
          }
          if(typeof item.value === 'boolean'){
            return (
              <div className='conf-list-item' key={item.name}>
                  {camelToNormal(item.name.split("_")[1], true)}:{" "}
                  <input
                  className="list-input"
                  type={item.type}
                  checked={item.value}
                  onChange={(e) => {
                    let fullList = deepClone(pageConfigItemList)
                    let localList = deepClone(configItemList)
                    localList[index].value = e.target.checked;
                    fullList[pageConfigIndex].value = localList
                    configItemList = localList
                    setPageConfigItemList(fullList)
                  }}
                  ></input>
              </div>
            );
          }
          if(item.type.includes("number")){
            return (
              <div className='conf-list-item' key={item.name}>
                  {camelToNormal(item.name.split("_")[1], true)}:{" "}
                  <input
                  className="list-input"
                  type={item.type}
                  value={item.value}
                  onChange={(e) => {
                    let fullList = deepClone(pageConfigItemList)
                    let localList = deepClone(configItemList)
                    localList[index].value = parseFloat(e.target.value);
                    fullList[pageConfigIndex].value = localList
                    configItemList = localList
                    setPageConfigItemList(fullList)
                  }}
                  ></input>
              </div>
            ); 
          }
          return (
            <div className='conf-list-item' key={item.name}>
                {camelToNormal(item.name.split("_")[1], true)}:{" "}
                <input
                className="list-input"
                type={item.type}
                value={item.value}
                onChange={(e) => {
                  item.value = e.target.value;
                  let fullList = deepClone(pageConfigItemList)
                  let localList = deepClone(configItemList)
                  localList[index].value = e.target.value;
                  fullList[pageConfigIndex].value = localList
                  configItemList = localList
                  setPageConfigItemList(fullList)
                }}
                ></input>
            </div>
          );
      }) 
    }
    return null;
}
export default function ConfigList({
  isDisplay,
  setIsEditDisplay,
  pageConfigItemList,
  setPageConfigItemList,
  indexInPageConfig,
  setIndexInPageConfig
}: {
  isDisplay: boolean;
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>
  setPageConfigItemList: Function
  indexInPageConfig: number,
  setIndexInPageConfig: Function
}) {
  const [configElements, setConfigElements] = useState<React.JSX.Element[]>([]);
  useEffect(()=> {
    lastConfig = pageConfigItemList[pageConfigItemList.length - 1];
    if(configItemList && configItemList.length !== 0){
      configItemList = []
    }
    let lastConfigs:Array<Config> = [];
    if(lastConfig && lastConfig.value instanceof Array && lastConfig.value.length > 0 && configItemList.length === 0){
      lastConfig.value.forEach(item => {
          let configObj = {} as Config
          configObj.name = item.name
          configObj.value = item.value
          configObj.type = item.type || "text";
          lastConfigs.push(configObj)
      })
    }
    configItemList = lastConfigs;
    // initial value
    setConfigElements(getConfigItemTemplate(
      pageConfigItemList,
      configItemList,
      setPageConfigItemList,
      indexInPageConfig
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexInPageConfig, pageConfigItemList, isDisplay])
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

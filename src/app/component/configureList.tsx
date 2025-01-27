"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";
import { InputTypes } from "@/app/enums";

let lastConfig: PageConfigItem
let configItemList: Array<PageConfigItem>

function camelToNormal(s: string, isFirstToCapital: boolean = false) {
  let newStringCharArray = []
  let newStrIndex = 0
  for (let i = 0; i < s.length; i++) {
    newStringCharArray[newStrIndex] = s[i]
    if (isFirstToCapital && i === 0) {
      newStringCharArray[newStrIndex] = s[i].toUpperCase()
    }
    if (s[i] === s[i].toUpperCase()) {
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
  configItemList: Array<PageConfigItem>,
  setPageConfigItemList: Function,
  setIsRefreshConfig: Function,
  isRefreshConfig: boolean,
  pageConfigIndex: number,
) {
  if (pageConfigItemList.length > 0) {
    return pageConfigItemList[pageConfigIndex].value.map((item: PageConfigItem, index: number) => {
      // select from a list
      if (item.type.includes("radio")) {
        let inputList: React.JSX.Element[] = []
        item.valueList?.forEach(val => {
          inputList.push((<div key={val?.toString()}>
            <input
            className="list-input"
            type={item.type}
            name="radioInput"
            id={val?.toString()}
            value={val?.toString()}
            onChange={(e) => {
              let fullList = deepClone(pageConfigItemList)
              let cfgList = pageConfigItemList[pageConfigIndex].value.find((item: PageConfigItem) => item.name === "config_list")
              if(cfgList){
                let localList = deepClone(cfgList.configList[parseInt(e.target.value)])
                // retain config list and value list after each change
                let localCfgList = localList.find((item: PageConfigItem) => item.name === "config_list")
                localCfgList.configList = cfgList.configList
                localList[index].value = e.target.value;
                localList[index].valueList = item.valueList;
                fullList[pageConfigIndex].value = localList
                configItemList = localList
                setPageConfigItemList(fullList)
                setIsRefreshConfig(!isRefreshConfig)
              }
            }}
          ></input><label>{val?.toString()}</label>
            </div>))
        })
        return (
          <div className='conf-list-item' key={item.name}>
            {camelToNormal(item.name.split("_")[1], true)}
            {inputList}
          </div>
        );
      }
      if (item.type.includes("file")) {
        return (
          <div className='conf-list-item' key={item.name}>
            {camelToNormal(item.name.split("_")[1], true)}:{item.value}
            <input
              className="list-input"
              type={item.type}
              defaultValue=""
              onChange={(e) => {
                let fullList = deepClone(pageConfigItemList)
                let localList = deepClone(pageConfigItemList[pageConfigIndex].value)
                localList[index].value = e.target.value;
                fullList[pageConfigIndex].value = localList
                configItemList = localList
                setPageConfigItemList(fullList)
              }}
            ></input>
          </div>
        );
      }
      if (typeof item.value === 'boolean') {
        return (
          <div className='conf-list-item' key={item.name}>
            {camelToNormal(item.name.split("_")[1], true)}:{" "}
            <input
              className="list-input"
              type={item.type}
              checked={item.value}
              onChange={(e) => {
                let fullList = deepClone(pageConfigItemList)
                let localList = deepClone(pageConfigItemList[pageConfigIndex].value)
                localList[index].value = e.target.checked;
                fullList[pageConfigIndex].value = localList
                configItemList = localList
                setPageConfigItemList(fullList)
              }}
            ></input>
          </div>
        );
      }
      if (item.type.includes("number")) {
        return (
          <div className='conf-list-item' key={item.name}>
            {camelToNormal(item.name.split("_")[1], true)}:{" "}
            <input
              className="list-input"
              type={item.type}
              value={item.value}
              onChange={(e) => {
                let fullList = deepClone(pageConfigItemList)
                let localList = deepClone(pageConfigItemList[pageConfigIndex].value)
                localList[index].value = parseFloat(e.target.value);
                fullList[pageConfigIndex].value = localList
                configItemList = localList
                setPageConfigItemList(fullList)
              }}
            ></input>
          </div>
        );
      }
      // default, no render for hidden item
      if (!item.type.includes("hidden")) {
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
                let localList = deepClone(pageConfigItemList[pageConfigIndex].value)
                localList[index].value = e.target.value;
                fullList[pageConfigIndex].value = localList
                configItemList = localList
                setPageConfigItemList(fullList)
              }}
            ></input>
          </div>
        );
      }
    })
  }
  return null;
}
export default function ConfigList({
  isDisplay,
  setIsEditDisplay,
  pageConfigItemList,
  setPageConfigItemList,
  setIsRefreshConfig,
  isRefreshConfig,
  indexInPageConfig,
  setIndexInPageConfig
}: {
  isDisplay: boolean;
  setIsEditDisplay: Function;
  pageConfigItemList: Array<PageConfigItem>
  setPageConfigItemList: Function,
  setIsRefreshConfig: Function,
  isRefreshConfig: boolean,
  indexInPageConfig: number,
  setIndexInPageConfig: Function
}) {
  const [configElements, setConfigElements] = useState<React.JSX.Element[]>([]);
  useEffect(()=> {
    lastConfig = pageConfigItemList[pageConfigItemList.length - 1];
    if(configItemList && configItemList.length !== 0){
      configItemList = []
    }
    let lastConfigs:Array<PageConfigItem> = [];
    if(lastConfig && lastConfig.value instanceof Array && lastConfig.value.length > 0 && configItemList.length === 0){
      lastConfig.value.forEach(item => {
          let configObj = {} as PageConfigItem
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
      setIsRefreshConfig,
      isRefreshConfig,
      indexInPageConfig
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexInPageConfig, pageConfigItemList, isDisplay, isRefreshConfig])
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

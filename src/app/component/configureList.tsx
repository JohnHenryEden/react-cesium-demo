"use client";

import React, { useRef, useEffect, useState } from "react";
import { deepClone } from "@/utils/util";

enum InputTypes {
  Color = "color",
  Number = "number",
  Text = "text",
}

interface Config {
  name: string;
  value: string | number | readonly string[] | undefined;
  type: string;
}

function getConfigItemTemplate(
  configItemList: Array<Config>,
  setConfigItemList: Function,
) {
    return configItemList.map((item: Config, index: number) => {
        if(item.type.includes("file")){
            return (
                <div className="list-item" key={index}>
                {item.name}:{item.value}
                <input
                    className="list-input"
                    type={item.type}
                    defaultValue=""
                    onChange={(e) => {
                        let localList = deepClone(configItemList)
                        localList[index].value = e.target.value;
                        setConfigItemList(localList)
                    }}
                ></input>
                </div>
            ); 
        }
        return (
        <div className="list-item" key={index}>
            {item.name}:{" "}
            <input
            className="list-input"
            type={item.type}
            defaultValue={item.value}
            onChange={(e) => {
                let localList = deepClone(configItemList)
                localList[index].value = e.target.value;
                setConfigItemList(configItemList)
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

  let lastConfig = pageConfigItemList[pageConfigItemList.length - 1];
  
  if(lastConfig && lastConfig.value instanceof Array && lastConfig.value.length > 0 && configItemList.length === 0){
    lastConfig.value.forEach(item => {
        let configObj = {} as Config
        configObj.name = item.name.split("_")[1]
        configObj.value = item.value
        configObj.type = item.type || "text";
        configItemList.push(configObj)
    })
  }
  let configElements = getConfigItemTemplate(
      configItemList,
      setConfigItemList,
    );
  useEffect(()=> {
      debugger
  }, [configItemList])

  return (
    <div className={isDisplay ? "config-list-display" : "config-list"}>
      {configElements}
      <div
        className="close-button"
        onClick={(e) => {
          setIsEditDisplay(false);
        }}
      >
        X
      </div>
    </div>
  );
}

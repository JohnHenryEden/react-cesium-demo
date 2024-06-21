"use client"

import React, {useRef, useEffect, useState} from 'react'

enum InputTypes{
    Color = "color", 
    Number = "number", 
    Text = "text"
}

interface Config{
    name: string,
    value: string | number | readonly string[] | undefined,
    type: string
}


export default function ConfigList({isDisplay, setIsEditDisplay}: {isDisplay: boolean, setIsEditDisplay: Function}){
    const [configItemList, setConfigItemList] = useState<Array<Config>>([{
        name: "Color",
        value: "#000000",
        type: InputTypes.Color
    }])

    return (
      <div className={isDisplay?"config-list-display":"config-list"}>
          <div className='close-button' onClick={e => {
              setIsEditDisplay(false)
            }}>X</div>
          {
            configItemList.map((item:Config, index:number) => {
                return <div className='list-item' key={index}>
                    {item.name}: <input type={item.type} value={item.value} onChange={e => {
                        configItemList[index].value = e.target.value;
                        setConfigItemList(configItemList)
                    }}></input>
                </div>
            })
          }
      </div>
    );
}
  
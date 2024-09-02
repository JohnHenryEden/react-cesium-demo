"use client"
import "./css/main.css"
import "./types.d.ts"
import MapContainer from "./component/map"
import FunctionList from "./component/functionList"
import ConfigList from "./component/configureList"
import React, {useState} from 'react'
import UploadPrompt from "./component/uploadPrompt"


export default function Home() {
  const [isEditDisplay, setIsEditDisplay] = useState(false);
  const [isUploadDisplay, setIsUploadDisplay] = useState(false);
  const [pageConfigItemList, setPageConfigItemList] = useState(new Array<PageConfigItem>());
  const [functionName, setFunctionName] = useState("");

  return (
    <main className="base-comp">
      <FunctionList 
        setIsUploadDisplay={setIsUploadDisplay}
        setFunctionName={setFunctionName}
      ></FunctionList>
      <MapContainer setIsEditDisplay={setIsEditDisplay}
        pageConfigItemList={pageConfigItemList}
        setPageConfigItemList={setPageConfigItemList}
      ></MapContainer>

      <UploadPrompt isDisplay={isUploadDisplay}
        setIsUploadDisplay={setIsUploadDisplay}
        setIsEditDisplay={setIsEditDisplay}
        functionItem={functionName}
      ></UploadPrompt>

      <ConfigList isDisplay={isEditDisplay}
        setIsEditDisplay={setIsEditDisplay}
        pageConfigItemList={pageConfigItemList}
        setPageConfigItemList={setPageConfigItemList}
      ></ConfigList>
    </main>
  );
}
"use client"
import "./css/main.css"
import "./types.d.ts"
import MapContainer from "./component/map"
import FunctionList from "./component/functionList"
import ConfigList from "./component/configureList"
import React, {useState} from 'react'
import UploadPrompt from "./component/uploadPrompt"
import LayerList from "./component/layerList"
import PopupFunction from "./component/popupFunction"


export default function Home() {
  // UI display states
  const [isEditDisplay, setIsEditDisplay] = useState(false);
  const [isUploadDisplay, setIsUploadDisplay] = useState(false);
  const [promptDisplay, setPromptDisplay] = useState(false);
  const [promptContent, setPromptContent] = useState("");
  const [isLayerDisplay, setIsLayerDisplay] = useState(false);
  // Global list items states
  const [layerList, setLayerList] = useState([]);
  const [pageConfigItemList, setPageConfigItemList] = useState(new Array<PageConfigItem>());
  const [popupFunctionName, setPopupFunctionName] = useState("");
  const [uploadFunctionName, setUploadFunctionName] = useState("");
  const [indexInPageConfig, setIndexInPageConfig] = useState(pageConfigItemList.length - 1);

  return (
    <main className="base-comp">
      <FunctionList 
        setPromptContent={setPromptContent}
        setIsUploadDisplay={setIsUploadDisplay}
        setUploadFunctionName={setUploadFunctionName}
        setPopupFunctionName={setPopupFunctionName}
        setPromptDisplay={setPromptDisplay}
      ></FunctionList>
      <MapContainer setIsEditDisplay={setIsEditDisplay}
        pageConfigItemList={pageConfigItemList}
        setPageConfigItemList={setPageConfigItemList}
        layerList={layerList}
        setLayerList={setLayerList}
        setLayerDisplay={setIsLayerDisplay}
        setIndexInPageConfig={setIndexInPageConfig}
        popupPromptDisplay={promptDisplay}
        popupFunctionName={popupFunctionName}
      ></MapContainer>

      <LayerList
         layerList={layerList}
         layerDisplay={isLayerDisplay}
         setLayerList={setLayerList}
         setLayerDisplay={setIsLayerDisplay}
         setIsEditDisplay={setIsEditDisplay}
         pageConfigItemList={pageConfigItemList}
         setPageConfigItemList={setPageConfigItemList}
         setIndexInPageConfig={setIndexInPageConfig}
      ></LayerList>

      <UploadPrompt isDisplay={isUploadDisplay}
        setIsUploadDisplay={setIsUploadDisplay}
        setIsEditDisplay={setIsEditDisplay}
        uploadFunctionItem={uploadFunctionName}
      ></UploadPrompt>

      <PopupFunction 
        setPromptDisplay={setPromptDisplay}
        promptDisplay={promptDisplay}
        promptContent={promptContent}
        popupFunctionName={popupFunctionName}
      ></PopupFunction>

      <ConfigList isDisplay={isEditDisplay}
        setIsEditDisplay={setIsEditDisplay}
        pageConfigItemList={pageConfigItemList}
        setPageConfigItemList={setPageConfigItemList}
        indexInPageConfig={indexInPageConfig}
        setIndexInPageConfig={setIndexInPageConfig}
      ></ConfigList>
    </main>
  );
}
"use client"
import "./css/main.css"
import "./types.d.ts"
import MapContainer from "./component/map"
import FunctionList from "./component/functionList"
import ConfigList from "./component/configureList"
import React, {useState} from 'react'

export default function Home() {
  const [isEditDisplay, setIsEditDisplay] = useState(false);

  return (
    <main className="base-comp">
      <FunctionList></FunctionList>
      <MapContainer setIsEditDisplay={setIsEditDisplay}></MapContainer>
      <ConfigList isDisplay={isEditDisplay}  setIsEditDisplay={setIsEditDisplay}></ConfigList>
    </main>
  );
}
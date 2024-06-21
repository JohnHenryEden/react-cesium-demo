"use client"
import mapPin from "../../../public/assets/map-pin.svg"

declare global{
    interface Window {
        CESIUM_BASE_URL: String;
    }
}

window.CESIUM_BASE_URL = '/Cesium';

import React, {useRef, useEffect} from 'react'
import { Cartesian2, Cartesian3, Math as CesiumMath, Terrain, Viewer, BillboardCollection } from 'cesium'
import "cesium/Build/Cesium/Widgets/widgets.css";
let viewer:Viewer

let billboardCollection:BillboardCollection

function handleDrop(event:any): void {
    event.preventDefault()
    if(viewer.scene && viewer.scene.pickPositionSupported){
        // Move point considering the width of list on the right
        let widthDiff = window.innerWidth - viewer.container.clientWidth;
        let currentPosition = new Cartesian2(event.clientX - widthDiff, event.clientY);
        if(billboardCollection === undefined){
            billboardCollection = new BillboardCollection();
            viewer.scene.primitives.add(billboardCollection);
        }
        let car3Position = viewer.scene.pickPosition(currentPosition, new Cartesian3())

        let billboard = billboardCollection.add({
            position : car3Position,
            pixelOffset : new Cartesian2(0, -30),
            image : "/assets/map-pin.svg"
        });
    }
}

export default function MapContainer({setIsEditDisplay}: {setIsEditDisplay: Function}){
    const cesiumContainerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        viewer = new Viewer(cesiumContainerRef.current as Element, {
            terrain: Terrain.fromWorldTerrain(),
            animation: false,
            baseLayerPicker: false,
            // fullscreenButton: false,
            vrButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: false,
            sceneModePicker: false,
            selectionIndicator: false,
            timeline: false,
            navigationHelpButton: false,
            scene3DOnly: true,
        });
        // cleanup
        return () => {
            if(viewer !== undefined){
                viewer.destroy();
            }
        }
    }, [])
    return (
        <div id="mapContainer" className="map-container" ref={cesiumContainerRef} 
        
        onDragEnter={e => { e.preventDefault(); }}
        onDragLeave={e => { e.preventDefault(); }}
        onDragOver={e => { e.preventDefault(); }}
        onDrop={e => {
            handleDrop(e)
            setIsEditDisplay(true)
        }}>
        </div>
    );
}
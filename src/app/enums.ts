
export enum InputTypes {
    Color = "color",
    Number = "number",
    Text = "text",
}

export enum ComponentTypes {
    BILLBOARD = "BILLBOARD",
    POINT = "POINT",
    LINESTRING = "LINESTRING",
    POLYGON = "POLYGON",
    IMAGE_POPUP = "IMAGE_POPUP",
    HTML_POPUP = "HTML_POPUP",
    GLTF = "GLTF",
    THREEDTILES = "THREEDTILES",
}

export enum BasicFunctionList {
    POINT_DRAG_DROP = "Drag & Drop Point Marker", 
    LOAD_GEOJSON = "Load GeoJSON file", 
    IMAGE_POPUP = "Add Image Popup To Object",
    HTML_POPUP = "Add HTML Popup To Object",
    LOAD_GLTF = "Add GLTF Model",
    LOAD_THREEDTILES = "Add 3DTiles Service",
    LOAD_WMTS = "Add WMTS Service",
    LOAD_WMS = "Add WMS Service",
    CLS = "Clear Map",
}
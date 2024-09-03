
import { v4 as uuidv4 } from 'uuid';

export const defaultBillboardConfigItems = [{
    name: "billboard_color",
    value: "#ff0000",
    type: "color", id: uuidv4()
},{
    name: "billboard_icon",
    value: "/assets/map-pin.svg",
    type: "file", id: uuidv4()
},{
    name: "billboard_size",
    value: 1,
    type: "number", id: uuidv4()
}]

export const defaultPolygonConfigItems = [{
    name: "vector_clampToGround",
    value: false,
    type: "checkbox", id: uuidv4()
},{
    name: "vector_height",
    value: 0,
    type: "color", id: uuidv4()
},{
    name: "vector_extrudedHeight",
    value: 0,
    type: "number", id: uuidv4()
},{
    name: "vector_color",
    value: "#ff0000",
    type: "color", id: uuidv4()
},{
    name: "vector_alpha",
    value: 0.5,
    type: "number", id: uuidv4()
},{
    name: "vector_width",
    value: 5,
    type: "number", id: uuidv4()
},{
    name: "vector_outline",
    value: false,
    type: "checkbox", id: uuidv4()
},{
    name: "vector_outlineColor",
    value: "#000000",
    type: "color", id: uuidv4()
},{
    name: "vector_outlineWidth",
    value: 1,
    type: "number", id: uuidv4()
},{
    name: "vector_closeTop",
    value: true,
    type: "checkbox", id: uuidv4()
},{
    name: "vector_closeBottom",
    value: true,
    type: "checkbox", id: uuidv4()
}]

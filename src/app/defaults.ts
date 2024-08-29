
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
    name: "height",
    value: 0,
    type: "color", id: uuidv4()
},{
    name: "clampToGround",
    value: false,
    type: "checkbox", id: uuidv4()
},{
    name: "extrudedHeight",
    value: 0,
    type: "number", id: uuidv4()
},{
    name: "color",
    value: "#ff0000",
    type: "color", id: uuidv4()
},{
    name: "alpha",
    value: 1,
    type: "number", id: uuidv4()
},{
    name: "outline",
    value: false,
    type: "checkbox", id: uuidv4()
},{
    name: "outlineColor",
    value: "#000000",
    type: "color", id: uuidv4()
},{
    name: "outlineWidth",
    value: 1,
    type: "number", id: uuidv4()
},{
    name: "closeTop",
    value: true,
    type: "checkbox", id: uuidv4()
},{
    name: "closeBottom",
    value: true,
    type: "checkbox", id: uuidv4()
}]

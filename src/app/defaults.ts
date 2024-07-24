
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
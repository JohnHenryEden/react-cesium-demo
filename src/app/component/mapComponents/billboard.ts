import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color
  } from "cesium";
import Layer from "./layer";
import { Feature, Geometry, GeoJsonProperties, FeatureCollection } from "geojson";

class Billboard implements Layer{
    billboardCollection: BillboardCollection;
    viewer: Viewer;
    features: Feature<Geometry, GeoJsonProperties>[] = [];
    layerId: string = "";
    layerName: string = "";
    isDisplay: boolean = false;
    constructor(viewer: Viewer) {
        this.billboardCollection = new BillboardCollection()
        this.viewer = viewer
        this.viewer.scene.primitives.add(this.billboardCollection);
    }
    init(config: Array<PageConfigItem>, position?: Cartesian3 | FeatureCollection, id?: string): Layer {
        this.layerId = id || "";
        if(!position || position instanceof Cartesian3 === false){
            throw new Error("No position specified.")
        }else {
            this.addNewBillboard(config, position);
            return this;
        }
    }
    addNewFeature(configs: Array<PageConfigItem>, position?: Cartesian3 | FeatureCollection): void {
        if(!position || position instanceof Cartesian3 === false){
            throw new Error("No position specified.")
        }else {
            this.addNewBillboard(configs, position);
        }
    }
    
    get(id: number | string): Feature | undefined {
        throw new Error("Method not implemented.");
    }
    removeFeature(id: number | string): void {
        if(typeof id === "number" ){
            throw new Error("Wrong parameter type.");
        }
        this.removeBillboard(id);
    }
    removeAllFeature(): void {
        this.removeAllBillboard()
    }
    updateFeature(config: Array<PageConfigItem>, id: number | string): void {
        if(typeof id === "number" ){
            throw new Error("Wrong parameter type.");
        }
        this.updateBillboard(config, id)
    }
    updateLayer(config: Array<PageConfigItem>): void {
        this.updateBillboard(config, this.layerId)
    }
    switchLayerDisplay(): boolean {
        this.billboardCollection.show = !this.billboardCollection.show
        return this.billboardCollection.show;
    }
    /**
     * Add a billboard
     * @param config 
     * @param position 
     * @param id 
     */
    addNewBillboard(config:Array<PageConfigItem>, position:Cartesian3){

        let index:number | undefined = config.find(i => i.name === "billboard_index")?.value.toString()
        let icon:string | undefined = config.find(i => i.name === "billboard_icon")?.value.toString()
        let color:string = config.find(i => i.name === "billboard_color")?.value.toString()
        let size = config.find(i => i.name === "billboard_size")?.value || 1
        if(typeof size === "string"){
            size = parseFloat(size);
        }
        let billboard = this.billboardCollection.add({
          position: position,
          pixelOffset: new Cartesian2(0, -30 * size),
          image: icon,
          color: Color.fromCssColorString(color),
          scale: size,
          id: index
        });
    }
    removeBillboard(id: string){
        for (let index = 0; index < this.billboardCollection.length; index++) {
            const billboard = this.billboardCollection.get(index);
            if(billboard.id === id){
                this.billboardCollection.remove(billboard)
            }
        }
    }
    removeAllBillboard(){
        this.billboardCollection.removeAll()
    }
    /**
     * Update a billboard
     * @param config 
     * @param id 
     */
    updateBillboard(config:Array<PageConfigItem>, id: void|String|undefined){
        const len = this.billboardCollection.length;
        for (let i = 0; i < len; ++i) {
            const billboard = this.billboardCollection.get(i);
            if(billboard.id === id){
                let icon:string = config.find(i => i.name === "billboard_icon")?.value.toString()
                let color:any = config.find(i => i.name === "billboard_color")?.value.toString()
                let size = config.find(i => i.name === "billboard_size")?.value || 1
                if(typeof size === "string"){
                    size = parseFloat(size);
                }
                billboard.image = icon
                billboard.color = Color.fromCssColorString(color)
                billboard.scale = size
            }
        }
    }
}

export default Billboard
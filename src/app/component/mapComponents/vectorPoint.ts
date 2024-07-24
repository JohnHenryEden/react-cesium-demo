import {
    Cartesian2,
    Cartesian3,
    Math as CesiumMath,
    Viewer,
    BillboardCollection,
    Color
  } from "cesium";

class Billboard {
    billboardCollection: BillboardCollection;
    viewer: Viewer;
    constructor(viewer: Viewer) {
        this.billboardCollection = new BillboardCollection()
        this.viewer = viewer
        this.viewer.scene.primitives.add(this.billboardCollection);
    }
    /**
     * Add a billboard
     * @param config 
     * @param position 
     * @param id 
     */
    addNewBillboard(config:Array<PageConfigItem>, position:Cartesian3, id: string){

        let icon:string | undefined = config.find(i => i.name === "billboard_icon")?.value.toString()
        let color:any = config.find(i => i.name === "billboard_color")?.value.toString()
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
          id
        });
    }
    removeBillboard(){

    }
    removeAllBillboard(){

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
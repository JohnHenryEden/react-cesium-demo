
interface Config{
    name: String,
    defaultValue: String|number|boolean|void
}

interface PageConfigItem{
    name: string,
    value: Array<any> | any,
    type: String | null | void | undefined
    id: String|void|undefined
}

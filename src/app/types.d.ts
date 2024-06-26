
interface Config{
    name: String,
    defaultValue: String|number|boolean|void
}

interface PageConfigItem{
    name: String,
    value: Array<any> | any,
    type: String | null | void | undefined
}

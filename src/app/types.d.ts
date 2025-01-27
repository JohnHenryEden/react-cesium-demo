
interface Config{
    name: String,
    defaultValue: String|number|boolean|void
}

interface PageConfigItem{
    name: string,
    value: Array<any> | any,
    valueList?: Array<any>,
    configList?: Array<Array<PageConfigItem>>
    type: string
    id: string|void|undefined
}

interface propertyInstances{
    property: Object,
    instances: Array<String>
}

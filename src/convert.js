import { camelCase } from "camel-case";
import { buildClass } from "./class";
import { Visibility } from "./property";
import { guessType } from "./types";
import deps from "./deps";
/**
 * @var {Config} defaultConfig default configuration
 */
const defaultConfig  = {
    className: "Undefined",
    namespace: undefined,
    visibility: Visibility.PUBLIC,
    typedProperties: false,
    getters: false,
    typedMethods: false,
    setters: false,
    arraySerialization: false,
    includeDeps: false
}
/**
 * Convert a json string to a string that represent a php class
 * @typedef {Object} Config
 * @property {string} className - The className of the generated class
 * @property {string} namespace - The namespace of the default class
 * @property {Visibility} visibility
 * @property {boolean} typedProperties
 * @property {boolean} getters
 * @property {boolean} typedMethods
 * @property {boolean} setters
 * @property {boolean} arraySerialization
 * @property {boolean} includeDeps
 * 
 * @param {string} jsonString 
 * @param {Config} config
 * @returns string
 */
function convert(jsonString,config = {}){
    config = {... defaultConfig,...config}
    let json = JSON.parse(jsonString);
    if(Array.isArray(json)){
        json = json[0];
    }
    const res = buildDeps(config,deps().add({
        className: config.className,
        key: null,
        value: json
    }));
    let result = "";
    if(config.namespace != undefined){
        result = "namespace " + config.namespace + ";\n\n" + result;
    } 
    if(!config.includeDeps){
        return result+res[0];
    }
    const resCount = res.length; 
    res.forEach((v,i) => {
        if(i != 0){
            result += "\n\n"+v;
        }else{
            result += v;
        }
    });
    return result;
}

function buildDeps(config,deps,classes = []){
    let classContent = deps.get();
    if(classContent == null){
        return classes;
    }
    let value = classContent.value;
    classes.push(buildClass(config,deps,classContent.value,classContent.className));
    return buildDeps(config,deps,classes);
}

export default convert;
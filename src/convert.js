import { camelCase } from "camel-case";
import { buildClass } from "./class";
import { Visibility } from "./property";
import { guessType } from "./types";
/**
 * @var {Config} defaultConfig default configuration
 */
const defaultConfig  = {
    className: "Undefined",
    namespace: undefined,
    visibility: Visibility.PUBLIC,
    typedProperties: false
}
/**
 * Convert a json string to a string that represent a php class
 * @typedef {Object} Config
 * @property {string} className - The className of the generated class
 * @property {string} namespace - The namespace of the default class
 * @property {Visibility} visibility - The namespace of the default class
 * @property {boolean} typedProperties - The namespace of the default class
 * 
 * @param {string} jsonString 
 * @param {Config} config
 * @returns string
 */
function convert(jsonString,config = {}){
    config = {... defaultConfig,...config}
    const json = JSON.parse(jsonString);
    const keys = Object.keys(json);
    const properties = keys.map((key) => {
        return {
            name: camelCase(key),
            type: config.typedProperties ? guessType(json[key],key): undefined
        }
    });
    return buildClass(config,properties); 
}

export default convert;
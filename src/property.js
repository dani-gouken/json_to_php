import { camelCase } from "camel-case";
import * as pluralize from "pluralize";
import { guessType, isScalarType } from "./types";
import { indent } from "./utils";
/**
 * Property visibility.
 * @readonly
 * @enum {string}
 */
const Visibility = {
    PUBLIC: "public",
    PRIVATE: "private",
    PROTECTED: "protected"
};

/**
 * @typedef {Object} Property
 * @property {string} name - The name of the property
 * @property {string} type - the type of the property
 * @property {string} originalName - the type of the property
 */

/**
* @param {Property[]} properties 
* @param {Visibility} visibility
*/
function buildProperties(properties, { visibility, typedProperties }) {
    let result = "";
    const count = properties.length;
    properties.forEach((p, index) => {
        const line = `${visibility}${(p.type !== undefined && typedProperties) ? " " + p.type : ""} \$${p.name};`
        result += indent(line, 1);
        if (index < (count - 1)) {
            result += "\n";
        }
    });
    return result;
}
/**
 * 
 * @param {string} key 
 * @param {mixed} value 
 * @return {Property}
 */
function getPropertyInfo(key, value, { typedProperties }) {
    let type = guessType(value, key);
    return {
        name: camelCase(key),
        type: type,
        originalName: key,
        value: value,
        subtype: (function () {
            if (isScalarType(type) || (value === []) || (value === {})) return null;
            let subKey = pluralize.isPlural(key) ? pluralize.singular(key) : key;
            if(type === "array"){
                return guessType(
                    value[0],
                    subKey,
                )
            }
            return guessType(
                value,
                subKey,
            )
        })()
    }
}
export {
    buildProperties,
    Visibility,
    getPropertyInfo
}
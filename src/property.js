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
 */

 /**
 * @param {Property[]} properties 
 * @param {Visibility} visibility
 */
function buildProperties(properties,visibility){
    let result = "";
    const count = properties.length;
    properties.forEach((p,index) => {
        const line = `${visibility}${p.type !== undefined ? " "+p.type : ""} \$${p.name};`
        result += indent(line,1);
        if(index < (count -1)){
            result +="\n";
        }
    });
    return result;
}
export {
    buildProperties,
    Visibility
}
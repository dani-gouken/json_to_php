import { camelCase } from "camel-case";
import { indent } from "./utils";

/**
 * 
 * @param {Property} property 
 * @param {Config} config 
 */
function buildSetter(property, { typedProperties, typedMethods }) {
    const methodName = camelCase("set" + "_" + property.name);
    let result = "";
    let declaration = `public function ${methodName}(`;
    declaration += `${(typedMethods && property.type != undefined) ? property.type + " " : ""}$${property.name}`;
    declaration += !typedMethods ? ")" : "):void";
    result += indent(declaration + "{\n", 1);
    result += indent(`$this->${property.name} = $${property.name};\n`, 2);
    result += indent("}", 1);
    return result;
}

function buildSetters(properties, config) {
    if (!config.setters) return "";
    return buildMethod(buildSetter, properties, config);
}

/**
 * 
 * @param {Property} property 
 * @param {Config} config 
 */
function buildGetter(property, { typedProperties, typedMethods }) {
    const prefix = property.type == "bool" ? "is" : "get";
    const methodName = camelCase(prefix + "_" + property.name);
    let result = "";
    let declaration = `public function ${methodName}()`;
    if (typedMethods && property.type !== undefined) {
        declaration += ":" + property.type;
    }
    result += indent(declaration + "{\n", 1);
    result += indent(`return $this->${property.name};\n`, 2);
    result += indent("}", 1);
    return result;
}
/**
 * 
 * @param {Property[]} properties 
 * @param {Config} config 
 */
function buildGetters(properties, config) {
    if (!config.getters) return "";
    return buildMethod(buildGetter, properties, config);
}

/**
 * 
 * @param {Property[]} properties 
 * @param {Config} config 
 */
function buildMethod(callback, properties, config) {
    if (!config.getters && !config.setters) return "";
    let result = "\n";
    const l = properties.length;
    properties.forEach((p, i) => {
        result += "\n";
        result += callback(p, config);
        if (i < (l - 1)) {
            result += "\n";
        }
    })
    return result;
}

export {
    buildGetters, buildSetters
}
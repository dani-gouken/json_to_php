import { buildConstructor } from "./constructor";
import { buildGetters, buildSetters } from "./getters_setters";
import { buildProperties, getPropertyInfo } from "./property";
import { isScalarType } from "./types";
import { indent } from "./utils";

/**
 *
 * @param {Config} className
 * @param {string[]} properties
 */
function buildClass(config, deps, json, guessedName = null) {
  const { className, properties } = getClassInfo(
    json,
    guessedName ?? config.className,
    config,
    deps
  );
  let classContent =
    buildProperties(properties, config) +
    buildConstructor(properties, config) +
    buildGetters(properties, config) +
    buildSetters(properties, config) +
    buildArraySerialization(properties, config, className);

  let classString = `class ${className} {\n${classContent}\n}\n`;
  return classString;
}
/**
 * @typedef {Object} ClassInfo
 * @property {string} className
 * @property {Property[]} properties
 *
 * @param {object} json
 * @param {Config} className
 * @param {Config} config
 */
function getClassInfo(json, className, config, deps) {
  const keys = Object.keys(json);
  const properties = keys.map((key) => {
    let info = getPropertyInfo(key, json[key], config);
    if (
      isScalarType(info.type) ||
      isScalarType(info.subtype) ||
      info.subtype === null
    )
      return info;
    let depName = info.type === "array" ? info.subtype : info.type;
    if (!deps.has(depName)) {
      deps.add({
        className: depName,
        key: key,
        value: info.type === "array" ? json[key][0] : json[key],
      });
    }
    return info;
  });
  return {
    className: className,
    properties: properties,
  };
}

function buildArraySerialization(properties, config, className) {
  if (!(config.arraySerialization || config.includeDeps)) {
    return "";
  }
  return (
    buildFromArray(properties, config, className) +
    buildToArray(properties, config, className)
  );
}
/**
 *
 * @param {import("./property").Property[]} properties
 * @param {import("./convert").Config} config
 * @param {string} className
 * @returns
 */
function buildFromArray(properties, { typedMethods }, className) {
  let result = "\n";
  let declaration = `public static function fromArray(`;
  declaration += typedMethods ? "array $data" : "$data";
  declaration += !typedMethods ? ")" : "):" + className;
  result += indent(declaration + "{\n", 1);
  result += indent(`return new ${className}(\n`, 2);
  const propertiesCount = properties.length;
  properties.forEach((property, i) => {
    let content = "";
    let isLast = i >= propertiesCount - 1;
    if (isScalarType(property.type) || isScalarType(property.subtype)) {
      content = `$data["${property.originalName}"]${isLast ? "" : ","}`;
      result += indent(content + "\n", 3);
      return;
    }
    if (property.type === "array" && !isScalarType(property.subtype)) {
      content += indent("array_map(function($item){\n", 3);
      content += indent(`return ${property.subtype}::fromArray($item);\n`, 4);
      content += indent(
        `},$data["${property.originalName}"])${isLast ? "" : ","}`,
        3
      );
      result += content + "\n";
      return;
    }
    content = `${property.subtype}::fromArray($data["${
      property.originalName
    }"])${isLast ? "" : ","}`;
    result += indent(content + "\n", 3);
    return;
  });
  result += indent(");\n", 2);
  result += indent("}\n", 1);
  return result;
}

function buildToArray(properties, { typedMethods }, className) {
  let result = "\n";
  let declaration = `public function toArray(`;
  declaration += !typedMethods ? ")" : "):array";
  result += indent(declaration + "{\n", 1);
  result += indent(`return [\n`, 2);
  const propertiesCount = properties.length;
  properties.forEach((property, i) => {
    let content = "";
    let isLast = i >= propertiesCount - 1;
    if (isScalarType(property.type) || isScalarType(property.subtype)) {
      content = `"${property.originalName}"=>$this->${property.name}${
        isLast ? "" : ","
      }`;
      result += indent(content + "\n", 3);
      return;
    }
    if (property.type === "array") {
      content += indent(
        `"${property.originalName}"=>array_map(function($item){\n`,
        3
      );
      content += indent(`return $item->toArray();\n`, 4);
      content += indent(`},$this->${property.name})${isLast ? "" : ","}`, 3);
      result += content + "\n";
      return;
    }
    content = `"${property.originalName}"=>$this->${property.name}->toArray()${
      isLast ? "" : ","
    }`;
    result += indent(content + "\n", 3);
    return;
  });
  result += indent("];\n", 2);
  result += indent("}", 1);
  return result;
}

export { buildClass };

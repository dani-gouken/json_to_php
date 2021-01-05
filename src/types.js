import { pascalCase } from "pascal-case";
export const guessType = (value,name) => {
    const type = typeof value;
    switch (type){
        case "object":
            if(Array.isArray(value)){
                return "array";
            }
            return pascalCase(name);
        case "boolean":
            return "bool";
        case "number":
            return Number.isInteger(value) ? "int" : "float";
        case "bigint":
            return "int";
        case "string":
            return "string";
        case undefined:
            return undefined;
        default:
            return undefined;
    }
}
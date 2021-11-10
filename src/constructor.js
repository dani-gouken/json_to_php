import { indent } from "./utils";

/**
 * @param {Property}
 */
export function buildConstructor(properties,config){
    if(!(config.arraySerialization)){
        return "";
    }
    let result = "\n\n";
    let declaration = "";
    declaration += "public function __construct(";
    declaration += buildParameters(properties,config);
    declaration += "){\n";
    result += indent(declaration,1);
    result += buildBody(properties,config);
    result += indent("}",1)
    return result + "\n";

}

function buildParameters(properties,{typedMethods}){
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property,i) => {
        if(typedMethods && property.type != undefined){
            result += property.type + " "
        }
        result += "$" + property.name;
        if(i<(propertiesCount -1)){
            result += ", ";  
        }
    })
    return result;
}

function buildBody(properties,config){
    let result = "";
    const propertiesCount = properties.length;
    properties.forEach((property,i) => {
        let line = "";
        line += `$this->${property.name} = $${property.name};`;
        if(i<(propertiesCount -1)){
            line += "\n";  
        }
        result += indent(line,2) 
    })
    return result+"\n";
}
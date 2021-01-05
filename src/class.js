import { buildProperties } from "./property";

/**
 * 
 * @param {Config} className
 * @param {string[]} properties 
 */
function buildClass({className,visibility,namespace},properties){
    let classString =  
`class ${className} {
${buildProperties(properties,visibility)}
}
`;
    if(namespace != undefined){
        classString = "namespace " + namespace + ";\n\n" + classString;
    }
    return classString
}
export{
    buildClass
}
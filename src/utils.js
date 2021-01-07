/**
 * 
 * @param {string} string 
 * @param {number} level 
 * @param {number} spaceCount 
 */
function indent(string, level = 0,spaceCount = 4){
    let space = " ".repeat(spaceCount * level);
    return space + string;
}
function isEmpty(val){
    return Array.isArray(val) && val.length === 0;
}
export {indent,isEmpty}
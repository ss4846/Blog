
const addify = (str)=>{
    let regex = /(\{[^}]+\})/g;
    let result = str.match(regex);
    result.forEach((elem, index)=>{
        result[index] = JSON.parse(result[index]);
    })
    return result
}

module.exports = addify;

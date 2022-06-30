export const textFormatter = (str) => {
    if(typeof str === "string"){        
        const strArray = str.toLowerCase().split("");
        strArray[0] = strArray[0].toUpperCase();
        const capitilizedString = strArray.join("");
        return capitilizedString.replace(/_/g," ");
    } 
    return "";
};

export const removeDuplicateArray = (arr) => {
    if(Array.isArray(arr)){
        return [...new Set(arr)];
    }
    return [];
}
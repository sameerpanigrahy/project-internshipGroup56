const isValidMail = (/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,20})+$/);

const isValidName = (/^[a-zA-Z. ]{3,20}$/)

const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidfild = (value) => {
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = (value) => {
    return Object.keys(value).length > 0
}

const isValidMobile=/^[6-9]\d{9}$/gi;
const isValidUrl=/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i
module.exports = {
    isValidMail, isValid, isValidName, isValidRequestBody,isValidfild,isValidMobile,isValidUrl
}
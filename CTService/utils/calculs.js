function  ConvertFToC(temp) {
    return (temp - 32) / 1.8;
}

function  ConvertCToF(temp) {
    return 1.8 * temp + 32;
}

module.exports = {
    ConvertCToF: ConvertCToF,
    ConvertFToC: ConvertFToC
}
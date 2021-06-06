const colorCombinations = {
    gruul: "RG",
    simic: "UG",
    azorius: "UW",
    dimir: "UB",
    rakdos: "BR",
    selesnya: "GW",
    orzhov: "WB",
    izzet: "UR",
    golgari: "BG",
    boros: "RW",
    esper: "WUB",
    grixis: "UBR",
    jund: "BRG",
    naya: "RGW",
    bant: "GWU",
    abzan: "WBG",
    jeskai: "URW",
    sultai: "BGU",
    mardu: "RWB",
    temur: "RUG",
};

function matcher(str, map) {
    if (str in map) {
        return map[str];
    }
    return str;
}
module.exports = { colorCombinations, matcher };
const map = {
"{W}": 16777214,
"{U}": 3447003,
"{B}": 2895667,
"{R}": 15158332,
"{G}": 3066993,
};
function colorPicker(str) {
    let matches = 0;
    let newstr = 12370112;
   for (let index = 0; index < Object.keys(map).length; index++) {
       if(str.includes(Object.keys(map)[index])) {
           matches++;
           newstr = Object.values(map)[index];
       }
   }
return (matches > 1) ? 15844367 : newstr;
}
module.exports = { colorPicker };
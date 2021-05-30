const string = "{W} {U} {B} {R} {G}";

const map = {
"{W}": 0x000000,
"{U}": 0xff7300,
"{B}": 0xdedede,
"{R}": 0x36d6d1,
"{G}": 0xf250e7,
};

function colorPicker(str) {
    let matches = 0;
    let newstr = 0x547a9c;
   for (let index = 0; index < Object.keys(map).length; index++) {
       if(str.contains(Object.keys(map)[index])) {
           matches++;
           newstr = Object.values(map)[index];
       }
   }
return (matches > 1) ? 0x3350d4 : newstr;
}
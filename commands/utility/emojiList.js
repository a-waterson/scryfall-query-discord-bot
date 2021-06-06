const fs = require('fs');
// '<:manau:846176951835033680>'
module.exports = {
    name: 'emoji',
    description: 'lists custom emojis',
    dev: true,
    execute(message) {
        const reactionEmoji = message.client.emojis.cache.map((emoji) =>
            `"{${StringSlicer(emoji.name.slice(4))}}": "${emoji}",`).join('\n');
        fs.writeFile('emojis.txt', reactionEmoji, function(err) {
            if(err) { return console.error(err);
            }
            console.log('file saved');
        });

            console.log(reactionEmoji);
    },
};

function StringSlicer(string) {
    if(string.length === 2 && (isNaN(string))) {
        string = string.slice(0, 1) + '/' + string.slice(1, 2);
    }
        return string.toUpperCase();
    }

const { colorCombinations } = require('../../functions/color_combinations');
const fetch = require('node-fetch');
const { emojiReplace } = require('../../functions/emojiConverter');
const { colorPicker } = require('../../functions/colorPicker');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'partners',
    description: 'generates two commanders with Partner',
    async execute(message, args) {
        let first, second, img1;

        if (!args.length) {
            const list = await fetch('https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27')
            .then(res => res.json());
            first = list.data.splice(Math.floor(Math.random() * list.data.length), 1)[0];
            img1 = await Canvas.loadImage(first.image_uris.png);
            second = list.data[Math.floor(Math.random() * list.data.length)];

        } else {
            const sanitizedArgs = (colorCombinations[args[0]] || args[0]);
            const list = (sanitizedArgs.length === 4)
            ? await fetch(
                `https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27+id%3A${sanitizedArgs}+colors>%3D2`)
                .then(res => res.json())
            : await fetch(
                `https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27+id%3A${sanitizedArgs}`)
                .then(res => res.json());

            first = list.data.splice(Math.floor(Math.random() * list.data.length), 1)[0];
            img1 = await Canvas.loadImage(first.image_uris.png);
            const first_colors_regex = new RegExp(first.color_identity.join('|'), 'ig');

            const filter = sanitizedArgs.replace(first_colors_regex, '').toUpperCase().split('');

            const matchedArr = [];
            const checker = (arr, target) => target.every(v => arr.includes(v));
            for (let index = 0; index < list.data.length; index++) {
                if (checker(list.data[index].color_identity, filter)) {
                    matchedArr.push(list.data[index]);
                }
            }
            second = matchedArr[Math.floor(Math.random() * matchedArr.length)];
            try {
            console.log(first.name + '\n' + second.name);
            } catch(err) {
                console.error(err);
               return message.channel.send('check the colors and try again.');
            }
                }
            const canvas = Canvas.createCanvas(1200, 840);
            const context = canvas.getContext('2d');

            const img2 = await Canvas.loadImage(second.image_uris.png);

            context.drawImage(img1, 0, 0, canvas.width / 2, canvas.height);
            context.drawImage(img2, 600, 0, canvas.width / 2, canvas.height);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'partners.png');

        const embed_color = colorPicker(first.mana_cost + second.mana_cost);

         const first_embed = {
            color: embed_color,
            image: { url: 'attachment://partners.png' },
            fields: [
                {
                    name: `**${first.name}**`,
                    value: emojiReplace(first.mana_cost),
                    inline: true,
                },
                {
                    name: `**${second.name}**`,
                    value: emojiReplace(second.mana_cost),
                    inline: true,
                },

        ],
            };
            message.channel.send({ embed: first_embed, files: [attachment] });
            },
};
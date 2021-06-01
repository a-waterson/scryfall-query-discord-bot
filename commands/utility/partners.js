const { colorCombinations, matcher } = require('../../functions/color_combinations');
const fetch = require('node-fetch');
const { emojiReplace } = require('../../functions/emojiConverter');
const { colorPicker } = require('../../functions/colorPicker');
const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'partners',
    description: 'generates two commanders with Partner',
    async execute(message, args) {
        let first, second;
        const sanitizedArgs = matcher(args[0], colorCombinations);

        if (!args.length) {
            const list = await fetch('https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27')
            .then(res => res.json());
            first = list.data.splice(Math.floor(Math.random() * list.data.length), 1)[0];
            second = list.data[Math.floor(Math.random() * list.data.length)];

        } else {

            console.log(sanitizedArgs);
            const list = (sanitizedArgs === 4)
            ? await fetch(
                `https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27+id%3A${args[0]}+colors>%3D2`)
                .then(res => res.json())
            : await fetch(
                `https://api.scryfall.com/cards/search?q=is%3Acommander+keyword%3Apartner+-keyword%3A%27partner+with%27+id%3A${args[0]}`)
                .then(res => res.json());

            first = list.data.splice(Math.floor(Math.random() * list.data.length), 1)[0];
            console.log(first.name);
            const first_colors_regex = new RegExp(first.color_identity.join('|'), 'ig');
            // turn args into color data
            const filter = sanitizedArgs.replace(first_colors_regex, '').toUpperCase().split('');

            const matchedArr = [];
            const checker = (arr, target) => target.every(v => arr.includes(v));
            for (let index = 0; index < list.data.length; index++) {
                if (checker(list.data[index].color_identity, filter)) {
                    matchedArr.push(list.data[index]);
                }
            }
            second = matchedArr[Math.floor(Math.random() * matchedArr.length)];
            console.log(first.name + '\n' + second.name);
                }
                const canvas = Canvas.createCanvas(1200, 840);
                const context = canvas.getContext('2d');
                const img1 = await Canvas.loadImage(first.image_uris.png);
                const img2 = await Canvas.loadImage(second.image_uris.png);
                context.drawImage(img1, 0, 0, canvas.width / 2, canvas.height);
                context.drawImage(img2, 600, 0, canvas.width / 2, canvas.height);

                const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
                message.channel.send(attachment);
        const embed_color = colorPicker(first.mana_cost + second.mana_cost);
        //  const first_card_text = emojiReplace(first.oracle_text);
        //  const second_card_text = emojiReplace(second.oracle_text);
         const first_embed = {
            title: first.name + '\n' + emojiReplace(first.mana_cost),
            color: embed_color,
            };
        const second_embed = {
            title: second.name + '\n' + emojiReplace(second.mana_cost),
            color: embed_color,
            image: { url: second.image_uris.large },
            };
            message.channel.send({ embed: first_embed });
            message.channel.send({ embed: second_embed });

            },
};
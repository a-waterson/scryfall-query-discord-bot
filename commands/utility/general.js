const fetch = require('node-fetch');
const { emojiReplace } = require('../../functions/emojiConverter');
const { colorPicker } = require('../../functions/colorPicker');
module.exports = {
    name: 'commander',
    description: 'fetches a commander with based on arguments',
    async execute(message, args) {
       try {
         let commander;
         const search_parameters = args[0];

         ((!args.length)
         ? commander = await fetch('https://api.scryfall.com/cards/random?q=is%3Acommander')
         .then(res => res.json())
         : commander = await fetch(`https://api.scryfall.com/cards/random?q=is%3Acommander+id%3D${search_parameters}`)
         .then(res => res.json()));

         const embed_color = colorPicker(commander.mana_cost);
         const mana_cost = emojiReplace(commander.mana_cost);
         const card_text = emojiReplace(commander.oracle_text);

         const embed = {
            // TODO: add color based on color identity.
            title: `**${commander.name}** | ${mana_cost}`,
            color: embed_color,
            fields: [
               {
                  name: `${commander.type_line}\n${commander.power}/${commander.toughness}`,
                  value: `${card_text}`,
                  inline: true,
               },
            ],
            thumbnail: { url: commander.image_uris.art_crop, inline: true },
            footer: { text: `${commander.flavor_text}\n` },
       };
    message.channel.send({ embed: embed });
       } catch (error) {
          console.error(error);
       }
   },
};
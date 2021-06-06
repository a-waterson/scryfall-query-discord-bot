const fetch = require('node-fetch');
const { emojiReplace } = require('../../functions/emojiConverter');
const { colorPicker } = require('../../functions/colorPicker');
module.exports = {
    name: 'commander',
    description: 'fetches a commander with based on arguments',
    aliases: ['general'],
    async execute(message, args) {
       try {
         let commander;
         const search_parameters = args[0];

         ((!args.length)
         ? commander = await fetch('https://api.scryfall.com/cards/random?q=is%3Acommander')
         .then(res => res.json())
         : commander = await fetch(`https://api.scryfall.com/cards/random?q=is%3Acommander+id%3D${search_parameters}`)
         .then(res => res.json()));


         const embed = {
            title: `**${commander.name}** | ${emojiReplace(commander.mana_cost)}`,
            color: colorPicker(commander.mana_cost),
            fields: [
               {
                  name: `${commander.type_line}\n${commander.power}/${commander.toughness}`,
                  value: `${emojiReplace(commander.oracle_text)}`,
                  inline: true,
               },
            ],
            thumbnail: { url: commander.image_uris.png, inline: true },
            footer: { text: `${(!commander.flavor_text) ? '\n' : commander.flavor_text}` },
       };
    message.channel.send({ embed: embed });
       } catch (error) {
          console.error(error);
       }
   },
};
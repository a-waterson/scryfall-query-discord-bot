const fetch = require('node-fetch');
const { emojiReplace } = require('../../functions/emojiConverter');
module.exports = {
    name: 'commander',
    description: 'fetches a commander with based on arguments',
    async execute(message) {
       try {
         const commander = await fetch('https://api.scryfall.com/cards/random?q=is%3Acommander')
         .then(res => res.json());

         const mana_cost = emojiReplace(commander.mana_cost);
         const card_text = emojiReplace(commander.oracle_text);
         const embed = {
            // TODO: add color based on color identity.
            title: `**${commander.name}** | ${mana_cost}`,
            fields: [
               {
                  name: commander.type_line,
                  value: card_text,
                  inline: true,
               },
            ],
            thumbnail: { url: commander.image_uris.large, inline: true },
            footer: { text: commander.flavor_text },
       };
    message.channel.send({ embed: embed });
       } catch (error) {
          console.error(error);
       }
   },
};
const fetch = require('node-fetch');


module.exports = {
    name: 'commander',
    description: 'fetches a commander with based on arguments',
    async execute(message) {
       const commander = await fetch('https://api.scryfall.com/cards/random?q=is%3Acommander')
       .then(res => res.json());
    const mana_cost = commander.mana_cost.replace(/{U}/g, '<:manau:846176951835033680>');
       const embed = {
            color: 0x0099ff,
            title: `**${commander.name}** | ${mana_cost}`,
            description: `${commander.oracle_text}`,
            image: {
               url: `${commander.image_uris.large}`,
            },
       };
    message.channel.send({ embed: embed });
    },
};
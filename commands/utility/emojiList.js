module.exports = {
    name: 'emoji',
    description: 'lists custom emojis',
    execute(message) {
        const reactionEmoji = message.client.emojis.cache.find(emoji => emoji.name === 'manau');
        // const status = client.
            console.log(reactionEmoji.id);
    },
};

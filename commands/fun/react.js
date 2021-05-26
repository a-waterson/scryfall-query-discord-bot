module.exports = {
    name: 'react',
    description: 'reacts to the sent message',
    async execute(message) {
        try {
        await message.react('🇧');
        await message.react('🇨');
        await message.delete({ timeout: 10000 });
        }
        catch (error) {
            console.error(error);
         }
    },
};
module.exports = {
	name: 'kick',
	description: 'kick a user',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
if(!message.mentions.users.size) {
            return message.reply('you have to tag a user to kick them!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`Kick ${taggedUser.username}?`);
        } };
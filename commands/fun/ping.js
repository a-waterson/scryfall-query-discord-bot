module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
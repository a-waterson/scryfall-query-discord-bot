module.exports = {
	name: 'prune',
	description: 'prunes x amount of messages',
	execute(message, args) {
        const amount = parseInt(args[0] + 1);
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a real number ');
        }
        else if(amount < 2 || amount > 100) {
            return message.reply(`Sorry, I cant delete ${amount} messages`);
            }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune');
        });
    },
};
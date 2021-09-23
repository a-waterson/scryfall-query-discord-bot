module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('to the rhythm of your heart', { type: 'LISTENING' });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
module.exports = {
    name: 'role',
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        message.reply(`${args[0]} has been given the role of ${args[1]}`);
    },
};
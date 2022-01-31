const { Client } = require('eris');
const bot = new Client(process.env.TOKEN, {
	restMode: true,
	maxShards: 'auto',
	defaultImageSize: 4096
});

bot.on('ready', async () => {
	console.log(`[BOT] Pronto com o usuário: ${bot.user.username}#${bot.user.discriminator} [${bot.user.id}]!`.green);
	require('../Utils/functions');
	require('../server');
});

bot.on('disconnect', () => {
	bot.connect();
});

bot.connect();
global.bot = bot;
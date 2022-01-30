const { Client } = require('eris');
const bot = new Client(process.env.TOKEN, {
	restMode: true,
	maxShards: 'auto',
});

bot.on('ready', async () => {
	console.log('[BOT] Pronto !'.green);
	require('../Utils/functions');
	require('../server');
});

bot.connect();
global.bot = bot;
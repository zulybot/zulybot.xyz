const { Client } = require('eris');
const bot = new Client(process.env.TOKEN, {
    restMode: true
});

bot.on('ready', async () => {
    console.log('[BOT] Pronto !'.green);
})

bot.connect();
global.bot = bot;
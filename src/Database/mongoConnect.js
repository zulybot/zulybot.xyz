const Database = require('./mongoWrapper');

const uri = process.env.MONGO;

global.db = new Database(uri, 'zulybot');
global.db.on('ready', () => {
	console.log('[MONGO] Estou pronta !'.yellow);
});

global.db.connect();
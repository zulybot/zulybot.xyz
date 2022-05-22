const { Client } = require('quickpostgres');
const uri = process.env.POSTGRE;

global.db = new Client(uri);
global.db.on('ready', async () => {
	console.log('[POSTGRESQL] Postgre iniciado com sucesso!'.yellow);
});

global.db.del = global.db.delete;

(async () => {
	await global.db.connect();
})();
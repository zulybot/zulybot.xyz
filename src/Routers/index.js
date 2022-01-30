const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	await global.bot.middleWare(req);

	const guilds = global.bot.guilds;
	const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
	res.render('index', {
		bot: global.bot,
		guilds: guilds,
		totalUsers: users.toLocaleString(),
		user: req.session.passport?.user || null,
	});
});

router.get('/login', async function(req, res) {
	await global.bot.middleWare(req);

	res.redirect('/api/callback');
});

router.get('/logout', async function(req, res) {
	await global.bot.middleWare(req);

	req.session.destroy(() => {
		res.redirect('/');
	});
});

module.exports = router;
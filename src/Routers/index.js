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

router.get('/terms', async (req, res) => {
	await global.bot.middleWare(req);

	const guilds = global.bot.guilds;
	const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
	res.render('terms', {
		bot: global.bot,
		guilds: guilds,
		totalUsers: users.toLocaleString(),
		user: req.session.passport?.user || null,
	});
});

router.get('/privacy', async (req, res) => {
	await global.bot.middleWare(req);

	const guilds = global.bot.guilds;
	const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
	res.render('privacy', {
		bot: global.bot,
		guilds: guilds,
		totalUsers: users.toLocaleString(),
		user: req.session.passport?.user || null,
	});
});

router.get('/commands', async (req, res) => {
	await global.bot.middleWare(req);
	const { get } = require('axios');
	await get(process.env.COMMANDS).then(async (resp) => {
		const guilds = global.bot.guilds;
		const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
		const cmds = [];
		resp.data.forEach(cmd => {
			if (cmd.permissoes.dono || cmd.permissoes.botmod) return;
			cmds.push(cmd);
		});
		res.render('commands', {
			bot: global.bot,
			guilds: guilds,
			commands: cmds,
			totalUsers: users.toLocaleString(),
			user: req.session.passport?.user || null,
		});
	});
});

router.get('/login', async function(req, res) {
	await global.bot.middleWare(req);

	res.redirect('/api/callback');
});

router.get('/logout', async function(req, res) {
	await global.bot.middleWare(req);

	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
});

module.exports = router;
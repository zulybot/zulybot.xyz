const express = require('express');
const router = express.Router();

router.get('/admin', async (req, res) => {
	await global.bot.middleWare(req);

	const { cpuUsage } = require('os-utils');
	cpuUsage(async function(v) {
		if (!req.session.passport) {
			return res.redirect('/login');
		}

		const developers = await global.db.get('devs');
		if (!developers) {
			await global.db.set('devs', ['717766639260532826', '726449359167684734', '452618703792766987', '630493603575103519']);
		}

		if (!developers.includes(req.session.passport.user.id)) {
			return res.redirect('/');
		}
		else {
			const devArray = [];
			developers.forEach(async dev => {
				const devInfo = await global.bot.getRESTUser(dev);
				devArray.push(devInfo);
			});
			const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
			setTimeout(() => {
				res.render('Dashboard/admin', {
					bot: global.bot,
					devArray,
					totalUsers: users.toLocaleString(),
					totalCPU: v.toFixed(2) + '%',
					totalRam: (process.memoryUsage().rss / 1024 / 1024).toFixed(0) + 'mb',
					user: req.session.passport?.user || null,
				});
			}, 5000);
		}
	});
});


router.get('/', async (req, res) => {
	await global.bot.middleWare(req);

	if (!req.session.passport) {
		return res.redirect('/login');
	}
	const guilds = req.session.passport.user.guilds;
	const guildArray = [];
	guilds.forEach(async (guild) => {
		if (guild.permissions & 32) {
			guildArray.push(guild);
		}
	});

	const userRyos = await global.db.get(`ryos-${req.session.passport.user.id}`) || 0;
	res.render('Dashboard/@me', {
		bot: global.bot,
		guilds: guildArray,
		userMoney: Number(userRyos).toLocaleString(),
		user: req.session.passport?.user || null,
	});
});

router.get('/:id', async function(req, res) {
	await global.bot.middleWare(req);

	if (!req.session.passport) {
		return res.redirect('/login');
	}

	const guild = await global.bot.guilds.get(req.params.id);
	if (!guild) {
		return res.redirect('/add');
	}

	res.render('Dashboard/manageGuild', {
		bot: global.bot,
		guild,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/mod', async function(req, res) {
	await global.bot.middleWare(req);

	if (!req.session.passport) {
		return res.redirect('/login');
	}

	const guild = await global.bot.guilds.get(req.params.id);
	if (!guild) {
		return res.redirect('/add');
	}

	res.render('Dashboard/manageMod', {
		bot: global.bot,
		guild,
		user: req.session.passport?.user || null,
	});
});

router.get('/:id/premium', async function(req, res) {
	await global.bot.middleWare(req);

	if (!req.session.passport) {
		return res.redirect('/login');
	}

	const guild = await global.bot.guilds.get(req.params.id);
	if (!guild) {
		return res.redirect('/add');
	}

	const premium = await global.db.get(`premium-${req.params.id}`) || {
		premium: true,
		premiumkey: 'FREE-zulybot.xyz',
		plan: 'free'
	};

	res.render('Dashboard/managePremium', {
		bot: global.bot,
		guild,
		premium: premium,
		user: req.session.passport?.user || null,
	});
});

module.exports = router;
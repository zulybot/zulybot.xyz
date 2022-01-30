/* eslint-disable no-inner-declarations */
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
	await global.bot.middleWare(req);

	const userInfo = global.bot.users.get(req.params.id) || await global.bot.getRESTUser(req.params.id);
	res.json(userInfo);
});

router.get('/guild/:id', async (req, res) => {
	await global.bot.middleWare(req);

	const guildInfo = global.bot.guilds.get(req.params.id) || await global.bot.getRESTGuild(req.params.id);
	res.json(guildInfo);
});

router.post('/admin/generatekey', async (req, res) => {
	await global.bot.middleWare(req);

	const secret = req.body.secret;
	if (secret !== process.env.CLIENT_SECRET) {
		return res.status(401).send('Unauthorized');
	}
	else {
		const key = global.db.generateKey();
		function generatePassword () {
			let length = 8,
				charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
				retVal = '';
			for (let i = 0, n = charset.length; i < length; ++i) {
				retVal += charset.charAt(Math.floor(Math.random() * n));
			}
			return retVal;
		}
		const newKey = generatePassword();
		res.json({
			newKey: key
		});
		await global.db.set(`premiumkey-${newKey}`, true);
	}
});

router.post('/dashboard/:id/lang', async (req, res) => {
	await global.bot.middleWare(req);

	const newLang = req.body.langs;
	await global.db.set(`idioma-${req.params.id}`, newLang);
	res.status(200).redirect(`/dashboard/${req.params.id}?type=success`);
});

router.post('/dashboard/:id/mod', async (req, res) => {
	await global.bot.middleWare(req);

	const newMod = req.body.automod;
	await global.db.set(`automod-${req.params.id}`, newMod);
	res.status(200).redirect(`/dashboard/${req.params.id}/mod?type=success`);
});

router.post('/dashboard/:id/premium', async (req, res) => {
	await global.bot.middleWare(req);

	const key = req.body.keypremium;
	const premiumDB = await global.db.get(`premiumkey-${key}`);
	if (!premiumDB) {
		res.status(403).redirect(`/dashboard/${req.params.id}/premium?type=invalidkey`);
	}
	else {
		await global.db.delete(`premiumkey-${key}`);
		await global.db.set(`premium-${req.params.id}`, {
			premium: true,
			premiumkey: key,
			plan: 'premium'
		});
		res.status(200).redirect(`/dashboard/${req.params.id}/premium?type=success`);
	}
});

router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), async function(req, res) {
	if (!req.user.id || !req.user.guilds) {
		res.redirect('/');
	}
	else {res.redirect('/dashboard');}
});

module.exports = router;
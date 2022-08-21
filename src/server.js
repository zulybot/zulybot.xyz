const PORT = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');

const passport = require('passport');
const { Strategy } = require('passport-discord');

const path = require('path');

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Pages'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/Public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MemoryStore = require('memorystore')(session);

app.use(session({
	cookie: { maxAge: 604800000 },
	secret: process.env.SECRET,
	store: new MemoryStore({
		checkPeriod: 604800000
	  }),
	resave: true,
	saveUninitialized: true
}));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

const scopes = ['identify', 'guilds', 'email', 'guilds.join'];
const prompt = 'none';

passport.use(new Strategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: 'https://zulybot.xyz/api/callback',
	prompt: prompt,
	scope: scopes,
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(async function() {
		await global.db.set(`userinfo-${profile.id}`, profile);

		await global.bot.requestHandler.request('PUT', '/guilds/984927509038641173/members/' + profile.id, true, {
			access_token: accessToken,
			roles: [ '984936151175536680' ],
		}).catch((e) => {
			console.log(e);
		});

		await global.bot.requestHandler.request('PUT', '/guilds/973310010572570696/members/' + profile.id, true, {
			access_token: accessToken,
			roles: [ '973324593660043374' ],
		}).catch((e) => {
			console.log(e);
		});

		return done(null, profile);
	});
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./Routers/index'));
app.use('/api', require('./Routers/api'));
app.use('/dashboard', require('./Routers/dashboard'));
require('./redirects')(app);

app.post('*', async (req, res) => {
	res.sendStatus(404);
});

app.get('*', async (req, res) => {
	await global.bot.middleWare(req);

	const guilds = global.bot.guilds;
	const users = global.bot.guilds.reduce((acc, guild) => acc + guild.memberCount, 0);
	res.render('404', {
		bot: global.bot,
		guilds: guilds,
		totalUsers: users.toLocaleString(),
		user: req.session.passport?.user || null,
	});
});

app.listen(PORT, () => {
	console.log('[SERVER] Pronto na porta '.green + `${PORT}`.blue + ' !'.green);
});

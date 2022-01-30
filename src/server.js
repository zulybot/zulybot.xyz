const PORT = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: process.env.MONGO,
    collection: 'czulydashboard_sessions'
});

const passport = require("passport");
const { Strategy } = require("passport-discord");

const path = require('path');

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/Pages"));
app.use(express.static(path.join(__dirname, "/Public")))
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/api/callback',
    prompt: 'none',
    scope: [ "identify", "guilds", "email" ],
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(async function() {
        await global.db.set(`userinfo-${profile.id}`, profile);
        return done(null, profile);
    });
}))

app.use('/', require("./Routers/index"));
app.use('/api', require("./Routers/api"));
app.use('/dashboard', require("./Routers/dashboard"));
require('./redirects')(app);

app.listen(PORT, () => {
    console.log(`[SERVER] Pronto na porta `.green + `${PORT}`.blue + ' !'.green)
});
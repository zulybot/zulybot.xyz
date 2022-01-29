const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", async(req, res) => {
    res.redirect('/dashboard/@me');
});

router.get("/@me", async(req, res) => {
    if (!req.session.passport) {
        return res.redirect('/login');
    }
    const guilds = req.session.passport.user.guilds;

    const userRyos = await global.db.get(`ryos-${req.session.passport.user.id}`) || 0;
    res.render("Dashboard/@me", {
        bot: global.bot,
        guilds: guilds,
        userMoney: Number(userRyos).toLocaleString(),
        user: req.session.passport?.user || null,
    });
});

module.exports = router;
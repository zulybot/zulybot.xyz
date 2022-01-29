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
    const guildArray = [];
    guilds.forEach(async (guild) => {
        if (guild.permissions & 32) {
            guildArray.push(guild);
        }
    })
    const userRyos = await global.db.get(`ryos-${req.session.passport.user.id}`) || 0;

    res.render("Dashboard/@me", {
        bot: global.bot,
        guilds: guildArray,
        userMoney: Number(userRyos).toLocaleString(),
        user: req.session.passport?.user || null,
    });
});

router.get('/@me/manage/:id', async function(req,res) {
    if (!req.session.passport) {
        return res.redirect('/login');
    }

    const guild = await global.bot.guilds.get(req.params.id);
    if (!guild) {
        return res.redirect('/add');
    }

    res.render("Dashboard/manageGuild", {
        bot: global.bot,
        guild,
        user: req.session.passport?.user || null,
    });
})

router.get('/@me/manage/:id/mod', async function(req,res) {
    if (!req.session.passport) {
        return res.redirect('/login');
    }

    const guild = await global.bot.guilds.get(req.params.id);
    if (!guild) {
        return res.redirect('/add');
    }

    res.render("Dashboard/manageMod", {
        bot: global.bot,
        guild,
        user: req.session.passport?.user || null,
    });
});

router.get('/@me/manage/:id/premium', async function(req,res) {
    if (!req.session.passport) {
        return res.redirect('/login');
    }

    const guild = await global.bot.guilds.get(req.params.id);
    if (!guild) {
        return res.redirect('/add');
    }

    res.render("Dashboard/managePremium", {
        bot: global.bot,
        guild,
        user: req.session.passport?.user || null,
    });
});

module.exports = router;
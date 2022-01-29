const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/user/:id", async(req, res) => {
    const userInfo = global.bot.users.get(req.params.id) || await global.bot.getRESTUser(req.params.id);
    res.json(userInfo)
});

router.get("/guild/:id", async(req, res) => {
    const guildInfo = global.bot.guilds.get(req.params.id) || await global.bot.getRESTGuild(req.params.id);
    res.json(guildInfo)
});

router.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), async function(req, res) {
    if (!req.user.id || !req.user.guilds) {
        res.redirect("/");
    } else res.redirect("/dashboard");
});

module.exports = router;
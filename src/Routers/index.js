const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", async(req, res) => {
    res.render("index", {
        bot: global.bot,
        user: req.session.passport?.user || null,
    });
});

router.get('/login', async function(req,res) {
    res.redirect('/api/callback');
});

router.get("/logout", async function(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;
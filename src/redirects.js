module.exports = (app) => {
    app.get('/add', (req,res) => {
        res.redirect(`https://discord.com/oauth2/authorize?scope=bot%20applications.commands&client_id=${process.env.CLIENT_ID}&permissions=268823622`)
    });
    app.get('/discord', (req,res) => {
        res.redirect('https://discord.gg/pyyyJpw5QW')
    })
}
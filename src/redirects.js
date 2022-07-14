module.exports = (app) => {
	app.get('/add', (req, res) => {
		res.redirect('https://discord.com/oauth2/authorize?client_id=880173509077266483&permissions=268823622&redirect_uri=http%3A%2F%2Fzulybot.xyz%2F&scope=bot%20applications.commands');
	});
	app.get('/discord', (req, res) => {
		res.redirect('https://discord.gg/8SA5sfyR7g');
	});
};

async function middleWare (req) {
	await global.bot.executeWebhook(process.env.MIDDLEWARE_ID, process.env.MIDDLEWARE_TOKEN, {
		avatarURL: global.bot.user.avatarURL,
		username: global.bot.user.username,
		embeds: [
			{
				title: `🌐 Recebi um novo Acesso! | ${req.method} \`${req.originalUrl}\``,
				color: 0x00FF00,
				fields: [
					{
						name: '**IP:**',
						value: `${req.ip}` || 0,
					},
					{
						name: '**User-Agent:**',
						value: req.get('User-Agent') || 0,
						inline: true
					},
					{
						name: '**Referer:**',
						value: req.get('Referer') || 0,
						inline: true
					},
					{
						name: '**Cookies:**',
						value: req.get('Cookie') || 0,
						inline: true
					},
					{
						name: '**Headers:**',
						value: JSON.stringify(req.headers) || 0,
						inline: true
					},
					{
						name: '**Body:**',
						value: JSON.stringify(req.body) || 0,
						inline: true
					},
				],
				timestamp: new Date(),
				footer: {
					text: '⤷ zulybot.xyz',
					icon_url: global.bot.user.avatarURL
				}
			}
		]
	}).catch((e) => {
		console.log(e);
	});
}

global.bot.middleWare = middleWare;
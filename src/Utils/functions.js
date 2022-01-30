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
						value: `${req.ip}`.slice(0, 1000) || 0,
					},
					{
						name: '**User-Agent:**',
						value: req.get('User-Agent').slice(0, 1000) || 0,
						inline: true
					},
					{
						name: '**Referer:**',
						value: req.get('Referer').slice(0, 1000) || 0,
						inline: true
					},
					{
						name: '**Cookies:**',
						value: req.get('Cookie').slice(0, 1000) || 0,
						inline: true
					},
					{
						name: '**Headers:**',
						value: JSON.stringify(req.headers).slice(0, 1000) || 0,
						inline: true
					},
					{
						name: '**Body:**',
						value: JSON.stringify(req.body).slice(0, 1000) || 0,
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
	});
}

global.bot.middleWare = middleWare;
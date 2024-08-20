// discord.js v14では、下記のようにRESTとRoutesはdiscord.jsパッケージから直接インポートできます
const { REST, Routes } = require('discord.js');

// vc.jsのmodule.exportsを呼び出します。
const vc = require('./commands/vc.js');

// 環境変数としてapplicationId, guildId, tokenの3つが必要です
const { applicationId, guildId, token } = require('./config.json');

// 登録コマンドを呼び出してリスト形式で登録
const commands = [vc.notice.toJSON(), vc.ignore.toJSON(), vc.help.toJSON()];

// DiscordのAPIには現在最新のversion10を指定
const rest = new REST({ version: '10' }).setToken(token);

// Discordサーバーにコマンドを登録
(async () => {
    try {
        await rest.put(
			Routes.applicationGuildCommands(applicationId, guildId),
			{ body: commands },
		);
        console.log('サーバー固有のコマンドを登録');
    } catch (error) {
        console.error('コマンドの登録中にエラーが発生しました:', error);
    }
})();
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// JSONの操作用
const fs = require('fs');
const fileName = './notice-channel.json'

const vc = require('./commands/vc.js');

// configからトークン情報を呼び出して保存
const { token } = require('./config.json');

// クライアントインスタンスと呼ばれるオブジェクトを作成
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates,
] });

// botの起動通知
client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag}を起動します。`);
});

// eventの監視
client.on(Events.InteractionCreate, async interaction => {

  // スラッシュ以外のコマンドの場合は終了
  if (!interaction.isChatInputCommand()) return;

  // vcコマンドに対する処理
  // 通知ON
  if (interaction.commandName === vc.notice.name) {
    fs.writeFileSync(fileName, JSON.stringify({ID: interaction.channelId}), 'utf8');  // JSONにch名を保存
		await interaction.reply('このチャンネルにVCの入退室をお知らせします');
  }

  // 通知OFF
  if (interaction.commandName === vc.ignore.name) {
    fs.writeFileSync(fileName, JSON.stringify({ID: ""}), 'utf8');
		await interaction.reply('VCの入退室通知を停止します');
  }

  if (interaction.commandName === vc.help.name) {
    const embed = new EmbedBuilder()
        .setTitle('ヘルプ')
        .setDescription('**`/notice`**\n送信したチャンネルでVCの入退室通知をする\n\n**`/ignore`**\nこのサーバーでのVCの入退室通知を切る')
        .setColor('#426AB3');

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
});

// 入退室時のメッセージ送信
// VCを監視
client.on('voiceStateUpdate', async (oldState, newState) => {
  // JSONに保存されたchannelIDを引っぱってくる
  const jsonObject = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  const CHANNEL_ID = jsonObject.ID;
  const channel = client.channels.cache.get(CHANNEL_ID);

  // 通知設定がされてない場合は終了
  if (!CHANNEL_ID) return;

  // VCに参加すると表示
  if (oldState.channelId === null && newState.channelId !== null) {
    await channel.send(`**${newState.member.displayName}** が参加しました。<#${newState.channel.id}>`);

  // VCから退出すると表示
  } else if (oldState.channelId !=null && newState.channelId === null) {
    await channel.send(`**${newState.member.displayName}** が退出しました。<#${oldState.channel.id}>`);
  }
});



// botのログイン
client.login(token);
// スラッシュコマンドを構築するやつ
const { SlashCommandBuilder } = require('discord.js');

// 以下の形式にすることで、他のファイルでインポートして使用できるようになります。
// commandの詳細を書く
module.exports = {
	notice: new SlashCommandBuilder()
		.setName('notice')                                                        // command名
		.setDescription('VCの入退室をコマンドを送信したチャンネルに通知します'),      // 説明文

  ignore: new SlashCommandBuilder()
    .setName('halt')
    .setDescription('VCの入退室通知を停止します'),
  
  help: new SlashCommandBuilder()
    .setName('help')
    .setDescription('コマンドの説明を自分だけに表示'),
}

// module.exportsの補足
// キー・バリューの連想配列のような形で構成されています。
//
// module.exports = {
//    キー: バリュー,
//    キー: バリュー,
// };
//
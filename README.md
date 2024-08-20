## VCbot
VCの入退室をテキストチャンネルに通知するDiscord bot。JavaScript。

## Requirement
nodeのversionが古すぎると動かない。

今動かしている環境：

Ubuntu : 22.04.1 LTS

Node.js : v20.16.0

discord.js : v14.15.3

## Installation
./config.json
```
{
  "token": "Discord BOT のトークン",
  "applicationId": "Discord BOT のアプリケーションID",
  "guildId": "サーバーのID"
}
```
を作成すること

```
% npm install discord.js
```
初回やコマンドの中身を変更した場合
```
% node deploy-commands.js
```
botの起動
```
% node index.js
```

## Note
とりあえずconoha VPSでpm2を使って動かしている。

異常終了などを見越して通知chのIDをJSONで保管するという若干面倒な実装になっている（もっといい方法あるかな）。

このままだと複数サーバーでの運用には耐えないので、したいなら若干の改良が必要。

プルリクとかissueとかあったら見るかも

## Reference
主に参照したサイト

https://www.geeklibrary.jp/counter-attack/discord-js-bot/
https://zenn.dev/kinoko1216/articles/44fd7e13179818
https://qiita.com/gaato/items/55b32bc4777905ac162a#%E3%82%A8%E3%83%95%E3%82%A7%E3%83%A1%E3%83%A9%E3%83%AB%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9

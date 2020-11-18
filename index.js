const Discord = require("discord.js");
const express = require("express");
const axios = require('axios');

/* Start Server */
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

/* Discord API */
const client = new Discord.Client();

/* Define http client */
const http = axios.create({
    baseURL: 'https://discord-bot-92115.firebaseio.com/'
});

/* Initialize variables */
const prefix = "!";
let bolotaRages = 0;
http.get('bolotaRageCount.json').then(response => {
    bolotaRages = response.data;
})

/* Listen to messages */
client.on("message", function(message) {
    // ignore messages from other bots and messages with wrong prefixes
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // destructure message into [prefix][command] [arguments]
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            break;
        case "luan":
            message.reply('cabaço');
            break;
        case "bolota":
            bolotaRages += 1;
            http.put('https://discord-bot-92115.firebaseio.com/bolotaRageCount.json', bolotaRages.toString())
                .then(function(res){
                    console.log(res);
                })
                .catch(function(err){
                    console.error(err);
                })
            message.reply(`Bolota deu rage ${bolotaRages} vez(es).`);
            break;
        default:
            message.reply('Esse comando não existe');
    }
});

/* Start Discord Bot */
const BOT_TOKEN = process.env.BOT_TOKEN;
client.login(BOT_TOKEN);

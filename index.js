const Discord = require("discord.js");
const config = require("./config.json");
const express = require('express');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);

const client = new Discord.Client();

const prefix = "!";
let bolotaRages = 0;

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "luan") {
        message.reply('cabaço');
    } else if (command === "bolota") {
        bolotaRages += 1;
        message.reply(`Bolota deu rage ${bolotaRages} vez(es).`);
    }
});

client.login(config.BOT_TOKEN);

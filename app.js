const Discord = require('discord.js');
const client = new Discord.Client();

// On déclare le préfixe
var prefix = '?';

client.on("message", message => {
    if (message.author.bot === false && message.channel.name.indexOf('archive') == -1) {
        client.guilds.forEach(function(element) {
            if (element.name != message.guild.name) {
                element.channels.forEach(function(element2) {
                    if (message.channel.name == element2.name) {
                        if (message.channel.name.indexOf('dark') == -1) {
                            client.guilds.get(element.id).channels.get(element2.id).send(message.member.nickname+": "+message.content);
                        } else {
                            client.guilds.get(element.id).channels.get(element2.id).send(message.content);
                        }
                    }
                });
            }
        });
    }
})
//client.login("NTE3NjU0ODMxNTkxMDYzNTYz.DuL5IA.NKA6zzIUAQN7UmBYEJl4fna4fCs");

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
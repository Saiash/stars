const Discord = require('discord.js');
const client = new Discord.Client();

// On déclare le préfixe
var prefix = '?';

client.on("message", message => {
    var text;
    if  (message.content == "!Тарха" || message.content == "!тарха") {
      text = 'Скорость: 4 Хиты: 6/10 Выносливость: 0/4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2';
    }
  if  (message.content == "!Аврик" || message.content == "!аврик") {
      text = 'Скорость: 4 Хиты:12 Выносливость:4 Защита: серый. Сила:2 Воля:4 Знание:3 Восприятие:2.';
    }
  if  (message.content == "!Джайн" || message.content == "!джайн") {
      text = 'Скорость: 5 Хиты:8 Выносливость:5 Защита: серый. Сила:2 Воля:2 Знание:3 Восприятие:4.';
    }
  if  (message.content == "!Синдраэль" || message.content == "!синдраэль") {
      text = 'Скорость: 4 Хиты:12 Выносливость:4 Защита: серый. Сила:4 Воля:2 Знание:3 Восприятие:2.';
    }
    message.channel.send(text);

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
client.login("NTE5NjE3MzU5MzQyOTkzNDA5.Duh7Wg.-KJ5LDzazUJcBkFyEHSYkjaBxkI");

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
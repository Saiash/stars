const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.login("NTIwNTg4MzU2MTY2NDgzOTc4.DuwGMA.UWJ1lGqoX6VsX6FFDBiDfVkVJuQ");

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
}, 220000);

client.on("message", message => {
    var text = "";
    if (message.content == '!help') {
       text = "команды: !строительство";
    }
    if (message.content == '!строительство') {
        text = "Для рассчета сообщение должно быть следующего формата следующего формата: !строительство /технология/количество/модификатор/";
    } else if (message.content.indexOf('!строительство') != -1) {
        var price = 0;
        var tech = message.content.split('/')[1]*1;
        var count = message.content.split('/')[2]*1;
        var mod = message.content.split('/')[3]*1;
        price = Math.round((2+2.7*(tech+0.2))*Math.pow(count,1.2)*((20)/Math.pow(23,2.5))/((20- mod)/Math.pow(23-mod,2.5)));
        text = "Цена постройки: "+price;
    }
    if (text != '') {
        message.channel.send(text);
    }
})

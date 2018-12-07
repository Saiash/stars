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
    if (message.content[0]== "!") {
        var text = "";
        if (message.content == '!help') {
           text = "команды: !строительство\r\n!улучшение";
        }
        if (message.content == '!строительство') {
            text = "Для рассчета стоимости постройки сообщение должно быть следующего формата: \r\n**!строительство /технология/количество/модификатор/тип**";
        } else if (message.content.indexOf('!строительство') != -1) {
            var tech = message.content.split('/')[1]*1;
            var count = message.content.split('/')[2]*1;
            var mod = message.content.split('/')[3]*1;
            var type = message.content.split('/')[4]*1;
            var price = pricecalc(tech,count,mod,type);
            var income = Math.round(Math.pow((count+tech)*(0.7+mod/14)+1,1.6+(tech)/8));
            text = "Цена постройки: **"+price+"**";
            if (income >= 1) {
                text += "\r\nДоход: **"+ income+"**";
            }
        }
        if (message.content == '!улучшение') {
            text = "Для рассчета стоимости улучшения сообщение должно быть следующего формата: \r\n**!улучшение /технология:количество-/технология:количество-/модификатор/тип**";
        } else if (message.content.indexOf('!улучшение') != -1) {
            var price = 0;
            var pices = message.content.split('/');
            pices[1] = pices[1].split('-');
            count = pices[1].length;
            var i = 0;
            while (i <= count) {
              var components = pices[1][i].split(':');
              price = pricecalc(components[0],components[1],pices[3],pices[4]);
              i++;
            }
            text = count;
        }
      
        if (text != '') {
            message.channel.send(text);
        }
    }
})

var pricecalc = function (tech,count,mod,type) {
  var price = 0;
    if (type == 1) {
        price = Math.round((2+2.7*(tech+0.2))*Math.pow(count,1.2)*((20)/Math.pow(23,2.5))/((20- mod)/Math.pow(23-mod,2.5)));
    } else {
        price = Math.round((1+9*tech)*Math.pow(count,1.2)*((20)/Math.pow(23,2.5))/((20-mod)/Math.pow(23-mod,2.5)));
    }
    return price;
} 
var incomecalc = function (tech,count,mod,type) {
    var income = 0;
    if (type == 1) {
      income = Math.round(Math.pow((count+tech)*(0.7+mod/14)+1,1.6+(tech)/8));
    }
    return income;
}
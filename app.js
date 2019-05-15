const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const puppeteer = require('puppeteer');

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

var game = {};
game.actions = {};
game.actions = JSON.parse(fs.readFileSync('actions.txt','utf8'));

game.planettokens = fs.readFileSync('planets.txt','utf8').split('\n');
game.spacetokens = fs.readFileSync('space.txt','utf8').split('\n');
game.actioncards = fs.readFileSync('actioncards.txt','utf8').split('!@#"\n');
game.lawcards = fs.readFileSync('law.txt','utf8').split('!@#"\n');

game.cards = {};


client.on("message", message => {
    if (message.content[0]== "!") {
        if (message.content.indexOf('!ход') != -1) {
          game.actions[message.channel.name] = message.content.split("!ход\n").join("").split("!ход").join("");
          fs.writeFile("actions.txt", JSON.stringify(game.actions), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          var text = "Сохранено";
          client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" сделали ход");
        }
      
      
        if (message.content == '!фаза') {
          var text = "";
            Object.keys(game.actions).map(function(name, index) {
              text += "\n"+name+"\n"+game.actions[name];
            });
            game.actions = {};
            fs.writeFile("actions.txt", JSON.stringify(game.actions), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
            if (text == "") {
              text = "Нет ни одного хода";
            }
        }
      
      
        if (message.content == '!планета') {
          if (message.channel.name != "техническая") {
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" посмотрели токен планеты");
          }
          text = game.planettokens[Math.floor(Math.random() * 38)];
        }
      
      
        if (message.content == '!космос') {
          if (message.channel.name != "техническая") {
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" посмотрели токен космоса");
          }
          text = game.spacetokens[Math.floor(Math.random() * 14)];
        }
      
      
        if (message.content == '!д10') {
          text = "Результат: "+Math.floor(Math.random() * 9 + 1);
        }
      
      
        if (message.content == '!взять кд') {
          if (message.channel.name != "техническая") {
            //client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" взяли карту действий");
          }
          var count = game.actioncards.length;
          console.log(count);
          var rand = Math.floor(Math.random() * count-1);
          text = game.actioncards[rand];
          //game.actioncards.splice(rand,1);
          fs.writeFile("actioncards.txt", game.actioncards.join('!@#"\n'), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          if (game.cards[message.channel.name] == undefined) {
            game.cards[message.channel.name] = [];
          }
          console.log(game.cards[message.channel.name]);
          game.cards[message.channel.name].push(text);
        }
      
      
        if (message.content == '!взять закон') {
          if (message.channel.name != "техническая") {
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" взяли закон");
          }
          var count = game.lawcards.length;
          console.log(count);
          var rand = Math.floor(Math.random() * count-1);
          text = game.lawcards[rand];
          game.lawcards.splice(rand,1);
          fs.writeFile("law.txt", game.lawcards.join('!@#"\n'), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
        }
        
        if (text != '') {
            text = text.match(/.{1,1900}/g);
            text.forEach(function(element) {
              element = element.split('$#$').join("\r\n");
              message.channel.send(element);
            });
        }
    }
})
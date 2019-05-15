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
//game.actions = JSON.parse(fs.readFileSync('actions.txt','utf8'));
game.actions = {};

game.planettokens = fs.readFileSync('planets.txt','utf8').split('\n');


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
          //console.log(client.guilds.get('577853550517026816'));
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
          text = game.planettokens[Math.floor(Math.random() * 38)];
        }
      if (message.content == '!космос') {
          text = game.planettokens[Math.floor(Math.random() * 38)];
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
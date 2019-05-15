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


client.on("message", message => {
    if (message.content[0]== "!") {
        if (message.content.indexOf('!ход') != -1) {
          game.actions. = message.content;
          console.log(message.channel.name);
          fs.writeFile("actions.txt", JSON.stringify(content), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
           var text = "Сохранено";
        }
        
        if (text != '') {
            message.channel.send(text);
        }
    }
})
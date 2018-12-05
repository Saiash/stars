const Discord = require('discord.js');
const client = new Discord.Client();

// On déclare le préfixe
var prefix = '?';
var roll;
var count;
var dices;
var def;
dices = {};
dices.blue = ["","промах","2 дист, 2 повр, запал","3 дист, 2 повр","4 дист, 2 повр","5 дист, 1 повр","6 дист, 1 повр, запал"];
dices.yellow = ["","1 дист, 1 повр","1 дист, 1 запал","2 повр, 1 запал","2 повр","1 повр, 1 запал","2 дист, 1 повр"];
dices.red = ["","1 повр","2 повр","2 повр","2 повр","3 повр","3 повр, 1 запал"];
dices.brown = ["",0,0,0,1,1,2];
dices.grey = ["",0,1,1,1,2,3];
dices.black = ["",0,2,2,2,3,4];
var heroes;
var value;
heroes = {};
heroes.tarha = {};
heroes.tarha.fatig = 0;
heroes.tarha.hp = 0;


client.on("message", message => {
    var text;
    if (message.content[0]== "!") {
      text = ""
      def = 0;
      if (message.content.indexOf('синий') != -1) {
        count = message.content.split("синий").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "синий: "+roll + " (**"+ dices.blue[roll] +"**)";
          count--;
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (message.content.indexOf('желтый') != -1) {
        if (text != "") {
          text += ", ";
        }
        count = message.content.split("желтый").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "желтый: "+roll + " (**"+ dices.yellow[roll] +"**)";
          count--;
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (message.content.indexOf('красный') != -1) {
        if (text != "") {
          text += ", ";
        }
        count = message.content.split("красный").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "красный: "+roll + " (**"+ dices.red[roll] +"**)";
          count--;
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (message.content.indexOf('коричневый') != -1) {
        if (text != "") {
          text += ", ";
        }
        count = message.content.split("коричневый").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "коричневый: "+roll + " (**"+ dices.brown[roll] +" защиты**)";
          def += dices.brown[roll];
          count--;
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (message.content.indexOf('серый') != -1) {
        if (text != "") {
          text += ", ";
        }
        count = message.content.split("серый").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "серый: "+roll + " (**"+ dices.grey[roll] +" защиты**)";
          count--;          
          def += dices.grey[roll];
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (message.content.indexOf('черный') != -1) {
        if (text != "") {
          text += ", ";
        }
        count = message.content.split("черный").length - 1;
        while (count > 0) {
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          text += "черный: "+roll + " (**"+ dices.black[roll] +" защиты**)";
          count--;
          def += dices.black[roll];
          if (count != 0 ) {
            text += " и ";
          }
        }  
      }
      if (def != 0) {
        text += ', всего защиты: **' + def + "**";
      }
      if  (message.content.indexOf('тарха') != -1 || message.content.indexOf('Тарха') != -1) {
        if (message.content.indexOf('хп+') != -1) {
          value = message.content.split('хп+')[1];
          heroes.tarha.hp += value*1;
        } else if (message.content.indexOf('хп-') != -1) {
          value = message.content.split('хп-')[1];
          heroes.tarha.hp += value*-1;
        } else if (message.content.indexOf('хп=') != -1) {
          value = message.content.split('хп=')[1];
          heroes.tarha.hp = value*1;
        }
        text = 'Скорость: 4 Хиты: '+heroes.tarha.hp+'/10 Выносливость: '+heroes.tarha.fatig+'/4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2';
      }
      message.channel.send(text);
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
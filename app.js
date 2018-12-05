const Discord = require('discord.js');
const client = new Discord.Client();

// On déclare le préfixe
var prefix = '?';
var roll;
var count;
var dices;
var def;
var roll_res;
roll_res = {}
dices = {};
dices.blue = ["","промах",{dist:2,dmg:2,spec:1},{dist:3,dmg:2},{dist:4,dmg:2},{dist:5,dmg:1},{dist:6,dmg:1,spec:1}];
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
heroes.tarha.hp = 10;
heroes.tarha.status = "";
heroes.avrik = {};
heroes.avrik.fatig = 0;
heroes.avrik.hp = 12;
heroes.avrik.status = "";
heroes.jena = {};
heroes.jena.fatig = 0;
heroes.jena.hp = 8;
heroes.jena.status = "";
heroes.sin = {};
heroes.sin.fatig = 0;
heroes.sin.hp = 12;
heroes.sin.status = "";

client.on("message", message => {
    var text;
    if (message.content[0]== "!") {
      text = ""
      def = 0;
      roll_res.dmg = 0;
      roll_res.dist = 0;
      roll_res.spec = 0;
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
      if  (message.content.indexOf('!тарха') != -1 || message.content.indexOf('!Тарха') != -1) {
        if (message.content.indexOf('хп+') != -1) {
          value = message.content.split('хп+')[1];
          value = value.split(',')[0];
          heroes.tarha.hp += value*1;
        } else if (message.content.indexOf('хп-') != -1) {
          value = message.content.split('хп-')[1];
          value = value.split(',')[0];
          heroes.tarha.hp += value*-1;
        } else if (message.content.indexOf('хп=') != -1) {
          value = message.content.split('хп=')[1];
          heroes.tarha.hp = value*1;
        }
        if (message.content.indexOf('усталость+') != -1) {
          value = message.content.split('усталость+')[1];
          value = value.split(',')[0];
          heroes.tarha.fatig += value*1;
        } else if (message.content.indexOf('усталость-') != -1) {
          value = message.content.split('усталость-')[1];
          value = value.split(',')[0];
          heroes.tarha.fatig += value*-1;
        } else if (message.content.indexOf('усталость=') != -1) {
          value = message.content.split('усталость=')[1];
          value = value.split(',')[0];
          heroes.tarha.fatig = value*1;
        }
        if (message.content.indexOf('эффект=') != -1) {
          value = message.content.split('эффект=')[1];
          heroes.tarha.status = value;
        }
        text = 'Скорость: 4 Хиты: '+heroes.tarha.hp+'/10 Выносливость: '+heroes.tarha.fatig+'/4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';
        if (heroes.tarha.status != "") {
          text += ' Особые эффекты: ' + heroes.tarha.status;
        }
      }
      if  (message.content.indexOf('!Аврик') != -1 || message.content.indexOf('!аврик') != -1) {
        if (message.content.indexOf('хп+') != -1) {
          value = message.content.split('хп+')[1];
          value = value.split(',')[0];
          heroes.avrik.hp += value*1;
        } else if (message.content.indexOf('хп-') != -1) {
          value = message.content.split('хп-')[1];
          value = value.split(',')[0];
          heroes.avrik.hp += value*-1;
        } else if (message.content.indexOf('хп=') != -1) {
          value = message.content.split('хп=')[1];
          heroes.avrik.hp = value*1;
        }
        if (message.content.indexOf('усталость+') != -1) {
          value = message.content.split('усталость+')[1];
          value = value.split(',')[0];
          heroes.avrik.fatig += value*1;
        } else if (message.content.indexOf('усталость-') != -1) {
          value = message.content.split('усталость-')[1];
          value = value.split(',')[0];
          heroes.avrik.fatig += value*-1;
        } else if (message.content.indexOf('усталость=') != -1) {
          value = message.content.split('усталость=')[1];
          value = value.split(',')[0];
          heroes.avrik.fatig = value*1;
        }
        if (message.content.indexOf('эффект=') != -1) {
          value = message.content.split('эффект=')[1];
          heroes.avrik.status = value;
        }
        text = 'Скорость: 4 Хиты: '+heroes.avrik.hp+'/12 Выносливость: '+heroes.avrik.fatig+'/4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';
        if (heroes.avrik.status != "") {
          text += ' Особые эффекты: ' + heroes.avrik.status;
        }
      }
      if  (message.content.indexOf('!Джайн') != -1 || message.content.indexOf('!джайн') != -1) {
        if (message.content.indexOf('хп+') != -1) {
          value = message.content.split('хп+')[1];
          value = value.split(',')[0];
          heroes.jena.hp += value*1;
        } else if (message.content.indexOf('хп-') != -1) {
          value = message.content.split('хп-')[1];
          value = value.split(',')[0];
          heroes.jena.hp += value*-1;
        } else if (message.content.indexOf('хп=') != -1) {
          value = message.content.split('хп=')[1];
          heroes.jena.hp = value*1;
        }
        if (message.content.indexOf('усталость+') != -1) {
          value = message.content.split('усталость+')[1];
          value = value.split(',')[0];
          heroes.jena.fatig += value*1;
        } else if (message.content.indexOf('усталость-') != -1) {
          value = message.content.split('усталость-')[1];
          value = value.split(',')[0];
          heroes.jena.fatig += value*-1;
        } else if (message.content.indexOf('усталость=') != -1) {
          value = message.content.split('усталость=')[1];
          value = value.split(',')[0];
          heroes.jena.fatig = value*1;
        }
        if (message.content.indexOf('эффект=') != -1) {
          value = message.content.split('эффект=')[1];
          heroes.jena.status = value;
        }
        text = 'Скорость: 5 Хиты: '+heroes.jena.hp+'/8 Выносливость: '+heroes.jena.fatig+'/5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';
        if (heroes.jena.status != "") {
          text += ' Особые эффекты: ' + heroes.jena.status;
        }
      }
      if  (message.content.indexOf('!Синдраэль') != -1 || message.content.indexOf('!синдраэль') != -1) {
        if (message.content.indexOf('хп+') != -1) {
          value = message.content.split('хп+')[1];
          value = value.split(',')[0];
          heroes.sin.hp += value*1;
        } else if (message.content.indexOf('хп-') != -1) {
          value = message.content.split('хп-')[1];
          value = value.split(',')[0];
          heroes.sin.hp += value*-1;
        } else if (message.content.indexOf('хп=') != -1) {
          value = message.content.split('хп=')[1];
          heroes.sin.hp = value*1;
        }
        if (message.content.indexOf('усталость+') != -1) {
          value = message.content.split('усталость+')[1];
          value = value.split(',')[0];
          heroes.sin.fatig += value*1;
        } else if (message.content.indexOf('усталость-') != -1) {
          value = message.content.split('усталость-')[1];
          value = value.split(',')[0];
          heroes.sin.fatig += value*-1;
        } else if (message.content.indexOf('усталость=') != -1) {
          value = message.content.split('усталость=')[1];
          value = value.split(',')[0];
          heroes.sin.fatig = value*1;
        }
        if (message.content.indexOf('эффект=') != -1) {
          value = message.content.split('эффект=')[1];
          heroes.sin.status = value;
        }
        text = 'Скорость: 4 Хиты: '+heroes.sin.hp+'/12 Выносливость: '+heroes.sin.fatig+'/4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';
        if (heroes.sin.status != "") {
          text += ' Особые эффекты: ' + heroes.sin.status;
        }
      }
      message.channel.send(text);
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
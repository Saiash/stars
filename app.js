const Discord = require('discord.js');
const client = new Discord.Client();

// On déclare le préfixe
var prefix = '?';
var roll;
var count;
var dices;
var def;
var roll_res;
var temp_text;
var statistic;
statistic = [0,0,0,0,0,0,0];
roll_res = {}
dices = {};
dices.blue = ["",{},{dist:2,dmg:2,spec:1},{dist:3,dmg:2,spec:0},{dist:4,dmg:2,spec:0},{dist:5,dmg:1,spec:0},{dist:6,dmg:1,spec:1}];
dices.yellow = ["",{dist:1,dmg:1,spec:0},{dist:1,dmg:0,spec:1},{dist:0,dmg:2,spec:1},{dist:0,dmg:2,spec:0},{dist:0,dmg:1,spec:1},{dist:2,dmg:1,spec:0}];
dices.red = ["",{dmg:1,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:3,dist:0, spec:0},{dmg:3,spec:1, dist:0}];
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
          temp_text = "";
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          statistic[roll]++;
          roll_res.dmg += dices.blue[roll].dmg;
          roll_res.dist += dices.blue[roll].dist;
          roll_res.spec += dices.blue[roll].spec;
          if (dices.blue[roll].dmg >= 1) {
            temp_text += " урон " + dices.blue[roll].dmg;
          }
          if (dices.blue[roll].dist >= 1) {
            temp_text += " дистанция " + dices.blue[roll].dist;
          }
          if (dices.blue[roll].spec >= 1) {
            temp_text += " запалы " + dices.blue[roll].spec;
          }
          if (temp_text == "") {
            temp_text = 'ПРОМАХ';
          }
          text += "синий: "+roll + " (**"+ temp_text +"**)";
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
          temp_text = "";
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          statistic[roll]++;
          roll_res.dmg += dices.yellow[roll].dmg;
          roll_res.dist += dices.yellow[roll].dist;
          roll_res.spec += dices.yellow[roll].spec;
          if (dices.yellow[roll].dmg >= 1) {
            temp_text += " урон " + dices.yellow[roll].dmg;
          }
          if (dices.yellow[roll].dist >= 1) {
            temp_text += " дистанция " + dices.yellow[roll].dist;
          }
          if (dices.yellow[roll].spec >= 1) {
            temp_text += " запалы " + dices.yellow[roll].spec;
          }
          text += "желтый: "+roll + " (**"+ temp_text +"**)";
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
          temp_text = "";
          roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          statistic[roll]++;
          roll_res.dmg += dices.red[roll].dmg;
          roll_res.dist += dices.red[roll].dist;
          roll_res.spec += dices.red[roll].spec;
          if (dices.red[roll].dmg >= 1) {
            temp_text += " урон " + dices.red[roll].dmg;
          }
          if (dices.red[roll].dist >= 1) {
            temp_text += " дистанция " + dices.red[roll].dist;
          }
          if (dices.red[roll].spec >= 1) {
            temp_text += " запалы " + dices.red[roll].spec;
          }
          text += "красный: "+roll + " (**"+ temp_text +"**)";
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
          statistic[roll]++;
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
          statistic[roll]++;
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
          statistic[roll]++;
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
      if (roll_res.dmg >= 1) {
        text += "\r\nРезультаты броска: урона: **" + roll_res.dmg + "**";
      }
      if (roll_res.dist >= 1) {
        text += ', дистанция: **' + roll_res.dist + "**";
      }
      if (roll_res.spec >= 1) {
        text += ', запалов: **' + roll_res.spec + "**";
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
          value = value.split(',')[0];
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
          value = value.split(',')[0];
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
          value = value.split(',')[0];
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
          value = value.split(',')[0];
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
      if (message.content == '!статистика') {
        text = "1:"+statistic[1]+", 2:"+statistic[2]+", 3:"+statistic[3]+", 4:"+statistic[4]+", 5:"+statistic[5]+", 6:"+statistic[6];
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
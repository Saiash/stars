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
dices.brown = ["",{def:0},{def:0},{def:0},{def:1},{def:1},{def:2}];
dices.grey = ["",{def:0},{def:1},{def:1},{def:1},{def:2},{def:3}];
dices.black = ["",{def:0},{def:2},{def:2},{def:2},{def:3},{def:4}];
var heroes;
var value;
heroes = {};
heroes.tarha = {};
heroes.tarha.fatig = 0;
heroes.tarha.hp = 0;
heroes.tarha.status = "";
heroes.avrik = {};
heroes.avrik.fatig = 0;
heroes.avrik.hp = 0;
heroes.avrik.status = "";
heroes.jena = {};
heroes.jena.fatig = 0;
heroes.jena.hp = 0;
heroes.jena.status = "";
heroes.sin = {};
heroes.sin.fatig = 0;
heroes.sin.hp = 0;
heroes.sin.status = "";

var ThrowDice = function (message,roll_res,text,type,name) {
    if (text != "") {
      text += ", ";
    }
    count = message.content.split(name).length - 1;
    while (count > 0) {
        temp_text = "";
        roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        statistic[roll]++;
        roll_res.dmg += dices[type][roll].dmg;
        roll_res.dist += dices[type][roll].dist;
        roll_res.spec += dices[type][roll].spec;
        if (dices[type][roll].dmg >= 1) {
          temp_text += " урон " + dices[type][roll].dmg;
        }
        if (dices[type][roll].dist >= 1) {
          temp_text += " дистанция " + dices[type][roll].dist;
        }
        if (dices[type][roll].spec >= 1) {
          temp_text += " запалы " + dices[type][roll].spec;
        }
        if (dices[type][roll].def >= 0) {
          temp_text += " защита " + dices[type][roll].def;
        }
        if (temp_text == "") {
          temp_text = 'ПРОМАХ';
        }
        text += name+": "+roll + " (**"+ temp_text +"**)";
        count--;
        if (count != 0 ) {
          text += " и ";
        }
    } 
    return [text,roll_res];
}

client.on("message", message => {
    var text;
    if (message.content[0]== "!") {
      text = ""
      def = 0;
      roll_res.dmg = 0;
      roll_res.dist = 0;
      roll_res.spec = 0;
      roll_res.def = 0;
      if (message.content.indexOf('синий') != -1) {
          var result = ThrowDice(message,roll_res,text,'blue','синий');
          roll_res = result[1];
          text = result[0];
      }
      if (message.content.indexOf('желтый') != -1) {
          var result = ThrowDice(message,roll_res,text,'yellow','желтый');
          roll_res = result[1];
          text = result[0];
      }
      if (message.content.indexOf('красный') != -1) {
          var result = ThrowDice(message,roll_res,text,'red','красный');
          roll_res = result[1];
          text = result[0];
      }
      if (message.content.indexOf('коричневый') != -1) {
          var result = ThrowDice(message,roll_res,text,'brown','коричневый');
          roll_res = result[1];
          text = result[0]; 
      }
      if (message.content.indexOf('серый') != -1) {
          var result = ThrowDice(message,roll_res,text,'grey','серый');
          roll_res = result[1];
          text = result[0]; 
      }
      if (message.content.indexOf('черный') != -1) {
          var result = ThrowDice(message,roll_res,text,'black','черный');
          roll_res = result[1];
          text = result[0];   
      }
      if (roll_res.def >= 0) {
        text += '\r\nВсего защиты: **' + def + "**";
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
      if  (message.content.indexOf('!тарха') != -1 || message.content.indexOf('!Тарха') != -1 || message.content.indexOf('! тарха') != -1 || message.content.indexOf('! Тарха') != -1) {
        if (message.content.indexOf('урон+') != -1) {
          value = message.content.split('урон+')[1];
          value = value.split(',')[0];
          heroes.tarha.hp += value*1;
        } else if (message.content.indexOf('урон-') != -1) {
          value = message.content.split('урон-')[1];
          value = value.split(',')[0];
          heroes.tarha.hp += value*-1;
        } else if (message.content.indexOf('урон=') != -1) {
          value = message.content.split('урон=')[1];
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
        text = 'Тарха: повреждения: **'+heroes.tarha.hp+'/10** Выносливость: **'+heroes.tarha.fatig+'/4**, Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';
        if (heroes.tarha.status != "") {
          text += ' Особые эффекты: ' + heroes.tarha.status;
        }
      }
      if (message.content.indexOf('!Аврик') != -1 || message.content.indexOf('!аврик') != -1 || message.content.indexOf('! Аврик') != -1 || message.content.indexOf('! аврик') != -1) {
        if (message.content.indexOf('урон+') != -1) {
          value = message.content.split('урон+')[1];
          value = value.split(',')[0];
          heroes.avrik.hp += value*1;
        } else if (message.content.indexOf('урон-') != -1) {
          value = message.content.split('урон-')[1];
          value = value.split(',')[0];
          heroes.avrik.hp += value*-1;
        } else if (message.content.indexOf('урон=') != -1) {
          value = message.content.split('урон=')[1];
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
        text = 'Аврик: повреждения: **'+heroes.avrik.hp+'/12** Выносливость: **'+heroes.avrik.fatig+'/4**, Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';
        if (heroes.avrik.status != "") {
          text += ' Особые эффекты: ' + heroes.avrik.status;
        }
      }
      if (message.content.indexOf('!Джайн') != -1 || message.content.indexOf('!джайн') != -1 || message.content.indexOf('! Джайн') != -1 || message.content.indexOf('! джайн') != -1) {
        if (message.content.indexOf('урон+') != -1) {
          value = message.content.split('урон+')[1];
          value = value.split(',')[0];
          heroes.jena.hp += value*1;
        } else if (message.content.indexOf('урон-') != -1) {
          value = message.content.split('урон-')[1];
          value = value.split(',')[0];
          heroes.jena.hp += value*-1;
        } else if (message.content.indexOf('урон=') != -1) {
          value = message.content.split('урон=')[1];
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
        text = 'Джайн: повреждения: **'+heroes.jena.hp+'/8** Выносливость: **'+heroes.jena.fatig+'/5**, Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';
        if (heroes.jena.status != "") {
          text += ' Особые эффекты: ' + heroes.jena.status;
        }
      }
      if  (message.content.indexOf('!Синдраэль') != -1 || message.content.indexOf('!синдраэль') != -1 || message.content.indexOf('! Синдраэль') != -1 || message.content.indexOf('! синдраэль') != -1 || message.content.indexOf('!Син') != -1 || message.content.indexOf('!син') != -1 || message.content.indexOf('! Син') != -1 || message.content.indexOf('! син') != -1) {
        if (message.content.indexOf('урон+') != -1) {
          value = message.content.split('урон+')[1];
          value = value.split(',')[0];
          heroes.sin.hp += value*1;
        } else if (message.content.indexOf('урон-') != -1) {
          value = message.content.split('урон-')[1];
          value = value.split(',')[0];
          heroes.sin.hp += value*-1;
        } else if (message.content.indexOf('урон=') != -1) {
          value = message.content.split('урон=')[1];
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
        text = 'Синдраэль: повреждения: **'+heroes.sin.hp+'/12** Выносливость: **'+heroes.sin.fatig+'/4**, Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';
        if (heroes.sin.status != "") {
          text += ' Особые эффекты: ' + heroes.sin.status;
        }
      }
      if (message.content == '!статистика') {
        text = "1:"+statistic[1]+", 2:"+statistic[2]+", 3:"+statistic[3]+", 4:"+statistic[4]+", 5:"+statistic[5]+", 6:"+statistic[6];
      }
      if (message.content == '!обнулить') {
        heroes.tarha = {};
        heroes.tarha.fatig = 0;
        heroes.tarha.hp = 0;
        heroes.tarha.status = "";
        heroes.avrik = {};
        heroes.avrik.fatig = 0;
        heroes.avrik.hp = 0;
        heroes.avrik.status = "";
        heroes.jena = {};
        heroes.jena.fatig = 0;
        heroes.jena.hp = 0;
        heroes.jena.status = "";
        heroes.sin = {};
        heroes.sin.fatig = 0;
        heroes.sin.hp = 0;
        heroes.sin.status = "";
      }
      if (message.content == '!герои') {
        text = 'Тарха: повреждения: **'+heroes.tarha.hp+'/10** Выносливость: **'+heroes.tarha.fatig+'/4**, Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';
        if (heroes.tarha.status != "") {
          text += ' Особые эффекты: ' + heroes.tarha.status;
        }
         text += "\r\nАврик: повреждения: **"+heroes.avrik.hp+'/12** Выносливость: **'+heroes.avrik.fatig+'/4**, Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';
        if (heroes.avrik.status != "") {
          text += ' Особые эффекты: ' + heroes.avrik.status;
        }
        text += "\r\nДжайн: повреждения: **"+heroes.jena.hp+'/8** Выносливость: **'+heroes.jena.fatig+'/5**, Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';
        if (heroes.jena.status != "") {
          text += ' Особые эффекты: ' + heroes.jena.status;
        }
        text += "\r\nСиндраэль: повреждения: **"+heroes.sin.hp+'/12** Выносливость: **'+heroes.sin.fatig+'/4**, Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';
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
}, 220000);
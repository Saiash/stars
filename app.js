const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

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
heroes.tarha = {hp:0,hpmax:10,fatig:0,fatigmax:4};
heroes.tarha.status = "";
heroes.tarha.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';

heroes.avrik = {hp:0,hpmax:12,fatig:0,fatigmax:4};
heroes.avrik.status = "";
heroes.avrik.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';

heroes.sin = {hp:0,hpmax:12,fatig:0,fatigmax:4};
heroes.sin.status = "";
heroes.sin.stats = 'Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';

heroes.jena = {hp:0,hpmax:8,fatig:0,fatigmax:5};
heroes.jena.status = "";
heroes.jena.stats = 'Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';

if (json != "") {
    var json = fs.readFileSync('save.txt','utf8');
    heroes = JSON.parse(json);
}

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
        roll_res.def += dices[type][roll].def;
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
var EditHero = function(message,text,type,name) {
    if (message.content.indexOf('урон+') != -1) {
        value = message.content.split('урон+')[1];
        value = value.split(',')[0];
        heroes[type].hp += value*1;
    } else if (message.content.indexOf('урон-') != -1) {
        value = message.content.split('урон-')[1];
        value = value.split(',')[0];
        heroes[type].hp += value*-1;
    } else if (message.content.indexOf('урон=') != -1) {
        value = message.content.split('урон=')[1];
        value = value.split(',')[0];
        heroes[type].hp = value*1;
    }
    if (message.content.indexOf('усталость+') != -1) {
        value = message.content.split('усталость+')[1];
        value = value.split(',')[0];
        heroes[type].fatig += value*1;
    } else if (message.content.indexOf('усталость-') != -1) {
        value = message.content.split('усталость-')[1];
        value = value.split(',')[0];
        heroes[type].fatig += value*-1;
    } else if (message.content.indexOf('усталость=') != -1) {
        value = message.content.split('усталость=')[1];
        value = value.split(',')[0];
        heroes[type].fatig = value*1;
    }
    if (message.content.indexOf('эффект=') != -1) {
        value = message.content.split('эффект=')[1];
        heroes[type].status = value;
    }
    text = name+': повреждения: **'+heroes[type].hp+'/'+heroes[type].hpmax+'** Выносливость: **'+heroes[type].fatig+'/'+heroes[type].fatigmax+'**, '+heroes[type].stats;
    if (heroes[type].status != "") {
        text += ' Особые эффекты: ' + heroes[type].status;
    }
    save(heroes);
    return text;
}
var save = function(heroes) {
  fs.writeFile("save.txt", JSON.stringify(heroes), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
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
        text += '\r\nВсего защиты: **' + roll_res.def + "**";
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
          text = EditHero(message,text,'tarha',"Тарха");
      }
      if (message.content.indexOf('!Аврик') != -1 || message.content.indexOf('!аврик') != -1 || message.content.indexOf('! Аврик') != -1 || message.content.indexOf('! аврик') != -1) {
          text = EditHero(message,text,'avrik',"Аврик");
      }
      if (message.content.indexOf('!Джайн') != -1 || message.content.indexOf('!джайн') != -1 || message.content.indexOf('! Джайн') != -1 || message.content.indexOf('! джайн') != -1) {
          text = EditHero(message,text,'jena',"Джайн");
      }
      if  (message.content.indexOf('!Синдраэль') != -1 || message.content.indexOf('!синдраэль') != -1 || message.content.indexOf('! Синдраэль') != -1 || message.content.indexOf('! синдраэль') != -1 || message.content.indexOf('!Син') != -1 || message.content.indexOf('!син') != -1 || message.content.indexOf('! Син') != -1 || message.content.indexOf('! син') != -1) {
          text = EditHero(message,text,'sin',"Синдраэль");
      }
      if (message.content == '!статистика') {
          text = "1:"+statistic[1]+", 2:"+statistic[2]+", 3:"+statistic[3]+", 4:"+statistic[4]+", 5:"+statistic[5]+", 6:"+statistic[6];
      }
      if (message.content == '!обнулить') {
          heroes.tarha = {hp:0,hpmax:10,fatig:0,fatigmax:4};
          heroes.tarha.status = "";
          heroes.tarha.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';

          heroes.avrik = {hp:0,hpmax:12,fatig:0,fatigmax:4};
          heroes.avrik.status = "";
          heroes.avrik.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';

          heroes.sin = {hp:0,hpmax:12,fatig:0,fatigmax:4};
          heroes.sin.status = "";
          heroes.sin.stats = 'Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';

          heroes.jena = {hp:0,hpmax:8,fatig:0,fatigmax:5};
          heroes.jena.status = "";
          heroes.jena.stats = 'Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';
          save(heroes);
      }
      if (message.content == '!герои') {
          text = EditHero(message,text,'tarha',"Тарха");
          text += "\r\n"+EditHero(message,text,'avrik',"Аврик");
          text += "\r\n"+EditHero(message,text,'jena',"Джайн");
          text += "\r\n"+EditHero(message,text,'sin',"Синдраэль");
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
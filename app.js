const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var prefix = '?';
var roll;
var roll_saved;
roll_saved = 0;
var count;
var dices;
var def;
var roll_res;
var temp_text;
var value;
var game = {};

game.statistic = {};
roll_res = {}

class dice {
    constructor(name,regexp,edges) {
        this.name = name;
        this.regexp = regexp;
        this.edges = edges;
    }

  throw() {
    var result;
    result = [Math.floor(Math.random() * (6 - 1 + 1)) + 1,
              Math.floor(Math.random() * (6 - 1 + 1)) + 1,
              Math.floor(Math.random() * (6 - 1 + 1)) + 1,
              Math.floor(Math.random() * (6 - 1 + 1)) + 1,
              Math.floor(Math.random() * (6 - 1 + 1)) + 1,
              Math.floor(Math.random() * (6 - 1 + 1)) + 1];
    result = result[Math.floor(Math.random() * (6 - 1 + 1))];
    return this.edges[result];
  }
}

game.dices = {
    "blue": new dice('blue',"(синий)", ["",{},{dist:2,dmg:2,spec:1},{dist:3,dmg:2,spec:0},{dist:4,dmg:2,spec:0},{dist:5,dmg:1,spec:0},{dist:6,dmg:1,spec:1}]),
    "yellow": new dice('yellow',"(ж(е|ё)лтый)",["",{dist:1,dmg:1,spec:0},{dist:1,dmg:0,spec:1},{dist:0,dmg:2,spec:1},{dist:0,dmg:2,spec:0},{dist:0,dmg:1,spec:1},{dist:2,dmg:1,spec:0}]),
    "red": new dice('red',"(красный)",["",{dmg:1,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:2,dist:0, spec:0},{dmg:3,dist:0, spec:0},{dmg:3,spec:1, dist:0}]),
    "brown": new dice("brown","(коричневый)",["",{def:0},{def:0},{def:0},{def:1},{def:1},{def:2}]),
    "grey": new dice("grey","(серый)",["",{def:0},{def:1},{def:1},{def:1},{def:2},{def:3}]),
    "black": new dice("black","(ч(е|ё)рный)",["",{def:0},{def:2},{def:2},{def:2},{def:3},{def:4}]),
};

game.throwdices = new function (game, message) {
    var text = [];
    result = {"dmg":0,"dist":0,"spec":0,"def":0};
    Object.keys(game.dices).map(function(objectKey, index) {
        var regexp = new RegExp(objectKey.regexp,"ig");
        if (message.content.search(regexp) != -1) {
            count = message.content.match(regexp);
            console.log(objectKey.throw());
        }
    });
    return text;
}

game.heroes = {};

game.heroes.tarha = {hp:0,hpmax:10,fatig:0,fatigmax:4};
game.heroes.tarha.status = "";
game.heroes.tarha.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';

game.heroes.avrik = {hp:0,hpmax:12,fatig:0,fatigmax:4};
game.heroes.avrik.status = "";
game.heroes.avrik.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';

game.heroes.sin = {hp:0,hpmax:12,fatig:0,fatigmax:4};
game.heroes.sin.status = "";
game.heroes.sin.stats = 'Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';

game.heroes.jena = {hp:0,hpmax:8,fatig:0,fatigmax:5};
game.heroes.jena.status = "";
game.heroes.jena.stats = 'Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';

var json = fs.readFileSync('save.txt','utf8');
if (json != "") {
    game = JSON.parse(json);
}

var ThrowDice = function (message,roll_res,text,type,name,count = 0,game) {
    if (text != "") {
      text += ", ";
    }
    if (count == 0) {
      count = message.content.split(name).length - 1;
    }
    while (count > 0) {
        temp_text = "";
        roll = rand();
        if (roll_saved != 0) {
          roll = roll_saved;
          roll_saved = 0;
        }
        if (game.statistic[message.author.username] == undefined) {
          game.statistic[message.author.username] = [0,0,0,0,0,0,0];
        }
        game.statistic[message.author.username][roll]++;
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
        game.heroes[type].hp += value*1;
    } else if (message.content.indexOf('урон-') != -1) {
        value = message.content.split('урон-')[1];
        value = value.split(',')[0];
        game.heroes[type].hp += value*-1;
    } else if (message.content.indexOf('урон=') != -1) {
        value = message.content.split('урон=')[1];
        value = value.split(',')[0];
        game.heroes[type].hp = value*1;
    }
    if (message.content.indexOf('усталость+') != -1) {
        value = message.content.split('усталость+')[1];
        value = value.split(',')[0];
        game.heroes[type].fatig += value*1;
    } else if (message.content.indexOf('усталость-') != -1) {
        value = message.content.split('усталость-')[1];
        value = value.split(',')[0];
        game.heroes[type].fatig += value*-1;
    } else if (message.content.indexOf('усталость=') != -1) {
        value = message.content.split('усталость=')[1];
        value = value.split(',')[0];
        game.heroes[type].fatig = value*1;
    }
    if (message.content.indexOf('эффект=') != -1) {
        value = message.content.split('эффект=')[1];
        game.heroes[type].status = value;
    }
    text = name+': повреждения: **'+game.heroes[type].hp+'/'+game.heroes[type].hpmax+'** Выносливость: **'+game.heroes[type].fatig+'/'+game.heroes[type].fatigmax+'**, '+game.heroes[type].stats;
    if (game.heroes[type].status != "") {
        text += ' Особые эффекты: ' + game.heroes[type].status;
    }

    return text;
}
var save = function(game) {
  fs.writeFile("save.txt", JSON.stringify(game), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
}

client.on("message", message => {
    var text;
    if (message.content.indexOf("!roll_saved=") != -1) {
      roll_saved = message.content.split('=')[1];
    }
    if (message.content[0]== "!") {
      text = ""
      def = 0;
      roll_res.dmg = 0;
      roll_res.dist = 0;
      roll_res.spec = 0;
      roll_res.def = 0;
      Object.keys(dices.variants).map(function(objectKey, index) {
        var value = dices.variants[objectKey];
        var regexp = new RegExp(objectKey,"ig");
        if (message.content.search(regexp) != -1) {
            count = message.content.match(regexp);
            var result = ThrowDice(message,roll_res,text,value[0],value[1], count.length,game);
            roll_res = result[1];
            text = result[0];
        }
      });
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
      if  ((message.content.indexOf('!Синдраэль') != -1 || message.content.indexOf('!синдраэль') != -1 || message.content.indexOf('! Синдраэль') != -1 || message.content.indexOf('! синдраэль') != -1 || message.content.indexOf('!Син') != -1 || message.content.indexOf('!син') != -1 || message.content.indexOf('! Син') != -1 || message.content.indexOf('! син') != -1) && message.content.indexOf('!синий') == -1) {
          text = EditHero(message,text,'sin',"Синдраэль");
      }
      if (message.content == '!статистика') {
          text="Статистика бросков:";
          Object.keys(game.statistic).map(function(objectKey, index) {
            var value = game.statistic[objectKey];
            text += "\r\n"+objectKey+", 1: **"+game.statistic[objectKey][1]+"**, 2: **"+game.statistic[objectKey][2]+"**, 3: **"+game.statistic[objectKey][3]+"**, 4: **"+game.statistic[objectKey][4]+"**, 5: **"+game.statistic[objectKey][5]+"**, 6: **"+game.statistic[objectKey][6]+"**";
          });
      }
      if (message.content == '!обнулить') {
          game.heroes.tarha = {hp:0,hpmax:10,fatig:0,fatigmax:4};
          game.heroes.tarha.status = "";
          game.heroes.tarha.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:3, Знание:4, Восприятие:2.';

          game.heroes.avrik = {hp:0,hpmax:12,fatig:0,fatigmax:4};
          game.heroes.avrik.status = "";
          game.heroes.avrik.stats = 'Скорость: 4 Защита: серый. Сила:2, Воля:4, Знание:3, Восприятие:2.';

          game.heroes.sin = {hp:0,hpmax:12,fatig:0,fatigmax:4};
          game.heroes.sin.status = "";
          game.heroes.sin.stats = 'Скорость: 4 Защита: серый. Сила:4, Воля:2, Знание:3, Восприятие:2.';

          game.heroes.jena = {hp:0,hpmax:8,fatig:0,fatigmax:5};
          game.heroes.jena.status = "";
          game.heroes.jena.stats = 'Скорость: 5 Защита: серый. Сила:2, Воля:2, Знание:3, Восприятие:4.';
          save(game.heroes);
          text = "готово!";
      }
      if (message.content == '!герои') {
          text = EditHero(message,text,'tarha',"Тарха");
          text += "\r\n"+EditHero(message,text,'avrik',"Аврик");
          text += "\r\n"+EditHero(message,text,'jena',"Джайн");
          text += "\r\n"+EditHero(message,text,'sin',"Синдраэль");
      }
      save(game);
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

var rand = function () {
  var result;
  result = [Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            Math.floor(Math.random() * (6 - 1 + 1)) + 1];
  result = result[Math.floor(Math.random() * (6 - 1 + 1))];
  return result;
}
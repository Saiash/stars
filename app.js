const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); 
const puppeteer = require('puppeteer'); 

var login = client.login("NTIwNTg4MzU2MTY2NDgzOTc4.XOGtbw.IWMf_-y2qz4oZP9I2NMml62dak4"); 
 

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
console.log(game);

game.diplomacy = {};
game.diplomacy = JSON.parse(fs.readFileSync('diplomacy.txt','utf8'));

game.usecd = {};
game.usecd = JSON.parse(fs.readFileSync('usecd.txt','utf8'));

game.planettokens = fs.readFileSync('planets.txt','utf8').split('\n');
game.spacetokens = fs.readFileSync('space.txt','utf8').split('\n');
game.actioncards = fs.readFileSync('actioncards.txt','utf8').split('!@#\n');
game.lawcards = fs.readFileSync('law.txt','utf8').split('!@#"\n');

game.cards = {};
game.cards = JSON.parse(fs.readFileSync('cards.txt','utf8'));
game.laws = {};
game.laws = JSON.parse(fs.readFileSync('laws.txt','utf8'));
game.quests = {};
game.quests = JSON.parse(fs.readFileSync('quests.txt','utf8'));
game.questscards = fs.readFileSync('questslist.txt','utf8').split('!@#');



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
      
      if (message.content.indexOf('!советники') != -1) {
          game.diplomacy[message.channel.name] = new Date(Date.now())+message.content.split("!советники\n").join("").split("!советники").join("");
          fs.writeFile("diplomacy.txt", JSON.stringify(game.diplomacy), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          var text = "Сохранено";
        }
      
      if (message.content.indexOf('!сыграть-кд') != -1) {
          game.usecd[message.channel.name] = new Date(Date.now())+message.content.split("!сыграть-кд\n").join("").split("!сыграть-кд").join("");
          fs.writeFile("usecd.txt", JSON.stringify(game.usecd), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          var text = "Сохранено";
        }
      
      if (message.content == '!кд-фаза') {
          var text = "";
            Object.keys(game.usecd).map(function(name, index) {
              text += "\n"+name+"\n"+game.usecd[name]+"\n";
            });
            game.usecd = {};
            fs.writeFile("usecd.txt", JSON.stringify(game.usecd), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
            if (text == "") {
              text = "Нет ни одного хода";
            }
        }
      
      if (message.content == '!фаза-советники') {
          var text = "";
            Object.keys(game.diplomacy).map(function(name, index) {
              text += "\n"+name+"\n"+game.diplomacy[name]+"\n";
            });
            game.diplomacy = {};
            fs.writeFile("diplomacy.txt", JSON.stringify(game.diplomacy), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
            if (text == "") {
              text = "Нет ни одного хода";
            }
        }
      
      
        if (message.content == '!фаза') {
          var text = "";
            Object.keys(game.actions).map(function(name, index) {
              text += "\n"+name+"\n"+game.actions[name]+"\n";
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
          var random = Math.floor(Math.random() * 38);
          text = game.planettokens[random];
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
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" взяли карту действий");
          }
          var count = game.actioncards.length;
          var rand = Math.floor(Math.random() * count-1);
          text = game.actioncards[rand];
          console.log(text);
          game.actioncards.splice(rand,1);
          fs.writeFile("actioncards.txt", game.actioncards.join('!@#\n'), function(err) {
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
          fs.writeFile("cards.txt", JSON.stringify(game.cards), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }
      
        if (message.content.indexOf('!добавить кд') != -1) {
          text = message.content.split("!добавить кд ").join("");
          game.cards[message.channel.name].push(text);
          fs.writeFile("cards.txt", JSON.stringify(game.cards), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }

        
        if (message.content == '!посмотреть кд') {
          var text = "";
          if (game.cards[message.channel.name] != undefined) {
          Object.keys(game.cards[message.channel.name]).map(function(name, index) {
                text +=(index+1)+". "+game.cards[message.channel.name][name]+"\n\n";
            });
            } else {
            text = "пусто";
          }
        }
      
      
        if (message.content.indexOf('!сбросить кд') != -1) {
          var text = "карта сброшена";
          var num = message.content.match(/(\d+)/ig)[0];
          game.cards[message.channel.name].splice((num-1),1);
          fs.writeFile("cards.txt", JSON.stringify(game.cards), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }
      
      
        if (message.content == '!взять закон') {
          if (message.channel.name != "техническая") {
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" взяли закон");
          }
          console.log(game.lawcards);
          var count = game.lawcards.length;
          var rand = Math.floor(Math.random() * count-1);
          text = game.lawcards[rand];
          console.log(text);
          //game.lawcards.splice(rand,1);
          fs.writeFile("law.txt", game.lawcards.join('!@#"\n'), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          if (game.laws[message.channel.name] == undefined) {
            game.laws[message.channel.name] = [];
          }
          console.log(game.laws[message.channel.name]);
          game.laws[message.channel.name].push(text);
          fs.writeFile("laws.txt", JSON.stringify(game.laws), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }
      
      if (message.content == '!взять задание') {
          if (message.channel.name != "техническая") {
            client.guilds.get('577853550517026816').channels.get('578119273642197018').send(message.channel.name+" взяли секретное задание");
          }
          var count = game.questscards.length;
          console.log(count);
          var rand = Math.floor(Math.random() * count-1);
          text = game.questscards[rand];
          game.questscards.splice(rand,1);
          fs.writeFile("questslist.txt", game.questscards.join('!@#'), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
          }); 
          if (game.quests[message.channel.name] == undefined) {
            game.quests[message.channel.name] = [];
          }
          console.log(game.quests[message.channel.name]);
          game.quests[message.channel.name].push(text);
          fs.writeFile("quests.txt", JSON.stringify(game.quests), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }
      
      if (message.content == '!посмотреть задания') {
          var text = "";
          if (game.quests[message.channel.name] != undefined) {
          Object.keys(game.quests[message.channel.name]).map(function(name, index) {
                text +=(index+1)+". "+game.quests[message.channel.name][name]+"\n\n";
            });
            } else {
            text = "пусто";
          }
        }
      
      if (message.content == '!посмотреть законы') {
          var text = "";
          if (game.laws[message.channel.name] != undefined) {
          Object.keys(game.laws[message.channel.name]).map(function(name, index) {
                text +=(index+1)+". "+game.laws[message.channel.name][name]+"\n\n";
            });
          } else {
            text = "пусто";
          }
        }
      
      
        if (message.content.indexOf('!сбросить закон') != -1) {
          var text = "карта сброшена";
          var num = message.content.match(/(\d+)/ig)[0];
          game.laws[message.channel.name].splice((num-1),1);
          fs.writeFile("laws.txt", JSON.stringify(game.laws), function(err) {
              if(err) {
                  return console.log(err);
              }
              console.log("The file was saved!");
            });
        }
      
        
        if (text != '') {
            if (text == undefined) {
              text = "неправильная команда";
              console.log(message.content);
            }
            text = text.match(/(.|\n){1,1900}/g);
            text.forEach(function(element) {
              element = element.split('$#$').join("\r\n");
              message.channel.send(element);
            });
        }
    }
})
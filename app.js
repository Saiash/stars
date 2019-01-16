const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

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

client.on("message", message => {
    if (message.content[0]== "!") {
        var text = "";
        if (message.content == '!help') {
           text = "команды: !строительство\r\n!улучшение\r\n!отряд\r\n!корабль";
        }
        if (message.content == '!отряд') {
            text = "Для рассчета стоимости отряда сообщение должно быть следующего формата: \r\n**!отряд /атака/защита/мод**";
        } else if (message.content.indexOf('!отряд') != -1) {
            var pices = message.content.split('/');
            var price = Math.round(2+pices[1]*1+pices[2]*2+pices[3]*0.7);
            text = "Стоимость: **" + price + "**";
        }
        if (message.content == '!корабль') {
            text = "Для рассчета стоимости корабля сообщение должно быть следующего формата: \r\n**!корабль /атака/защита/двигатель/мод**";
        } else if (message.content.indexOf('!корабль') != -1) {
            var pices = message.content.split('/');
            var price = Math.round(5+pices[1]*2+pices[2]*3+pices[3]*4+pices[4]*1);
            text = "Стоимость: **" + price + "**";
        }
        if (message.content == '!строительство') {
            text = "Для рассчета стоимости постройки сообщение должно быть следующего формата: \r\n**!строительство /технология/количество/мод. строительства/мод. добычи/тип**";
        } else if (message.content.indexOf('!строительство') != -1) {
            var tech = message.content.split('/')[1]*1;
            var count = message.content.split('/')[2]*1;
            var mod1 = message.content.split('/')[3]*1;
            var mod2 = message.content.split('/')[4]*1;
            var type = message.content.split('/')[5]*1;
            var price = pricecalc(tech,count,mod1,type);
            var income = incomecalc(tech,count,mod2,type);
            text = "Цена постройки: **"+price+"**";
            if (income >= 1) {
                text += "\r\nДоход: **"+ income+"**";
            }
        }
        if (message.content == '!улучшение') {
            text = "Для рассчета стоимости улучшения сообщение должно быть следующего формата: \r\n**!улучшение /технология:количество-/технология:количество-/мод. строительства/модификатор:новый модификатор/тип**\r\n!улучшение /0:0-0:0/0:0-0:0/0/0:0/1";
        } else if (message.content.indexOf('!улучшение') != -1) {
            var price = [0,0];
            var income = [0,0];
            var pices = message.content.split('/');
            pices[4] = pices[4].split(':');
            var components = [];
            price[0] = multipricecalc(pices[1],pices[3],pices[5],message);
            income[0] = multiincomcalc(pices[1],pices[4][0],pices[5],message);
            price[1] = multipricecalc(pices[2],pices[3],pices[5],message);
            income[1] = multiincomcalc(pices[2],pices[4][1],pices[5],message);
            text = "Стоимость: **" + (price[1]*1 - price[0]*1) + "**";
            text += "\r\nДоход: **+" + (income[1]*1 - income[0]*1) + "**, всего: **"+(income[1]*1)+"**";            
        }
        if (message.content.match(/!экономика/ig) != -1) {
          var values = message.content.match(/\b(\d+)\b/ig);
          var price = values[0];
          var mod = values[1];
          text = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        } 
        if (text != '') {
            message.channel.send(text);
        }
    }
})

var pricecalc = function (tech,count,mod,type) {
  var price = 0;
    if (type == 1) {
        price = Math.round((2+2.7*(tech+0.2))*Math.pow(count,1.2)*((20)/Math.pow(23,2.5))/((20- mod)/Math.pow(23-mod,2.5)));
    } else {
        price = Math.round((1+9*tech)*Math.pow(count,1.2)*((20)/Math.pow(23,2.5))/((20-mod)/Math.pow(23-mod,2.5)));
    }
    return price;
} 
var incomecalc = function (tech,count,mod,type) {
    var income = 0;
    if (type == 1) {
      income = Math.round(Math.pow((count+tech)*(0.7+Math.pow(mod,1.35)*0.07)+1,1.6+(tech)/8));
    }
    if (tech == 0 && count == 0) {
      income = 0;
    }
    return income;
}

var multipricecalc = function(string,mod,type,message) {
    string = string.split('-');
    var count = string.length - 1;
    var i = 0;
    var components = [];
    components[0] = [];
    var price = 0;
    while (i <= count) {
        components[0][i] = string[i].split(':');
        var j = 0;
        var realcount = 0;
        while (j <= i) {
            realcount += components[0][j][1]*1;
            j++;
        }
        price += Math.round(pricecalc(components[0][i][0]*1,realcount,mod*1,type*1));
        if (realcount != components[0][i][1]*1) {
            price += -pricecalc(components[0][i][0]*1,realcount-components[0][i][1]*1,mod*1,type*1);
        }
        i++;
    }
  return price;
}

var multiincomcalc = function(string,mod,type) {
    string = string.split('-');
    var count = string.length - 1;
    var i = 0;
    var components = [];
    components[0] = [];
    var income = 0;
    while (i <= count) {
        components[0][i] = string[i].split(':');
        var j = 0;
        var realcount = 0;
        while (j <= i) {
            realcount += components[0][j][1]*1;
            j++;
        }     
        income += incomecalc(components[0][i][0]*1,realcount,mod*1,type*1)*1;
        if (realcount != components[0][i][1]*1) {
            income += -incomecalc(components[0][i][0]*1,realcount-components[0][i][1]*1,mod*1,type*1)*1;
        }
        i++;
    }
  return income;
}


function throw_dice(times,edges) {
  var result = [];
  var i = 0;
  while (i < times) {
    result.push(Math.floor(Math.random() * (edges - 1 + 1)) + 1);
    i++;
  }
  return result;
}
function calc_rand_price(price) {
  var price = price;
  var result = throw_dice(8,50);
  var middle = 0;
  result = (result[0]+result[1]+result[2])/3;
  /*result.forEach(function(element) {
    if (Number.isInteger(element)) {
      middle = ;
    }
  });*/
  return Math.floor(result);
}

var result = [];
var i = 0;
var result_values = {};
  while (i < 1000) {
    result = calc_rand_price(10);
    var temp_val = result*3.5 - 80;
    if (result_values[result] != null) {
      result_values[result][temp_val] += 1/10;
    } else {
      result_values[result] = {};
      result_values[result][temp_val] = 1/10;
    }
    i++;
  } 

console.log(result_values);
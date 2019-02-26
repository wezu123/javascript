const Discord = require('discord.js');
const fs = require('fs');
const configRead = fs.readFileSync('config.json');
const configFile = 'config.json';
const config = JSON.parse(configRead);
const client = new Discord.Client();
var voice = new Array;
global.note;

client.on('ready', () => {
    global.note = client.channels.find(channel => channel.id == config.note)
    global.generalChannel = client.channels.get("343067505864212480");
    console.log(`Connected as ${client.user.tag}`)
    console.log(client.readyAt)
    console.log(`Loaded with prefix: ${config.prefix}`)
    console.log(global.note)
});

///////////////////////////////////////////////////////////////////////////////

client.on('message', (message) => {
  var generalChannel = client.channels.get("343067505864212480");

  if(message.author.bot == false && message.content.startsWith(config.prefix) == true){
    var command = message.content.split(' ');
    var action = command[0].slice(config.prefix.length);
    console.log(command)

    switch (action) {
    case 'joke':
        message.channel.send(config.joke);
      break;
      case 'help':
        message.channel.send(`**Current commands**: play, joke, mute, help \n**Current prefix**: ${config.prefix}`);
      break;
      case 'prefix':
        if(command[1] != undefined){
          config.prefix = command[1];
          message.channel.send(`**Prefix** set to ${config.prefix}.`);
          fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
        }else{
          message.channel.send('Empty paramater, parse the prefix after whitespace');
        }
      break;
      case 'voice':
        if(command[1] == "set"){
          voice = [];
          voice[0] = message.member.voiceChannel;
          console.log(voice)
        }else if(command[1] == "reset"){
          voice = [];
          console.log(voice)
        }else if(command[1] == "add"){
          if(voice.includes(message.member.voiceChannel) == false){
            voice.push(message.member.voiceChannel);
            console.log(voice[voice.length - 1].name)
          }else{
            console.log("Channel already included")
          }
        }else if(command[1] == "parent"){
          console.log(message.member.voiceChannel.parent.name)
        }else if(command[1] == "log"){
          for(let i=0;i<voice.length;i++){
            console.log(voice[i].name)
          }
        }
      break;
      case 'note':
        if(command[1] == "set"){
          config.note = message.channel.id;
          console.log(message.channel.name)
          global.note = client.channels.find(channel => channel.id == config.note)
          fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
        }
      break;
      default:
        message.channel.send(`Incorrect command, please use ${config.prefix}help for more information`);
      }
    }
});

///////////////////////////////////////////////////////////////////////////////

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(global.note !== undefined){
    console.log("Bot channel defined")
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
      if(newUserChannel.parent.id == '423153937084973057'){
        global.note.send({embed: {
            color: 0x42f456,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: (`<@${newMember.id}> has entered the channel ** ${newUserChannel} **`),
            timestamp: new Date(),
            footer: {
              //icon_url: client.user.avatarURL,
              text: "ID: " + newMember.id
            }
          }
        });
      }else{console.log("Wrong join")}
    }else if(newUserChannel !== undefined && oldUserChannel !== undefined){
      if(newUserChannel.parent.id == '423153937084973057'){
        global.note.send({embed: {
            color: 0x267fe5,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: (`<@${newMember.id}> has switched the channel to **${newUserChannel}**`),
            timestamp: new Date(),
            footer: {
              //icon_url: client.user.avatarURL,
              text: "ID: " + newMember.id
            }
          }
        });
      }else{console.log("Wrong switch")}
    } else if(newUserChannel === undefined){
      if(oldUserChannel.parent.id == '423153937084973057'){
        global.note.send({embed: {
          color: 0xe52727,
          author: {
            name: oldMember.user.tag,
            icon_url: oldMember.user.avatarURL
          },
          description: ("<@" + oldMember.id + "> has left the channel " + "**" + oldUserChannel + "**"),
          timestamp: new Date(),
          footer: {
            //icon_url: client.user.avatarURL,
            text: "ID: " + oldMember.id
          }
        }
        });
      }else{console.log("Wrong leave")}
    }
  }else{console.log("Undefined channel")}
});
//////////////////////////////////////////////////////////////////////////////




client.login(config.token)

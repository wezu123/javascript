const Discord = require('discord.js');
const fs = require('fs');
const configRead = fs.readFileSync('config.json');
const configFile = 'config.json';
const config = JSON.parse(configRead);
const client = new Discord.Client();
global.note;
global.log = new Array;
global.parentLog = new Array;

client.on('ready', () => {
    global.note = client.channels.find(channel => channel.id == config.note)
    console.log(`Connected as ${client.user.tag}`)
    console.log(client.readyAt)
    console.log(`Loaded with prefix: ${config.prefix}`)
    console.log("Note channel is " + global.note.name)
});

///////////////////////////////////////////////////////////////////////////////

client.on('message', (message) => {
  if(message.author.bot == false && message.content.startsWith(config.prefix) == true){
    var command = message.content.split(' ');
    var action = command[0].slice(config.prefix.length);
    console.log(command)

    switch (action) {
      case 'joke':
        message.channel.send(config.joke);
      break;

      case 'help':
        message.channel.send(`**Current commands**: there are a lot of em lmao i aint gonna list em all \n**Current prefix**: ${config.prefix}`);
      break;

      case 'prefix':
        if(command[1] != undefined){
          config.prefix = command[1];
          message.channel.send(`**Prefix** set to ${config.prefix}.`);
        }else{
          message.channel.send('Empty paramater, parse the prefix after whitespace');
        }
      break;

      case 'voice':
        if(command[1] == "set"){
          config.voice = [];
          config.voice[0] = message.member.voiceChannel.id;
          console.log(config.voice)
        }

        else if(command[1] == "clear"){
          config.voice = [];
          console.log(config.voice)
          message.channel.send("All voice channels succesfully cleared");
        }

        else if(command[1] == "add"){
          if(config.voice.includes(message.member.voiceChannel.id) == false){
            config.voice.push(message.member.voiceChannel.id);
            console.log(config.voice[config.voice.length - 1].name)
          }else{
            console.log("Channel already included")
          }
        }

        else if(command[1] == "log"){
          global.log = [];
          for(let i=0;config.voice.length>i;i++){
            global.log[i] = client.channels.find(channel => channel.id == config.voice[i]);
          }
          if(global.log != undefined){
            message.channel.send("List of voice channels:")
            for(let i=0;i<global.log.length;i++){
              message.channel.send("**#" + global.log[i].name + "**")
            }
          }else{message.channel.send("No voice channels defined")}
        }else{message.channel.send("Incorrect use of the command")}
      break;

      case 'note':
        if(command[1] == "set"){
          config.note = message.channel.id;
          console.log(message.channel.name)
          global.note = client.channels.find(channel => channel.id == config.note)
          global.note.send(`Notification channel for voice updates set to **#${global.note.name}**.`)
        }else{message.channel.send("Incorrect use of the command")}
      break;

      case 'parent':
        if(command[1] == 'set'){
          config.parent = [message.member.voiceChannel.parent.id];
          console.log(config.parent)
        }
        else if(command[1] == 'add'){
          if(config.parent.includes(message.member.voiceChannel.parent.id) == false){
            config.parent.push(message.member.voiceChannel.parent.id)
            message.channel.send("Category added")
          }else{console.log("Parent already exists")}
        }

        else if(command[1] == 'clear'){
          config.parent = [];
          message.channel.send("All categories succesfully cleared")
        }

        else if(command[1] == 'log'){
          global.parentLog = [];
          for(let i=0;config.parent.length>i;i++){
            global.parentLog[i] = client.channels.find(channel => channel.id == config.parent[i]);
          }
          if(global.parentLog[0] != undefined){
            message.channel.send("List of categories:")
            for(let i=0;i<global.parentLog.length;i++){
              message.channel.send("**" + global.parentLog[i].name + "**")
            }
          }else{message.channel.send("No categories defined")}
        }else{message.channel.send("Incorrect use of the command")}

      break;
      default:
        message.channel.send(`Incorrect command, please use ${config.prefix}help for more information`);
      }
      //if(JSON.stringify(config, null, 2) != JSON.parse(configRead)){
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
      //}
    }
});

///////////////////////////////////////////////////////////////////////////////

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if(global.note !== undefined){
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
      if(config.parent.includes(newUserChannel.parent.id) || config.voice.includes(newUserChannel.id)){
        global.note.send({embed: {
            color: 0x42f456,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: (`<@${newMember.id}> has entered the channel ** ${newUserChannel} **`),
            timestamp: new Date(),
            footer: {
              text: "ID: " + newMember.id
            }
          }
        });
      }//else{console.log("Wrong join")}
    }else if(newUserChannel !== undefined && oldUserChannel !== undefined){
      if(config.parent.includes(newUserChannel.parent.id) || config.voice.includes(newUserChannel.id)){
        global.note.send({embed: {
            color: 0x267fe5,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: (`<@${newMember.id}> has switched the channel to **${newUserChannel}**`),
            timestamp: new Date(),
            footer: {
              text: "ID: " + newMember.id
            }
          }
        });
      }//else{console.log("Wrong switch")}
    } else if(newUserChannel === undefined){
      if(config.parent.includes(oldUserChannel.parent.id) || config.voice.includes(oldUserChannel.id)){
        global.note.send({embed: {
          color: 0xe52727,
          author: {
            name: oldMember.user.tag,
            icon_url: oldMember.user.avatarURL
          },
          description: (`<@${oldMember.id}> has left the channel **${oldUserChannel}**`),
          timestamp: new Date(),
          footer: {
            text: "ID: " + oldMember.id
          }
        }
        });
      }//else{console.log("Wrong leave")}
    }
  }else{console.log("Undefined channel")}
});
//////////////////////////////////////////////////////////////////////////////




client.login(config.token)

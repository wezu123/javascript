const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
    var generalChannel = client.channels.get("343067505864212480");
    console.log(`Connected as ${client.user.tag}`)
    console.log(client.readyAt)
    console.log(`Loaded with prefix: ${config.prefix}`)
    start();
});

client.on('message', (message) => {
  var generalChannel = client.channels.get("343067505864212480");

  if(message.author.bot == false && message.content.indexOf(config.prefix) == 0){
    var command = message.content.split(' ');
    var action = command[0].slice(1);
    console.log(command)

    switch (action) {
      case 'play':
        message.channel.send(`Playing ` + command[1]);
      break;
      case 'joke':
        message.channel.send(config.joke);
      break;
      case 'mute':
        if(command[1] != undefined){
          message.channel.send(`User ` + command[1] + ' has been muted');
        }else{
          message.channel.send('No user chosen, no action has been made');
      }
      break;
      case 'help':
        message.channel.send(`**Current commands**: play, joke, mute, help \n**Current prefix**: ${config.prefix}`);
      break;
      case 'prefix':
        if(command[1] != undefined){
          config.prefix = command[1];
          message.channel.send(`**Prefix** set to ${config.prefix} for this session. It will change to default once the bot is restarted.`);
        }else{
          message.channel.send('Empty paramater, parse the prefix after whitespace');
        }
      break;
      default:
        message.channel.send(`Incorrect command, please use ${config.prefix}help for more information`);
      }
    }
});

function start(){
  var generalChannel = client.channels.get("343067505864212480");
  var usedChannel = client.channels.get("343067505864212480");

  if(usedChannel !== undefined){
    console.log("Bot channel defined")

    client.on('voiceStateUpdate', (oldMember, newMember) => {
      let newUserChannel = newMember.voiceChannel;
      let oldUserChannel = oldMember.voiceChannel;

      if(oldUserChannel === undefined && newUserChannel !== undefined) {
        if(newUserChannel.parent.id == '423153937084973057'){
          generalChannel.send({embed: {
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
        }else{console.log("Wrong category 0")}
      } else if(newUserChannel !== undefined && oldUserChannel !== undefined){
        if(newUserChannel.parent.id == '423153937084973057'){
          generalChannel.send({embed: {
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
        }else{console.log("Wrong category 1")}
      } else if(newUserChannel === undefined){
        if(oldUserChannel.parent.id == '423153937084973057'){
          generalChannel.send({embed: {
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
        }else{console.log("Wrong category 2")}
      }
    });
  }
}

client.login(config.token)
//I just want to know why do you look for unsecured bots on GitHub all the time.
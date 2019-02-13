const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    console.log(client.readyAt)
    var usedChannel = client.channels.get("343067505864212480");

  if(usedChannel != undefined){
    client.on('voiceStateUpdate', (oldMember, newMember) => {
      let newUserChannel = newMember.voiceChannel;
      let oldUserChannel = oldMember.voiceChannel;
      let generalChannel = client.channels.get("343067505864212480"); // Replace with known channel ID

      if(oldUserChannel === undefined && newUserChannel !== undefined) {
        generalChannel.send({embed: {
            color: 0x20cc2c,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: ("<@" + newMember.id + "> has entered the channel " + "**" + newUserChannel + "**"),
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "ID: " + newMember.id
            }
          }
        });
      } else if(newUserChannel !== undefined && oldUserChannel !== undefined){
        generalChannel.send({embed: {
            color: 0x267fe5,
            author: {
              name: newMember.user.tag,
              icon_url: newMember.user.avatarURL
            },
            description: ("<@" + newMember.id + "> has switched the channel to " + "**" + newUserChannel + "**"),
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "ID: " + newMember.id
            }
          }
        });
      } else if(newUserChannel === undefined){
          generalChannel.send({embed: {
            color: 0xe52727,
            author: {
              name: oldMember.user.tag,
              icon_url: oldMember.user.avatarURL
            },
            description: ("<@" + oldMember.id + "> has left the channel " + "**" + oldUserChannel + "**"),
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "ID: " + oldMember.id
            }
          }
        });
      }
    });
  }
})

client.login("NTQxNDI5MDQ1NTA2NzM2MTI5.Dzzj3Q.-ll0Ed65EmkJoz-U6t79KOgwTw8")

const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})



  client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;
  var generalChannel = client.channels.get("343067505864212480"); // Replace with known channel ID

  if(oldUserChannel === undefined && newUserChannel !== undefined) {
    generalChannel.send({embed: {
        color: 0x20cc2c,
        author: {
          name: newMember.displayName,
          icon_url: newMember.user.avatarURL
        },
        title: "<@!" + newMember.id + ">" + " entered the channel " + newUserChannel,
        //description: newUserChannel,
        //fields: [{
        //    name: "Fields",
        //    value: "They can have different fields with small headlines."
        //  }
        //],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "ID: " + newMember.id
      }
    }
  });
    /*generalChannel.send("Account " + newMember.displayName + " joined the voice channel by ID " + newMember.id);
    generalChannel.send("Channel joined: " + newMember.voiceChannel);*/
  } else if(newUserChannel === undefined){
    /*generalChannel.sendEmbed("Account " + oldMember.displayName + " left the voice channel by ID " + oldMember.id);
    generalChannel.sendEmbed("Channel left: " + oldMember.voiceChannel);*/
  }
})

client.login("Fuck you and your scam sites")

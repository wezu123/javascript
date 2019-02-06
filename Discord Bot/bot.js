const Discord = require('discord.js')
const client = new Discord.Client()

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

  var generalChannel = client.channels.get("343066224474849280"); // Replace with known channel ID

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    generalChannel.send("Channel entered");

  } else if(newUserChannel === undefined){

    generalChannel.send("Channel left");

  }
})

client.login("NTQxNDI5MDQ1NTA2NzM2MTI5.DzfXdA.8-5LeIfejVIzJBvhckWwaFe7WaU")

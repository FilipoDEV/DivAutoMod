const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "Mostra o ping do bot.",
  aliases: ["latencia", "latência"],
  execute(client, message, args) {
    message.channel.send("Pong! 🏓").then(msg => {
      msg.edit(`Meu ping: \`${parseInt(msg.createdAt - message.createdAt)}ms\`\nPing da api: \`${client.ws.ping}ms\``)
    })
  }
}
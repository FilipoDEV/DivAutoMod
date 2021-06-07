const Discord = require("discord.js")
const { prefix } = require("../config.json")

module.exports = {
  name: "info",
  description: "Busca informações sobre algum comando.",
  category: "utilidades",
  aliases: ["infocmd", "cmdinfo"],
  args: true,
  example: "painel",
  usage: "<nome do comando>",
  execute(client, message, args) {
    try {
      let cmd = client.commands.get(args.join(" ")) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args.join(" ")))

      let embed = new Discord.MessageEmbed()

      .setTitle("Informações do comando " + cmd.name)
      .setDescription("📜**・**" + cmd.description)
      .setColor("#008ffc")
      if (cmd.args) {
        embed.addField("🤔**・**Como usar:", `\`${prefix}${cmd.name} ${cmd.usage}\``)
        embed.addField("📚**・**Exemplo de uso:", `\`${prefix}${cmd.name} ${cmd.example}\``)
      }
      embed.addField("🔗**・**Sinônimos:", `\`${cmd.aliases.join(",")}\``)
      message.reply(embed)
    } catch (e) {
      message.reply("não consegui achar o comando que você queria D:\nTem certeza que digitou o nome do comando certo?")
      console.error(e)    
    }
  }
}
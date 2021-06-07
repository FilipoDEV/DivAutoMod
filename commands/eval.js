const Discord = require("discord.js")


module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
  description: "Executa comandos no chat.",
  cooldown: 0,
  args: true,
  example: "message",
  usage: "<código>",
  async execute(client, message, args) {
    if (!['675798738047860779'].includes(message.author.id)) {
    return message.reply(`Apenas meu densevolvedor pode usar este comando!`)
    }
    
        try {
          let util = require("util")
          let code = await eval(args.join(" "))
          code = util.inspect(code, { depth: 1 })
          message.channel.send(code, { split: true, code: "js" })
        } catch(err) {
            message.channel.send(err, { code: "js" })
        }
  }
}
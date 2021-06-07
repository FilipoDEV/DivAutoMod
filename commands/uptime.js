const Discord = require("discord.js")

module.exports = {
  name: "uptime",
  description: "Mostra a quanto tempo o bot está online.",
  aliases: ["ontime", "tempoonline"],
  execute(client, message, args) {
    let dias = 0;
    let semanas = 0;

     let uptime = '';
     let totalsegundos = (client.uptime / 1000);
     let horas = Math.floor(totalsegundos / 3600);
     totalsegundos %= 3600;
     let minutos = Math.floor(totalsegundos / 60);
     let segundos = Math.floor(totalsegundos % 60);

     if (horas > 23){
         dias = dias + 1;
         horas = 0;
     }

     if (dias == 7) {
     dias = 0;
     semanas = semanas + 1;
     }

     if (semanas > 0) {
         uptime += `${semanas} semanas, `;
     }
     
     if (minutos > 60) {
        minutos = 0;
     }
    uptime += `**${dias}d** **${horas}**h **${minutos}**m **${segundos}**s`
    
    message.channel.send(`Estou online há ${uptime}.`);
  }
}
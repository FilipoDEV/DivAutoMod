const Discord = require("discord.js")
const client = new Discord.Client()
var config = require("./config.json")
const fs = require("fs")
const fetch = require("node-fetch")

const express = require("express")
const app = express()
const axios = require("axios")
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT || 3000, () => {
  setInterval(() => {
    axios.get('https://DivAutoMod-2.iiamfilippi.repl.co')
  }, 25 * 60000)
})

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('[BOT] Estou ligado!');
});

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (message.channel.type === 'dm') return

	if (command.args && !args.length) {
		if (command.usage) {
			var embed =  new Discord.MessageEmbed()
      
                .setTitle(`Informações do comando`)
                .setDescription("📜**・**" + `${command.description}\n`)
                .addField("📑**・**Uso:", `\`${config.prefix}${command.name} ${command.usage}\``)
                .addField("✍**・**Exemplo de uso:", `\`${config.prefix}${command.name} ${command.example}\``)
                .addField("📚**・**Sinônimos:", `\`${command.aliases}\``)
                .setColor("#008ffc")		
    }

		return message.channel.send(embed);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`por favor espere \`${timeLeft.toFixed(1)}\` segundos antes de usar novamente o comando \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(`[ERRO] ${error.message}`);
		message.channel.send(`Ocorreu um erro ao usar este comando: ${error.message}`)
	}
});

client.on('messageUpdate', (oldMsg, message) => {
  	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	    const commandName = args.shift().toLowerCase();

	    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	    if (!command) return;

	    if (command.guildOnly && message.channel.type === 'dm') return

	    if (command.args && !args.length) {
		if (command.usage) {
			var embed =  new Discord.MessageEmbed()
      
                .setTitle(`Informações do comando`)
                .setDescription("📜**・**" + `${command.description}\n`)
                .addField("📑**・**Uso:", `\`${config.prefix}${command.name} ${command.usage}\``)
                .addField("✍**・**Exemplo de uso:", `\`${config.prefix}${command.name} ${command.example}\``)
                .addField("📚**・**Sinônimos:", `\`${command.aliases}\``)		
    }

		return message.channel.send(embed);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`por favor espere \`${timeLeft.toFixed(1)}\` segundos antes de usar novamente o comando \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(`[ERRO] ${error.message}`);
		message.channel.send(`Ocorreu um erro ao usar este comando: ${error.message}`)
	}
});

client.on('message', msg => {
	let moderatorChannel = client.channels.cache.get(config.moderatorChannelID)
	let canais = [
		'571815024754950166',
		'571825391963078676',
		'649735962280329224',
		'658865841231757333',
		'666442256978411547',
		'647862550356033558',
		'656856885709897749',
		'653024771277324309',
		'699315043866509352',
		'680803656467218472',
		'743502707263930447',
		'667436883957252096',
		'571822705595121695',
		'656633621200764929',
		'647859935744360458',
		'626212677814976512',
		'647859338458693632',
		'571824504003624970',
		'626198606197686286',
		'626212130869215233',
		'626212344237916161',
		'626212491256659968',
		'626212909587890182',
		'654032394386538506',
		'654032741985419264',
		'655823151460122634',
		'657008077848969216',
		'667029988339482670',
		'696226089277587466',
		'673358554589036594',
		'704849362529812500',
		'673583093877047296',
		'713834725218844762',
		'723992727200465026',
		'742147944102232205',
		'714121301203222529',
		'714121336456478831',
		'727726063827812423',
		'708693017933905951'
	];
	let links = [
		'https://youtube.com/',
		'https://twitch.tv/',
		'https://www.youtube.com/',
		'https://www.twitch.tv/',
		'https://youtu.be/',
		'https://www.youtu.be/'
	];

    var hasLink = new RegExp(links.join('|', 'g')).test(msg.content) && canais.includes(msg.channel.id) && !msg.member.roles.cache.some(x => x.name === '🙆 • Diretor')

	if (hasLink) {
		let youtube = [
			'https://youtube.com/',
			'https://youtu.be/',
			'https://www.youtube.com/',
			'https://www.youtu.be/'
		];
		let twitch = ['https://twitch.tv/', 'https://www.twitch.tv/'];

		let divulgedWrongChannel = new Discord.MessageEmbed()

			.setTitle('<:negativo:722506099869352047> **__BARREIRA__** <:negativo:722506099869352047>')
			.setDescription(`:clap: **Parabéns ${msg.author}, você acaba de divulgar no canal errado. Leia <#571833857532362763> para saber onde divulgar.**`)
			.setColor("#fa0000")
			.setImage('https://images-ext-1.discordapp.net/external/kpirw5iqvo_AVar4egiNRyWW5RpqfAxGqOZQ95sqNm8/https/images-ext-1.discordapp.net/external/Vj72bdQFfwkJ-tNEApYgWyU6juzyfTBXemIhvA4KNB4/https/media.discordapp.net/attachments/571815024754950166/710650615897784381/image_search_1583716686625-15.png')
			.setFooter('Atenciosamente equipe staff');

		setTimeout(() => {
			msg.delete()
		}, 1000)
        
        console.log("[INFO] Avisei ao usuário que ele divulgou em um canal errado.")
		
        msg.reply('_Você não pode enviar links de youtube ou twicth neste canal_', divulgedWrongChannel)
			.then(m => {
                let linkIsYoutube = new RegExp(youtube.join('|', 'g')).test(msg.content)
				let linkIsTwitch = new RegExp(twitch.join('|', 'g')).test(msg.content)
                let moderatorWarnDivulgedWrongChannel = new Discord.MessageEmbed()

					.setTitle(msg.author.tag)
					.setThumbnail(msg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
					.setColor('#1cd5ff')
					.setFooter(`Id do usuário: ${msg.author.id}`);
				if (linkIsYoutube) {
					moderatorWarnDivulgedWrongChannel.setDescription(`O \`${msg.author.username}\` acabou de **mandar um link do youtube** no canal ${msg.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${m.id}`);
				}
				if (linkIsTwitch) {
					moderatorWarnDivulgedWrongChannel.setDescription(`O \`${msg.author.username}\` acabou de **mandar um link da twitch** no canal ${msg.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${m.id}`);
				}
                
                console.log("[INFO] Avisei aos moderadores do servidor que o usuário divulgou em um canal errado.")

				moderatorChannel.send('<@&571826606851751966>', moderatorWarnDivulgedWrongChannel);
			});
	}
});

client.on('message', mes => {
	let moderatorChannel = client.channels.cache.get(config.moderatorChannelID)
	let canal = ["656633621200764929"]
	let discordInvites = [
		'https://discord.gg/',
		'https://discord.com/invite/',
		'discord.gg',
		'discord.com/invite'
	];

    let hasInvite = new RegExp(discordInvites.join('|', 'g')).test(mes.content) && canal.includes(mes.channel.id)

	if (hasInvite) {
		client.fetchInvite(mes.content).then(i => {
			fetch(`https://canary.discordapp.com/api/v6/invite/${i.code}?with_counts=true`)
				.then(res => res.json())
				.then(json => {
					if (json.approximate_member_count > 105) {
						let divulgedDiscordInviteInWrongChannel = new Discord.MessageEmbed()

							.setTitle('🚫 **__BARREIRA__** 🚫')
							.setDescription('Você não pode enviar servidores com **__mais__** de 100 membros neste canal. Fique atento no tópico do canal na próxima vez, okay?')
							.setColor('#fa0000')
							.setFooter('Atenciosamente equipe staff');
                         
                        console.log("[INFO] Avisei ao usuário que ele divulgou em um canal errado.")
						mes.delete();
						mes.reply('_Você não pode enviar servidores com mais de 100 membros neste canal_', divulgedDiscordInviteInWrongChannel)
							.then(memberMessage => {
								let moderatorWarnDivulgedWrongChannel = new Discord.MessageEmbed()
									.setTitle(mes.author.tag)
									.setThumbnail(mes.author.displayAvatarURL({ dynamic: true, format: 'png' }))
									.setDescription(`O \`${mes.author.username}\` acabou de **mandar um servidor com ${json.approximate_member_count} membros** no canal ${mes.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${memberMessage.guild.id}/${memberMessage.channel.id}/${memberMessage.id}`)
									.setColor('RED')
									.setFooter(`Id do usuário: ${mes.author.id}`);

                                console.log("[INFO] Avisei aos moderadores que o usuário divulgou em um canal errado.")
								moderatorChannel.send('<@&571826606851751966>', moderatorWarnDivulgedWrongChannel);
							});
					} else {
						return;
					}
				});
		});
	}
});

client.on('messageUpdate', (oldMsg, newMsg) => {
	let moderatorChannel = client.channels.cache.get(config.moderatorChannelID)

	let canais = [
		'571815024754950166',
		'571825391963078676',
		'649735962280329224',
		'658865841231757333',
		'666442256978411547',
		'647862550356033558',
		'656856885709897749',
		'653024771277324309',
		'699315043866509352',
		'680803656467218472',
		'743502707263930447',
		'667436883957252096',
		'571822705595121695',
		'656633621200764929',
		'647859935744360458',
		'626212677814976512',
		'647859338458693632',
		'571824504003624970',
		'626198606197686286',
		'626212130869215233',
		'626212344237916161',
		'626212491256659968',
		'626212909587890182',
		'654032394386538506',
		'654032741985419264',
		'655823151460122634',
		'657008077848969216',
		'667029988339482670',
		'696226089277587466',
		'673358554589036594',
		'704849362529812500',
		'673583093877047296',
		'713834725218844762',
		'723992727200465026',
		'742147944102232205',
		'714121301203222529',
		'714121336456478831',
		'727726063827812423',
		'708693017933905951'
	];
	let links = [
		'https://youtube.com/',
		'https://twitch.tv/',
		'https://www.youtube.com/',
		'https://www.twitch.tv/',
		'https://youtu.be/',
		'https://www.youtu.be/'
	];

    var hasLink = new RegExp(links.join('|', 'g')).test(newMsg.content) && canais.includes(newMsg.channel.id) && !newMsg.member.roles.cache.some(x => x.name === '🙆 • Diretor')
	
	if (hasLink) {
		let youtube = [
			'https://youtube.com/',
			'https://youtu.be/',
			'https://www.youtube.com/',
			'https://www.youtu.be/'
		];
		let twitch = ['https://twitch.tv/', 'https://www.twitch.tv/'];

		let divulgedWrongChannel = new Discord.MessageEmbed()

			.setTitle('<:negativo:722506099869352047> **__BARREIRA__** <:negativo:722506099869352047>')
			.setDescription(`:clap: **Parabéns ${newMsg.author}, você acaba de divulgar no canal errado. Leia <#571833857532362763> para saber onde divulgar.**`)
			.setColor("#fa0000")
			.setImage('https://images-ext-1.discordapp.net/external/kpirw5iqvo_AVar4egiNRyWW5RpqfAxGqOZQ95sqNm8/https/images-ext-1.discordapp.net/external/Vj72bdQFfwkJ-tNEApYgWyU6juzyfTBXemIhvA4KNB4/https/media.discordapp.net/attachments/571815024754950166/710650615897784381/image_search_1583716686625-15.png')
			.setFooter('Atenciosamente equipe staff');

		setTimeout(() => {
			newMsg.delete()
		}, 1000)
        
        console.log("[INFO] Avisei ao usuário que ele divulgou em um canal errado.")
		
        newMsg.reply('_Você não pode enviar links de youtube ou twicth neste canal_', divulgedWrongChannel)
			.then(m => {
                let linkIsYoutube = new RegExp(youtube.join('|', 'g')).test(newMsg.content)
				let linkIsTwitch = new RegExp(twitch.join('|', 'g')).test(newMsg.content)
                let moderatorWarnDivulgedWrongChannel = new Discord.MessageEmbed()

					.setTitle(newMsg.author.tag)
					.setThumbnail(newMsg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
					.setColor('#1cd5ff')
					.setFooter(`Id do usuário: ${newMsg.author.id}`);
				if (linkIsYoutube) {
					moderatorWarnDivulgedWrongChannel.setDescription(`O \`${newMsg.author.username}\` acabou de **mandar um link do youtube** no canal ${newMsg.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${m.id}`);
				}
				if (linkIsTwitch) {
					moderatorWarnDivulgedWrongChannel.setDescription(`O \`${newMsg.author.username}\` acabou de **mandar um link da twitch** no canal ${newMsg.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${m.guild.id}/${m.channel.id}/${m.id}`);
				}
                
                console.log("[INFO] Avisei aos moderadores do servidor que o usuário divulgou em um canal errado.")

				moderatorChannel.send('<@&571826606851751966>', moderatorWarnDivulgedWrongChannel);
			});
	}
});

client.on('messageUpdate', (oldMsg, novaMsg) => {
	let moderatorChannel = client.channels.cache.get(config.moderatorChannelID)
	let canal = ["656633621200764929"]
	let discordInvites = [
		'https://discord.gg/',
		'https://discord.com/invite/',
		'discord.gg',
		'discord.com/invite'
	];

    let hasInvite = new RegExp(discordInvites.join('|', 'g')).test(novaMsg.content) && canal.includes(novaMsg.channel.id)

	if (hasInvite) {
		client.fetchInvite(novaMsg.content).then(i => {
			fetch(`https://canary.discordapp.com/api/v6/invite/${i.code}?with_counts=true`)
				.then(res => res.json())
				.then(json => {
					if (json.approximate_member_count > 105) {

						let divulgedDiscordInviteInWrongChannel = new Discord.MessageEmbed()

							.setTitle('🚫 **__BARREIRA__** 🚫')
							.setDescription('Você não pode enviar servidores com **__mais__** de 100 membros neste canal. Fique atento no tópico do canal na próxima vez, okay?')
							.setColor('#fa0000')
							.setFooter('Atenciosamente equipe staff');
                         
                        console.log("[INFO] Avisei ao usuário que ele divulgou em um canal errado.")
						novaMsg.delete();
						novaMsg.reply('_Você não pode enviar servidores com mais de 100 membros neste canal_', divulgedDiscordInviteInWrongChannel)
							.then(memberMessage => {
								let moderatorWarnDivulgedWrongChannel = new Discord.MessageEmbed()
									.setTitle(novaMsg.author.tag)
									.setThumbnail(novaMsg.author.displayAvatarURL({ dynamic: true, format: 'png' }))
									.setDescription(`O \`${novaMsg.author.username}\` acabou de **mandar um servidor com ${json.approximate_member_count} membros** no canal ${novaMsg.channel} e vocês não fizeram nada D:\n\nLink da mensagem: https://discordapp.com/channels/${memberMessage.guild.id}/${memberMessage.channel.id}/${memberMessage.id}`)
									.setColor('#1cd5ff')
									.setFooter(`Id do usuário: ${novaMsg.author.id}`);

                                console.log("[INFO] Avisei aos moderadores que o usuário divulgou em um canal errado.")
								moderatorChannel.send('<@&571826606851751966>', moderatorWarnDivulgedWrongChannel);
							});
					} else {
						return;
					}
				});
		});
	}
});

client.on("error", e => console.log(`[ERRO] ${e.message}`))

client.login(process.env.TOKEN)
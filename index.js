const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(" ").pop() == "js")
	if(jsfile.length <= 0){
	  console.log("Couldn't find commands.");
	  return;
	}
})


const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setGame("The kings of gamings");

});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	if(cmd === `${prefix}kick`){


		let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!kUser) return message.channel.send("Couldn't find user.");
		let kReason = args.join(" ").slice(22);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no se puede hacer pal!");
		if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("El usuario a sido explusado");

		let kickEmbed = new Discord.RichEmbed()
		.setDescription("Expulsar")
		.setColor("#002CFF")
		.addField("Usuario expulsado", `${kUser} with ID ${kUser.id}`)
		.addField("Expulsado por", `<@${message.author.id}> with ID ${message.author.id}`)
		.addField("Expulsado en", message.channel)
		.addField("Hora", message.createdAt)
		.addField("Razon", kReason);

		let kickChannel = message.guild.channels.find(`name`, "baneos");
		if(!kickChannel) return message.channel.send("En el canal de los baneos");

		message.guild.member(kUser).kick(kReason);
		kickChannel.send(kickEmbed);

		return;

 }

		if(cmd === `${prefix}ban`){

			let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!bUser) return message.channel.send("Couldn't find user.");
			let bReason = args.join(" ").slice(22);
			if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("no se puede hacer pal!");
			if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("El usuario a sido baneado");

			let banEmbed = new Discord.RichEmbed()
			.setDescription("Banear")
			.setColor("#DD00FF")
			.addField("Usuario baneado", `${bUser} with ID ${bUser.id}`)
			.addField("Baneado por", `<@${message.author.id}> with ID ${message.author.id}`)
			.addField("Baneado en", message.channel)
			.addField("Hora", message.createdAt)
			.addField("Razon", bReason);

			let incidentchannel = message.guild.channels.find(`name`, "baneos");
			if(!incidentchannel) return message.channel.send("En el canal de los baneos");

			message.guild.member(bUser).ban(bReason);
			incidentchannel.send(banEmbed);

			return;

		}


	if(cmd === `${prefix}report`){

	   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		 if(!rUser) return message.channel.send("Couldn't find user.");
		 let reason = args.join(" ").slice(22);

		 let reportEmbed = new Discord.RichEmbed()
		 .setDescription("Report")
		 .setColor("#C70039")
		 .addField("Report User", `${rUser} with ID: ${rUser.id}`)
		 .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
		 .addField("Channel", message.channel)
		 .addField("Time", message.createdAt)
		 .addField("Reason", reason);

		 let reportschannel = message.guild.channels.find(`name`, "report");
		 if(!reportschannel) return message.channel.send("Ve al canal de reportes")


		 message.delete().catch(O_o=>{});
		 reportschannel.send(reportEmbed);


		 return;
	}


	if(cmd === `${prefix}serverinfo`){

     let sicon =  message.guild.iconURL;
		 let serverembed = new Discord.RichEmbed()
		 .setDescription("Informacion del server")
		 .setColor("FFE300")
		 .setThumbnail(sicon)
		 .addField("Nombre del server", message.guild.name)
		 .addField("Creado el", message.guild.createdAt)
		 .addField("Unido", message.member.joinedAt)
		 .addField("Mienbros", message.guild.menberCount);

		return message.channel.send(serverembed);
  }


	if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Zara es un bot echo especial mente para the kings of gamings que todavia esta en desarrollo")
		.setColor("#FF0000")
		.setThumbnail(bicon)
		.addField("Nombre del bot", bot.user.username);

  	return message.channel.send(botembed);
	}

});

bot.login(tokenfile.token);

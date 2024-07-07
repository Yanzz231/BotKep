// MODULE
const fs = require('fs'); // READ FILE READ FOLDER BIKIN FOLDER FILE
const path = require('path')
const { REST, Routes, MessageEmbed, Client, Events, Collection, GatewayIntentBits } = require('discord.js'); // 
const { token, owner } = require('./config.json');

// CONST
const client = new Client({
	intents: [GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,]
});

const commands = [];
client.command = new Collection();
client.queues = new Map();

fs.readdirSync("./commands").forEach((dirs) => {
	const dataGet = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith(".js"));

	for (const file of dataGet) {
		const command = require(`./commands/${dirs}/${file}`);
		commands.push(command.data)
		client.command.set(command.name, command);
	}
});


const rest = new REST().setToken(token)
const slashCommandList = async () => {
	try {
		await rest.put(Routes.applicationCommands("1234521483276193792"), { body: commands })
	} catch (error) {
		console.log(error)
	}
}
slashCommandList()

client.on("ready", readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	readyClient.user.setActivity('Buatan Agus');
});

client.on("interactionCreate", async (interaction) => {
	try {
		const isCmd = interaction.commandName
		const cmd = client.command.get(isCmd)
		if (cmd) {
			cmd.execute(interaction, client)
			console.log(`Command : ${cmd.name}`)
		}
	} catch (error) {
		console.log(error)
	}
});

// ACCESS
client.login(token);
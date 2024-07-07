const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');
const fs = require('fs'); 

module.exports = {
    name: "waifu",
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Send Image Random Waifu'),
    async execute(interaction) {
        const readData = JSON.parse(fs.readFileSync('./array/waifu.json'))[Math.floor(Math.random() * JSON.parse(fs.readFileSync('./array/waifu.json')).length)]
        const embed = new EmbedBuilder()
            .setTitle("WAIFU")
            .setImage(readData.image);
        await interaction.channel.send({ embeds: [embed] });
    },
};


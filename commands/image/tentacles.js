const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "tentacles",
    data: new SlashCommandBuilder()
        .setName('tentacles')
        .setDescription('Send Image Random Tentacles'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.tentacles()
        const embed = new EmbedBuilder()
            .setTitle("TENTACLES")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


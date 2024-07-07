const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "maid",
    data: new SlashCommandBuilder()
        .setName('maid')
        .setDescription('Send Image Random Maid'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.maid()
        const embed = new EmbedBuilder()
            .setTitle("MAID")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


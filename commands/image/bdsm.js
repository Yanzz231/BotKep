const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "bdsm",
    data: new SlashCommandBuilder()
        .setName('bdsm')
        .setDescription('Send Image Random BDSM'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.bdsm()
        const embed = new EmbedBuilder()
            .setTitle("BDSM")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


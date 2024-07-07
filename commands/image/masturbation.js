const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "masturbation",
    data: new SlashCommandBuilder()
        .setName('masturbation')
        .setDescription('Send Image Random Masturbation'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.masturbation()
        const embed = new EmbedBuilder()
            .setTitle("MASTURBATION")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


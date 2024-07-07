const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "succubus",
    data: new SlashCommandBuilder()
        .setName('succubus')
        .setDescription('Send Image Random Succubus'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.succubus()
        const embed = new EmbedBuilder()
            .setTitle("SUCCUBUS")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


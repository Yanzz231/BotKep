const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "panties",
    data: new SlashCommandBuilder()
        .setName('panties')
        .setDescription('Send Image Random Panties'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.panties()
        const embed = new EmbedBuilder()
            .setTitle("PANTIES")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


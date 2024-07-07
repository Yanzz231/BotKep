const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "gifs",
    data: new SlashCommandBuilder()
        .setName('gifs')
        .setDescription('Send Image Random GIFS'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.gifs()
        const embed = new EmbedBuilder()
            .setTitle("GIFS")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


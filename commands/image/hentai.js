const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "hentai",
    data: new SlashCommandBuilder()
        .setName('hentai')
        .setDescription('Send Image Random Hentai'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.hentai()
        const embed = new EmbedBuilder()
            .setTitle("HENTAI")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


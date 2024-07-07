const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "yuri",
    data: new SlashCommandBuilder()
        .setName('yuri')
        .setDescription('Send Image Random Yuri'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.yuri()
        const embed = new EmbedBuilder()
            .setTitle("YURI")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


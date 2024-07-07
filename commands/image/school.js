const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "school",
    data: new SlashCommandBuilder()
        .setName('school')
        .setDescription('Send Image Random School'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.school()
        const embed = new EmbedBuilder()
            .setTitle("SCHOOL")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


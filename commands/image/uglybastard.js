const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const akaneko = require('akaneko');

module.exports = {
    name: "uglybastard",
    data: new SlashCommandBuilder()
        .setName('uglybastard')
        .setDescription('Send Image Random UglyBastard'),
    async execute(interaction) {
        let walp = await akaneko.nsfw.uglybastard()
        const embed = new EmbedBuilder()
            .setTitle("UGLYBASTARD")
            .setImage(walp);
        await interaction.channel.send({ embeds: [embed] });
    },
};


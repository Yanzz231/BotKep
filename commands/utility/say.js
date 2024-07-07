const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord.js');

module.exports = {
    name: "say",
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Reply My Chat')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Enter your message')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.channel.send(input);
    },
};

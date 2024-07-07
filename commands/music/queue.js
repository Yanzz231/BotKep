const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus, createAudioResource, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search')

const queues = new Map();

module.exports = {
    name: "queue",
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('List Music'),
    async execute(interaction, client) {
        const getList = client.queues.get(interaction.guildId)
        console.log(getList)
        let textGet = '';
        if (getList && getList.length > 0) {
            for (let i = 0; i < getList.length; i++) {
                textGet += `${i + 1}. ${getList[i]}\n`;
            }
        } else {
            textGet = "None";
        }
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(`${interaction.guild.name} Music Queue`)
            .setDescription(`There are ${getList === undefined ? 0 : getList.length} tracks in the queue.`)
            .addFields(
                { name: 'Upcoming Songs', value: textGet },
            )
        await interaction.channel.send({ embeds: [embed] });
    },
};
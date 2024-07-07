const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus, createAudioResource, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const { InteractionResponseType, EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search')

module.exports = {
    name: "play",
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play Music')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Enter your music')
                .setRequired(true)),
    async execute(interaction, client) {
        const input = interaction.options.getString('input');

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply('Anda harus bergabung dengan voice channel terlebih dahulu!');
        }

        let queue = client.queues.get(interaction.guildId);
        if (!queue) {
            queue = [];
            client.queues.set(interaction.guildId, queue);
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        if (!ytdl.validateURL(input)) {
            const ytsearch = await yts(input)
            const stream = ytdl(ytsearch.all[0].url, { filter: 'audioonly' });
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();
            if (queue.length > 0) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: ytsearch.all[0].author.name, iconURL: ytsearch.all[0].image })
                    .setTitle(ytsearch.all[0].title)
                    .addFields(
                        { name: 'Time', value: ytsearch.all[0].timestamp },
                    )
                    .setThumbnail(ytsearch.all[0].image)
                await interaction.channel.send({ embeds: [embed] });

                player.on(AudioPlayerStatus.Idle, () => {
                    if (queue.length > 0) {
                        PlayNext(input, connection, interaction, client);
                    } else {
                        connection.destroy();
                        interaction.channel.send('Musik selesai diputar!');
                    }
                });
                queue.push(ytsearch.all[0].title)
            } else {
                player.play(resource);
                connection.subscribe(player);

                const embed = new EmbedBuilder()
                    .setAuthor({ name: ytsearch.all[0].author.name, iconURL: ytsearch.all[0].image })
                    .setTitle(ytsearch.all[0].title)
                    .addFields(
                        { name: 'Time', value: ytsearch.all[0].timestamp },
                    )
                    .setThumbnail(ytsearch.all[0].image)
                await interaction.channel.send({ embeds: [embed] });

                player.on(AudioPlayerStatus.Idle, () => {
                    if (queue.length > 0) {
                        queue.shift();
                        PlayNext(input, connection, interaction, client);
                    } else {
                        connection.destroy();
                        interaction.channel.send('Musik selesai diputar!');
                    }
                });
                queue.push(ytsearch.all[0].title);
            }
        } else {
            const ytsearch = await yts(input)
            const stream = ytdl(input, { filter: 'audioonly' });
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();
            if (queue.length > 0) {
                queue.push(input)
                const embed = new EmbedBuilder()
                    .setAuthor({ name: ytsearch.all[0].author.name, iconURL: ytsearch.all[0].image })
                    .setTitle(ytsearch.all[0].title)
                    .addFields(
                        { name: 'Time', value: ytsearch.all[0].timestamp },
                    )
                    .setThumbnail(ytsearch.all[0].image)
                await interaction.channel.send({ embeds: [embed] });

                player.on(AudioPlayerStatus.Idle, () => {
                    if (queue.length > 0) {
                        queue.shift();
                        PlayNext(input, connection, interaction, client);
                    } else {
                        connection.destroy();
                        interaction.channel.send('Musik selesai diputar!');
                    }
                });
                queue.push(ytsearch.all[0].title);
            } else {
                player.play(resource);
                connection.subscribe(player);

                const embed = new EmbedBuilder()
                    .setAuthor({ name: ytsearch.all[0].author.name, iconURL: ytsearch.all[0].image })
                    .setTitle(ytsearch.all[0].title)
                    .addFields(
                        { name: 'Time', value: ytsearch.all[0].timestamp },
                    )
                    .setThumbnail(ytsearch.all[0].image)
                await interaction.channel.send({ embeds: [embed] });

                player.on(AudioPlayerStatus.Idle, () => {
                    if (queue.length > 0) {
                        queue.shift();
                        PlayNext(input, connection, interaction, client);
                    } else {
                        connection.destroy();
                        interaction.channel.send('Musik selesai diputar!');
                    }
                });
                queue.push(ytsearch.all[0].title);
            }
        }
    },
};

async function PlayNext(input, connection, interaction, client) {
    const queue = client.queues.get(interaction.guildId);
    const nextSong = queue.shift();
    const ytsearch = await yts(nextSong)
    const stream = ytdl(ytsearch.all[0].url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
        if (queue.length > 0) {
            PlayNext(input, connection, interaction);
        } else {
            connection.destroy();
            interaction.channel.send('Musik selesai diputar!');
        }
    });
}

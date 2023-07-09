import {Bot, InputFile} from "grammy";
import dotenv from "dotenv";
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

dotenv.config();

const outputDir = 'output';

// Check if the output directory exists or create a new one
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// @ts-ignore
const bot = new Bot(process.env.TOKEN);


bot.command('start', (ctx) => {
    ctx.reply('Hi! I am a bot that converts audio files into voice messages. Just send me an audio file, you can also add a caption for it.');
});

bot.on('message', async (ctx) => {
    if (!ctx.message.audio) {
        ctx.reply('The message should contain an audio file.');
    } else {
        const audio = ctx.message.audio;
        const caption = ctx.message.caption || '';

        ctx.reply('Received an audio file. Processing...');

        try {
            // Get file information
            const file = await ctx.api.getFile(audio.file_id);

            if (file.file_path) {
                const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;

                const outputPath = `output/${audio.file_id}.oga`;

                // Convert the audio file to a voice message
                await new Promise<void>((resolve, reject) => {
                    ffmpeg(fileUrl)
                        .audioCodec('libopus')
                        .audioBitrate('128k')
                        .toFormat('oga')
                        .on('end', () => resolve())
                        .on('error', (error) => reject(error))
                        .save(outputPath);
                });

                // Send the voice message with the caption back to the user
                await ctx.replyWithVoice(new InputFile(outputPath), {caption});


                //@ts-ignore
                fs.unlink(outputPath, (error) => {
                    if (error) {
                        console.error('An error occurred while deleting the file:', error);
                    } else {
                        console.log('File successfully deleted.');
                    }
                });
            } else {
                throw new Error('Failed to get the file path.');
            }
        } catch (error) {
            console.error('An error occurred during audio file conversion:', error);
            ctx.reply('An error occurred during audio file conversion. Please try again.');
        }
    }
});

bot.start();
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
dotenv_1.default.config();
const outputDir = 'output';
// Check if the output directory exists or create a new one
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
// @ts-ignore
const bot = new grammy_1.Bot(process.env.TOKEN);
bot.command('start', (ctx) => {
    ctx.reply('Hi! I am a bot that converts audio files into voice messages. Just send me an audio file, you can also add a caption for it.');
});
bot.on('message', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.message.audio) {
        ctx.reply('The message should contain an audio file.');
    }
    else {
        const audio = ctx.message.audio;
        const caption = ctx.message.caption || '';
        ctx.reply('Received an audio file. Processing...');
        try {
            // Get file information
            const file = yield ctx.api.getFile(audio.file_id);
            if (file.file_path) {
                const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
                const outputPath = `output/${audio.file_id}.oga`;
                // Convert the audio file to a voice message
                yield new Promise((resolve, reject) => {
                    (0, fluent_ffmpeg_1.default)(fileUrl)
                        .toFormat('oga')
                        .on('end', () => resolve())
                        .on('error', (error) => reject(error))
                        .save(outputPath);
                });
                // Send the voice message with the caption back to the user
                yield ctx.replyWithVoice(new grammy_1.InputFile(outputPath), { caption });
                //@ts-ignore
                fs_1.default.unlink(outputPath, (error) => {
                    if (error) {
                        console.error('An error occurred while deleting the file:', error);
                    }
                    else {
                        console.log('File successfully deleted.');
                    }
                });
            }
            else {
                throw new Error('Failed to get the file path.');
            }
        }
        catch (error) {
            console.error('An error occurred during audio file conversion:', error);
            ctx.reply('An error occurred during audio file conversion. Please try again.');
        }
    }
}));
bot.start();

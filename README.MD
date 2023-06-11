# Audio To Voice Converter Telegram Bot

This is a Telegram bot built with TypeScript and the `grammy` library that converts audio files into voice messages. The bot allows users to send an audio file and add a caption, and it will convert the audio file into a voice message with the provided caption. The converted voice message will be sent back to the user.

## Features

- Converts audio files into voice messages
- Supports various audio formats
- Allows adding a caption to the converted voice message
- Automatic deletion of local files after conversion

## Prerequisites

- Node.js and npm installed on your machine
- Telegram Bot Token (You can obtain it by creating a new bot on [Telegram's BotFather](https://t.me/BotFather))
- FFmpeg (A command-line tool for handling multimedia data)

## Getting Started

1. **Clone this repository:**
  
   ```bash
   git clone https://github.com/your-username/audio-to-voice-converter-bot.git

2. **Install dependencies:**
  
   ```bash
   cd audio-to-voice-converter-bot
   npm install
   
3. **Install FFmpeg:**

   Make sure FFmpeg is installed and available in your system's PATH. You can download FFmpeg from the official website: [FFmpeg Download](https://ffmpeg.org/download.html)

   Follow the installation instructions specific to your operating system. Once FFmpeg is installed, you should be able to access it from the command line by running the `ffmpeg` command.
   
4. **Create a `.env` File:**

   Create a `.env` file in the root directory of the project. This file will store your Telegram bot token. Open the `.env` file and add the following line:<br>
   `TOKEN=your-telegram-bot-token`
   
5. **Start the bot:**

   ```bash
   npm start
   
6. Start a conversation with your bot on Telegram and send an audio file to convert it into a voice message.
   
## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify and customize the bot according to your needs. You can use this project as a starting point for your own Telegram bots or enhance it further. Contributions are also welcome. Please review the [License](LICENSE) file for more details.
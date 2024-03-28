const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const token = require("./token.js");

const client = new Client();
const API_KEY = 'QerEdX953-NOT-REAL-hdvgx7UPs';
const prefix = '!';

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'news') {
    try {
      const response = await fetch(
        `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${API_KEY}`,
      );
      const data = await response.json();

      if (data.results.length === 0) {
        return message.channel.send('There are no top stories for you today 🙊');
      }

      const embed = new MessageEmbed();
      // you could also get the number of stories from args[0]
      const MAX_STORIES = 3;

      data.results.slice(0, MAX_STORIES).forEach((result) => {
        embed.setTitle(result.title);
        embed.setDescription(result.abstract);
        embed.setURL(result.url);
        embed.setTimestamp(result.published_date);

        if (result.multimedia.length && result.multimedia[2]) {
          embed.setThumbnail(result.multimedia[2].url);
        }

        message.channel.send(embed);
      });
    } catch (error) {
      message.channel.send('Oops, there was an error fetching the API');
      console.log(error);
    }
  }
});
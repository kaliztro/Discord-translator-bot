const TOKEN = 'NzUxMTYzMzI5NjQwMzk4ODg5.GfHeTG.Ur3fAh8abV8lFuoSVJzUTYeIOM4Jc94-bCrPjk'
const CLIENT_ID = '751163329640398889'


const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(TOKEN);


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'personagem') {
        let data = tradutor()
        console.log(JSON.stringify(data))
        await interaction.reply(`Personagem: 1`);
    }
});


const commands = [
    // {
    //     name: 'ping',
    //     description: 'Replies with Pong!',
    // },
    {
        name: 'personagem',
        description: 'envia um personagem de star wars!',
    },
];

client.login(TOKEN);


const axios = require('axios');

async function tradutorrr() {
    const response = await fetch(
        `https://swapi.dev/api/people/10/`,
    );
    return await response.json();
}

async function tradutor() {
    const response = await axios.get('https://swapi.dev/api/people/10/');
    const data = await response.data; 

    // Aqui você pode manipular os dados da API conforme necessário e enviar uma resposta para o Discord
   return data
}
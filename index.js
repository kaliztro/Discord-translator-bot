const TOKEN = 'NzUxMTYzMzI5NjQwMzk4ODg5.GfHeTG.Ur3fAh8abV8lFuoSVJzUTYeIOM4Jc94-bCrPjk'
const CLIENT_ID = '751163329640398889'
const apiKey = 'AIzaSyASlKw2gWcPU77eSGI6mwKGGyS5TE2GPJQ'


const { Client, GatewayIntentBits, REST, Routes, EmbedBuilder } = require('discord.js');
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

        const numero = interaction.options.getInteger(`numero`);

        try {
            const response = await fetch(`https://swapi.dev/api/people/${numero}`);
            const data = await response.json();

            if (data.detail === 'Not found') {
                return interaction.reply({ content: 'Não existe nenhum personagem atribuido a esse número, por favor tente números menores.', ephemeral: true })
            } else {
                interaction.reply({ content: `O personagem é: ${data.name}`, ephemeral: false });
            }

        } catch (error) {
            interaction.reply('Oops, houve um erro ao buscar a API.');
            console.error(error);
        }
    }


    if (interaction.commandName === 'traduzir') {

        const texto = interaction.options.getString('texto');
        const target = interaction.options.getString('traduzir_para');
        const source = interaction.options.getString('traduzir_do');
        const traduzirPara = target ? target : 'pt-br';
        const tradizirDo = source ? source : 'en';

        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
                method: 'POST',
                body: JSON.stringify({
                    "q": `${texto}`,
                    "source": `${tradizirDo}`,
                    "target": `${traduzirPara}`,
                    "format": "text"
                }),
                headers: {
                    'Content-Type': 'application/json' 
                }
            });

            if (response.ok) {
                const data = await response.json();
                const translatedText = data.data.translations[0].translatedText;

                const embed = new EmbedBuilder()
                // .setTitle('Tradução')
                .addFields({ name: '**Textro à ser traduzido**', value: texto, inline: false })
                .addFields({ name: '**Texto traduzido**', value: translatedText, inline: false })
                .setColor("#FFF300")
                // .setTimestamp()
        
                interaction.reply({embeds: [embed]});
            }

        } catch (error) {
            interaction.reply('Oops, houve um erro ao buscar a API.');
            console.error(error);
        }
    }

});




const commands = [
    // {
    //     name: 'ping',
    //     description: 'Replies with Pong!!',
    // },
    {
        name: 'personagem',
        description: 'envia um personagem de star wars!',
        options: [
            {
                name: "numero",
                description: "Digite um número e será retornado um personagem",
                type: 4,
                required: true
            }
        ]
    },
    {
        name: 'traduzir',
        description: 'Traduz para o português o texto digitado.',
        options: [
            {
                name: "texto",
                description: "Digite o texto à ser traduzido",
                type: 3,
                required: true
            },
            {
                name: "traduzir_para",
                description: "Digite para qual lingua deseja traduzir",
                type: 3,
                required: false
            },
            {
                name: "traduzir_do",
                description: "Digite de qual lingua sera traduzida",
                type: 3,
                required: false
            }
        ]
    },
];

client.login(TOKEN);

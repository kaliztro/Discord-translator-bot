import { ApplicationCommandType, EmbedBuilder } from "discord.js";

export const Slash = {
    name: "falar",
    description: "Bot fala o que for escrito.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: `canal`,
            type: 7,
            description: `Canal onde a mensagem será enviada.`,
            required: true
        },
        {
            name: `mensagem`,
            type: 3,
            description: `A mensagem que será enviada no canal.`,
            required: true
        },
       {
            name: `embed`,
            description: `Mensagem com ou sem embed?`,
            type: 5,
            required: true
       },
    ],

    run: async (interaction, client) => {

        const canal = interaction.options.getChannel(`canal`);
     
        if (![0, 5].includes(canal.type)) return interaction.reply({ content: `Não consegui falar nada. vc informou um canal de texto válido? \n  Lembrando que só posso falar em canais de texto comum e em canais de anúncio. 📢`, ephemeral: true });

        const texto = interaction.options.getString(`mensagem`);

        const boolean = interaction.options.getBoolean(`embed`);

        if (boolean === true){
            const embed = new EmbedBuilder()
            .setDescription(texto)
            .setColor("#3086c9")
            canal.send({embeds: [embed]})
            .then(() => interaction.reply({ content: `Mensagem com embed enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true }))
            .catch(() => interaction.reply({ content: `Deu erro aqui! eu não consegui enviar a mensagem.😖`, ephemeral: true }))
        } else {
            canal.send({ content: texto })
            .then(() => interaction.reply({ content: `Mensagem enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true }))
            .catch(() => interaction.reply({ content: `Deu erro aqui! eu não consegui enviar a mensagem.😖`, ephemeral: true }))
        }
    },
};
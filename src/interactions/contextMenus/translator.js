import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { startTyping } from '../../utils/functions.js';
import TRANSLATOR_TOKEN from '../../config.js';

export const Context = {
    name: "traduzir",
    type: ApplicationCommandType.Message,
    run: async (interaction) => {

        const texto = interaction.targetMessage;
        // const target = interaction.options.getString('traduzir_para');
        // const traduzirPara = target ? target : 'pt-br';
        const traduzirPara = 'pt-br';   //TODO adicionar a opção para traduzir a mensagem para outro idioma

        const regiao = {
            [`en`]: `:flag_us: EUA`,
            [`de`]: `:flag_de: Deutsch `,
            [`es`]: `:flag_es: Español `,
            [`fr`]: `:flag_fr: Français `,
            [`hr`]: `:flag_hr: Hrvatski `,
            [`it`]: `:flag_it: Italiano `,
            [`pl`]: `:flag_pl: Polski `,
            [`ro`]: `:flag_ro: Româna `,
            [`vi`]: `:flag_vi: Tieng Viet `,
            [`cs`]: `:flag_cz: Cestina `,
            [`pt-br`]: `:flag_br: Brasil `,
            [`da`]: `:flag_dk: Dansk `,
            [`lt`]: `:flag_lt: lietuviskai `,
            [`hu`]: `:flag_hu: Magyar `,
            [`nl`]: `:flag_nl: Nederlands `,
            [`no`]: `:flag_no: Norsk `,
            [`fi`]: `:flag_fi: Suomi `,
            [`sv-SE`]: `:flag_se: Svenska `,
            [`tr`]: `:flag_tr: Turkçe `,
            [`el`]: `:flag_gr: Ελληνικά `,
            [`bg`]: `:flag_bg: български `,
            [`ru`]: `:flag_ru: Русский `,
            [`uk`]: `:flag_ua: Украïнська `,
            [`hi`]: `:flag_in: हिंदी `,
            [`th`]: `:flag_th: ไทย `,
            [`zh-CN`]: `:flag_cn: 中文 `,
            [`ja`]: `:flag_jp: 日本語 `,
            [`zh-TW`]: `:flag_tw: 繁體 中文 `,
            [`ko`]: `:flag_kr: 한국어 `,
        };


        try {
            // Detectar o idioma do texto
            const detectResponse = await fetch(`https://translation.googleapis.com/language/translate/v2/detect?key=${TRANSLATOR_TOKEN}`, {
                method: 'POST',
                body: JSON.stringify({
                    "q": `${texto}`
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!detectResponse.ok) {
                const detectError = await detectResponse.json();
                throw new Error(`Erro ao detectar idioma: ${JSON.stringify(detectError)}`);
            }

            const detectData = await detectResponse.json();
            const detectedSourceLanguage = detectData.data.detections[0][0].language;

            // Traduzir o texto
            const translateResponse = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATOR_TOKEN}`, {
                method: 'POST',
                body: JSON.stringify({
                    "q": `${texto}`,
                    "source": `${detectedSourceLanguage}`,
                    "target": `${traduzirPara}`,
                    "format": "text"
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!translateResponse.ok) {
                const translateError = await translateResponse.json();
                throw new Error(`Erro ao traduzir o texto: ${JSON.stringify(translateError)}`);
            }

            const translateData = await translateResponse.json();
            const translatedText = translateData.data.translations[0].translatedText;

            const idioma = regiao[detectedSourceLanguage] ? regiao[detectedSourceLanguage] : detectedSourceLanguage;
            // Criar e enviar a resposta
            const embed = new EmbedBuilder()
                .addFields({ name: '**Texto original**', value: texto.toString(), inline: false })
                .addFields({ name: '**Texto traduzido**', value: translatedText.toString(), inline: false })
                .addFields({ name: '**Idioma detectado**', value: idioma.toString(), inline: false })
                .setColor("#FFF300");

            startTyping(interaction.channel);

            setTimeout(async () => {
                await interaction.reply({ embeds: [embed] });
            }, 2000);

        } catch (error) {
            interaction.reply({ content: 'Oops, houve um erro ao buscar a API.', ephemeral: true });
            console.error(error);
        }

    }
}; 
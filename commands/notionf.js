const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("notionf")
        .setDescription("Entrega la plantilla de Notion (solo para el usuario autorizado)"),

    async execute(interaction) {
        const allowedUserID = "1057306102326370314"; // ID del usuario autorizado

        if (interaction.user.id !== allowedUserID) {
            return interaction.reply({ content: "❌ No tienes permiso para usar este comando.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle("🎉 ¡Gracias por tu compra!")
            .setDescription(`Aquí tienes acceso a la plantilla de Notion y al juego de cartas digital. ¡Disfrútalos!  

            📥 **Enlace de descarga:** [Gamify Your Life](https://confusion-drain-6ec.notion.site/Gamify-Your-Life-1ae6fadb81818040ab90d1b13258cbe6)  
            🎴 **Juego de cartas:** [Evolution Card Deck](https://www.figma.com/community/file/1481370663537477788)  

            ⚠️ **IMPORTANTE:**  
            Como esta información es **confidencial**, si es filtrada, recibirás un **ban permanente sin posibilidad de apelación**.  

            💬 **Si te ha gustado el producto, deja tu opinión en <#1353751681304625223>!**`)
            .setColor("#FFD700"); // Color dorado para destacar

        await interaction.reply({ embeds: [embed] });
    }
};

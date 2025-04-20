const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("habit")
        .setDescription("Muestra el habit tracker del mes."),
    async execute(interaction) {
        // Embed que verán todos en el canal
        const embed = new EmbedBuilder()
            .setTitle("📅 Habit Tracker del Mes")
            .setDescription("Este es tu habit tracker del mes. ¡Sigue tus hábitos y alcanza tus metas! ✅\n\n")
            .setImage("https://media.discordapp.net/attachments/1353738429577433129/1353743897595088948/image.png?ex=67e2c3c0&is=67e17240&hm=f6093496f89d5ee1265a2f86ca0716b2afbf35d5365b927ad4945393ab260001&=&format=webp&quality=lossless") // Reemplaza con la imagen real
            .setColor("Red")
            .setFooter({ text: "Legacy Club", iconURL: "https://media.discordapp.net/attachments/1353738429577433129/1353742745193414736/Legacy_Club_1.png?ex=67e2c2ad&is=67e1712d&hm=777fc6a35d414cec054f7abb89e3fb6515fccae45bad92f52e10b0541a27eb14&=&format=webp&quality=lossless" }); // Opcional

        await interaction.reply({ embeds: [embed] });
    }
};

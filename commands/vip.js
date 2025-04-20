const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vip")
        .setDescription("Muestra los requisitos para obtener el rol VIP (solo para el usuario autorizado)"),

    async execute(interaction) {
        const allowedUserID = "1057306102326370314"; // ID del usuario autorizado

        if (interaction.user.id !== allowedUserID) {
            return interaction.reply({ content: "❌ No tienes permiso para usar este comando.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle("🌟 Requisitos para obtener el rol VIP")
            .setDescription(`
            Para obtener el rol VIP en nuestro servidor, tienes dos opciones:

            1️⃣ **Invitar a 15 personas** al servidor (ni alts ni bots).
            2️⃣ **O realizar un pago de 5€, 8€ o 10€** para acceder a los siguientes beneficios:

            💳 **Pago de 5€**:
            - Acceso a contenido exclusivo básico.

            💳 **Pago de 8€**:
            - Acceso a contenido exclusivo avanzado y más herramientas.

            💳 **Pago de 10€**:
            - Acceso completo a todo el contenido exclusivo y soporte prioritario.

            ⚠️ Ten en cuenta que el pago debe realizarse de forma oficial y segura. Si tienes dudas, contacta con el administrador.

            ¡No pierdas la oportunidad de ser VIP! 🎉
            `)
            .setColor("#FFD700") // Color dorado para resaltar
            .setFooter({ text: "¡Gracias por ser parte de nuestra comunidad!" });

        await interaction.reply({ embeds: [embed] });
    }
};

const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    PermissionsBitField 
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("notion")
        .setDescription("Muestra una plantilla de Notion y permite crear un canal privado."),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("🚀 ¿Quieres esta plantilla de Notion?")
            .setDescription(`Imagina una herramienta que te motive a mejorar cada día como si fuera un juego. Esta plantilla y baraja de cartas con retos está diseñada para ayudarte a salir de tu zona de confort, aumentar tu productividad y transformar tu vida con un sistema único de progreso.

            **¿Qué incluye?**  
            - 📚 Tutorial Completo (+15 min) para empezar al instante  
            - 🎴 Evolution Card Deck (25 cartas digitales con retos diarios)  
            - 📊 Gráfica de evolución (automática y sincronizada)  
            - 🏆 Sistema de XP para medir tu progreso real  
            - ✅ Seguimiento de hábitos y gestor de tareas  
            - 🚀 Análisis de limitaciones para eliminar bloqueos  
            - 🎯 Final Boss (desafíos para llevarte al siguiente nivel)  
            - 🔥 DeepWork Manager para máxima productividad  
            - ✍️ Sección de journaling, metas y mantras  
            - 📌 Gestión de proyectos  

            **Todo esto por el precio de un menú en McDonald's, pero con beneficios mucho más valiosos.**  

            💰 *Precio especial por tiempo limitado. No sé cuánto durará, así que no pierdas esta oportunidad.*  

            📈 **Empieza ahora y juega a ganar en la vida.**`)
            .setColor("#000000")
            .setImage("https://cdn.beacons.ai/user_content/8qaMEzKVW1gvrHjhPwzRMX56Q5J3/referenced_images/6294fe24-e394-4e37-b4c1-c8c25a3a6819__store__product-image__202cf6ac-a799-406f-9f72-8f62f6d8df8b__4d601e89-6e06-4478-8d31-11bce0a0325b.png?t=1742661968297");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("crear_canal_notion")
                    .setLabel("📂 Crear ticket de Compra")
                    .setStyle(ButtonStyle.Primary)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};

// Manejo del botón
module.exports.handleButtonInteraction = async (interaction) => {
    if (interaction.customId === "crear_canal_notion") {
        try {
            const categoryID = "1353745350913163335"; // ID de la categoría donde se crea el canal
            const userID = interaction.user.id; // Usuario que presionó el botón
            const allowedUserID = "1057306102326370314"; // Usuario adicional con acceso (Fundador)

            // Verificar si la categoría existe
            const category = interaction.guild.channels.cache.get(categoryID);
            if (!category) {
                return interaction.reply({ content: "❌ La categoría especificada no existe. Contacta con un administrador.", ephemeral: true });
            }

            // Crear el canal
            const channel = await interaction.guild.channels.create({
                name: `notion-${interaction.user.username}`,
                type: 0, // Canal de texto
                parent: categoryID, // Categoría donde se creará el canal
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone, // Bloquear para todos
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: userID, // Permitir acceso al usuario que presionó el botón
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: allowedUserID, // Permitir acceso al usuario con ID fijo (Fundador)
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: interaction.client.user.id, // Permisos para el bot
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.ManageChannels,
                            PermissionsBitField.Flags.SendMessages
                        ]
                    }
                ]
            });

            // Mensaje en el canal creado mencionando a los usuarios
            await channel.send(`👋 ¡Hola <@${userID}>! Bienvenido a tu ticket de compra de la plantilla de notion!.  
            <@${allowedUserID}> te responderá lo más rápido posible. 🚀`);

            await interaction.reply({ content: `✅ Ticket Creado: ${channel}`, ephemeral: true });
        } catch (error) {
            console.error("❌ Error al crear el ticket:", error);
            await interaction.reply({ content: "❌ Hubo un error al crear el canal. Inténtalo de nuevo o contacta con un administrador.", ephemeral: true });
        }
    }
};

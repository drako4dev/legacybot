const { Client, GatewayIntentBits, ActivityType, REST, Routes } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

// Importa la función que maneja la interacción con los botones
const { mostrarLibro } = require("./commands/biblioteca");
const { handleButtonInteraction: handleNotionButton } = require("./commands/notion");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Cargar comandos Slash y normales
client.slashCommands = new Map();
client.commands = new Map();
const commands = [];
const commandsPath = path.join(__dirname, "commands");

fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith(".js")) {
        const command = require(path.join(commandsPath, file));

        // Si es un comando Slash (tiene "data" y "execute")
        if (command.data && command.data.name && command.execute) {
            client.slashCommands.set(command.data.name, command);
            commands.push(command.data.toJSON()); // Guardar para registrar en Discord
        }
        // Si es un comando normal
        else if (command.name && command.execute) {
            client.commands.set(command.name, command);
        }
        else {
            console.log(`❌ El comando ${file} no está bien definido.`);
        }
    }
});

// Evento cuando el bot está listo
client.once("ready", async () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // Establecer presencia del bot
    client.user.setPresence({
        activities: [{ name: "Legacy Club | La Mejor Comunidad", type: ActivityType.Playing }],
        status: "dnd"
    });

    // Registrar comandos Slash en Discord
    const rest = new REST({ version: '10' }).setToken(config.token);
    try {
        console.log('📌 Registrando comandos Slash...');
        await rest.put(Routes.applicationGuildCommands(config.clientID, config.guildID), { body: commands });
        console.log('✅ Comandos Slash registrados correctamente.');
    } catch (error) {
        console.error('❌ Error al registrar los comandos Slash:', error);
    }
});

// Evento para manejar interacciones
client.on("interactionCreate", async (interaction) => {
    try {
        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction);
        } 
        // Manejo de botones
        else if (interaction.isButton()) {
            if (interaction.customId === "crear_canal_notion") {
                await handleNotionButton(interaction);
            } else if (interaction.customId === "ver_libros") {
                // Si el botón es "Ver libros", mostramos el primer libro solo para el usuario
                await mostrarLibro(interaction, 0);
            } else if (interaction.customId.startsWith("libro_")) {
                // Si el customId es "libro_X", manejar la navegación
                const index = parseInt(interaction.customId.split("_")[1]);
                await mostrarLibro(interaction, index);
            }
        }
    } catch (error) {
        console.error("❌ Error en la interacción:", error);
        if (!interaction.replied) {
            await interaction.reply({ content: "❌ Hubo un error al procesar tu solicitud.", ephemeral: true });
        }
    }
});

// Iniciar el bot con el token
client.login(config.token);

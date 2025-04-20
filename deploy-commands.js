const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

// Crea los comandos Slash
const commands = [
    new SlashCommandBuilder().setName('vc').setDescription('Se conecta a un canal de voz y reproduce música 24/7'),
]
    .map(command => command.toJSON());

// Crear la instancia del cliente REST
const rest = new REST({ version: '9' }).setToken(config.token);

// Registrar los comandos en Discord
(async () => {
    try {
        console.log('✅ Comenzando la actualización de los comandos Slash...');

        await rest.put(
            Routes.applicationCommands(config.clientId), // Usa el clientId de tu bot
            { body: commands },
        );

        console.log('✅ Comandos Slash registrados exitosamente.');
    } catch (error) {
        console.error('❌ Error al registrar los comandos:', error);
    }
})();

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

// Lista de libros (puedes agregar más libros aquí)
const libros = [
    { titulo: "Libro 1", portada: "https://via.placeholder.com/300", enlace: "https://example.com/libro1.pdf" },
    { titulo: "Libro 2", portada: "https://via.placeholder.com/300", enlace: "https://example.com/libro2.pdf" },
    { titulo: "Libro 3", portada: "https://via.placeholder.com/300", enlace: "https://example.com/libro3.pdf" }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("biblioteca")
        .setDescription("Muestra la biblioteca de libros y te permite verlos, descargar y navegar."),
    async execute(interaction) {
        // Crear el embed inicial
        const embed = new EmbedBuilder()
            .setTitle("<:book:1353478673520656546> Biblioteca")
            .setDescription("Haz clic en 'Ver libros' para comenzar a explorar.")
            .setColor("Blue");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ver_libros")
                    .setLabel("Ver libros")
                    .setStyle(ButtonStyle.Primary)
            );

        // Responder con el embed y los botones (visible para todos)
        await interaction.reply({ embeds: [embed], components: [row] });
    }
};

async function mostrarLibro(interaction, index) {
    const libros = [
        { titulo: "Las 48 Leyes del Poder", portada: "https://m.media-amazon.com/images/I/61993is6dJL._UF1000,1000_QL80_.jpg", enlace: "https://cdn.discordapp.com/attachments/1353738429577433129/1353738449726734437/LAS_48_LEYES_DEL_PODER.pdf?ex=67e2bead&is=67e16d2d&hm=3f53ea79af09be4ff3c9c13fbfc428c54682cf7bf606d58c47df5ca29b317d25&" },
        { titulo: "Rompe La Barrera Del No", portada: "https://m.media-amazon.com/images/I/81vUPiql3LL.jpg", enlace: "https://cdn.discordapp.com/attachments/1353738429577433129/1353739892533891172/rompe-la-barrera-del-no-chris-voss.pdf?ex=67e2c005&is=67e16e85&hm=ef9bb9eb80499071a3c55129e592e15ad3a3b1ce3b525c228b4babcdcdf42edf&" },
        { titulo: "Padre Rico, Padre Pobre", portada: "https://m.media-amazon.com/images/I/61cg2eMTGGL._AC_UF1000,1000_QL80_.jpg", enlace: "https://cdn.discordapp.com/attachments/1353738429577433129/1353740618731356313/descargar_Padre-Rico-Padre-Pobre.pdf?ex=67e2c0b2&is=67e16f32&hm=94f27241da500527fc4bba7ebb4dff0694b9d802738e3d8b3da739069bc44f6a&" }
    ];

    if (index < 0 || index >= libros.length) {
        return interaction.reply({ content: "❌ No hay más libros disponibles.", ephemeral: true });
    }

    const libro = libros[index];

    const embed = new EmbedBuilder()
        .setTitle(libro.titulo)
        .setDescription(`<a:Dere:1353481160147206289> Haz clic en el botón de abajo para descargar el libro.`)
        .setImage(libro.portada)
        .setColor("Green");

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`libro_${index - 1}`)
                .setLabel("⬅️ Anterior")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(index === 0), // Deshabilitar si es el primer libro
            new ButtonBuilder()
                .setLabel("Descargar")
                .setStyle(ButtonStyle.Link)
                .setURL(libro.enlace),
            new ButtonBuilder()
                .setCustomId(`libro_${index + 1}`)
                .setLabel("Siguiente ➡️")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(index === libros.length - 1)  // Deshabilitar si es el último libro
        );

    // Responder solo al usuario con un embed privado (ephemeral)
    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}

module.exports.mostrarLibro = mostrarLibro;

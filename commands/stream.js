// stream.js

module.exports = {
    name: 'stream',
    description: 'Notifica cuando un streamer va en vivo en Twitch.',
    execute(message, args) {
        // Obtén el ID del canal de destino (donde quieres enviar el mensaje)
        const canalDestinoId = '1172307035048656989'; // Reemplaza con el ID de tu canal de destino

        // Obtén el canal de destino
        const canalDestino = message.guild.channels.cache.get(canalDestinoId);

        if (!canalDestino) {
            console.error('No se pudo encontrar el canal de destino.');
            return message.reply('¡No se pudo encontrar el canal de destino! Por favor, verifica la configuración del bot.');
        }

        // Obtén el nombre del usuario y el enlace de Twitch
        const nombreUsuario = args[0];
        const enlaceTwitch = args[1];

        // Comprueba si se proporcionaron ambos argumentos
        if (!nombreUsuario || !enlaceTwitch) {
            return message.reply('Por favor, proporciona el nombre de usuario y el enlace de Twitch.');
        }

        // Crea el mensaje de notificación
        const mensajeNotificacion = `@everyone ¡Nuestro amigo/a ${nombreUsuario} está en directo en Twitch! Vamos a verlo/a: ${enlaceTwitch}`;

        // Envía el mensaje al canal de destino
        canalDestino.send(mensajeNotificacion);

        // Opcional: Envía un mensaje de confirmación al autor del comando
        message.reply(`¡Notificación de stream enviada al canal de destino!`);
    },
};

module.exports = {
    name: 'avatar',
    description: 'Muestra el avatar del usuario mencionado o del propio usuario.',
    execute(message, args) {
        // Obtener el primer usuario mencionado en el mensaje o el propio autor
        const targetUser = message.mentions.users.first() || message.author;

        // Obtener la URL del avatar del usuario
        const avatarURL = targetUser.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });

        // Enviar un mensaje con el avatar
        message.channel.send(`${targetUser.username}'s avatar: ${avatarURL}`);
    },
};

// novedades.js

module.exports = {
    name: 'novedades',
    description: 'Envía un mensaje de novedades a otro canal.',
    execute(message, args) {
      // Obtén el ID del canal de destino (donde quieres enviar el mensaje)
      const canalDestinoId = '1172207916166684744'; // Reemplaza con el ID de tu canal de destino
  
      // Obtén el canal de destino
      const canalDestino = message.guild.channels.cache.get(canalDestinoId);
  
      if (!canalDestino) {
        console.error('No se pudo encontrar el canal de destino.');
        return message.reply('¡No se pudo encontrar el canal de destino! Por favor, verifica la configuración del bot.');
      }
  
      // Obtén el mensaje a enviar (unir todos los argumentos en una cadena)
      const mensaje = args.join(' ');
  
      // Envía el mensaje al canal de destino
      canalDestino.send(`Nueva novedad: ${mensaje}`);
  
      // Opcional: Envía un mensaje de confirmación al autor del comando
      message.reply(`¡Nueva novedad enviada al canal de destino!`);
    },
  };
  
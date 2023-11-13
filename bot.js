const { Client, Collection,MessageAttachment ,GatewayIntentBits } = require('discord.js');

const fs = require('fs');
const path = require('path');

// Crear el cliente de Discord
const client = new Client({
    intents: 3276799
});

// Definir el prefijo del bot
const prefix = '!';

// Cargar comandos
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.name, command);
}

// Evento ready
client.once('ready', () => {
    console.log('¡Bot listo!');
});

// Evento messageCreate
client.on('messageCreate', (message) => {
    // Verificar si el mensaje comienza con el prefijo y si el autor no es un bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Obtener los argumentos y el nombre del comando
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Verificar si el comando existe
    if (!client.commands.has(commandName)) return;

    // Obtener el comando
    const command = client.commands.get(commandName);

    // Verificar si solo los administradores pueden ejecutar el comando
    if (command.adminOnly && !message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('Solo los administradores pueden ejecutar este comando.');
    }

    try {
        // Ejecutar el comando
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('¡Hubo un error al ejecutar el comando!');
    }
});

client.on("guildMemberAdd", member => {
  console.log("Usuario:", member.user.username);

  const channel = member.guild.channels.cache.get("1172247886747152424");

  if (channel) {
    // Enviar mensaje mencionando al nuevo miembro
    channel.send(`¡Bienvenido/a ${member} al server!`);
  }
});


const avatarCommand = require(path.join(__dirname, 'commands', 'avatar'));
client.commands.set(avatarCommand.name, avatarCommand);


// Conectar al servidor de Discord
client.login("MTE3MjE2MDk4MjI3ODIyNTk1MQ.G4Dt0t.gWtIA0FLMbsUznTGx_swfteQHk6h96_mhP3g9I");

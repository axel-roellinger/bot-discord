const Discord = require("discord.js");
const config = require("./config.json");
const fs = require('fs');
const ytdl = require('ytdl-core');

const client = new Discord.Client(); //Interaction avec l'API Discord

client.login(config.BOT_TOKEN);

const prefix="!";

var in_chan = 0;

var connection;
var dispatcher;

client.on('message', async message => {
	// Join the same voice channel of the author of the message
	
    if (message.author.bot) return; //vérifie si l'auteur est un bot
    if (!message.content.startsWith(prefix)) return; //si pas de "!"
          
    
	//parsing de la commande      
    const commandBody = message.content.slice(prefix.length); //tout sauf "!"
    const args = commandBody.split(' '); //divise le message en sous-chaine de caractères, là où il y a un espace, donne un tableau avec le nom de la commande et les arguments
    const command = args.shift().toLowerCase(); //supprime le premier élément du tableau args, le convertit en minuscule et l'affecte à command.
    
    if (message.member.voice.channel && command === "join") {

		connection = await message.member.voice.channel.join();
        in_chan = 1;
	}
    
    
    if(command === "leave" && in_chan === 1)
    {
        connection.disconnect();
    }
    
    if(command === "playallstar" && in_chan === 1)
    {
        //const co = connection;
        const dispatcher = connection.play('smash-mouth-all-star.mp3');
        dispatcher.setVolume(0.25);
        
        dispatcher.on('start', () => {
            message.reply("Now playing : All Star - Smash Mouth");
        });
        
        dispatcher.on('error', () => {
            message.reply("Erreur dispatcher");
        });
    }
    
    if(command === "leave" && in_chan === 1)
    {
        connection.disconnect();
        return;
    }
    
    if(command === "stop" && in_chan === 1)
    {
        const disp = dispatcher;
        dispatcher.pause();
    }
    
    if(command === "resume" && in_chan === 1)
    {
        const disp = dispatcher;
        dispatcher.resume();
    }
    
    
    
    if(command === "play-youtube" && in_chan === 1)
    {
        const link = args[0].toString();
        //const co = connection;
        dispatcher = connection.play(ytdl(link, {filter:'audioonly'}));
        if(link === '')
        {
            message.reply("Pas de lien renseigné");
        }
        
        dispatcher.on('start', () => {
            message.reply("Now playing : ce que tu as choisi enculé");
        });
        
        dispatcher.on('error', () => {
            message.reply("Erreur dispatcher");
        });
        

    }
});




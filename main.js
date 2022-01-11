//   Author  :   Adrien LD
//   Date    :   19/07/2021
//   Desc    :   Discord Bot

const Discord = require('discord.js')
const bot = new Discord.Client()
bot.on('ready', function(){                     //Lancement du bot
    bot.user.setAvatar('./PLANoff.jpg')
    .then(() => channelbot.send('Bot lancé'))   //Validation du lancement
    .catch(console.error)
    bot.user.setActivity('Préparation de la P.LAN')
    channelbot = bot.channels.cache.find(channel => channel.id === '849970492906799135')
})



bot.on('message', (message, user, member) =>{
    let phrasesaléatoires = ['Sans doute', 'Peut-être', 'Humm...', 'Je vais soumettre cette idée au patron', 'Pourquoi pas', "J'ai jamais dit oui", "J'ai jamais dit que ce jeu y serait", "Laissez moi y réfléchir",'🤫' ,'🤔', '🤐', '😐', "J'y réfléchis encore","Peut-être que oui...","Peut-être que non..."]
    let args = message.content.trim().split(/ +/g);
    let lechannel = message.channel
    let i = 0;
    let j = 0;
    if (message.author.bot)return;
    while (args[i]){
        switch (args[i]){               //Commandes écrivables
            case '!dispo':
                const Disponibilitées = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('**P.LAN**')
                        .setDescription('Bonjour à tous, \nLa P.LAN se tiendra le **24 juillet 2021**.\nEtes vous disponible?\nSi oui, veuillez réagir à ce message')
                        .setImage('https://i.imgur.com/G4XmaJl.jpg')
                        
                lechannel.send(Disponibilitées)
                .then(message => {message.react('👍')
                bot.on('messageReactionAdd', (reaction, user) =>{
                    if (reaction.emoji.name === '👍' && user.id !== bot.user.id){
                        const member = message.guild.members.cache.get(user.id)
                        member.roles.add('848926577534435379')
                        member.roles.remove('848987066012270604')
                        channelbot.send(user.username + ' est devenu Participant.')
                    }
                })
                bot.on('messageReactionRemove', (reaction, user) =>{
                    if (reaction.emoji.name === '👍' && user.id !== bot.user.id){
                        const member = message.guild.members.cache.get(user.id)
                        member.roles.add('848987066012270604')
                        member.roles.remove('848926577534435379')
                        channelbot.send(user.username + ' est redevenu Recrues.')
                    }
                })})
                break;
            case '!aide':
                lechannel.send('Liste des commandes : \n!regles pour avoir les règles des jeux \n!liste pour avoir la liste des jeux \n!date pour avoir la date de la P.LAN \n!trestant pour avoir le temps restant \n!image pour avoir l image officielle de la P.LAN \n!equipes pour avoir la liste des équipes')
                break;
            case '!liste':
                lechannel.send('Liste des jeux : \nJust Dance \nRocket League \nMario Kart 8 \nBrawlhalla \nFifa 21 \n') 
                break;
            case '!date':
                lechannel.send('La date prévue est le 24 juillet 2021')
                break;
            case '!regles':
                lechannel.send('https://docs.google.com/document/d/1y2O-mp47yGzmcI1-lcn9srdMQaiQ6f75QBPgqcvQC6g/edit?usp=sharing')
                break;
            case '!trestant':
                var dateactuelle = new Date();
                lechannel.send('Il reste ' + (24 - dateactuelle.getDate()) + ' jours');
                break;
            case '!image':
                lechannel.send({files :['./PLANoff.jpg']})
                break;
            case '!equipes':
                lechannel.send('Equipe 1 : \nAdrien LD \nGaëtan B \n\nEquipe 2 : \nAdrien R \nElisa L \n\nEquipe 3 : \nGauthier B \nYouness R \n\nEquipe 4 : \nValentin L \nNico')
                break;
            case 'TOUS':
                lechannel.send("Bah si je comprends" )
                break;
            case '!ecrire':
                let g = i+1;
                let message = ('')
                if (!args[g]) return lechannel.send("Vous devez indiquer le nom du channel destiné" );
                let channeltosend;
                
                switch (args[g]){
                    case ('bonjour'):
                        channeltosend = '849216960352485426'
                        break;
                    case ('regles'):
                        channeltosend = '848929040786128937'
                        break;
                    case ('questions'):
                        channeltosend = '848929188378968064'
                        break;
                    case ('admins'):
                        channeltosend = '848968667407581254'
                        break;
                }
                let channelsend = bot.channels.cache.find(channel => channel.id === channeltosend)
                if (!channelsend) return ("Channel non trouvé");
                g++
                while (args[g]){
                message = (message + ' ' + args[g])
                g++

                }
                channelsend.send(message)

        }
        if (j === 0 && (args[i] === 'Poker' || args[i] === 'Pétanque' || args[i] === 'Dictée' || args[i] === 'Calcul' || args[i] === 'Bomberman' ||args[i] === 'Worms')){
            lechannel.send(phrasesaléatoires[Math.floor(Math.random()*phrasesaléatoires.length)] )
            j++;
        }
        
        if (args[i] === 'Ez'){
            if (message.author.id === '245006826737762324')lechannel.send("Fait pas genre !" );
            else lechannel.send("Bah oui EZ pour toi trop facile ce jeu, BG " + message.author.username);
        }

        if (args[i] === '!suppr'){
            message.delete();
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return lechannel.send("Vous n'êtes pas habilités à faire ceci" );
            if (!args[i+1]) return lechannel.send("Vous devez indiquer le nombre de messages à supprimer" );
            if (isNaN(args[i+1])) return lechannel.send("Message invalide, veuillez le mettre sous la forme \n!suppr 2" );
            if (args[i+1] <= 0 || args[i+1] >= 99) return lechannel.send("Le nombre de messages a supprimer doit être entre 1 et 99" );
            lechannel.bulkDelete(args[i+1])
            channelbot.send(message.author.username + ` a supprimé ${args[i+1]} messages dans le channel ` + lechannel.name)
        }
        i++;
    }

})

bot.on('guildMemberAdd', member=> {
    member.roles.add('848987066012270604')
    channelbot.send('Bienvenue ' + member.user.username + ', tu es une Recrues.')

})


bot.login('*Insert Bot Token*')
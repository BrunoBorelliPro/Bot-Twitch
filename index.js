require('dotenv/config');

const tmi = require("tmi.js")
console.log(process.env.BOT_NAME)
const client = tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection:{
        reconnect: true,
        secure: true,
    },
    identity:{
        username:process.env.BOT_NAME,
        password:process.env.TWITCH_TOKEN
    },
    channels:['brunildocode']
});


const listaComandos = [
    "!oiee",
    "!live",
    "!cara",
    "!coroa",
    "!social",
    "!bet",
    "!comandos"
]

const redesSociais = [
    "twitter.com/BBrunoBorelli - Twitter",
    "twitch.tv/brunildocode - Twitch",
    "instagram.com/brusno.brusno - Instagram",
    "github.com/BrunoBorelliPro - GitHub"
]

function gerarPorcentagem(){
    return Math.floor(Math.random()*100)
}

function moedada(lado){
    let valor = Math.floor(Math.random()*10)%2
    let ganhador
    if(valor===0){
        ganhador = "cara"
    }else{
        ganhador = "coroa"
    }
    if(lado==="!cara" && valor===0 || lado==="!coroa" && valor!==0){
        return {
            ganhou:"ganhou!",
            ladoQueCaiu:ganhador
        }
    }else{
        return {
            ganhou:"perdeu!",
            ladoQueCaiu:ganhador
        }
    }
}
function redesSociaisFun(redesSociais){
    let message = `Minhas redes sociais:                           `

    redesSociais.forEach(rede => {
        console.log(rede)

        message = message.concat(`${rede},                         `)
    });
    return message

}

client.connect().catch(console.error);
client.on('message',(channel,tags,message,self)=>{
    if(self) return
    if(message.toLowerCase() === '!oiee') {
		client.say(channel, `@${tags.username}, td bem?`);
    }
    if(message.toLowerCase() === '!live') {
        client.say(channel, `Hoje tem ${gerarPorcentagem()}% de chance de ter live`);
    }
    if(message.toLowerCase() === '!cara' || message.toLowerCase() === '!coroa') {
        moeda = moedada(message.toLowerCase())
        client.say(channel, `Deu ${moeda.ladoQueCaiu}, @${tags.username}, você ${moeda.ganhou}`);
    }
    if(message.toLowerCase() === '!social') {
        client.say(channel, `${redesSociaisFun(redesSociais)}`);
    }
    if(message.toLowerCase() === "!bet"){
        client.say(channel,"Repositório do bot: https://github.com/BrunoBorelliPro/Bot-Twitch")
    }
    if(message.toLowerCase() === "!comandos"){
        client.say(channel,"Comandos: " + listaComandos.join(", "))
    }
})
// client.on("join", (channel, username, self) => {
//         client.say(`@${username}, seja bem vindo!`)
// });

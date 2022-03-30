require('dotenv').config()
const {
    Telegraf
} = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)


const mensajeInicio = ('Bienvenido a la heladería IceCream Bot, nos alegra que te hayas comunicado. Para realizar tu pedido ingresa "/helado"')

let sabores = ['Frutilla', 'Frambuesa', 'Chocolate', 'Menta', 'Sambayon', 'Maracuya', 'ChocolateItaliano', 'Limon', 'Crema', 'Cafe']
// function inicioHeladeria(ctx) {}

bot.hears('Hola', (ctx) => {
    // inicioHeladeria()
    ctx.reply(mensajeInicio)
})

bot.command('helado', (ctx) => {

    ctx.reply('Aquí puedes elegir los sabores que tú deseas, luego de seleccionarlos cliquea en "Continuar"')

    ctx.reply('/Frutilla \n /Frambuesa \n /Chocolate \n /Menta \n /Sambayon \n /Maracuya \n /ChocolateItaliano \n /Limon \n /Crema \n /Cafe \n /Continuar')

});

bot.command(sabores, (ctx) => {

    ctx.reply(`Se ha agregado el sabor ${ctx.message.text} a tu pedido `)
})


bot.command('Continuar', (ctx) =>{

    ctx.reply('Muy bien, ahora escribe la dirección a la que será enviado tu pedido')
});






/*

bot.action('enviarSabor', (ctx) => {

    ctx.reply('Frutilla')
})


bot.on('text', (ctx) => {
    // Explicit usage
    ctx.replyWithPhoto({
        url: 'https://placekitten.com/g/200/300?random',
        filename: 'kitten.jpg'
      })
   // ctx.telegram.sendMessage(ctx.message.chat.id, `Hola ${ctx.from.first_name}`)

})
*/


bot.launch()
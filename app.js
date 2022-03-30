require('dotenv').config()
const {
    Telegraf
} = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)


const mensajeInicio = ('Bienvenido a la heladería IceCream Bot, nos alegra que te hayas comunicado. Para realizar tu pedido ingresa "/helado"')

let sabores = ['Frutilla', 'Frambuesa', 'Chocolate', 'Menta', 'Sambayon', 'Maracuya', 'ChocolateItaliano', 'Limon', 'Crema', 'Cafe']
let inicio = ['Hola', 'Buenas tardes', 'hola', 'ola', 'Quisiera hacer un pedido', 'Era para hacer un pedido', 'pedir', 'helado', 'Buenas', 'buenos días']

// Inicio Heladería IceCream Bot

bot.command('start', (ctx) => {

    ctx.reply(`Bienvenido ${ctx.from.first_name} a nuestra heladería IceCream Bot, si deseas realizar un pedido puedes seguir los paso a continuación.\n
    1) Verifica nuestro /Catalogo en busca del helado que más gustes\n
    2) Realiza la selección de sabores ingresando /Helado \n
    3) Ingresa la dirección a la que deseas el pedido \n
    4) Ingresa el método de pago que desees \n
    5) Finalmente confirma tu pedido`)

})

bot.hears(inicio, (ctx) => {

    ctx.reply('Gracias por volver a comuicarte con IceCream Bot, puedes realizar tu pedido ingresando /start')

})

bot.command('Catalogo', (ctx) => {

    ctx.replyWithPhoto({
        source: './media/catalogo.png',
        
    })

    ctx.reply('/1Litro /2Litros /3Litros')

})

let litros = ['1Litro', '2Litros', '3Litros']

bot.command(litros, (ctx) => {

ctx.reply(`¡Perfecto! Tu pedido será de ${ctx.message.text}, ahora debes seleccionar los sabores ingresando /Helado`)
})

bot.command('Helado', (ctx) => {

    ctx.reply('Aquí puedes elegir los sabores que tú deseas, luego de seleccionarlos cliquea en "Continuar"')

    ctx.reply('/Frutilla \n /Frambuesa \n /Chocolate \n /Menta \n /Sambayon \n /Maracuya \n /ChocolateItaliano \n /Limon \n /Crema \n /Cafe \n /Continuar')

});

bot.command(sabores, (ctx) => {

    ctx.reply(`Se ha agregado el sabor ${ctx.message.text} a tu pedido `)
})


bot.command('Continuar', (ctx) => {

    ctx.reply('Muy bien, ahora escribe la dirección a la que será enviado tu pedido')
});

bot.hears('Dirección', (ctx) => {

    ctx.reply(`La dirección de envío será "${ctx.message.text}" ingresa /OK para confirmar o escribe una nueva dirección`)

})

bot.command('OK', (ctx) => {
    ctx.reply('Genial, ya casi finalizas tu pedido, solo debes seleccionar el método de pago que tú desees, /Efectivo, /Tarjeta')
})

bot.command('Efecivo', (ctx => {
    ctx.reply('Perfecto el pago será en efectivo, confirma la orden ingresando /Confirmar, de lo contrario podrás /Salir')
}))


bot.command('Tarjeta', (ctx => {
    ctx.reply('Perfecto el pago será con tarjeta, confirma la orden ingresando /Confirmar, de lo contrario podrás /salir')
}))

bot.command('Confirmar', (ctx => {
    ctx.reply('Muchas gracias por tu pedido, ¡Esperamos que lo disfrutes!')
}))

bot.command('salir', (ctx) => {

    ctx.reply(`Adios ${ctx.from.first_name}, ¡Esperamos verte pronto!`)

})



bot.launch()
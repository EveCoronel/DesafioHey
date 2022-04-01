require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const {
    Telegraf
} = require('telegraf')
const axios = require('axios')
const exceljs = require('exceljs')
const moment = require('moment')
const {
    constants
} = require('buffer')

const guardar = require('./guardarPedido') //exporto funcion

const bot = new Telegraf(process.env.BOT_TOKEN)

let sabores = ['Frutilla', 'Frambuesa', 'Chocolate', 'Menta', 'Sambayon', 'Maracuya', 'ChocolateItaliano', 'Limon', 'Crema', 'Cafe']
let inicio = ['Hola', 'Buenas tardes', 'hola', 'ola', 'Quisiera hacer un pedido', 'Era para hacer un pedido', 'pedir', 'helado', 'Buenas', 'buenos días']

mongoose.connect('mongodb+srv://IceCreamBot:icecreambothey@cluster0.hjesg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado correctamente a MongoDB')
}).catch((e) => {
    console.log('Ha ocurrido un error con la conexión de MongoDB', e.message)
})

// Inicio Heladería IceCream Bot

bot.command('start', (ctx) => {

    ctx.reply(`Bienvenido ${ctx.from.first_name} a nuestra heladería IceCream Bot, si deseas realizar un pedido puedes seguir los paso a continuación.\n
    1) Verifica nuestro /Catalogo en busca del helado que más gustes\n
    2) Realiza la selección de sabores ingresando /Helado \n
    3) Ingresa la dirección a la que deseas el pedido \n
    4) Ingresa el método de pago que desees \n
    5) Finalmente confirma tu pedido`)

    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.hears(inicio, (ctx) => {

    ctx.reply('Gracias por volver a comuicarte con IceCream Bot, puedes realizar tu pedido ingresando /start')
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.command('Catalogo', (ctx) => {

    ctx.replyWithPhoto({
        source: './media/catalogo.png',
    })

    ctx.reply('/1Litro /2Litros /3Litros')
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

let litros = ['1Litro', '2Litros', '3Litros']

bot.command(litros, (ctx) => {

    ctx.reply(`¡Perfecto! Tu pedido será de ${ctx.message.text}, ahora debes seleccionar los sabores ingresando /Helado`)
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.command('Helado', (ctx) => {

    ctx.reply('Aquí puedes elegir los sabores que tú deseas, luego de seleccionarlos cliquea en "Continuar"')
    ctx.reply('/Frutilla \n /Frambuesa \n /Chocolate \n /Menta \n /Sambayon \n /Maracuya \n /ChocolateItaliano \n /Limon \n /Crema \n /Cafe \n /Continuar')

});

bot.command(sabores, (ctx) => {

    ctx.reply(`Se ha agregado el sabor ${ctx.message.text} a tu pedido `)
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.command('Continuar', (ctx) => {

    ctx.reply('Muy bien, ahora ingresa /Direccion y luego escribe la direccion a la que será enviado tu pedido')
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

});

if (bot.command('Direccion', (ctx) => {

        bot.on('text', (ctx) => {
            ctx.reply(`Perfecto, tu pedido será enviado a ${ctx.message.text}, presiona /OK para continuar o escribe una nueva dirección.`)
            guardar.guardarPedido(ctx.from.id, ctx.message.text)

        })
    }));


bot.command('OK', (ctx) => {

    ctx.reply('Genial, ya casi finalizas tu pedido, solo debes seleccionar el método de pago que tú desees, /Efectivo, /Tarjeta')
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

let pago = ['Efectivo', 'Tarjeta']

bot.command(pago, (ctx) => {

    ctx.reply(`Perfecto el pago será con ${ctx.message.text}, confirma la orden ingresando /Confirmar, de lo contrario podrás /salir`)
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.command('Confirmar', (ctx) => {

    ctx.reply('Muchas gracias por tu pedido, ¡Esperamos que lo disfrutes!')
    guardar.guardarPedido(ctx.from.id, ctx.message.text)

})

bot.command('salir', (ctx) => {

    ctx.reply(`Adios ${ctx.from.first_name}, ¡Esperamos verte pronto!`)
    guardar.guardarPedido(ctx.from.id, ctx.message.text)


})

bot.launch()
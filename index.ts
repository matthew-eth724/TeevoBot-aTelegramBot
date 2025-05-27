import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config()
import { teevos, months } from "./msg";


const token = process.env.token
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
    const text = `
    Hello ${msg.chat.username}, welcome to Teevo Bot.
    This bot allows you to download the teevo daily devotional for each month

    You can use me by sending any of the following commands:
    /teevo - to get this month's teevo
    /teevo month e.g /teevo january - to get that months teevo

    made with love by @paraciusisAgod
    `

    return bot.sendMessage(msg.chat.id, text)
})

bot.onText(/\/teevo/, (msg) => {
    let date = new Date()
    let date_: string = `${months[date.getMonth()]}${date.getFullYear()}` 
    return bot.sendDocument(msg.chat.id, teevos[teevos.length - 1])
})
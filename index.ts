import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config()
import { teevos, months } from "./msg";
import express from "express"
const app = express()

const port = process.env.PORT || 3000
const token = process.env.token
const bot = new TelegramBot(token, { polling: true })

app.get("/", (req, res) => {
    res.send("this is a telegram bot")
    console.log("Someone sent a get request")
})

bot.onText(/\/start/, (msg) => {
    console.log(`${msg.chat.username} initiated a chat`)
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

const Teevo: string = "./teevos/Teevo_June2025"
bot.onText(/\/teevo/, async (msg) => {
    let date = new Date()
    let date_: string = `${months[date.getMonth()]}${date.getFullYear()}` 
    return bot.sendDocument(msg.chat.id, Teevo)
    console.log(`${msg.chat.username} downloaded ${date_} teevo`)
})

/*bot.onText(/\/teevo (.+)/, async (msg, match) => {
    return bot.sendMessage(msg.chat.id, "This feature is not available at the moment")
})*/

app.listen(port, () => {
    console.log(`server running on PORT ${port}`)
})
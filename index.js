"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const msg_1 = require("./msg");
const token = process.env.token;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    const text = `
    Hello ${msg.chat.username}, welcome to Teevo Bot.
    This bot allows you to download the teevo daily devotional for each month

    You can use me by sending any of the following commands:
    /teevo - to get this month's teevo
    /teevo month e.g /teevo january - to get that months teevo

    made with love by @paraciusisAgod
    `;
    return bot.sendMessage(msg.chat.id, text);
});
bot.onText(/\/teevo/, (msg) => {
    let date = new Date();
    let date_ = `${msg_1.months[date.getMonth()]}${date.getFullYear()}`;
    return bot.sendDocument(msg.chat.id, msg_1.teevos[msg_1.teevos.length - 1]);
});

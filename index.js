"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const msg_1 = require("./msg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const token = process.env.token;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
app.get("/", (req, res) => {
    res.send("this is a telegram bot");
    console.log("Someone sent a get request");
});
bot.onText(/\/start/, (msg) => {
    console.log(`${msg.chat.username} initiated a chat`);
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
//const Teevo: string = "./teevos/Teevo_June2025"
bot.onText(/\/teevo/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date();
    let date_ = `${msg_1.months[date.getMonth()]}${date.getFullYear()}`;
    return bot.sendDocument(msg.chat.id, msg_1.teevos[msg_1.teevos.length - 1]);
    console.log(`${msg.chat.username} downloaded ${date_} teevo`);
}));
/*bot.onText(/\/teevo (.+)/, async (msg, match) => {
    return bot.sendMessage(msg.chat.id, "This feature is not available at the moment")
})*/
app.listen(port, () => {
    console.log(`server running on PORT ${port}`);
});

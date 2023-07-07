var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bodyParser from "body-parser";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit"; // import the express-rate-limit module
const port = process.env.PORT || 3000;
// Set up a rate limiter: maximum of five requests per minute
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5, // limit each IP to 5 requests per windowMs
});
const app = express().use(cors()).use(bodyParser.json()).use(limiter); // apply the rate limiter
// Auth middleware
app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || auth !== process.env.PASSWORD) {
        res.status(401).send("Unauthorized");
        return;
    }
    next();
});
const chatGPTOptions = {
    apiKey: process.env.OPENAI_API_KEY || "",
};
const chatGPTApi = new ChatGPTAPI(chatGPTOptions);
function omitEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}
class Conversation {
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = omitEmpty(this);
            const res = yield chatGPTApi.sendMessage(message, options);
            this.conversationId = res.conversationId || this.conversationId;
            this.parentMessageId = res.parentMessageId || this.parentMessageId;
            return res;
        });
    }
}
const conversation = new Conversation();
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield conversation.sendMessage(req.body.message);
        const { text: reply, detail: { usage } = {} } = response;
        console.log(`Reply: ${reply}, used: ${usage === null || usage === void 0 ? void 0 : usage.total_tokens}`);
        res.json({ reply });
    }
    catch (error) {
        console.error(error);
        res.status(500).send();
    }
}));
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));

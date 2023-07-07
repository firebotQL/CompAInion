import bodyParser from "body-parser";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit"; // import the express-rate-limit module

const port = process.env.PORT || 3000;

// Set up a rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
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

function omitEmpty(obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
}

class Conversation {
  conversationId: string | undefined;
  parentMessageId: string | undefined;

  async sendMessage(message: string) {
    const options = omitEmpty(this);
    const res = await chatGPTApi.sendMessage(message, options);
    this.conversationId = res.conversationId || this.conversationId;
    this.parentMessageId = res.parentMessageId || this.parentMessageId;
    return res;
  }
}

const conversation = new Conversation();

app.post("/", async (req, res) => {
  try {
    const response = await conversation.sendMessage(req.body.message);
    const { text: reply, detail: { usage } = {} } = response;
    console.log(`Reply: ${reply}, used: ${usage?.total_tokens}`);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const chatGPTConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const chatGPTApi = new OpenAIApi(chatGPTConfig);

export const config = {
  runtime: "edge",
};

export default async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await chatGPTApi.createChatCompletion({
    model: "gpt-3.5-turbo",
    // model: "gpt-4", https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

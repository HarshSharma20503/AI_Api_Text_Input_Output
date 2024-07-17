import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const GetGiminiResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0, //this is used to control the randomness of the output, it ranges from 0 to 1, the higher the value the more random the output
        topP: 1,
        topK: 16, //this is used to control the diversity of the output, it ranges from 1 to infinity, the higher the value the more diverse the output
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (e) {
    console.log(e);
    return "Error Generating AI response. Please try again later.";
  }
};

const getGroqChatCompletion = async (prompt) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: false,
  });
};

export async function getGroqChatStream(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant.",
      },
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: true,
  });
}

const prompt = "Write a program to print hello world in C++";
const GeminiResponse = await GetGiminiResponse(prompt);
console.log(GeminiResponse);

const GroqResponse = await getGroqChatCompletion(prompt);
console.log(GroqResponse.choices[0]?.message?.content || "");

const GroqResponseStream = await getGroqChatStream(prompt);
for await (const chunk of GroqResponseStream) {
  console.log(chunk.choices[0]?.delta?.content || "");
}

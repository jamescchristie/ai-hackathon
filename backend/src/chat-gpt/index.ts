import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionContentPart,
  Model,
} from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export const ChatGPTLib = {
  useText: async (
    prompts: ChatCompletionContentPart[],
    model?: string
  ): Promise<ChatCompletion> => {
    return openai.chat.completions.create({
      messages: [{ role: "user", content: prompts }],
      model: model || "gpt-4",
    });
  },

  useImage: async (
    prompt: string,
    image: string,
    model?: string
  ): Promise<ChatCompletion> => {
    console.log("fetching response from vision model");
    const response = await openai.chat.completions.create({
      model: model || "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });
    console.log(response.choices);
    return response;
  },
};

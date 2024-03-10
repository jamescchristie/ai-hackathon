import { ChatGPTLib } from "../chat-gpt";
import fs from "fs";
import Prompts from "../../prompts.json";

export type UserInputs = {
  style: string;
  color: string;
  gender: string;
  price: string;
  size: string;
};

export default {
  analyseImage: async (imagePath: string): Promise<string> => {
    const b64Encoded = `data:image/jpeg;base64,${base64_encode(imagePath)}`;
    const prodDescPrompt = Prompts.generate_product_descriptions;
    console.log(`Making request, with prompt: \n${prodDescPrompt.description}`);

    const response = await ChatGPTLib.useImage(
      prodDescPrompt.prompt,
      b64Encoded
    );
    return response.choices[0].message.content!;
  },

  getStyleSuggestions: async (prodDesc: string): Promise<string> => {
    const suggestionPrompt = Prompts.suggest_fashion_styles;
    console.log(
      `Making request, with prompt: \n${suggestionPrompt.description}`
    );
    const response = await ChatGPTLib.useText([
      { type: "text", text: suggestionPrompt.prompt },
      { type: "text", text: prodDesc },
    ]);
    return response.choices[0].message.content!;
  },

  analyseCsv: async (): Promise<string> => {
    const csvPrompt = Prompts.categorize_product_styles_from_csv;
    const csvAsString = csvToString("../database/inventory.csv");
    console.log(csvAsString);
    console.log(`Making request, with prompt: \n${csvPrompt.description}`);
    const response = await ChatGPTLib.useText([
      { type: "text", text: csvPrompt.prompt },
      { type: "text", text: csvAsString },
    ]);
    console.log(response.choices[0].message.content!);
    return response.choices[0].message.content!;
  },

  pickStylesFromCSV: async (csv: string): Promise<string> => {
    const picKStylePrompt = Prompts.generate_outfits_based_on_style_suggestions;
    console.log(
      `Making request, with prompt: \n${picKStylePrompt.description}`
    );
    const response = await ChatGPTLib.useText([
      { type: "text", text: picKStylePrompt.prompt },
      { type: "text", text: csv },
    ]);
    return response.choices[0].message.content!;
  },

  curateLook: async (imageAnalysis: string, userInput: UserInputs) => {
    const succinct = Prompts.succint_prompt;
    console.log(`Making request, with prompt: \n${succinct.description}`);
    const csvAsString = csvToString("../database/inventory.csv");
    const response = await ChatGPTLib.useText([
      { type: "text", text: succinct.prompt },
      { type: "text", text: `CSV: ${csvAsString}` },
      { type: "text", text: `User Inputs: ${JSON.stringify(userInput)}` },
      { type: "text", text: `Description: ${imageAnalysis}` },
    ]);
    const rawResponse = response.choices[0].message.content!;
    const responseJSON = extractJSONFromString(rawResponse);

    return responseJSON;
  },
};

function extractJSONFromString(text: string) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  return text.substring(firstBrace - 1, lastBrace);
}

// function to encode file data to base64 encoded string
function base64_encode(file: string) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString("base64");
}

function csvToString(pathToCsv: string): string {
  const file = fs.readFileSync(pathToCsv);
  return Buffer.from(file).toString("utf-8");
}

function createHash(data: string): string {
  var crypto = require("crypto");
  return crypto.createHash("md5").update(data).digest("hex");
}

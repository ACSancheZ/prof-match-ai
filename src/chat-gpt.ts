import { ProfMatchIaPluginSettings } from "./plugin-settings";
import OpenAI from "openai";


export default class ChatGpt {
    settings: ProfMatchIaPluginSettings;
    openai: OpenAI;
    constructor(settings: ProfMatchIaPluginSettings) {
        this.settings = settings;
        this.openai = new OpenAI({
            apiKey: settings.apiKey,
            dangerouslyAllowBrowser: true,
        });
    }

    async getCompletion(prompt: string) {
        const completion = await this.openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
            ],
            model: this.settings.model,
        });

        if (completion.choices && completion.choices.length > 0) {
            return completion.choices[0].message.content || "";
        } else {
            return "Error: No response from ChatGPT";
        }
    }
}

const OpenAI = require("openai");
const logger = require("../config/logger");

class AIService {
  constructor() {
    this.openai = null;
    this.isEnabled = false;

    // Only initialize OpenAI if API key is provided
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey.trim() !== "") {
      try {
        this.openai = new OpenAI({
          apiKey: apiKey.trim(),
        });
        this.isEnabled = true;
        logger.success("✅ OpenAI service initialized successfully");
      } catch (error) {
        logger.warning(`⚠️ Failed to initialize OpenAI: ${error.message}`);
        this.isEnabled = false;
      }
    } else {
      logger.warning(
        "⚠️ OpenAI API key not found. AI features will be disabled."
      );
      this.isEnabled = false;
    }
  }

  async generateDynamicMessage(activity, userContext = {}) {
    if (!this.isEnabled || !this.openai) {
      return null;
    }

    try {
      const prompt = this.buildPrompt(activity, userContext);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a caring, romantic AI assistant who sends personalized WhatsApp messages. You speak in a mix of Hindi and English with a loving, girlfriend-like tone. Keep messages under 100 words and make them personal and caring.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.8,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const message = completion.choices[0].message.content.trim();
      logger.debug(`🤖 AI generated message: ${message.substring(0, 50)}...`);

      return message;
    } catch (error) {
      logger.error(`❌ AI message generation failed: ${error.message}`);
      return null;
    }
  }

  buildPrompt(activity, userContext) {
    const { name = "Love", preferences = {}, lastMessages = [] } = userContext;

    let prompt = `Generate a caring, romantic message for the activity: "${activity}"\n\n`;
    prompt += `User name: ${name}\n`;
    prompt += `Message style: ${preferences.messageStyle || "romantic"}\n`;
    prompt += `Language preference: ${preferences.language || "mixed"}\n\n`;

    if (lastMessages.length > 0) {
      prompt += `Recent conversation context:\n`;
      lastMessages.slice(-3).forEach((msg) => {
        prompt += `- ${msg.content}\n`;
      });
      prompt += "\n";
    }

    prompt += `Requirements:\n`;
    prompt += `- Mix Hindi and English naturally\n`;
    prompt += `- Be caring and romantic\n`;
    prompt += `- Keep it under 100 words\n`;
    prompt += `- Make it personal and relevant to the activity\n`;
    prompt += `- Include emojis appropriately\n`;

    return prompt;
  }

  async analyzeSentiment(text) {
    if (!this.isEnabled || !this.openai) {
      return { sentiment: "neutral", confidence: 0.5 };
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Analyze the sentiment of the given text. Return only a JSON object with 'sentiment' (positive, negative, neutral) and 'confidence' (0-1).",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 50,
        temperature: 0.1,
      });

      const response = completion.choices[0].message.content.trim();
      return JSON.parse(response);
    } catch (error) {
      logger.error(`❌ Sentiment analysis failed: ${error.message}`);
      return { sentiment: "neutral", confidence: 0.5 };
    }
  }

  async extractKeywords(text) {
    if (!this.isEnabled || !this.openai) {
      return [];
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Extract key words and phrases from the text. Return only a JSON array of strings.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 100,
        temperature: 0.1,
      });

      const response = completion.choices[0].message.content.trim();
      return JSON.parse(response);
    } catch (error) {
      logger.error(`❌ Keyword extraction failed: ${error.message}`);
      return [];
    }
  }

  async generateResponse(userMessage, context = {}) {
    if (!this.isEnabled || !this.openai) {
      return null;
    }

    try {
      const prompt = `User said: "${userMessage}"\n\n`;
      const prompt2 = `Generate a caring, romantic response in Hindi-English mix. Be encouraging and supportive. Keep it under 50 words.`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a caring, romantic AI assistant. Respond in a mix of Hindi and English with love and encouragement.",
          },
          {
            role: "user",
            content: prompt + prompt2,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content.trim();
      logger.debug(`🤖 AI generated response: ${response}`);

      return response;
    } catch (error) {
      logger.error(`❌ AI response generation failed: ${error.message}`);
      return null;
    }
  }

  isAvailable() {
    return this.isEnabled;
  }
}

module.exports = new AIService();

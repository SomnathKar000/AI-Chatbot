const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(config);

const getAnswers = async (question) => {
  const responce = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  const messageArray = responce.data.choices[0].message.content
    .split("\n")
    .filter((line) => line !== "" && !line.startsWith("```"));
  return messageArray;
};

module.exports = getAnswers;

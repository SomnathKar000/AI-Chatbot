// const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require("openai");

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openAi = new OpenAIApi(config);

const getAnswers = async (question) => {
  const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });
  // const responce = await openAi.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{ role: "user", content: question }],
  //   temperature: 0.9,
  //   max_tokens: 150,
  //   top_p: 1,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.6,
  //   stop: [" Human:", " AI:"],
  // });
  // console.log();
  // const messageArray = responce.data.choices[0].message.content
  //   .split("\n")
  //   .filter((line) => line !== "" && !line.startsWith("```"));
  // return messageArray;
  const prompt = question;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  const generatedText = completion.choices[0];
  return generatedText;
};

module.exports = getAnswers;

require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(config);

app.get("/api/v1/user", async (req, res) => {
  const question = req.body.question;
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
  console.log(responce.data.choices);
  res.status(200).json({ success: true, data: responce.data.choices });
});

app.listen(5000, () => console.log("Server is listening on 5000"));

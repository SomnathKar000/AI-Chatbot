const OpenAI = require("openai");

const getAnswers = async (question) => {
  try {
    const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

    const prompt = question;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    const messageArray = completion.choices[0].message.content
      .split("\n")
      .filter((line) => line !== "" && !line.startsWith("```"));
    return {
      success: true,
      messageArray,
    };
  } catch (err) {
    return {
      success: false,
      messageArray: [
        "You exceeded your current quota, please check your plan and billing details.",
        " Learn more at https://platform.openai.com/account/billing/plan",
      ],
    };
  }
};

module.exports = getAnswers;

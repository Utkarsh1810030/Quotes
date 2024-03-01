const { OpenAI } = require('openai');

module.exports = (app) => {
  app.post('/completions', async (req, res) => {
    const client = new OpenAI({
      apiKey: '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',
    });
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'system',
          content:
            'You are an intelligent daily quotes generater based on the user mood , who do not repeat the quotes at any cost.',
        },
        {
          role: 'user',
          content: 'Generate a daily quote for devotion mood in hindi',
        },
      ],
    });
    res.send(response);
  });
};

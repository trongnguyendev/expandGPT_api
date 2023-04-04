const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


app.get("/test", (req, res) => {
  res.send(JSON.stringify("1234"));
});

app.post("/api/chatGpt", async (req, res) => {
  let contentChat = req.body.content;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: contentChat}],
  });
  console.log(completion.data.choices[0]);
  res.send(JSON.stringify(completion.data.choices[0]));
});


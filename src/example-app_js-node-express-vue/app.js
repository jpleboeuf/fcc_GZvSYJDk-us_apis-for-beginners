require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const TwilioClient = require("twilio");
const app = express();
const port = 3000;

const client = new TwilioClient();
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// This is a single page application and it's all rendered in public/index.html
app.use(express.static("public"));
// Parse the body of requests automatically
app.use(bodyParser.json());

app.get("/api/compliments", async (req, res) => {
  // Get a list of messages sent from a specific number:
  const sentMessages = await client.messages
    .list({from: twilioPhoneNumber})
    .catch(err =>
      console.log(err)
  );
  const appSentMessages = sentMessages.filter(message => {return message.body.includes("See more compliments at ");});

  // Gather only the body of those messages for sending to the client:
  const compliments = appSentMessages.map(message => message.body);
  res.json(compliments);
});

app.post("/api/compliments", async (req, res) => {
  const to = req.body.to;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const body = `${req.body.sender} says: ${req.body.receiver} is ${req.body.compliment}. See more compliments at ${req.headers.referer}`;
  // Send a message:
  try {
    await client.messages.create({to, from, body});
  } catch(err) {
    res.status(err.status).json({ success: false, message: err.message });
  }
  res.json({ success: true });
});

app.listen(port, () => console.log(`Prototype is listening on port ${port}!`));

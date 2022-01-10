const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER_WHATSAPP,
} = require("../config/globals");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = (text, number) => {
  client.messages
    .create({
      body: text,
      from: `whatsapp:${TWILIO_NUMBER_WHATSAPP}`,
      to: `whatsapp:${number}`,
    })
    .then((message) => console.log(message.sid))
    .catch(console.log);
};

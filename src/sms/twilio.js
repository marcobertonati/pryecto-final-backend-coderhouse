const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} = require("../config/globals");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {

  twilioSmsChat: (user, text) => {
    client.messages
    .create({
      body: `El usuario ${user} escribio administrador y el siguiente texto: ${text}`,
      from: TWILIO_NUMBER,
      to: "+542616171509",
    })
    .then((message) => console.log(message.sid))
    .catch(console.log);
  },

  twilioSmsFinishBuy: (user, text) => {

    client.messages
    .create({
      body: `${user}, ${text}`,
      from: TWILIO_NUMBER,
      to: "+542616171509",
    })
    .then((message) => console.log(message.sid))
    .catch(console.log);

  }
}
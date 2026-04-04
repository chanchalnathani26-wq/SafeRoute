const twilio = require('twilio');

const sendSMSAlert = async (to, message) => {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to,
    });
    console.log('SMS sent to', to);
  } catch (err) {
    console.error('SMS failed (check Twilio keys):', err.message);
  }
};

module.exports = { sendSMSAlert };
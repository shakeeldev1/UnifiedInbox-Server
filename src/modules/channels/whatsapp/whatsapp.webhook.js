export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const receiveWebhook = (req, res) => {
  console.log("=================================");
  console.log("WHATSAPP WEBHOOK POST RECEIVED");
  console.log("=================================");
  console.log(JSON.stringify(req.body, null, 2));

  return res.sendStatus(200);
};

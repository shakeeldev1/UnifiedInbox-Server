import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/facebook/webhook", (req, res) => {
    const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Facebook webhook verified");
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

app.post("/api/facebook/webhook", (req, res) => {
    console.log("Facebook webhook received:", req.body);
    // Real message processing will be added later
    return res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
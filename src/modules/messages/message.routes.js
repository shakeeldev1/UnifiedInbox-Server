import express from "express";
import { sendMessageController } from "./message.controller.js";
import { validateSendMessage } from "./message.validation.js";

const router = express.Router();

router.post("/send",validateSendMessage, sendMessageController);

export default router;
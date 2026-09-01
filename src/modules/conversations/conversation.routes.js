import express from "express";
import { getConversations } from "./conversation.controller.js";

const router = express.Router();

router.get("/", getConversations);

export default router;
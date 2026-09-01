import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import messageRoutes from "./modules/messages/message.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import whatsappRoutes from "./modules/channels/whatsapp/whatsapp.routes.js";
import conversationRoutes from "./modules/conversations/conversation.routes.js";

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors());

// Logging
app.use(morgan("dev"));

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Messaging platform backend is running",
  });
});

app.use("/api/messages", messageRoutes);
app.use("/api/webhooks/whatsapp", whatsappRoutes);
app.use("/api/conversations", conversationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
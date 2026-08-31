import dotenv from "dotenv";
dotenv.config();
console.log("VERIFY TOKEN:", process.env.WHATSAPP_VERIFY_TOKEN);
import app from "./src/app.js";
import connectDatabase from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
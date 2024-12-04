import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // Увеличенный лимит для Base64

app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB подключена");
    app.listen(8080, () => console.log("Сервер запущен на http://localhost:8080"));
  } catch (error) {
    console.error("Ошибка подключения к MongoDB", error);
  }
};

startServer();

import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Создание новости
router.post("/", async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author || !image) {
      return res.status(400).json({ error: "Все поля должны быть заполнены!" });
    }

    // Создаем запись в базе данных
    const newPost = await Post.create({ title, content, author, image });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось создать новость" });
  }
});

// Получение всех новостей
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Не удалось получить новости" });
  }
});

export default router;

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

// Получение одной новости
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Новость не найдена" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении новости" });
  }
});

// Редактирование новости
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, image } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author, image },
      { new: true } // Возвращает обновленный объект
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Новость не найдена" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении новости" });
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

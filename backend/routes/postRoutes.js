import express from "express";
import Post from "../models/Post.js";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;

    // Проверяем, было ли загружено новое изображение
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Обновляем пост
    const updatedData = { title, content, author };
    if (image) {
      updatedData.image = image;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updatedData,
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Удаление новости с id: ${id}`);

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      console.log(`Новость с id: ${id} не найдена`);
      return res.status(404).json({ error: "Новость не найдена" });
    }

    console.log(`Новость с id: ${id} успешно удалена`);
    res.status(200).json({ message: "Новость успешно удалена" });
  } catch (error) {
    console.error("Ошибка при удалении новости:", error);
    res.status(500).json({ error: "Ошибка сервера при удалении новости" });
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

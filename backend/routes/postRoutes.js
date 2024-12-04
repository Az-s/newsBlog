import express from "express";
import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// Настройка Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Создание новости
router.post("/", async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    // Загрузка изображения в Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(image);

    const newPost = await Post.create({
      title,
      content,
      author,
      image: uploadedImage.secure_url,
    });

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

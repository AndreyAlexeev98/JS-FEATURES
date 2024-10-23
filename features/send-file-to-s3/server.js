const express = require("express");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose"); // Подключаем mongoose
require("dotenv").config();

const app = express();
const port = 3000; 

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Конфигурация S3 клиента для Яндекс Object Storage
const s3Client = new S3Client({
  region: process.env.YANDEX_REGION,
  endpoint: "https://storage.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY,
    secretAccessKey: process.env.YANDEX_SECRET_KEY,
  },
});

// Multer для обработки загружаемых файлов
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

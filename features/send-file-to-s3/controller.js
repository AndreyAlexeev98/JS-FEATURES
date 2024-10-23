const File = require("./models/File"); // Импортируем модель файла

// Маршрут для загрузки файлов
app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Генерация уникального имени файла с использованием uuid
  const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

  // Параметры для загрузки файла в S3
  const uploadParams = {
    Bucket: process.env.YANDEX_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Делаем файл общедоступным для чтения
  };

  try {
    // Загрузка файла в S3
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    // Генерация публичной ссылки на загруженный файл
    const publicUrl = `https://storage.yandexcloud.net/${process.env.YANDEX_BUCKET_NAME}/${fileName}`;

    // Сохранение информации о файле в MongoDB
    const newFile = new File({
      name: file.originalname,
      url: publicUrl,
      type: file.mimetype,
      size: file.size,
    });

    await newFile.save(); // Сохраняем файл в базе данных

    // Возвращаем данные о файле после успешной загрузки
    res.json({
      name: file.originalname,
      url: publicUrl,
      type: file.mimetype,
      size: file.size,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

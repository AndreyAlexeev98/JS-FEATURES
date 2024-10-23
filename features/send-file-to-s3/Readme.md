# Установка и запуск

1. `npm install` - Установите зависимости;
2. Создайте .env файл, с переменныеми из файла .env.example (для yandex взять из личного кабинета в yandex cloud). [Документация по API S3 хранилища от yandex](https://yandex.cloud/ru/docs/storage/s3/)
3. `node server.js` - Запустите сервер;

## Алгоритм работы отправки и сохранения файла

Этот проект позволяет загружать файлы с клиента на сервер и сохранять их в облачное хранилище Яндекса, а также сохранять метаданные в базе данных MongoDB.

======

## Структура проекта

1. **Клиентская часть** (HTML + JavaScript)

   - Пользователь выбирает файл через элемент `<input type="file">`.
   - Файл проходит валидацию:
     - Размер не превышает 5 MB (значение для примера)
     - Формат должен быть `jpg`, `png` или `pdf` (список форматов для примера)
   - После успешной валидации файл отправляется на сервер через `fetch`.

2. **Серверная часть** (Node.js + Express)
   - Сервер принимает файл с помощью `multer` (для обработки файлов).
   - Нужно добавить еще и валидацию на сервере, т.к. злоумышленник может обойти валидацию клиента. Хотябы валидацию на размер файла. Для фотографий, на телефонах с самой продвинутой камерой это будет максимум 30-40 мегабайт.
   - После получения файла:
     1. Генерируется уникальное имя файла с использованием `uuid`.
     2. Файл загружается в облачное хранилище Яндекса с помощью AWS SDK.
     3. Создается публичная ссылка на загруженный файл.
     4. Информация о файле (имя, URL, тип, размер) сохраняется в базе данных MongoDB с помощью Mongoose.

## Шаги работы

1. **Пользователь загружает файл**:

   - Выбор файла через интерфейс веб-приложения.

2. **Валидация файла**:

   - Проверка на наличие файла.
   - Проверка размера файла.
   - Проверка формата файла.

3. **Отправка файла на сервер**:

   - Использование `fetch` для отправки файла на сервер.

4. **Обработка файла на сервере**:

   - Прием файла через `multer`.
   - Загрузка файла в Яндекс S3.
   - Сохранение метаданных в MongoDB.

5. **Возврат ответа**:
   - Успешный ответ с информацией о файле (имя, URL, тип, размер) или сообщение об ошибке.
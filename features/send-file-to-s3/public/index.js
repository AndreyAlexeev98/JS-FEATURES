document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file.");
      return;
    }

    // Валидация размера файла (например, максимум 5 MB)
    const maxSizeInMB = 5;
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeInMB} MB.`);
      return;
    }

    // Валидация формата файла (разрешены только jpg, png, pdf)
    const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedFormats.includes(file.type)) {
      alert("Invalid file format. Only JPG, PNG, and PDF are allowed.");
      return;
    }

    // Если валидация успешна, отправляем файл на сервер. new FormData() - специальный обьект для отправки по http. Поддерживает передачу файлов
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("status").innerText = `
                File uploaded successfully:
                Name: ${result.name}
                URL: ${result.url}
                Type: ${result.type}
                Size: ${(result.size / 1024 / 1024).toFixed(2)} MB
            `;
      } else {
        document.getElementById(
          "status"
        ).innerText = `Upload failed: ${result.message}`;
      }
    } catch (error) {
      document.getElementById("status").innerText = `Error: ${error.message}`;
    }
  });

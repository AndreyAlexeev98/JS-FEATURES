import Cookies from "js-cookie";

// Установка куки с именем "user" и значением "John"
Cookies.set("user", "John");

// Установка куки с опциями (срок действия 7 дней)
Cookies.set("user", "John", { expires: 7 });

// Установка куки с заданным путем
Cookies.set("sessionId", "abc123", { path: "/" });

// Установка куки с флагом secure
Cookies.set("secureCookie", "secureValue", { secure: true });

// Чтение куки с именем "user"
const user = Cookies.get("user"); // 'John'

// Если куки не существует, будет возвращено undefined
const nonExistentCookie = Cookies.get("nonExistent"); // undefined

// Получение всех куков в виде объекта
const allCookies = Cookies.get();
// Пример результата: { user: 'John', sessionId: 'abc123', secureCookie: 'secureValue' }

// Обновление куки "user" с новым значением
Cookies.set("user", "Jane", { expires: 7 }); // Теперь значение будет 'Jane'

// Обновление с другими параметрами
Cookies.set("sessionId", "xyz789", { path: "/new-path", secure: true });

// Удаление куки "user"
Cookies.remove("user");

// Удаление куки с заданным путем
Cookies.remove("sessionId", { path: "/" });

// Удаление куки с заданными параметрами
Cookies.remove("secureCookie", { secure: true });

// Установка куки с объектом
const userPreferences = {
  theme: "dark",
  language: "ru",
};
Cookies.set("preferences", JSON.stringify(userPreferences));

// Чтение и парсинг куки
const preferences = JSON.parse(Cookies.get("preferences")); // { theme: 'dark', language: 'ru' }

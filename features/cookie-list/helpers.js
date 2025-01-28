/**
 * @param {string} name - Имя (ключ) искомой куки.
 * @returns {string|undefined} Возвращает куки с указанным именем или undefined, если ничего не найдено.
 * @description значение куки кодируется, поэтому getCookie использует встроенную функцию decodeURIComponent для декодирования
 */
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Устанавливает куку с заданным именем, значением и опциями.
 *
 * @param {string} name - Имя куки.
 * @param {string} value - Значение куки.
 * @param {Object} [options={}] - Дополнительные параметры куки (например, срок действия, путь, secure).
 * @param {string} [options.path='/'] - Путь, по которому будет доступна кука (по умолчанию '/').
 * @param {boolean} [options.secure] - Указывает, что кука должна передаваться только по защищённым соединениям.
 * @param {number|string|Date} [options.expires] - Срок действия куки.
 * @param {number} [options['max-age']] - Время жизни куки в секундах.
 * @returns {string} Возвращает строку с установленной кукой.
 * @example
 * // Установка куки с именем "user", значением "John" и опцией secure
 * const cookie = setCookie('user', 'John', {secure: true, 'max-age': 3600});
 * console.log(cookie); // "user=John; path=/; secure; max-age=3600"
 */
function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
  return updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

/**
 * Функция парсинга cookies из строки в массив объектов.
 * @returns {Array} - Массив объектов, представляющих пары ключ-значение cookies.
 */
function parceCookies() {
  const cookieArrObj = [];

  document.cookie.split(";").forEach((cook) => {
    const arr = cook.trim().split("=");
    const cookieObj = { key: arr[0], value: arr[1] };

    cookieArrObj.push(cookieObj);
  });

  return cookieArrObj;
}

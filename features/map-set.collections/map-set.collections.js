// Словарь для подсчета сколько раз встречается слово в тексте

const text =
  "Программирование на JavaScript - это весело. JavaScript - это мощный язык.";
const result = countUniqueWords(text);
console.log(result);
// Map(7) { 'Программирование' => 1, 'на' => 1, 'JavaScript' => 2, 'это' => 2, 'весело.' => 1, 'мощный' => 1, 'язык.' => 1 }

function countUniqueWords(string) {
  const words = string.split(" ");
  const map = new Map();
  words.forEach((word) => {
    if (map.has(word)) {
      map.set(word, map.get(word) + 1);
    } else {
      map.set(word, 1);
    }
    map.set(word);
  });

  return map;
}

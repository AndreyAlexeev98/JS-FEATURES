import { Application, Graphics } from "./pixi.mjs";
import { assetsMap } from "./assetsMap.js";

// Create the application
const app = new Application({
  width: 800,
  height: 800,
  backgroundColor: 0xc2c2c2,
  view: document.getElementById("canvas"),
});

const runGame = () => {
  const marker = new Graphics();
  marker.beginFill("0xff0000", 1);
  marker.drawRect(0, 0, 100, 100); // drawRect(x, y, width, heigth) ( x=0 y=0 центр заливки относительно верхнего левого угла рисуемого элемента)
  marker.endFill();

  app.stage.addChild(marker); // Добавили нарисованный на canvas элемент в контейнер
  app.stage.position.set(800 / 2, 800 / 2); // изменили позиционирование добавляемых элементов относительноцентра контейнера
};

assetsMap.sprites.forEach((value) => app.loader.add(value));
app.loader.load(runGame);

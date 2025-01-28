import { Application, Graphics } from "./pixi.mjs";
import { assetsMap } from "./assetsMap.js";
import { Tank } from "./Tank.js";

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
  marker.drawCircle(0, 0, 5); // drawRect(x, y, width, heigth) ( x=0 y=0 центр заливки относительно верхнего левого угла рисуемого элемента)
  marker.endFill();

  const tank = new Tank();
  app.stage.addChild(tank.view);

  //   tank._tracksLeft.play();
  //   tank._tracksRight.play();

  app.stage.addChild(marker); // Добавили нарисованный на canvas элемент в контейнер
  app.stage.position.set(800 / 2, 800 / 2); // изменили позиционирование добавляемых элементов относительноцентра контейнера

  //   tank.rotateTowerBy(50);
  //   tank.rotateBodyBy(60);

  //   (function () {
  //     let isRun = false;
  //     setInterval(() => {
  //       if (isRun) {
  //         tank.stopTracks();
  //       } else {
  //         tank.startTracks();
  //       }
  //       isRun = !isRun;
  //     }, 2000);
  //   })();

  //   const onPointerDown = (event) => {
  //     console.log(event);
  //   };

  //   app.stage.on("pointerdown", onPointerDown, undefined);
};

assetsMap.sprites.forEach((value) => app.loader.add(value));
app.loader.load(runGame);

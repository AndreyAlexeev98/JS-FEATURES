import { Application, Graphics, Rectangle } from "./pixi.mjs";
import { TweenManager } from "./Tween.js";
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
  const tank = new Tank();
  app.stage.addChild(tank.view);

  app.stage.position.set(800 / 2, 800 / 2); // изменили позиционирование добавляемых элементов относительноцентра контейнера

  window["TANK"] = tank;

  const tweenManager = new TweenManager(app.ticker);

  const moveTank = ({ data }) => {
    const distanceToCenter = data.getLocalPosition(app.stage);
    const distanceToTank = data.getLocalPosition(tank.view);
    const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

    let callAmount = 2;
    const move = () => {
      callAmount -= 1;
      if (callAmount <= 0) {
        tweenManager.createTween(
          tank,
          3000,
          { x: distanceToCenter.x, y: distanceToCenter.y },
          {
            onStart: () => tank.startTracks(),
            onFinish: () => tank.stopTracks(),
          }
        );
      }
    };

    tweenManager.createTween(
      tank,
      1000,
      { towerDirection: angle },
      {
        onFinish: () => move(),
      }
    );

    tweenManager.createTween(
      tank,
      2000,
      { bodyDirection: angle },
      {
        onStart: () => {
          tank.startTracks();
        },
        onFinish: () => {
          tank.stopTracks();
          move();
        },
      }
    );
  };

  app.stage.on("pointerdown", moveTank, undefined);
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(-400, -400, 800, 800); // для обработки события по всему stage
};

assetsMap.sprites.forEach((value) => app.loader.add(value));
app.loader.load(runGame);

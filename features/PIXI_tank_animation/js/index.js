import { Application, Graphics, Rectangle } from "./pixi.mjs";
import { TweenManager } from "./Tween.js";
import { assetsMap } from "./assetsMap.js";
import { Tank } from "./Tank.js";
import { APP_BG_COLOR, APP_HEIGHT, APP_WIDTH } from "../config/index.js";

// Create the application
const app = new Application({
  width: APP_WIDTH,
  height: APP_HEIGHT,
  backgroundColor: APP_BG_COLOR,
  view: document.getElementById("canvas"),
});

const runGame = () => {
  const tank = new Tank();
  app.stage.addChild(tank.view);

  app.stage.position.set(APP_WIDTH / 2, APP_HEIGHT / 2); // изменили позиционирование добавляемых элементов относительноцентра контейнера

  // window["TANK"] = tank; // для быстрого дебага в консоле

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

  app.stage.hitArea = new Rectangle(
    `-${APP_WIDTH / 2}`,
    `-${APP_HEIGHT / 2}`,
    APP_WIDTH,
    APP_HEIGHT
  ); // для обработки события по всему stage
};

assetsMap.sprites.forEach((value) => app.loader.add(value));
app.loader.load(runGame);

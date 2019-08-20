import * as PIXI from "pixi.js";
import starter from "./Starter";
import GraphicsHelper from "./GraphicsHelper.js";
import SceneManager from "./managers/SceneManager";
import MainScene from "./scenes/MainScene";
import OutroScene from "./scenes/OutroScene";
import IntroScene from "./scenes/IntroScene";
import settings from "./settings/settings";

class Game {
    constructor() {
        this.backgrounds = [];

        this._ticker = null;

        this._init();
    }

    _init() {
        this._ticker = new PIXI.Ticker();
        this._ticker.start();
        this._ticker.add(delta => {
            this._tick(delta);
        });

        this._setBackground();

        SceneManager.registerScene(`intro`, new IntroScene());
        SceneManager.registerScene(`main`, new MainScene());
        SceneManager.registerScene(`outro`, new OutroScene());

        SceneManager.showScene(`intro`);
    }

    _setBackground() {
        const { width, height } = settings.app;
        let bgStartYPosition = -height / 2;

        for (let i = 0; i < 2; i++) {
            const background = GraphicsHelper.createSprite({
                name: "background",
                x: width / 2,
                y: bgStartYPosition,
            });
            background.setParent(starter.app.stage);
            background.anchor.set(0.5);

            this.backgrounds.push(background);

            bgStartYPosition += height;
        }
    }

    _tick(delta) {
        const dt = delta / 16;

        for (let i = 0; i < dt; i++) {
            this._moveBackGround();
        }
    }

    _moveBackGround() {
        const { height, bgSpeed } = settings.app;

        this.backgrounds.forEach(el => {
            const oldYPosition = el.y;
            let newPosition = 0;

            newPosition =
                el.y >= height / 2 + height - bgSpeed
                    ? -height / 2
                    : oldYPosition + bgSpeed;

            el.y = newPosition;
        });
    }
}

export default Game;

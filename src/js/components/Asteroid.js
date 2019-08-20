import starter from "../Starter";
import GraphicsHelper from "../GraphicsHelper";
import CollisionManager from "../managers/CollisionManager";
import TWEEN from "tween.js";
import * as PIXI from "pixi.js";
import Utils from "../utils";
import settings from "../settings/settings";

class Asteroid {
    constructor(config) {
        this.sprite = null;

        this._radius = 75;

        this.data = {
            owner: `Asteroid`,
        };

        this._rotation = 0;

        this._init(config);
    }

    _init(config) {
        const { x, y, level } = config;

        this.sprite = GraphicsHelper.createSprite({
            name: "asteroid",
            x,
            y,
        });
        this.sprite.anchor.set(0.5);
        this.sprite.setParent(starter.app.stage);

        CollisionManager.registerObject(this);

        this._ticker = new PIXI.Ticker();
        this._ticker.start();
        this._ticker.add(() => {
            TWEEN.update();
            this._tick();
        });

        this._move(level);
    }

    _move(level) {
        switch (level) {
            case 2:
                this._moveRandom();
                break;
            case 3:
                this._moveDown();
                break;
        }
    }

    _moveRandom() {
        if (!this.sprite) {
            return;
        }

        const { width, height } = settings.app;
        const margin = 150;
        const time = Utils.getRandom(3000, 5000);
        const endXPoint = Utils.getRandom(100, width - margin);
        const endYPoint = Utils.getRandom(100, height / 2);

        this.moveTween = new TWEEN.Tween(this.sprite)
            .to({ x: endXPoint, y: endYPoint }, time)
            .onComplete(() => this._moveRandom())
            .start();

        this._setRotation(0.01);
    }

    _moveDown() {
        const height = settings.app.height;
        const margin = 150;

        this.moveTween = new TWEEN.Tween(this.sprite)
            .to({ y: height + margin }, 3000)
            .onComplete(() => {
                this.moveTween = null;
                this.destroy();
            })
            .start();

        this._setRotation(0.03);
    }

    _setRotation(speed) {
        const direction = Math.random() <= 0.5 ? -1 : 1;
        this._rotation = speed * direction;
    }

    _tick() {
        if (this.sprite) {
            this.sprite.rotation += this._rotation;
        }
    }

    destroy() {
        if (this.moveTween) {
            this.moveTween.stop();
            this.moveTween = null;
        }

        if (this._ticker) {
            this._ticker.stop();
            this._ticker = null;
        }

        starter.app.stage.removeChild(this.sprite);
        this.sprite = null;
    }

    hide() {
        if (this.sprite) {
            this.sprite.alpha = 0;
        }
    }

    get collisionInfo() {
        return {
            x: this.sprite.x,
            y: this.sprite.y,
            radius: this._radius,
        };
    }
}

export default Asteroid;

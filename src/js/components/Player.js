import * as PIXI from "pixi.js";
import GraphicsHelper from "../GraphicsHelper";
import starter from "../Starter";
import Bullet from "./Bullet";
import Emitter from "component-emitter";
import settings from "../settings/settings";

class Player {
    constructor() {
        this._ticker = null;
        this._sprite = null;
        this._spaceIsDown = false;

        this._direction = 0;
        this._isEndGame = false;

        this._data = { ...settings.player };

        this._isMakeShot = true;

        new Emitter(this);

        this._init();
        this._addListeners();
    }

    _init() {
        this._ticker = new PIXI.Ticker();
        this._ticker.start();

        this._ticker.add(delta => {
            this._tick(delta);
        });

        this._sprite = GraphicsHelper.createSprite({
            x: 600,
            y: 620,
            name: "spaceship",
        });

        this._sprite.anchor.set(0.5);
        this._sprite.setParent(starter.app.stage);
    }

    _addListeners() {
        document.body.addEventListener(
            "keydown",
            e => this._move(e.keyCode, e),
            false
        );
        document.body.addEventListener("keyup", e => this._stop(e), false);
    }

    _move(code, e) {
        switch (code) {
            case 32:
                this._makeShot();
                break;
            case 37:
                this._direction = -1;
                break;
            case 39:
                this._direction = 1;
                break;
        }
    }

    _stop(e) {
        this._spaceIsDown = false;
        this._direction = e.keyCode !== 32 ? 0 : this._direction;
    }

    _makeShot() {
        if (this._spaceIsDown) {
            return;
        }
        this._spaceIsDown = true;

        if (!this._isMakeShot || this._isEndGame) {
            return;
        }

        new Bullet({ x: this._sprite.x, y: this._sprite.y });
        this.emit("updateShots");

        this._data.timeBetweenShoots = 30;
        this._isMakeShot = false;
    }

    _checkOutsidePosition() {
        let xPos = this._sprite.x;
        const halfWidth = this._sprite.width / 2;
        const appWidth = settings.app.width;

        if (xPos + halfWidth >= appWidth || xPos - halfWidth <= 0) {
            this._sprite.x =
                xPos - halfWidth <= 0 ? halfWidth : appWidth - halfWidth;
        }
    }

    _tick(delta) {
        this._data.timeBetweenShoots -= delta;

        if (this._data.timeBetweenShoots <= 0) {
            this._isMakeShot = true;
        }

        this._checkOutsidePosition();

        this._sprite.x += this._data.speed * this._direction;
    }

    remove() {
        this._isEndGame = true;
        starter.app.stage.removeChild(this._sprite);
    }
}

export default Player;

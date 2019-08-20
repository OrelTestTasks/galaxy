import * as PIXI from "pixi.js";
import starter from "../Starter";
import GraphicsHelper from "../GraphicsHelper";
import CollisionManager from "../managers/CollisionManager";
import settings from "../settings/settings";
import Utils from "../utils";
class Bullet {
    constructor({ x, y }) {
        this._sprite = null;

        this.data = {
            owner: `Bullet`,
        };

        this._init(x, y);
    }

    _init(x, y) {
        const { radius } = settings.bullet;
        const color = Utils.getRandomColor();
        this._ticker = new PIXI.Ticker();
        this._ticker.start();

        this._ticker.add(delta => {
            this._tick(delta);
        });

        //75 - half player width
        this.container = GraphicsHelper.createContainer({
            x: x,
            y: y - 75,
        });

        this.container.setParent(starter.app.stage);

        this._sprite = GraphicsHelper.drawCircleGraphics({
            color: color,
            x: 0,
            y: 0,
            radius: radius,
        });
        this._sprite.setParent(this.container);
        CollisionManager.registerObject(this);
    }

    _tick() {
        if (!this.container) {
            return;
        }

        const { speed } = settings.bullet;

        this.container.y -= speed;

        if (this.container.y <= -30) {
            this.destroy();
        }
    }

    destroy() {
        starter.app.stage.removeChild(this.container);
        this.container = null;
        this._sprite = null;
    }

    get collisionInfo() {
        const { radius } = settings.bullet;

        return {
            x: this.container.x,
            y: this.container.y,
            radius: radius,
        };
    }
}

export default Bullet;

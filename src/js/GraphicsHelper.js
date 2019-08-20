import * as PIXI from "pixi.js";
import IMAGES from "@images";

export default class GraphicsHelper {
    static createContainer(settings = {}) {
        const { x = 0, y = 0, width = 0, height = 0 } = settings;

        const container = new PIXI.Container();
        container.x = x;
        container.y = y;
        container.width = width;
        container.height = height;

        return container;
    }

    static createSprite(settings) {
        const { name, x = 0, y = 0, onClick } = settings;

        const base64source = IMAGES[name];
        const texture = PIXI.Texture.fromLoader(base64source);

        const sprite = new PIXI.Sprite(texture);
        sprite.x = x;
        sprite.y = y;

        if (onClick) {
            sprite.buttonMode = true;
            sprite.interactive = true;
            sprite.on("pointerdown", onClick);
        }

        return sprite;
    }

    static drawCircleGraphics(settings) {
        const { color = 0x000000, x = 0, y = 0, radius = 0 } = settings;

        const graphics = new PIXI.Graphics();
        graphics.lineStyle(0);
        graphics.beginFill(color, 1);
        graphics.drawCircle(x, y, radius);
        graphics.endFill();

        return graphics;
    }

    static drawText(settings) {
        const sourceTxt = `input your text`;
        const { text = sourceTxt, x = 0, y = 0, style } = settings;

        const txt = new PIXI.Text(text, style);
        txt.x = x;
        txt.y = y;
        txt.anchor.set(0.5);

        return txt;
    }

    static drawGraphics(settings) {
        const {
            color = 0x000000,
            x = 0,
            y = 0,
            width = 20,
            height = 20,
            rounded = 0,
            onClick,
        } = settings;

        const graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(x, y, width, height, rounded);
        graphics.endFill();

        if (onClick) {
            graphics.buttonMode = true;
            graphics.interactive = true;
            graphics.on("pointerdown", onClick);
        }

        return graphics;
    }
}

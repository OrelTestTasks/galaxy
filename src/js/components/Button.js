import GraphicsHelper from "../GraphicsHelper";
import starter from "../Starter";

class Button {
    constructor(settings) {
        this._init(settings);
    }

    _init(settings) {
        const { x, y, width, height, color, text, onClick } = settings;

        this._buttonContainer = GraphicsHelper.createContainer({
            x,
            y,
        });
        this._buttonContainer.setParent(starter.app.stage);

        this._button = GraphicsHelper.drawGraphics({
            x: 0,
            y: 0,
            width,
            height,
            color,
            rounded: 15,
            onClick: onClick,
        });
        this._button.setParent(this._buttonContainer);

        this.startText = GraphicsHelper.drawText({
            x: 100,
            y: 37,
            text,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 27,
                strokeThickness: 3,
            },
        });

        this.startText.setParent(this._button);
    }

    hide() {
        this._button.alpha = 0;
        this._button.interactive = false;
    }

    show() {
        this._button.alpha = 1;
        this._button.interactive = true;
    }
}

export default Button;

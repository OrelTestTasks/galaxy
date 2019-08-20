import Button from "../components/Button.js";
import starter from "../Starter";
import GraphicsHelper from "../GraphicsHelper";
import SceneManager from "../managers/SceneManager";
import settings from "../settings/settings";
import texts from "../settings/texts";

class IntroScene {
    constructor() {
        this._logo = null;
        this.easyButton = null;
        this.mediumButton = null;
        this.hardButton = null;

        this._buttonsColor = 0x006600;
        this._init();
    }

    _init() {
        const width = settings.app.width;
        const logoXPosition = width / 2;
        const { gameName, easyButton, mediumButton, hardButton } = texts;

        this._logo = GraphicsHelper.drawText({
            x: logoXPosition,
            y: 300,
            text: gameName,
            style: {
                fill: "white",
                fontFamily: "Tahoma, Geneva, sans-serif",
                fontSize: 90,
                strokeThickness: 3,
            },
        });

        this._logo.setParent(starter.app.stage);

        this.easyButton = new Button({
            x: 540,
            y: 400,
            width: 200,
            height: 75,
            color: this._buttonsColor,
            text: easyButton,
            onClick: () => SceneManager.showScene(`main`, { level: 1 }),
        });

        this.mediumButton = new Button({
            x: 540,
            y: 480,
            width: 200,
            height: 75,
            color: this._buttonsColor,
            text: mediumButton,
            onClick: () => SceneManager.showScene(`main`, { level: 2 }),
        });

        this.hardButton = new Button({
            x: 540,
            y: 560,
            width: 200,
            height: 75,
            color: this._buttonsColor,
            text: hardButton,
            onClick: () => SceneManager.showScene(`main`, { level: 3 }),
        });
    }

    show() {
        this.easyButton.show();
        this.mediumButton.show();
        this.hardButton.show();
        this._logo.alpha = 1;
    }

    hide() {
        this.easyButton.hide();
        this.mediumButton.hide();
        this.hardButton.hide();
        this._logo.alpha = 0;
    }
}

export default IntroScene;

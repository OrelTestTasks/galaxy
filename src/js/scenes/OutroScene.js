import Button from "../components/Button";
import starter from "../Starter";
import GraphicsHelper from "../GraphicsHelper";
import SceneManager from "../managers/SceneManager";
import CollisionManager from "../managers/CollisionManager";
import InfoBar from "../components/InfoBar";
import settings from "../settings/settings";
import texts from "../settings/texts";

class OutroScene {
    constructor() {
        this._logo = null;
        this._restartButton = null;
        this._scoreText = null;

        this._init();
    }

    _init() {
        const { width } = settings.app;
        const { lose, restartButton, score } = texts;

        this._logo = GraphicsHelper.drawText({
            x: width / 2,
            y: 300,
            text: lose,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 87,
                strokeThickness: 3,
            },
        });

        this._logo.setParent(starter.app.stage);

        //100 - half button width
        this._restartButton = new Button({
            x: width / 2 - 100,
            y: 500,
            width: 200,
            height: 75,
            color: 0x006600,
            text: restartButton,
            onClick: () => this._restart(),
        });

        this._scoreText = GraphicsHelper.drawText({
            x: width / 2,
            y: 400,
            text: score,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 87,
                strokeThickness: 3,
            },
        });

        this._scoreText.setParent(starter.app.stage);

        this.hide();
    }

    _restart() {
        SceneManager.showScene(`intro`);
        CollisionManager.reset();
        InfoBar.reset();
    }

    hide() {
        this._logo.alpha = 0;
        this._restartButton.hide();
        this._scoreText.alpha = 0;
    }

    show(data) {
        CollisionManager.hideAsteroids();
        const text = data.text;

        this._scoreText.text = `your score: ${InfoBar.getScore}`;
        this._scoreText.alpha = 1;

        this._logo.text = text;
        this._logo.alpha = 1;

        this._restartButton.show();
    }
}

export default OutroScene;

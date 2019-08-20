import starter from "../Starter";
import GraphicsHelper from "../GraphicsHelper";
import levelManager from "../managers/LevelManager";

class InfoBar {
    constructor() {
        this._container = null;

        this._scoreText = null;
        this._shotText = null;
        this._timeText = null;

        this._data = {};

        this._data.score = 0;
    }

    init() {
        this._data = { ...levelManager.levelSettings, score: 0 };

        this._container = GraphicsHelper.createContainer({
            x: 640,
            y: 40,
        });
        this._container.setParent(starter.app.stage);

        this._scoreText = GraphicsHelper.drawText({
            x: 0,
            y: 0,
            text: `score: 0`,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 67,
                strokeThickness: 3,
            },
        });
        this._scoreText.setParent(this._container);

        this._shotText = GraphicsHelper.drawText({
            x: -300,
            y: 0,
            text: `shots: ${this._data.shot}`,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 67,
                strokeThickness: 3,
            },
        });

        this._shotText.setParent(this._container);

        this._timeText = GraphicsHelper.drawText({
            x: 300,
            y: 0,
            text: `time: ${this._data.time}`,
            style: {
                fill: "white",
                fontFamily: "Comic Sans MS",
                fontSize: 67,
                strokeThickness: 3,
            },
        });
        this._timeText.setParent(this._container);
    }

    updateScore(val) {
        this._data.score += val;
        this._scoreText.text = `score: ${this._data.score}`;
    }

    updateShots() {
        this._data.shot--;
        this._shotText.text = `shots: ${this._data.shot}`;
    }

    updateTime(time) {
        this._timeText.text = `time: ${time}`;
    }

    hide() {
        this._container.alpha = 0;
    }

    show() {
        this._container.alpha = 1;
    }

    reset() {
        const { time, shot } = levelManager.levelSettings;

        this._data = {
            time,
            shot,
            score: 0,
        };

        this._scoreText.text = `score: 0`;
        this._shotText.text = `shots: ${shot}`;
        this._timeText.text = `time: ${time}`;
    }

    get getScore() {
        return this._data.score;
    }
}

export default new InfoBar();

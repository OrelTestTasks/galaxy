import Asteroid from "../components/Asteroid";
import InfoBar from "../components/InfoBar";
import * as PIXI from "pixi.js";
import Utils from "../utils";
import settings from "../settings/settings";
import CollisionManager from "./CollisionManager";
import texts from "../settings/texts.js";

class LevelManager {
    constructor() {
        this._asteroidCounts = 0;
        this._timeBetweenDrawAsteroids = 0;
        this._endlessMode = false;
        this._currentLevel = 0;

        this.reset();

        this._ticker = new PIXI.Ticker();
        this._ticker.start();
        this._ticker.add(() => {
            this._tick(this._ticker.deltaMS);
        });
    }

    reset() {
        this._asteroidCounts = 7;
        this._timeBetweenDrawAsteroids = 0;
        this._endlessMode = false;
    }

    initLevel(level) {
        this._currentLevel = level;
    }

    startCurrentLevel() {
        this.reset();

        this._timeMS = this.levelSettings.time * 1000; // MS
        this._oldTimeS = this.levelSettings.time; // S

        switch (this._currentLevel) {
            case 1:
                this._drawEasyLevel();
                break;
            case 2:
                this._drawEasyLevel();
                break;
            case 3:
                this._drawHardLevel();
                break;
            default:
                console.info(`Level ${this._currentLevel} not found`);
        }
    }

    checkGameOverStatus() {
        const { win, lose, gameOver } = texts;
        const timeEnded = this._timeMS <= 0;

        if (timeEnded && this._endlessMode) {
            return {
                status: true,
                message: gameOver,
            };
        } else if (timeEnded) {
            return {
                status: true,
                message: lose,
            };
        } else if (this._endlessMode) {
            return {
                status: false,
                message: "",
            };
        }

        const hasAsteroids = CollisionManager.hasAsteroids;
        const hasShots = CollisionManager.hasShots;
        const status = !hasShots || !hasAsteroids;
        let message = "";

        if (status) {
            message = hasAsteroids ? lose : win;
        }

        return {
            status,
            message,
        };
    }

    _drawEasyLevel() {
        let startXPosition = 100;
        let yPosition = 150;

        for (let i = 1; i <= this._asteroidCounts; i++) {
            this._drawAsteroid(startXPosition, yPosition);

            startXPosition += 175;
            yPosition = yPosition === 150 ? 200 : 150;
        }
    }

    _drawAsteroid(x, y) {
        const asteroid = new Asteroid({
            x,
            y,
            level: this._currentLevel,
        });
    }

    _drawHardLevel() {
        this._endlessMode = true;
    }

    _updateTime(delta) {
        this._timeMS -= delta;
        const newTime = Math.round(this._timeMS / 1000);

        if (newTime < this._oldTimeS) {
            InfoBar.updateTime(newTime);
            this._oldTimeS = newTime;
        }
    }

    _tick(delta) {
        this._updateTime(delta);

        if (this._endlessMode) {
            this._timeBetweenDrawAsteroids -= delta;

            if (this._timeBetweenDrawAsteroids <= 0) {
                const time = Utils.getRandom(500, 1500);

                this._drawAsteroid(Utils.getRandom(250, 900), -150);
                this._timeBetweenDrawAsteroids = time;
            }
        }
    }

    get levelSettings() {
        return settings.levels[this._currentLevel];
    }
}

export default new LevelManager();

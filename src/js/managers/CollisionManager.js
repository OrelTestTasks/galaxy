import * as PIXI from "pixi.js";
import Utils from "../utils";
import SceneManager from "./SceneManager";
import levelManager from "./LevelManager";
import InfoBar from "../components/InfoBar";

class CollisionManager {
    constructor() {
        this._bullets = [];
        this._asteroids = [];

        this._shotsLeft = 0;

        this._ticker = null;
    }

    registerObject(obj) {
        switch (obj.data.owner) {
            case objectInfo.bullet:
                this._bullets.push(obj);
                this._shotsLeft--;
                break;
            case objectInfo.asteroid:
                this._asteroids.push(obj);
                break;
        }
    }

    hideAsteroids() {
        this._asteroids.forEach(asteroid => {
            asteroid.hide();
        });
    }

    reset() {
        this._bullets.forEach(el => el.destroy());
        this._bullets = [];

        this._asteroids.forEach(el => el.destroy());
        this._asteroids = [];

        this._shotsLeft = 0;

        this._time = levelManager.levelSettings.time * 1000;
        this._oldTime = this._time;
    }

    start() {
        const currentLevel = levelManager.levelSettings;

        this._shotsLeft = currentLevel.shot;

        levelManager.startCurrentLevel();

        if (!this._ticker) {
            this._ticker = new PIXI.Ticker();
            this._ticker.start();
            this._ticker.add(() => {
                this._tick(this._ticker.deltaMS);
            });
        }
    }

    get hasAsteroids() {
        return !!this._asteroids.length;
    }

    get hasShots() {
        return !!this._bullets.length || this._shotsLeft > 0;
    }

    _checkCollide() {
        const collisions = new Set();

        this._asteroids = this._asteroids.filter(a => a.sprite);
        this._bullets = this._bullets.filter(b => b.container);

        this._asteroids.forEach(asteroid => {
            this._bullets.forEach(bullet => {
                const asteroidInfo = asteroid.collisionInfo;
                const bulletInfo = bullet.collisionInfo;

                const isCollide = Utils.isCollision({
                    x1: asteroidInfo.x,
                    y1: asteroidInfo.y - 24,
                    r1: asteroidInfo.radius,
                    x2: bulletInfo.x,
                    y2: bulletInfo.y,
                    r2: bulletInfo.radius,
                });

                if (isCollide) {
                    collisions.add(asteroid);
                    collisions.add(bullet);

                    InfoBar.updateScore(1);
                }
            });
        });

        collisions.forEach(item => item.destroy());
    }

    _tick() {
        const gameOverStatus = levelManager.checkGameOverStatus();
        if (gameOverStatus.status) {
            if (this._ticker) {
                this._ticker.stop();
                this._ticker = null;
            }

            SceneManager.showScene(`outro`, {
                text: gameOverStatus.message,
                shoots: this._shotsLeft,
                score: 5,
            });
            return;
        }

        this._checkCollide();
    }
}

const objectInfo = {
    bullet: "Bullet",
    asteroid: "Asteroid",
};

export default new CollisionManager();

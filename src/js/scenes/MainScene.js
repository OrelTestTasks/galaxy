import Player from "../components/Player";
import CollisionManager from "../managers/CollisionManager";
import levelManager from "../managers/LevelManager";
import InfoBar from "../components/InfoBar";

class MainScene {
    constructor() {
        this.player = null;
    }

    _start(level) {
        levelManager.initLevel(level);

        CollisionManager.start();

        this.player = new Player();
        this.player.on("updateShots", () => {
            InfoBar.updateShots();
        });

        InfoBar.init();
    }

    show(data) {
        this._start(data.level);
        InfoBar.show();
    }

    hide() {
        this.player.remove();
        this.player = null;

        InfoBar.hide();
    }
}

export default MainScene;

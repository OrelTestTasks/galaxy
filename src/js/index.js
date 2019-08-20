import "@styles";
import starter from "./Starter";
import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".content");
    if (container) {
        starter.init(container).then(() => {
            const game = new Game();
        });
    }
});

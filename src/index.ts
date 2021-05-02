import * as PIXI from "pixi.js";
import { Nature } from "./components/Nature";

import "./style.css";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0x000000,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);

    resizeCanvas();
};

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    resize();

    window.addEventListener("resize", resize);
}

new Nature(stage);

import * as PIXI from "pixi.js";
import * as Tone from "tone";

import { Nature } from "./components/Nature";
import { Eye } from "./components/Eye";
import { Light } from "./components/Light";

import "./style.css";

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0x000000,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

//new Nature(stage);
const eye1 = new Eye(stage);
const eye2 = new Eye(stage);

window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);
    resizeCanvas();
};

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        eye1.getSprite().x = window.innerWidth / 2 - 100;
        eye2.getSprite().x = window.innerWidth / 2 + 50;

        eye1.getSprite().y = window.innerHeight / 2;
        eye2.getSprite().y = window.innerHeight / 2;
    };

    resize();

    window.addEventListener("resize", resize);
}

const nature = new PIXI.Sprite();
stage.addChild(nature);

new Nature(nature);

stage.filters = [];

let isFirst = true;

const reverb = new Tone.Reverb().toDestination();

const player = new Tone.Player({
    url: "assets/ambient.mp3",
    loop: true,
    volume: 6,
    fadeIn: 4,
    reverse: true,
}).connect(reverb);

const playerLight = new Tone.Player({
    url: "assets/light1.mp3",
    volume: 10,
}).connect(reverb);

document.addEventListener("click", (e) => {
    if (isFirst) {
        isFirst = false;

        Tone.loaded().then(() => {
            player.start();
        });
    }
    new Light(nature, e.clientX, playerLight);
});
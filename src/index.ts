import * as PIXI from "pixi.js";
import * as Tone from "tone";

import { Nature } from "./components/Nature";
import { Eye } from "./components/Eye";
import { Light } from "./components/Light";

import "./style.css";

const app = new PIXI.Application({
    backgroundColor: 0x000000,
    resizeTo: window,
});

const stage = app.stage;

//new Nature(stage);
const eye1 = new Eye(stage);
const eye2 = new Eye(stage);

window.onload = async (): Promise<void> => {
    document.body.appendChild(app.view);
    resizeCanvas();
};

(window as any).canvasWidth = window.innerWidth;
(window as any).canvasHeight = window.innerHeight;

function resizeCanvas(): void {
    const resize = () => {
        (window as any).canvasWidth = window.innerWidth;
        (window as any).canvasHeight = window.innerHeight;

        eye1.getSprite().x = window.innerWidth / 2 - 75 / 2 - 95;
        eye2.getSprite().x = window.innerWidth / 2 - 75 / 2 + 95;

        eye1.getSprite().y = window.innerHeight / 2 - 25 / 2;
        eye2.getSprite().y = window.innerHeight / 2 - 25 / 2;

        app.renderer.resize(window.innerWidth, window.innerHeight);
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
    volume: 7,
}).connect(reverb);

document.addEventListener("click", light);
document.addEventListener("touchstart", light);

let lightObject;

function light(e) {
    let x;

    if (e.touches) {
        x = e.touches[0].clientX;
    }

    if (e.clientX) {
        x = e.clientX;
    }

    if (isFirst) {
        isFirst = false;

        Tone.loaded().then(() => {
            player.start();

            lightObject = new Light(nature, x, playerLight);
            setTimeout(() => {
                lightObject = null;
            }, 350);
        });
    } else {
        if (!lightObject) {
            lightObject = new Light(nature, x, playerLight);
            setTimeout(() => {
                lightObject = null;
            }, 350);
        }
    }
}

function doLight() {
    light({ clientX: Math.random() * window.innerWidth });
    setTimeout(doLight, 2000 * Math.random());
}

doLight();

import * as PIXI from "pixi.js";
import gsap, { TweenLite } from "gsap";

export class Eye {
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }
}

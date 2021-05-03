import * as PIXI from "pixi.js";
import gsap, { TweenLite } from "gsap";

export class Branch {
    private stage: PIXI.Container;
    private size: number;
    private x: number;
    private y: number;
    private z = 0.5;
    private delay: number;
    private angle: number;
    private lineSprite: PIXI.Sprite;
    private readonly ANIMATION_TIME = 3;
    private readonly DELAY = 0.2;
    private readonly MIN_SIZE = 5;
    private readonly NEXT_SIZE = 0.67;
    private readonly FOV = 95;

    constructor(stage: PIXI.Container, size: number, x: number, y: number, angle = 0, delay = 0, z = 0) {
        this.stage = stage;
        this.size = size;
        this.delay = delay;
        this.z = z;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.lineSprite = new PIXI.Sprite();
        this.create();
    }

    private create() {
        this.lineSprite = new PIXI.Sprite();
        this.stage.addChild(this.lineSprite);

        this.lineSprite.rotation = this.angle;
        this.lineSprite.pivot.y = this.size;

        const lineGraph: PIXI.Graphics = new PIXI.Graphics();

        lineGraph.lineStyle(2 - this.delay, 0x2a0fed).lineTo(0, this.size);

        this.lineSprite.x = this.lineSprite.width / 2;
        this.lineSprite.addChild(lineGraph);

        if (this.size > this.MIN_SIZE) {
            new Branch(
                this.lineSprite,
                this.size * this.NEXT_SIZE,
                this.x,
                -this.size,
                1.5 + (Math.PI / Math.random()) * 1.5,
                this.delay + this.DELAY
            );
            new Branch(
                this.lineSprite,
                this.size * this.NEXT_SIZE,
                this.x,
                -this.size,
                -(1.5 + Math.PI / Math.random()) * 1.5,
                this.delay + this.DELAY
            );
        }

        TweenLite.from(this.lineSprite, this.ANIMATION_TIME, {
            rotation: this.angle === 0 ? 0 : this.angle + (-1.5 + Math.random() * 3),
            alpha: 0,
            delay: this.delay,
        });
    }

    public getSprite() {
        return this.lineSprite;
    }

    public getZ() {
        return this.z;
    }

    public setZ(z: number) {
        this.z = z;
        this.render2DPosition();
        if (this.z < -80) {
            gsap.killTweensOf(this.lineSprite);
            this.stage.removeChild(this.lineSprite);
            this.z = 40;
            this.create();
            TweenLite.from(this, 2, { y: this.y + 10 });
        }
    }

    private render2DPosition() {
        const scale = this.FOV / (this.FOV + this.z);
        const x2d = this.x * scale + window.innerWidth / 2;
        const y2d = this.y * scale + window.innerHeight / 2;

        this.lineSprite.scale.set(scale);
        this.lineSprite.x = x2d;
        this.lineSprite.y = y2d;
    }
}

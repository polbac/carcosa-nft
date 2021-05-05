import * as PIXI from "pixi.js";
import { TimelineLite, TweenLite } from "gsap";

export class Eye {
    private stage: PIXI.Container;
    private eyeSprite: PIXI.Sprite;
    private eyeGraph: PIXI.Graphics;

    public readonly SIZE_WIDTH = 75;
    private readonly SIZE_HEIGHT = 25;

    constructor(stage: PIXI.Container) {
        this.stage = stage;

        this.eyeSprite = new PIXI.Sprite();
        this.eyeSprite.alpha = 0;
        TweenLite.to(this.eyeSprite, 1, { alpha: 1, delay: 1 });

        this.stage.addChild(this.eyeSprite);

        this.eyeGraph = new PIXI.Graphics();

        this.eyeGraph
            .beginFill(0x2a0fed, 1)
            .bezierCurveTo(0, 0, this.SIZE_WIDTH / 2, this.SIZE_HEIGHT / 2, this.SIZE_WIDTH, 0)
            .bezierCurveTo(this.SIZE_WIDTH, 0, this.SIZE_WIDTH / 2, -this.SIZE_HEIGHT / 2, 0, 0);

        this.eyeGraph.beginFill(0x000000, 1).drawCircle(this.SIZE_WIDTH / 2, 0, 10);

        this.eyeSprite.addChild(this.eyeGraph);

        document.addEventListener("mousemove", (e) => {
            this.eyeGraph
                .clear()
                .beginFill(0x2a0fed, 1)
                .bezierCurveTo(0, 0, this.SIZE_WIDTH / 2, this.SIZE_HEIGHT / 2, this.SIZE_WIDTH, 0)
                .bezierCurveTo(this.SIZE_WIDTH, 0, this.SIZE_WIDTH / 2, -this.SIZE_HEIGHT / 2, 0, 0);

            this.eyeGraph
                .beginFill(0x000000, 1)
                .drawCircle(this.SIZE_WIDTH / 2 - ((window as any).canvasWidth / 2 - e.clientX) / 50, 0, 10);
        });

        const t = new TimelineLite({ repeat: -1 });

        t.to(this.eyeSprite.scale, 1, { y: 1 });

        t.to(this.eyeSprite.scale, 1, { y: 0, delay: 5 });
    }

    public getSprite() {
        return this.eyeSprite;
    }
}

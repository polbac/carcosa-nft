import * as PIXI from "pixi.js";

export class Light {
    private stage: PIXI.Container;
    private lightSprite: PIXI.Sprite;

    constructor(stage: PIXI.Container, x: number) {
        this.stage = stage;
        this.lightSprite = new PIXI.Sprite();
        const rectGraph: PIXI.Graphics = new PIXI.Graphics();
        rectGraph.beginFill(0x000000, 0.4);
        rectGraph.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.stage.addChild(this.lightSprite);
        this.lightSprite.addChild(rectGraph);

        this.createLight({ x });

        setTimeout(() => {
            this.stage.removeChild(this.lightSprite);
            this.lightSprite.destroy();
        }, 200);
    }

    createLight({
        x,
        y = 0,
        direction = 0,
        delay = 0,
    }: {
        x: number;
        y?: number;
        direction?: number;
        delay?: number;
    }): void {
        const lineGraph: PIXI.Graphics = new PIXI.Graphics();

        let _x = x;
        let _y = y;
        let i = 0;

        const lineStyle = lineGraph.lineStyle(1, 0xffffff).moveTo(_x, _y);
        const minHeight = window.innerHeight / 1.5;
        while (_y < window.innerHeight) {
            _x += Math.sin(i) * 20 + direction;
            _y += i * Math.random() * 10 + direction;
            lineStyle.lineTo(_x, _y);

            i += Math.random() * 5;

            if (Math.random() > 0.85 && _y > minHeight) {
                let direction = 0;
                if (_x > x) {
                    direction = 10 + Math.random() * 10;
                } else {
                    direction = -10 - Math.random() * 10;
                }
                const _delay = delay + 1;
                this.createLight({ x: _x, y: _y, direction, delay: _delay });
            }
        }
        this.lightSprite.addChild(lineGraph);
    }
}

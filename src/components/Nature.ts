import * as PIXI from "pixi.js";
import { Branch } from "./Branch";

export class Nature {
    private creating = true;
    private stage: PIXI.Container;
    private poolBranches: Branch[] = [];
    private readonly TOTAL_BRANCHES = 20;
    private readonly SPEED = 0.85;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.createBranches();
        this.render();
        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        this.poolBranches.forEach((branch) => {
            branch.setZ(branch.getZ() - this.SPEED);
        });
        window.requestAnimationFrame(this.render.bind(this));
    }

    createBranches() {
        console.log("TOTAL_BRANCHES", this.TOTAL_BRANCHES);
        let widthSize = 400;
        let widthSizeOffset = 100;

        let heightSize = 300;
        let heightSizeOffset = 100;
        let SSIZE = 100;
        if ((window as any).canvasWidth < 800) {
            widthSize = 100;
            widthSizeOffset = 50;

            heightSize = 100;
            heightSizeOffset = 10;

            SSIZE = 70;
        }

        for (let i = 0; i < this.TOTAL_BRANCHES; i++) {
            const size = SSIZE + Math.random() * (SSIZE * 1.5);
            const negativeX = Math.random() > 0.5;

            const x = negativeX
                ? -widthSize - Math.random() * widthSizeOffset
                : widthSize + Math.random() * widthSizeOffset;

            const y = heightSizeOffset + Math.random() * heightSize;

            const angle = negativeX ? Math.random() * 10 : Math.random() * -10;
            const branch = new Branch(this.stage, size, x, y, angle, 0);
            branch.setZ(10 * Math.random() * 10);
            this.poolBranches.push(branch);
        }
    }

    public stop() {
        this.creating = false;
    }

    public resume() {
        this.creating = true;
    }
}

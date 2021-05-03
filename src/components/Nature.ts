import * as PIXI from "pixi.js";
import { Branch } from "./Branch";

export class Nature {
    private creating = true;
    private stage: PIXI.Container;
    private poolBranches: Branch[] = [];
    private readonly TOTAL_BRANCHES = 20;
    private readonly SPEED = 0.95;

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
        for (let i = 0; i < this.TOTAL_BRANCHES; i++) {
            const size = 100 + Math.random() * 150;
            const negativeX = Math.random() > 0.5;
            const x = negativeX ? -400 - Math.random() * 100 : 400 + Math.random() * 100;
            const y = 100 + Math.random() * 300;
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

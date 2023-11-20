import { Container, Point } from "pixi.js";
import { IPacMan, PacMan } from "./Objects/PacMan"
import { ITweenerManager } from "../../Common/Tweener/Tweener";

export interface IObjectsFactory
{
    CreatePacMan() : IPacMan;
}

// #########################################

export class ObjectsFactory implements IObjectsFactory
{
    private readonly _parent: Container;
    private readonly _tweenManager: ITweenerManager;

    // =======================================

    public constructor(parent: Container, tweenManager: ITweenerManager)
    {
        this._parent = parent;
        this._tweenManager = tweenManager;
    }

    // ======== IObjectsFactory ============

    public CreatePacMan() : IPacMan
    {
        const pacMan = new PacMan(this._tweenManager);
        this._parent.addChild(pacMan);
        return pacMan;
    }
}
import { Container } from "pixi.js";
import { IPacMan, PacMan } from "./Objects/PacMan"
import { ITweenerManager } from "../../Common/Tweener/Tweener";
import { Coin, ICoin } from './Objects/Coin';
import { Cherry, ICherry } from './Objects/Cherry';
import { Ghost, IGhost } from './Objects/Ghost';

export interface IObjectsFactory
{
    CreatePacMan() : IPacMan;
    CreateCoin(): ICoin;
    CreateCherry(): ICherry;
    CreateGhost(): IGhost;
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

    public CreateCoin() : ICoin
    {
        const coin = new Coin(this._tweenManager);
        this._parent.addChild(coin);
        return coin;
    }

    public CreateCherry() : ICherry
    {
        const cherry = new Cherry(this._tweenManager);
        this._parent.addChild(cherry);
        return cherry;
    }

    public CreateGhost() : IGhost
    {
        const ghost = new Ghost(this._tweenManager);
        this._parent.addChild(ghost);
        return ghost;
    }
}
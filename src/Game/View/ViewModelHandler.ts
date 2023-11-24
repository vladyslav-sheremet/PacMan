import { Container } from "pixi.js";
import { IPositionManager } from "./PositionManager";
import { IEventManager } from "../Model/EventManager";
import { IObjectsFactory } from "./ObjectsFactory";
import { IPacMan } from "./Objects/PacMan";
import { ICoin } from './Objects/Coin';
import { ICherry } from './Objects/Cherry';
import { IGhost } from './Objects/Ghost';

export interface IViewModelHandler
{}

export class ViewModelHanlder implements IViewModelHandler
{
    private readonly _viewCanvas: Container;
    private readonly _positionManager: IPositionManager;
    private readonly _objectsFactory: IObjectsFactory;
    private readonly _modelEventManager: IEventManager;
    private readonly _iterationTime: number;

    private _pacMan!: IPacMan;
    private _coin!: ICoin;
    private _cherry!: ICherry;
    private _ghost!: IGhost;

    // ======================================

    public constructor(viewCanvas: Container, positionManager: IPositionManager, objectsFactory: IObjectsFactory, modelEventManager: IEventManager, iterationTime: number)
    {
        this._viewCanvas = viewCanvas;
        this._positionManager = positionManager;
        this._objectsFactory = objectsFactory;
        this._modelEventManager = modelEventManager;
        this._iterationTime = iterationTime;

        this._modelEventManager.OnCreatePacMan.Add(this.OnCreatePacMan, this);
        this._modelEventManager.OnUpdatePacManPosition.Add(this.OnUpdatePacManPosition, this);

        this._modelEventManager.OnCreateCoin.Add(this.OnCreateCoin, this);
        this._modelEventManager.OnSetCoinPosition.Remove(this.OnSetCoinPosition);
        // this._modelEventManager.OnSetCoinPosition.Add(this.OnSetCoinPosition, this);

        this._modelEventManager.OnCreateCherry.Add(this.OnCreateCherry, this);
        this._modelEventManager.OnSetCherryPosition.Add(this.OnSetCherryPosition, this);

        this._modelEventManager.OnCreateGhost.Add(this.OnCreateGhost, this);
        this._modelEventManager.OnUpdateGhostPosition.Add(this.OnUpdateGhostPosition, this);
    }

    // ======================================

    private OnCreatePacMan(fieldX: number, fieldY: number): void
    {
        this._pacMan = this._objectsFactory.CreatePacMan();
        this._pacMan.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnUpdatePacManPosition(fieldX: number, fieldY: number): void
    {
        this._pacMan.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime);
    }

    private OnCreateCoin(fieldX: number, fieldY: number): void
    {
        this._coin = this._objectsFactory.CreateCoin();
        this._coin.SetPosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnSetCoinPosition(fieldX: number, fieldY: number): void
    {
        this._coin.SetPosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime);
        // this._coin[3].UpdatePosition(10, 10)
        // context.Coin().splice(3, 10)
    }

    private OnCreateCherry(fieldX: number, fieldY: number): void
    {
        this._cherry = this._objectsFactory.CreateCherry();
        this._cherry.SetPosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnSetCherryPosition(fieldX: number, fieldY: number): void
    {
        this._cherry.SetPosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime);
    }

    private OnCreateGhost(fieldX: number, fieldY: number): void
    {
        this._ghost = this._objectsFactory.CreateGhost();
        this._ghost.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), 0.0);
    }

    private OnUpdateGhostPosition(fieldX: number, fieldY: number): void
    {
        this._ghost.UpdatePosition(this._positionManager.GetPosition(fieldX, fieldY), this._iterationTime);
    }
}
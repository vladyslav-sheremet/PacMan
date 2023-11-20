import { Container } from "pixi.js";
import { IPositionManager } from "./PositionManager";
import { IEventManager } from "../Model/EventManager";
import { IObjectsFactory } from "./ObjectsFactory";
import { IPacMan } from "./Objects/PacMan";

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
}
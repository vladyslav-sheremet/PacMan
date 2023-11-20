import { Point, Texture } from "pixi.js";
import { GameBase } from "../Base/GameBase";
import { ITweener, ITweenerManager, TweenerManager } from "../Common/Tweener/Tweener";
import { ViewCanvas } from "./View/ViewCanvas";
import { IPositionManager, PositionManager } from "./View/PositionManager";
import { IObjectsFactory, ObjectsFactory } from "./View/ObjectsFactory";
import { IViewModelHandler, ViewModelHanlder } from "./View/ViewModelHandler";
import { IModel, Model } from "./Model/Model";
import { eDirection } from "./Direction";

export class PacManGame extends GameBase
{
    private readonly ITERATION_TIME: number = 0.5;

    private _tweenManager : ITweenerManager = new TweenerManager();
    private _viewCanvas!: ViewCanvas;
    private _positionManager!: IPositionManager;
    private _objectsFactory!: IObjectsFactory;
    private _viewModelHandler!: IViewModelHandler;
    private _model!: IModel;

    private _gameLoopTweener: ITweener = this._tweenManager.Create();

    // ======================================

    protected OnResourcesLoaded(): void
    {
        this._model = new Model();

        const backTexture : Texture = Texture.from("Background");

        this._viewCanvas = new ViewCanvas(backTexture, this.Width, this.Height);
        this._app.stage.addChild(this._viewCanvas);

        this._positionManager = this.CreatePositionManager(backTexture.width, backTexture.height);
        this._objectsFactory = new ObjectsFactory(this._viewCanvas, this._tweenManager);
        this._viewModelHandler = new ViewModelHanlder(this._viewCanvas, this._positionManager, this._objectsFactory, this._model.EventManager, this.ITERATION_TIME);

        this.GameLoop();
    }

    protected OnUpdate(deltaTime: number): void
    {
        this._tweenManager.Update(deltaTime);
    }

    protected OnResize(width: number, height: number): void
    {
        this._viewCanvas.Resize(width, height);
    }

    // =====================================

    private async GameLoop(): Promise<void>
    {
        this._model.Init();

        while (true)
        {
            this._model.Update(eDirection.RIGHT);
            await this._gameLoopTweener.Timer(this.ITERATION_TIME);
        }
    }

    // =====================================

    private CreatePositionManager(width: number, height: number) : IPositionManager
    {
        const fieldWidth : number = 16;
        const fieldHeight : number = 12;
        const halfWidth : number = width / 2;
        const halfHeight : number = height / 2;
        const halfCellSizeX : number = width / fieldWidth / 2;
        const halfCellSizeY : number = height / fieldHeight / 2;
        return new PositionManager(new Point(-halfWidth + halfCellSizeX, -halfHeight + halfCellSizeY), new Point(halfWidth - halfCellSizeX, halfHeight - halfCellSizeY), fieldWidth, fieldHeight);
    }
}
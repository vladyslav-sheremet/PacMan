import { Action } from '../../Common/Action';
import { eDirection } from '../Direction';
import { CmdCreatePacMan } from './Commands/CmdCreatePacMan';
import { CmdMovePacMan } from './Commands/CmdMovePacMan';
import { Context, IContext } from './Context/Context';
import { EventManager, IEventManager } from './EventManager';
import { ITurn, ITurnInternal, Turn } from './Turn';
import { CmdCreateCoin } from './Commands/CmdCreateCoin';
import { CmdCreateCherry } from './Commands/CmdCreateCherry';
import { CmdCreateGhost } from './Commands/CmdCreateGhost';

export interface IModel {
    get EventManager(): IEventManager;

    Init(): void;

    Update(direction: eDirection): void;
}

// ###################################

export class Model implements IModel {
    private readonly _eventManager: EventManager;
    private readonly _context: IContext;
    private readonly _initialPacManPositionX: number = 0;
    private readonly _initialPacManPositionY: number = 0;

    private readonly _initialCherryPositionX: number;
    private readonly _initialCherryPositionY: number;

    private readonly _initialGhostPositionX: number;
    private readonly _initialGhostPositionY: number;

    // ================================

    public constructor() {
        this._eventManager = new EventManager();
        this._context = new Context(this._eventManager);

        this._initialCherryPositionX = Math.floor(Math.random() * 16);
        this._initialCherryPositionY = Math.floor(Math.random() * 12);

        this._initialGhostPositionX = Math.floor(Math.random() * 16);
        this._initialGhostPositionY = Math.floor(Math.random() * 12);
    }

    // ================================

    private CreateAndExecuteTurn(onInitTurn: Action<[ITurn]>): void {
        const turn: ITurnInternal = new Turn();
        onInitTurn.Invoke(turn);
        turn.Exec(this._context);
    }

    // ========= IModel ===============

    public get EventManager(): IEventManager {
        return this._eventManager;
    }

    public Init(): void {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) => {
                turn.Push(new CmdCreatePacMan(this._initialPacManPositionX, this._initialPacManPositionY));
                turn.Push(new CmdCreateCherry(this._initialCherryPositionX, this._initialCherryPositionY));
                turn.Push(new CmdCreateGhost(this._initialGhostPositionX, this._initialGhostPositionY));

                for (let i = 0; i < 16; i++) {
                    for (let j = 0; j < 12; j++) {
                        if (i === this._initialPacManPositionX && j === this._initialPacManPositionY) {
                            continue;
                        } else if (i === this._initialCherryPositionX && j === this._initialCherryPositionY) {
                            continue;
                        }
                        // else if (i === this._initialGhostPositionX && j === this._initialGhostPositionY) {
                        //     continue;
                        // }
                        turn.Push(new CmdCreateCoin(i, j));
                    }
                }
                // I can delete coin form here, but I know that it's not a right way. I should do it from Update method, but I can't.
                turn.Remove();
            },
            this));
    }

    public Update(direction: eDirection): void {
        this.CreateAndExecuteTurn(new Action((turn: ITurn) => {
                turn.Push(new CmdMovePacMan(direction));
            },
            this));
    }
}
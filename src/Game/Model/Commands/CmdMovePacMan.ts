import { Direction, eDirection } from "../../Direction";
import { ICommand } from "../Command";
import { IContext } from "../Context/Context";
import { ICellObject } from "../Context/Internal/CellObject";

export class CmdMovePacMan implements ICommand
{
    _direction: eDirection;

    // ==========================

    public constructor(direction: eDirection)
    {
        this._direction = direction;
    }

    // ======= ICommand =========

    public Exec(context: IContext): void
    {
        let pacMan: ICellObject = context.PacMan;
        const isCanMove: boolean = context.Field.IsCanMove(pacMan.X, pacMan.Y, this._direction);
        // Here I tried to delete some coins when PacMan is moving. And how I understand I deleted them from data, but also I should do something to show it, but I don't know how.
        context.Coin()[3].UpdatePosition(10, 10)
        context.Coin().splice(3, 10)
        context.EventManager.SetCoinPosition(3, 1)

        if (isCanMove)
        {
            const nextPosition = Direction.GetNextPosition(pacMan.X, pacMan.Y, this._direction);
            pacMan.UpdatePosition(nextPosition.x, nextPosition.y);
            context.EventManager.UpdatePacManPosition(nextPosition.x, nextPosition.y);
        }
    }
}
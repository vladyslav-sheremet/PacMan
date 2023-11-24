import { ICommand } from "../Command";
import { IContext } from "../Context/Context";

export class CmdCreateCoin implements ICommand
{
    _x: number;
    _y: number;

    // ==========================

    public constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    // ======= ICommand =========

    public Exec(context: IContext): void
    {
        context.CreateCoin(this._x, this._y);
        context.EventManager.CreateCoin(this._x, this._y, context);
    }
}
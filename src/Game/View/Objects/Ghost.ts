import { Sprite, Texture, Point } from "pixi.js";
import { ITweener, ITweenerManager } from "../../../Common/Tweener/Tweener";
import { Action } from "../../../Common/Action";
import { Interpolations, eInterpolation } from "../../../Common/Tweener/Interpolation";

export interface IGhost
{
    UpdatePosition(position: Point, time: number) : void;
}

// ##################################

export class Ghost extends Sprite implements IGhost
{
    readonly _textures : Texture[] = [];
    readonly _spriteAnimTweener : ITweener;
    readonly _positionTweener : ITweener;

    public constructor(tweenManager : ITweenerManager)
    {
        super();

        this.scale.set(0.5);
        this.anchor.set(0.5);

        this._spriteAnimTweener = tweenManager.Create();
        this._positionTweener = tweenManager.Create();

        this._textures.push(Texture.from("Ghost1"));
        this._textures.push(Texture.from("Ghost2"));

        this.UpdateSprite();
    }

    private async UpdateSprite() : Promise<void>
    {
        while (true)
        {
            for (let i : number = 0; i < this._textures.length; i++)
            {
                this.texture = this._textures[i];
                await this._spriteAnimTweener.Timer(0.3);
            }
        }
    }

    // ========= IPacMan ============

    public UpdatePosition(position: Point, time: number) : void
    {
        if (time <= 0.0001)
        {
            this.position.set(position.x, position.y);
        }
        else
        {
            const startX: number = this.position.x;
            const startY: number = this.position.y;
            const endX: number = position.x;
            const endY: number = position.y;

            this._positionTweener.InterpolateNum(0.0, 1.0, time, new Action((delta: number) =>
                {
                    this.position.set(Interpolations.InterpolateNum(startX, endX, delta, eInterpolation.INTERPOLATE_TYPE_LINEAR),
                        Interpolations.InterpolateNum(startY, endY, delta, eInterpolation.INTERPOLATE_TYPE_LINEAR));
                },
                this));
        }
    }
}
import { Point, Sprite, Texture } from 'pixi.js';
import { ITweener, ITweenerManager } from '../../../Common/Tweener/Tweener';

export interface ICoin
{
    SetPosition(position: Point, time: number) : void;
}

// ##################################

export class Coin extends Sprite {
    readonly _spriteAnimTweener : ITweener;
    readonly _positionTweener : ITweener;

    public constructor(tweenManager : ITweenerManager)
    {
        super();

        this.scale.set(0.5);
        this.anchor.set(0.5);

        this._spriteAnimTweener = tweenManager.Create();
        this._positionTweener = tweenManager.Create();

        this.texture = Texture.from("Coin");
    }

    public SetPosition(position: Point, time: number) : void
    {
        this.position.set(position.x, position.y);
    }
}
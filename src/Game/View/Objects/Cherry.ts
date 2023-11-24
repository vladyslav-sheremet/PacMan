import { Point, Sprite, Texture } from 'pixi.js';
import { ITweener, ITweenerManager } from '../../../Common/Tweener/Tweener';

export interface ICherry
{
    SetPosition(position: Point, time: number) : void;
}

// ##################################

export class Cherry extends Sprite {
    readonly _spriteAnimTweener : ITweener;
    readonly _positionTweener : ITweener;

    public constructor(tweenManager : ITweenerManager)
    {
        super();

        this.scale.set(0.5);
        this.anchor.set(0.5);

        this._spriteAnimTweener = tweenManager.Create();
        this._positionTweener = tweenManager.Create();

        this.texture = Texture.from("Cherry");
    }

    public SetPosition(position: Point, time: number) : void
    {
        this.position.set(position.x, position.y);
    }
}
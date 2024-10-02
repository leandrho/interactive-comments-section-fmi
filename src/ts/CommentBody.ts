import { Renderable } from './RenderableInterface';

export class CommentBody implements Renderable{
    public element: HTMLElement;
    
    public mText: string;
    public mUserTarget: string;
    
    public constructor(text: string, userTarget: string = ''){
        this.mText = text;
        this.mUserTarget = userTarget;
        this.element = document.createElement('div');
        this.prepare();
    }
    public updateText(text: string):void{
        this.mText = text;
        this.element.innerHTML = '';
        this.prepare();
    }
    public prepare(): void{
       this.element.classList.add('card-body-box');
    }
    public render(): HTMLElement{
        const p = document.createElement('p');
        p.classList.add('card-paragraph');
        let text = `${this.mText}`;
        if(this.mUserTarget)
            text = `<span class="card-at">@${this.mUserTarget} </span>` + text;
        p.innerHTML = text;
        this.element.appendChild(p);
        return this.element;
    }
}
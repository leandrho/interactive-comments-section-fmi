import { Renderable } from './RenderableInterface';

export class Button implements Renderable{

    public element: HTMLElement;
    public textValue: string;
    public type: string;

    public constructor(textValue: string, type: string = 'button'){
        this.textValue = textValue;
        this.type = type;
        this.element = document.createElement('button');
    }

    public clicked(): void{
        // 
    }

    public prepare(): void {
        this.element.classList.add('btn');
        this.element.setAttribute('type', this.type);
        this.element.innerText = this.textValue;
        // this.element.addEventListener('click',()=>{this.clicked()});
    }

    public render(): HTMLElement {
        this.prepare();
        return this.element;
    }
}
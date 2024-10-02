import { Renderable } from './RenderableInterface';

export class TextBox implements Renderable{

    public element: HTMLTextAreaElement;
    public initvalue:string;
    public placeholder:string;

    public constructor(initvalue: string = '', placeholder: string = ''){
        this.element = document.createElement('textarea');
        this.initvalue = initvalue;
        this.placeholder = placeholder;
    }
    public get value() : string {
        return this.element.value;
    }
    
    public prepare(): void {
        this.element.classList.add('nc-textarea');
        this.element.value = this.initvalue;
        this.element.placeholder = this.placeholder;
        this.element.setAttribute('maxlength', '195');
    }

    public render(): HTMLElement {
        this.prepare();
        return this.element;
    }
}
import { Button } from './Button';
import { Renderable } from './RenderableInterface';
import { TextBox } from './TextBox';

export class Form implements Renderable{

    public element: HTMLFormElement;
    public textbox: TextBox;
    public submitBtn: Button;

    public verticalLayout: boolean;

    public constructor(butName:string, value: string = '', placeholder: string = '', verticalLayout: boolean = false){
        this.textbox = new TextBox(value, placeholder);
        this.submitBtn = new Button(butName, 'submit');
        this.verticalLayout = verticalLayout;
        this.element = document.createElement('form');
    }

    public connect(event: string, slot: Function):void{
        this.element.addEventListener(event, (e)=>{
            e.preventDefault();
            slot();
        });
    }
    public clear():void{
        this.textbox.element.value = '';
    }
    public prepare(): void {
        this.element.classList.add('nc-form');
        if(this.verticalLayout)
            this.element.classList.add('vlay');
        this.element.addEventListener('submit', (e)=>{
            e.preventDefault();
        });
    }

    public render(): HTMLElement {
        this.prepare();
        
        const formtext = document.createElement('div');
        formtext.classList.add('nc-form-textbox');
        formtext.appendChild(this.textbox.render());

        this.element.appendChild(formtext);
        this.element.appendChild(this.submitBtn.render());

        return this.element;
    }
}
import { Renderable } from './RenderableInterface';

export class LikeCounter implements Renderable{
    static nextId :number = 55;

    public element: HTMLElement;
    public counter :number;
    public inc:number;
    private refCounter: string;

    //Public Methods
    public constructor(initValue: number = 0, increment: number = 1){
        this.counter = initValue;
        this.inc = increment;
        this.refCounter = `like_c_${LikeCounter.nextId++}`;

        this.element = document.createElement('div');
        this.prepare();
    }
    
    public get value() : number {
        return this.counter;
    }

    public increment(): void{
        this.counter+=this.inc;
        this.updateValue();
    }

    public decrement(): void{
        this.counter-=this.inc;
        this.updateValue();
    }
    public prepare(): void{
        let ainc = document.createElement('a');
        ainc.classList.add('like-btn');
        ainc.innerHTML = '<img src="./images/icon-plus.svg" alt="" class="like-icon">';
        ainc.addEventListener('click',(e) => {
            e.preventDefault();
            this.increment();
        });

        let adec = document.createElement('a');
        adec.classList.add('like-btn');
        adec.innerHTML = '<img src="./images/icon-minus.svg" alt="" class="like-icon">';
        adec.addEventListener('click',(e) => {
            e.preventDefault();
            this.decrement();
        });

        let p = document.createElement('p');
        p.classList.add('like-counter');
        p.id = this.refCounter;
        p.innerText = `${this.counter}`;

        
        this.element.classList.add('like-component');
        this.element.appendChild(ainc);
        this.element.appendChild(p);
        this.element.appendChild(adec);
    }
    public render(): HTMLElement{
        return this.element;
    }
    public connectChange(slot :Function):void{
        this.element.addEventListener('valupdate',()=>{ 
            slot();
        });
    }
    //Private Methods
    private updateValue(){
        const p: HTMLElement | null = document.getElementById(this.refCounter);
        p && (p.innerText = `${this.counter}`);
        this.element.dispatchEvent(new Event('valupdate'));
    }
}




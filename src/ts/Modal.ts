import { Renderable } from './RenderableInterface';
export class Modal implements Renderable{

    public element: HTMLElement;
    public btn1: HTMLElement;
    public btn2: HTMLElement;
    public text: string;
    public title: string;
    public btn1Name: string;
    public btn2Name: string;

    constructor(title: string, text: string, btn1Name: string = 'Cancel', btn2Name: string = 'Yes'){
        this.title = title;
        this.text = text;
        this.btn1Name = btn1Name;
        this.btn2Name = btn2Name;
        this.btn1 = document.createElement('button');
        this.btn2 = document.createElement('button');
        this.element = document.createElement('div');
    }

    public prepare(): void {
        this.element.classList.add('modal-container');
        this.element.style.animation = 'fadeIn 0.3s ease';
        const modalback = document.createElement('div');
        modalback.classList.add('modal-background');
        this.element.appendChild(modalback);
        this.btn1.classList.add('modal-btn', 'modal-cancel');
        this.btn2.classList.add('modal-btn', 'modal-accept');
        this.btn1.innerText = this.btn1Name;
        this.btn2.innerText = this.btn2Name;
    }
    
    public render(): HTMLElement {
        this.prepare(); 
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML =  `<h2 class="modal-title">${this.title}</h2> 
                            <p class="modal-text">
                                ${this.text}
                            </p>`;

        const btns = document.createElement('div');
        btns.classList.add('modal-actions');
        btns.appendChild(this.btn1);
        btns.appendChild(this.btn2);

        modal.appendChild(btns);
        this.element.appendChild(modal);
        const body = document.querySelector('body');
        body?.appendChild(this.element);
        return this.element;
    }
    public connectBtn1(slot: Function):void{
        this.btn1.addEventListener('click',()=>{slot()});
    }
    public connectBtn2(slot: Function):void{
        this.btn2.addEventListener('click',()=>{slot()});
    }
}


// <div class="modal-contanier">
//         <div class="modal-background">
//         </div>
//         <div class="modal">
//           <h2 class="modal-title">Delete Comment</h2> 
//           <p class="modal-text">
//             Are you sure you want to delete this comment? This will remove the comment and can't be undone.
//           </p>
//           <div class="modal-actions">
//             <button class="modal-btn modal-cancel">No, cancel</button>
//             <button class="modal-btn modal-accept">Yes, delete</button>
//           </div>
//         </div>
//       </div>
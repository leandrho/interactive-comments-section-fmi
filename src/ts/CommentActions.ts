import { Renderable } from './RenderableInterface';

export class CommentActions implements Renderable{

    public element: HTMLElement;
    public deletebtn: HTMLElement | null = null;
    public editbtn: HTMLElement | null = null;
    public replybtn: HTMLElement | null = null;


    public mOwner: boolean;
    public mIdPost: number;
    
    public constructor(idPost: number, owner: boolean = false){
        this.mIdPost = idPost;
        this.mOwner = owner;
        this.element = document.createElement('div');
        this.prepare();
    }

    public connectDeletePost(slot:Function): void{
        this.deletebtn?.addEventListener('click',()=>{slot()});
    }

    public connectEditPost(slot:Function): void{
        this.editbtn?.addEventListener('click',()=>{slot()});
    }

    public connectReplyPost(slot:Function): void{
        this.replybtn?.addEventListener('click',()=>{slot()});
    }
    public prepare(): void{
        this.element.classList.add('card-actions');
        if(this.mOwner){
            this.deletebtn = document.createElement('button');
            this.deletebtn.classList.add('card-btn', 'card-btn-delete');
            this.deletebtn.innerHTML = `<figure class="card-btn-icon">
                                       <img src="./images/icon-delete.svg" alt="">
                                   </figure>
                                   Delete
                                  `;
            
            this.editbtn = document.createElement('button');
            this.editbtn.classList.add('card-btn', 'card-btn-edit');
            this.editbtn.innerHTML = `<figure class="card-btn-icon">
                                    <img src="./images/icon-edit.svg" alt="">
                                 </figure>
                                 Edit
                                `;
            this.element.appendChild(this.deletebtn);
            this.element.appendChild(this.editbtn);
        }
        else{
            this.replybtn = document.createElement('button');
            this.replybtn.classList.add('card-btn', 'card-btn-reply');
            this.replybtn.innerHTML = `<figure class="card-btn-icon">
                                       <img src="./images/icon-reply.svg" alt="">
                                   </figure>
                                   Reply
                                  `;
            this.element.appendChild(this.replybtn);
        }
    }
    public render(): HTMLElement{
        return this.element;
    }

}
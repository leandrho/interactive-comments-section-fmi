import { isCurrentUser } from './Global';
import { Renderable } from './RenderableInterface';
export class CommentHeader implements Renderable{

    public element: HTMLElement;
    public mAvatar: string;
    public mName: string;
    public mDate: string;
    public mOwner: boolean;

    
    public constructor(name: string, avatar: string, date: string){
        this.mAvatar = avatar;
        this.mName = name;
        this.mDate = date;
        this.element = document.createElement('div');
        this.mOwner = isCurrentUser(name);
        this.prepare();
    }
    public prepare(): void{
        this.element.classList.add('card-info');
    }
    public render(): HTMLElement{
        this.element.innerHTML = `<figure class="card-pic">
                                <img src="${this.mAvatar}" alt="" class="card-avatar">
                            </figure>
                            <h2 class="card-name">${this.mName}</h2>
                            ${ this.mOwner ? '<span class="card-own">you</span>' : '' }
                            <p class="card-date">${this.mDate}</p>`;
        return this.element;
    }

}
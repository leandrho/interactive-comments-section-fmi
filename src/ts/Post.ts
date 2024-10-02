import { Renderable } from './RenderableInterface';
import { Comment } from './CommentInfo';
import { CommentCard } from './CommentCard';

export class Post implements Renderable{
    public element: HTMLElement;
    public card: CommentCard;
    public replies: CommentCard[];

    public constructor(comment: Comment){
        this.card = new CommentCard(comment);
        this.replies = [];
        this.element = document.createElement('div');
        this.prepare();
    }
    public prepare(): void {
        this.element.classList.add('post');
    }
    public render(): HTMLElement {
        this.element.appendChild(this.card.render());
        if( this.createReplies() ){
            const repContainer = document.createElement('div');
            repContainer.classList.add('replies-container');

            const lineLeft = document.createElement('div');
            lineLeft.classList.add('line-container');
            lineLeft.innerHTML = `<div class="line-left"></div>`;

            const repList = document.createElement('div');
            repList.classList.add('replies-list');

            for(let i = 0; i < this.replies.length; ++i){
                repList.appendChild(this.replies[i].render());
            }
            repContainer.appendChild(lineLeft);
            repContainer.appendChild(repList);

            this.element.appendChild(repContainer);
        }
        return this.element;   
    }
    public updateRender(comment: Comment): HTMLElement {
        this.card = new CommentCard(comment);
        this.replies = [];
        this.element.innerHTML = '';
        this.prepare();
        return this.render();
    }
    private createReplies(): boolean{
        const { replies } = this.card.comment;
        if(replies && replies.length){
            for( let i = 0; i < replies.length; ++i ){
                const card = new CommentCard(replies[i]);
                this.replies.push(card);
            }
            return true;
        }
        return false;
    }

}
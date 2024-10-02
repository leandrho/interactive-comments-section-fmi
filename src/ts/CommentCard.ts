import { CommentHeader } from './CommentHeader';
import { Renderable } from './RenderableInterface';
import { LikeCounter } from './LikeCounter';
import { CommentActions } from './CommentActions';
import { CommentBody } from './CommentBody';
import { Comment } from './CommentInfo';
import { currentUser, globalPostManager, isCurrentUser } from './Global';
import { NewComment } from './NewComment';
import { Form } from './Form';

export class CommentCard implements Renderable{
    static id: number = 5;
    public element: HTMLElement;
    public card: HTMLElement;
    public newreply: NewComment | null = null;
    public formEdit: Form | null = null;
    private commentInfo: Comment;

    private headerElem: CommentHeader;
    private likeElem: LikeCounter;
    private actionsElem: CommentActions;
    private bodyElem: CommentBody;

    
    public get comment() : Comment {
        return this.commentInfo;
    }

    public constructor(comment: Comment){
        this.commentInfo = comment;

        this.headerElem = new CommentHeader(comment.user.username, comment.user.image.png, comment.createdAt);
        this.bodyElem = new CommentBody(comment.content, comment.replyingTo);
        this.actionsElem = new CommentActions(comment.id, isCurrentUser(comment.user.username));
        this.likeElem = new LikeCounter(comment.score);


        if(!isCurrentUser(comment.user.username)){
            this.actionsElem.connectReplyPost(()=>{this.reply()});
        }
        else{
            this.actionsElem.connectDeletePost(()=>{this.delete()});
            this.actionsElem.connectEditPost(()=>{this.edit()});
        }
        this.element = document.createElement('div');
        this.card = document.createElement('div');

        this.likeElem.connectChange(()=>{this.updateLikes()});

        this.prepare();
    }
    public updateLikes():void {
        this.commentInfo.score = this.likeElem.value;
    }
    public reply():void{
        if(!this.newreply){
            this.newreply = new NewComment(currentUser(),'Reply',false);
            this.newreply.connectNewComment( ( com: Comment ) => { this.postReply( com ) } );
            this.element.appendChild(this.newreply.render());
        }
    }
    public postReply(com: Comment):void{
        this.newreply?.element.remove();
        this.newreply = null;
        globalPostManager()!.postNewReply(this.commentInfo.id, com);
    } 
    public postUpdate():void{
        this.bodyElem.element.style.display='block';
        const text = this.formEdit!.textbox.value;
        this.formEdit?.element.remove();
        this.formEdit = null;
        this.commentInfo.content = text;
        this.bodyElem.updateText( text );
        this.bodyElem.render();
    }
    public delete():void{
        globalPostManager()!.deletePost(this.commentInfo.id);
    }
    public edit():void{
        this.formEdit = new Form('Update',this.bodyElem.mText,'',true);
        this.formEdit.connect('submit', ()=>{this.postUpdate()});
        this.formEdit.element.classList.add('card-body','nc-form-edit-desk');
        this.bodyElem.element.style.display='none';
        this.card.appendChild(this.formEdit.render());
    }
    public prepare(): void{
        this.element.classList.add('card-box');
        this.card.classList.add('card');
        this.headerElem.element.classList.add('card-header');
        this.likeElem.element.classList.add('card-like');
        this.bodyElem.element.classList.add('card-body');
        this.actionsElem.element.classList.add('card-actions');
        this.card.style.animation = 'fadeIn 1s ease';
    }
    public render(): HTMLElement{
        this.card.appendChild(this.likeElem.render());
        this.card.appendChild(this.headerElem.render());
        this.card.appendChild(this.actionsElem.render());
        this.card.appendChild(this.bodyElem.render());

        this.element.appendChild(this.card);
        return this.element;
    }
    static createCommentCard(comment: Comment): CommentCard{
        comment.createdAt = `today`
        comment.id = this.id++;
        comment.score = 0;
        const com = new CommentCard(comment);
        return com;
    }
}
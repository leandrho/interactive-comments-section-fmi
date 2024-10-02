import { UserInfo, Thread, Comment } from './CommentInfo';
import { Renderable } from './RenderableInterface';
import { PostList } from './PostList';
import { NewComment } from './NewComment';
import { Modal } from './Modal';


export class PostManager implements Renderable{
    static idGlobal: number = 5;
    public element: HTMLElement;
    public postList: PostList;
    public newComment: NewComment;
    public user: UserInfo;

    public modal: Modal | null;

    public constructor(hilo: Thread){
        this.user = hilo.currentUser;
        this.postList = new PostList(hilo.comments);
        this.newComment = new NewComment(hilo.currentUser);
        this.newComment.connectNewComment( (comment: Comment) => {this.createNewComment(comment)} );
        this.element = document.createElement('section');
        this.modal = null;
    }
    public prepare(): void {
        this.element.classList.add('post-manager');
    }
    public render(): HTMLElement {
        this.prepare();
        this.element.appendChild(this.postList.render());
        this.element.appendChild(this.newComment.render());
        return this.element
    }
    public createNewComment(comment: Comment):void{
        comment.createdAt = `today`
        comment.id = PostManager.idGlobal++;
        comment.score = 0;
        this.postList.addNewPost(comment);
    }
    public postNewReply(id:number, com: Comment):void{
        com.id = PostManager.idGlobal++;
        this.postList.addNewReply(id, com);
    }
    public deletePost(id:number){
        this.modal = new Modal('Delete comment', "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",'No, cancel', 'Yes, delete');
        this.modal.connectBtn1(()=>{this.closeModal()});
        this.modal.connectBtn2(()=>{this.doDelete(id)});
        this.modal.render();
    }
    public doDelete(id: number):void{
        this.postList.deletePost(id);
        this.closeModal();
    }
    public closeModal():void{
        this.modal?.element.remove();
        this.modal = null;
    }
    static saveLocalStorage(posts: PostList, user: UserInfo) : void{
        let coms: Comment[] = [];
        for(let p of posts.posts){
            coms.push(p.card.comment);
        }
        let thread: Thread = { currentUser: user, comments: coms}
        localStorage.setItem('hilo', JSON.stringify(thread));
    }
    static loadLocalStorage() : Thread | undefined{
        let thread: Thread | undefined;
        const h :string | null = localStorage.getItem('hilo');
        if(h)
            thread = JSON.parse(h);

        return thread;
    }
}
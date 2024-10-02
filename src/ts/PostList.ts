import { Renderable } from './RenderableInterface';
import { Comment } from './CommentInfo';
import { Post } from './Post';

export class PostList implements Renderable{
    
    public element: HTMLElement;
    public posts: Post[];
    public comments: Comment[];
    
    public constructor(comments: Comment[]){
        this.comments = comments;
        this.posts = [];
        this.element = document.createElement('div');
    }

    public prepare(): void {
        this.element.classList.add('post-list');
    }

    public render(): HTMLElement {
        this.prepare();
        this.comments.forEach((com)=>{
            const p = new Post(com);
            this.posts.push(p);
            this.element.appendChild(p.render());
        });
        return this.element;
    }
    public addNewPost(comment: Comment): void{
        this.comments.push(comment);
        const npost = new Post(comment);
        this.posts.push(npost);
        this.element.appendChild(npost.render());
    }
    public addNewReply(idOriginComment: number, newcomment:Comment):void{
    
        let origin: Comment | undefined;
        for(const c of this.comments){
            if( c.id == idOriginComment ){
                origin = c;
                break;
            }
            const cc:Comment | undefined = c.replies?.find((c1) => c1.id == idOriginComment );
            if(cc){
                origin = cc;
                break;
            }

        }

        if(!origin)
            throw new Error('ID DOES NOT EXIST..');

        newcomment.replyingTo = origin?.user.username;
        if(!origin?.replies){
            origin.replies = [];
        }
        const p: Post | undefined = this.findPost(origin.id);
        p?.card.comment.replies.push(newcomment);
        p?.updateRender(p.card.comment);

    }
    public deletePost(id:number):void{
  
        let index:number = -1;
        let isPost:boolean = false;
        for(let i = 0; i < this.comments.length; i++){
            if(this.comments[i].id == id){
                index = i;
                isPost=true;
                break;
            }
            else{
                if(this.comments[i].replies){
                    let rsize:number = this.comments[i].replies!.length;
                    for(let j = 0; j < rsize; j++){
                        if(this.comments[i].replies[j].id == id){
                            this.comments[i].replies.splice(j,1);
                            index = i;
                            break;
                        }
                    }
                    if(index!=-1)
                        break;
                }
            }
        }

        if(isPost){
            this.comments.splice(index,1);
            this.posts[index]!.element.remove();
            this.posts.splice(index,1);
            return;
        }
        this.posts[index].updateRender(this.comments[index]);

    }
    public findPost(id :number) :Post | undefined{
        for(const p of this.posts){
            if(p.card.comment.id == id)
                return p;
            
            if(p.card.comment.replies?.find((c1) => c1.id == id ))
                return p;
        }
        return undefined;
    }
}
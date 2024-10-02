
import { Form } from './Form';
import { Renderable } from './RenderableInterface';
import { UserInfo } from './CommentInfo';
import { Comment } from './CommentInfo';


export class NewComment implements Renderable {

    public element: HTMLElement;
    public form: Form;
    public user: UserInfo;

    public constructor(user: UserInfo, action: string = 'send', reply: boolean = false) {
        this.user = user;
        this.form = new Form(action, '', 'Add a comment', reply);
        this.form.connect('submit', () => { this.newComment() });
        this.element = document.createElement('div');
    }
    public connectNewComment(slot: Function): void {
        this.element.addEventListener('newcomment', () => {
            const comment: Comment = { content: this.form.textbox.value, user: this.user, id: -1, score: 0, createdAt: 'today', replies: [] };
            slot(comment);
            this.form.clear();
        });
    }
    public newComment() {
        this.element.dispatchEvent(new Event('newcomment'));
    }
    public prepare(): void {
        this.element.classList.add('new-comment');
    }
    public render(): HTMLElement {
        this.prepare();

        const avat = document.createElement('figure');
        avat.classList.add('nc-avatar');
        avat.innerHTML = `<img src="${this.user.image.png}" alt="avatar">`

        this.element.appendChild(avat);
        this.element.appendChild(this.form.render());

        return this.element
    }
}
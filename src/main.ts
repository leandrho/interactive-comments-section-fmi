
import data from './db/data.json'
import { Thread } from './ts/CommentInfo';
import { setGlobalUser, setGlobalPostManager } from './ts/Global';
import { PostManager } from "./ts/PostManager";

let thread: Thread | undefined;
thread = PostManager.loadLocalStorage();

setGlobalUser(data.currentUser);
const postManager: PostManager = new PostManager(thread ? thread : <Thread>data);
setGlobalPostManager(postManager);

window.addEventListener('beforeunload', () => {PostManager.saveLocalStorage(postManager.postList, postManager.user)});
const b: HTMLElement | null = document.querySelector('body');
b!.appendChild(postManager.render());


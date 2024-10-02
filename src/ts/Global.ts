import { UserInfo } from './CommentInfo';
import { PostManager } from './PostManager';

let user: UserInfo;
export function setGlobalUser(u:UserInfo):void{
    user = u;
}
export function currentUser():UserInfo{
    return user;
}
export function isCurrentUser(u: string):boolean{
    return user.username == u;
}
let postM: PostManager | null;
export function setGlobalPostManager(pm: PostManager):void{
    postM = pm;
}
export function globalPostManager() : PostManager | null{
    return postM;
}
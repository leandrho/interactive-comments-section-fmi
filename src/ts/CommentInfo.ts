export interface Thread {
    currentUser: UserInfo;
    comments:    Comment[];
}

export interface Comment {
    id:          number;
    content:     string;
    createdAt:   string;
    score:       number;
    user:        UserInfo;
    replies:    Comment[];
    replyingTo?: string;
}

export interface UserInfo {
    image:    Image;
    username: string;
}

export interface Image {
    png:  string;
    webp: string;
}
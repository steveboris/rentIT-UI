import { Article } from "./Article";
import { User } from "./User";

export class Image {
    public imageId: number;
    public imageLink: string;
    public imageType: string;
    public user: User;
    public art: Article;
}
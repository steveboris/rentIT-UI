import { Article } from "./Article";
import { ArticleQuantity } from "./ArticleQuantity";
import { Image } from "./Image";
import { Properties } from "./Properties";
import { User } from "./User";

export class Category {
    public categoryId: number;
    public name: string;
    public description: string;
    public articles: Article[];
}
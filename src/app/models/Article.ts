import { ArticleQuantity } from "./ArticleQuantity";
import { Category } from "./Category";
import { Image } from "./Image";
import { Properties } from "./Properties";
import { User } from "./User";

export class Article {
    public articleId: number;
    public name: string;
    public description: string;
    public serialNumber: string;
    public model: string;
    public price: number;
    public properties: Properties;
    public category: Category;
    public images: Image[];
    public articleQuantity: ArticleQuantity[];
    public quantity?: number;
    public totalPrice?: any;
}
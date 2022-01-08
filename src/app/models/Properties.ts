import { Article } from "./Article";
import { ArticleQuantity } from "./ArticleQuantity";
import { Image } from "./Image";
import { User } from "./User";

export class Properties {
    public propertiesId: number;
    public storage: number;
    public operatingSystem: string;
    public color: string;
    public specialFeature: string;
    public manifacturer: string;
    public article: Article;
}
import { Article } from "./Article";
import { Image } from "./Image";
import { Rental } from "./Rental";
import { User } from "./User";

export class ArticleQuantity {
    public articleQuantityId: number;
    public article: Article;
    public rental: Rental;
    public subTotal: number;
    public quantity: number;
    public returned: boolean;
    public returnDate: Date;
    public returnedDate: Date;
    public rentalDate: Date;
}
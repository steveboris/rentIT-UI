import { ArticleQuantity } from "./ArticleQuantity";
import { Invoice } from "./Invoice";
import { User } from "./User";

export class Rental {
    public rentalId: number;
    public rentDate: Date;
    public totalPrice: number;
    public users: User;
    public invoice: number;
    public invoiceEn?: Invoice 
    public articleQuantity: number[];
    public articleQuantities: ArticleQuantity[];
}
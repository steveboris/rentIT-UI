import { Rental } from "./Rental";

export class Invoice {
    public invoiceId: number;
    public invoiceNumber: string;
    public invoiceDate: Date;
    public rental: Rental;
}
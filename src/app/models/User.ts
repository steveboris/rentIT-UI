import { Image } from "./Image";
import { Rental } from "./Rental";

export class User {
    public userId: number;
    public email: string;
    public username: string;
    public lastname: string;
    public firstname: string;
    public street: string;
    public hausNumber: number;
    public plz: number;
    public ort: string;
    public rental: number[];
    public birthday: Date;
    public image: Image;

}
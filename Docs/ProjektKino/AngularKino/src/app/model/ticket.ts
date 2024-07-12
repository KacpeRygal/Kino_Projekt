import { DatePipe } from "@angular/common";

export interface Ticket {
    id:number;
    userId:number;
    screeningId:number;
    price:number;
    date:DatePipe;
}

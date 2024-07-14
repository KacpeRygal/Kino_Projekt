import { DatePipe } from "@angular/common";

export interface TicketRequest {
    userId:number;
    screeningId:number;
    price:number;
    date:string;
}

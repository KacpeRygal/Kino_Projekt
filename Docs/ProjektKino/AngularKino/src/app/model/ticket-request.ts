import { DatePipe } from "@angular/common";

export interface TicketRequest {
    userId:number;
    screeningID:number;
    price:number;
    date:string;
}

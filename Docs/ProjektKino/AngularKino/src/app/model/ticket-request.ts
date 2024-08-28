import { DatePipe } from "@angular/common";

export interface TicketRequest {
    userID:number|undefined;
    screeningID:number|undefined;
    price:number|undefined;
    date:string|undefined;
}

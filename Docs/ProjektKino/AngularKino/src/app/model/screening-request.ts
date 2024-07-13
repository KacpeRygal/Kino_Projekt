import { DatePipe } from "@angular/common";

export interface ScreeningRequest {
    hallID:number;
    movieID:number;
    date:DatePipe;
}

import { DatePipe } from "@angular/common";

export interface ScreeningRequest {
    hallID:number|null;
    movieID:number|null;
    date:string|null;
}

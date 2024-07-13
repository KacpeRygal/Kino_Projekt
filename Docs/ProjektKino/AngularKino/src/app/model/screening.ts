import { DatePipe } from "@angular/common";

export interface Screening {
    id:number;
    hallID:number;
    movieID:number;
    date:DatePipe;
}

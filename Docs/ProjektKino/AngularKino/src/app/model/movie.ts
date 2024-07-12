import { DatePipe } from "@angular/common";

export interface Movie {
    id:number;
    time:DatePipe;
    language:string;
    score:number;
    name:string;
}

import { DatePipe } from "@angular/common";

export interface MovieRequest {
    time:DatePipe;
    language:string;
    score:number;
    name:string;
}

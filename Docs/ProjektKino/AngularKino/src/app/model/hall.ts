import { HallTechnologyEnum } from "./hall-technology-enum";

export interface Hall {
    id:number;
    rows:number;
    columns:number;
    full:boolean;
    technologu:HallTechnologyEnum;
}

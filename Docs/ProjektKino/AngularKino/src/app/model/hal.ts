import { HallTechnologyEnum } from "./hall-technology-enum";

export interface Hal {
    id:number;
    rows:number;
    columns:number;
    full:boolean;
    technologu:HallTechnologyEnum;
}

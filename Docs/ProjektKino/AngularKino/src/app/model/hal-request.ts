import { HallTechnologyEnum } from "./hall-technology-enum";

export interface HalRequest {
    rows:number;
    columns:number;
    full:boolean;
    technologu:HallTechnologyEnum;
}

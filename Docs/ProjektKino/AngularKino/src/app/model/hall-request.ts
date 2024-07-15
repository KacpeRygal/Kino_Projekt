import { HallTechnologyEnum } from "./hall-technology-enum";

export interface HallRequest {
    rows:number;
    columns:number;
    full:boolean;
    technologu:HallTechnologyEnum;
}

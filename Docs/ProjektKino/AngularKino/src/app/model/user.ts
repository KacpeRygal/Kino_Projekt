import { UserTypeEnum } from "./user-type-enum";

export interface User {
    id:number;
    login:string;
    password:string;
    type:UserTypeEnum;
    name:string;
    canReduce:boolean;
}

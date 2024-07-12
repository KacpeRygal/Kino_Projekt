import { UserTypeEnum } from "./user-type-enum";

export interface UserRequest {
    login:string;
    password:string;
    type:UserTypeEnum;
    name:string;
    canReduce:boolean;
}

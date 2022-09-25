import { Adress } from "./address.model";
import { Gender } from "./gender.models";


export interface Student{
  id:string,
  firstName:string,
  lastName:string,
  dateOfBirth:string,
  email:string,
  mobile:number,
  profileImageUrl:string,
  genderId:string,
  gender:Gender,
  address:Adress
}

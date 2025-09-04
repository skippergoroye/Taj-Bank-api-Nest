import { IUser } from 'src/user/interfaces/user.interface'; // optional, if you have IUser

declare module 'express' {
  export interface Request {
    user?: IUser; // or `any` if you don’t have IUser yet
  }
}

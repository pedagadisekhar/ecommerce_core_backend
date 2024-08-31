import { RowDataPacket } from 'mysql2';


export default class User {
  constructor(
    public UserName: string,
    public email: string,
    public Password: string,
    public address: string,
    public mobileNo: string,
    public PANCard: string,
    public profilePic: string,
    public state: string,
    public district: string,
    public pinCode: string,
    public country: string
  ) {}
}
export class UserRetrive {
  constructor(
    public UserId: number,
    public UserName: string,
    public email: string,
    public Password: string,
  ) {}
}
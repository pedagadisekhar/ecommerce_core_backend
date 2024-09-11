// export class Otpuser {
//     public UserName: string;
//     public email: string;
//     public Password: string;
//     public mobileNo: string;
  
//     constructor(UserName: string, email: string, Password: string, mobileNo: string) {
//       this.UserName = UserName;
//       this.email = email;
//       this.Password = Password;
//       this.mobileNo = mobileNo;
//     }
//   }

  export default class Otpuser {
    constructor(
      public UserName: string,
      public email: string,
      public Password: string,
      public mobileNo: string,
    ) {}
  }
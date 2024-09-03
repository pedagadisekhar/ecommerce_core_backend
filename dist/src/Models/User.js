"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRetrive = void 0;
class User {
    constructor(UserName, email, Password, address, mobileNo, PANCard, profilePic, state, district, pinCode, country) {
        this.UserName = UserName;
        this.email = email;
        this.Password = Password;
        this.address = address;
        this.mobileNo = mobileNo;
        this.PANCard = PANCard;
        this.profilePic = profilePic;
        this.state = state;
        this.district = district;
        this.pinCode = pinCode;
        this.country = country;
    }
}
exports.default = User;
class UserRetrive {
    constructor(UserId, UserName, email, Password) {
        this.UserId = UserId;
        this.UserName = UserName;
        this.email = email;
        this.Password = Password;
    }
}
exports.UserRetrive = UserRetrive;

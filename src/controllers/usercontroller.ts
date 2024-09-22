import { Request, Response } from 'express';
import UserService from '../services/userservice';
import User from '../Models/User';
import ResponseHandler from '../utils/ResponseHandler';

class UserController {
  private userService = new UserService();

  public async signup(req: Request, res: Response): Promise<void> {
    const { UserName, email, Password, address, mobileNo, PANCard, profilePic, state, district, pinCode, country } = req.body;
    console.log(req.body)

    try {
      const hashedPassword = await this.userService.hashPassword(Password);
      console.log(hashedPassword);
      const user = new User(UserName, email, hashedPassword, address, mobileNo, PANCard, profilePic, state, district, pinCode, country);

      await this.userService.createUser(user);
      const token = this.userService.generateJWTWithoutId(user.UserName, user.email);
      console.log(user)
      res.status(201).json({ message: 'User created', token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  public async signin(req: Request, res: Response): Promise<void> {
    const { email, Password } = req.body;

    try {
      const user = await this.userService.findUserByName(email);
      if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const isValid = await this.userService.comparePassword(Password, user.Password);
      if (isValid) {
        const token = this.userService.generateJWT(user.UserId, user.UserName);
        res.status(200).json({ message: "Success", token, UserId: user.UserId });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { mobile, newPassword } = req.body; // Assuming the user provides email and new password
    console.log(req.body);
  
    try {
      // Check if the user exists
      const user = await this.userService.findUserByMobile(mobile);
      if (!user) {
         res.status(404).json({ message: 'User not found' });
      }else{
      // Hash the new password
      const hashedPassword = await this.userService.hashPassword(newPassword);
  
      // Update the user's password
      await this.userService.updatePassword(mobile, hashedPassword);
  
      res.status(200).json({ message: 'Password updated successfully' });
    }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Error updating password', error: err.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }
  


}

export default UserController;

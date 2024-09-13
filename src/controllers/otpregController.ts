import { Request, Response } from 'express';
import OtpRegService from '../services/otpregService';

class OtpRegController {
  private otpRegService = new OtpRegService();
  public async signup(req: Request, res: Response) {
    const { UserName, email, mobileNo, Password } = req.body;
    console.log(req.body);  // Log request body for debugging
    
    try {
      // Hash the password
      const hashedPassword = await this.otpRegService.hashPassword(Password);
      console.log("Hashed password:", hashedPassword);
  
      // Check if the user already exists
      const userExists = await this.otpRegService.checkIfUserExists(email, mobileNo);
      if (!userExists) {
        const otp = await this.otpRegService.generateOTP();
        await this.otpRegService.storeOTP(mobileNo, otp, { UserName, email, hashedPassword });
        await this.otpRegService.sendOTP(mobileNo, otp);
  
        // Generate JWT token without user ID
        const token = this.otpRegService.generateJWTWithoutId(UserName, email);
  
        // Send success response
        return res.status(201).json({ message: 'User created. OTP sent.', token });
      } 
      return res.status(201).json({ message: 'User already created' });
      
    } catch (err) {
      console.error("Error occurred during signup:", err);  // Log any errors
  
      // Handle errors and send a 500 response if something goes wrong
      if (err instanceof Error) {
        return res.status(500).json({ message: 'Error creating user', error: err.message });
      } else {
        return res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }
  
  

  public async verifyOtp(req: Request, res: Response): Promise<void> {
    const { mobileNo, otp } = req.body;

    try {
      const userData = await this.otpRegService.verifyOTP(mobileNo, otp);
      await this.otpRegService.createUser(userData);
      res.status(200).json({ message: 'OTP verified, user created.' });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: 'OTP verification failed', error: err.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }
}

export default OtpRegController;

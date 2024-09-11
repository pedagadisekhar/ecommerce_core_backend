import { Request, Response } from 'express';
import OtpRegService from '../services/otpregService';

class OtpRegController {
  private otpRegService = new OtpRegService();

  public async signup(req: Request, res: Response): Promise<void> {
    const { UserName, email, mobileNo,Password} = req.body;
    console.log(req.body)
    try {
      const defaultPassword = Password; // Use a more secure password in a real application
      //const hashedPassword = await this.otpRegService.hashPassword(defaultPassword);
      const hashedPassword = await this.otpRegService.hashPassword(Password);
      console.log(hashedPassword);

      const userExists = await this.otpRegService.checkIfUserExists(email, mobileNo);
      if (userExists) {
        res.status(400).json({ message: 'User with this email or mobile number already exists' });
      }

      // Store OTP and user details temporarily
      const otp = await this.otpRegService.generateOTP();
      await this.otpRegService.storeOTP(mobileNo, otp, { UserName, email, hashedPassword });

      await this.otpRegService.sendOTP(mobileNo, otp);
      const token = this.otpRegService.generateJWTWithoutId(UserName, email);

      res.status(201).json({ message: 'User created. OTP sent.', token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
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

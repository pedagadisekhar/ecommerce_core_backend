import axios from 'axios';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../db/Database';
import { format } from 'date-fns';

class OtpRegService {
  private OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds
  private db = Database.getInstance();

  

  // Generate a random 6-digit OTP
  public generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
   
  public async checkIfUserExists(email: string, mobileNo: string): Promise<boolean> {
    const query = `
      SELECT COUNT(*) AS count FROM userdetails 
      WHERE Email = ? OR MobileNo = ?;
    `;
  
    try {
      const [rows]: any = await this.db.query(query, [email, mobileNo]);
      return rows[0].count > 0;
    } catch (err) {
      console.error('Error checking user existence:', err);
      throw new Error('Database error while checking user existence');
    }
  }


  public async storeOTP(mobileNo: string, otp: string, userDetails: any): Promise<void> {
    const otpExpiry = format(new Date(Date.now() + 5 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'); // OTP expires in 5 minutes
    const { UserName, email, hashedPassword } = userDetails;

    const query = `
      INSERT INTO userotp (mobileNo, otp, otp_expiry, userName, email, hashedPassword)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      await this.db.execute(query, [mobileNo, otp, otpExpiry, UserName, email, hashedPassword]);
      console.log(`Stored OTP: ${otp} for mobile: ${mobileNo}`);
    } catch (err) {
      console.error('Error storing OTP:', err);
      throw new Error('Failed to store OTP');
    }
  }

  public async verifyOTP(mobileNo: string, otp: string): Promise<any> {
    const query = `CALL VerifyAndInsertUser(?, ?)`;
  
    try {
      // Since the procedure does not return any data, just execute the query.
      await this.db.execute(query, [mobileNo, otp]);
  
      // If execution reaches here, it means the procedure executed successfully
      return { message: 'OTP verified and user created successfully', mobileNo };
    } catch (err: any) {
      // The error might be from the stored procedure (e.g., 'Invalid or expired OTP' or 'User already exists')
      console.error('Error verifying OTP:', err.message);
  
      // Return the error message
      throw new Error(err.message || 'OTP verification failed');
    }
  }
  

  // Generate JWT without userId
  public generateJWTWithoutId(UserName: string, email: string): string {
    const token = jwt.sign({ UserName, email }, 'your_jwt_secret_key', { expiresIn: '1h' });
    return token;
  }

  // Create user (dummy implementation, replace with actual DB insertion)
  public async createUser(userData: any): Promise<void> {
    // Insert user into the database
    console.log('Creating user:', userData);
  }
  
  public async hashPassword(Password: string): Promise<string> {
    try {
      return await bcrypt.hash(Password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }


  // Send OTP via SMS using the provided API
  public async sendOTP(mobileNo: string, otp: string): Promise<void> {
    const apiUrl = `http://sms1.powerstext.in/http-tokenkeyapi.php?authentic-key=33325445454e5346415348494f4e533130301725964437&senderid=TEXTTO&route=1&number=${mobileNo}&message=Please use ${otp} OTP. Please do not disclose this OTP with anyone. Thanks. Text2&templateid=1607100000000288161`;

    try {
      const response = await axios.get(apiUrl);
      console.log('SMS sent successfully:', response.data);
    } catch (err) {
      console.error('Error sending SMS:', err);
      throw new Error('Failed to send OTP');
    }
  }
}

export default OtpRegService;


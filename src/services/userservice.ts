import Database from '../db/Database';
import User, { UserRetrive } from '../Models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;

class UserService {
  private db = Database.getInstance();

  public async createUser(user: User): Promise<void> {
    const query = 'CALL AddUserDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      user.UserName || null,
      user.email || null,
      user.Password || null,
      user.mobileNo || null,
      user.PANCard || null,
      user.address || null,
      user.profilePic || null,
      user.state || null,
      user.district || null,
      user.pinCode || null,
      user.country || null
    ];
    console.log(user.UserName)
    console.log("vals"+values)
    await this.db.execute(query, values);
  }

  public async findUserByName(userName: string): Promise<UserRetrive | null> {
    const query = 'SELECT UserId, UserName, email, Password FROM userdetails WHERE email = ?';
  
    // Cast the result to an array of RowDataPacket
    const [rows] = await this.db.execute<RowDataPacket[]>(query, [userName]);
  
    // Type assertion to UserRetrive[] based on the expected structure
    const userRows = rows as UserRetrive[];
  
    return userRows.length > 0
      ? new UserRetrive(userRows[0].UserId, userRows[0].UserName, userRows[0].email, userRows[0].Password)
      : null;
  }
  
  public async hashPassword(Password: string): Promise<string> {
    try {
      return await bcrypt.hash(Password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

  public async comparePassword(Password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(Password, hashedPassword);
  }
// Generate JWT without UserId during signup
public generateJWTWithoutId(username: string, email: string): string {
  return jwt.sign({ username, email }, jwtSecret, { expiresIn: '1h' });
}

// Generate JWT with UserId during sign-in
public generateJWT(userId: number, username: string): string {
  return jwt.sign({ id: userId, username }, jwtSecret, { expiresIn: '1h' });
}
}

export default UserService;

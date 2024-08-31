import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: mysql.Pool;

  private constructor() {}

  public static getInstance(): mysql.Pool {
    if (!Database.instance) {
      Database.instance = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Mysql@7416',
        database: process.env.DB_NAME || 'project1',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
    return Database.instance;
  }
}

export default Database;

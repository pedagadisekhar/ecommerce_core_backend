import { Request, Response } from 'express';
import ClassService from '../services/ClassService';

export default class ClassController {
  public static async insertClass(req: Request, res: Response) {
    try {
      const result = await ClassService.insertClass(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

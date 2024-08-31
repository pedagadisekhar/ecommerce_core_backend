import Database from '../db/Database';
import { ClassData } from '../Models/classmodel';

export default class ClassService {
  private static db = Database.getInstance();

  public static async insertClass(classData: ClassData) {
    try {
      const [result] = await ClassService.db.execute(
        'CALL InsertIntoClassTableMaster(?, ?, ?, ?, ?, ?, ?)',
        [
          classData.ClassName,
          classData.strength,
          classData.total_strength,
          classData.isactive,
          classData.created_by,
          classData.Territory,
          classData.TerritoryId,
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

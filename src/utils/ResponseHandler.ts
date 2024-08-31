import { Response } from 'express';

class ResponseHandler {
  public static success(res: Response, data: any): void {
    res.status(200).json({
      status: 'success',
      data
    });
  }

  public static error(res: Response, message: string): void {
    res.status(500).json({
      status: 'error',
      message
    });
  }
}

export default ResponseHandler;

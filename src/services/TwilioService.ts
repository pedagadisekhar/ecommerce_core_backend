import { Twilio } from 'twilio';
import { injectable } from 'inversify';

@injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    // Initialize Twilio client with your account SID and auth token from environment variables
    this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);
  }

  public async sendOtp(mobileNo: string, otp: string): Promise<void> {
    try {
      await this.client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER as string,
        to: mobileNo
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }
}


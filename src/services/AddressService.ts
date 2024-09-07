import Database from '../db/Database';

class AddressService {
  private db = Database.getInstance();

  public async addAddress(userId: number, address: any, orderId: number) {
    const query = `
      INSERT INTO AddressMaster 
      (userId, name, mobile, address,orderId, landmark, street, city, state, postalCode, country) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const params = [
      userId,
      address.name,
      address.mobile,
      address.address,
       orderId,
      address.landmark,
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ];
   console.log(params);
    await this.db.execute(query, params);
  }
}

export default new AddressService();

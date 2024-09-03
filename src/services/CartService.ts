import Database from '../db/Database';



class  CartService {
    private db = Database.getInstance();

    public async addProductToCart(userId: number, productId: number, quantity: number): Promise<void> {
        const query = 'CALL AddProductToCart(?, ?, ?)';
        const [result] = await this.db.execute(query, [userId, productId, quantity]);
    
        // Optionally, handle the result if needed
        // For example, check if the operation was successful
        console.log(result);
        
      }
    
      public async getCartDataById<T>(userId: number): Promise<T | null> {
        //const query = 'select * from carttransactiontable where userid  = ?';
        const query = 'call getdatafromcart(?)';

        const [rows] = await this.db.query(query, [userId]);
    
        // Assuming rows is an array of results
        if ([rows].length > 0) {
            const productData = rows[0] as T;
            return productData;
         }
    
        return null;
    }

    public async removeCartDataById<T>(cartId: number): Promise<T | null> {
        //const query = 'select * from carttransactiontable where userid  = ?';
        const query = 'call removedatafromcart(?)';

        const [rows] = await this.db.query(query, [cartId] );

       
    
        // Assuming rows is an array of results
        if ([rows].length > 0) {
            const productData = rows[0] as T;
            return productData;
         }
    
        return null;
    }

}  

export default CartService;
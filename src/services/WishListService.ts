import Database from '../db/Database';



class  WishListService {
    private db = Database.getInstance();
    

    public async addToWishList(userId: number, productId: number, quantity: number,size: string): Promise<void> {
        const query = 'CALL AddProductToWishList(?, ?, ? ,?)';
        const [result] = await this.db.execute(query, [userId, productId, quantity,size]);
    
        // Optionally, handle the result if needed
        // For example, check if the operation was successful
        console.log(result);
        
      }
    
      public async getWishListDataById<T>(userId: number): Promise<T | null> {
        //const query = 'select * from carttransactiontable where userid  = ?';
        const query = 'call getdatafromwishlist(?)';

        const [rows] = await this.db.query(query, [userId]);
    
        // Assuming rows is an array of results
        if ([rows].length > 0) {
            const productData = rows[0] as T;
            return productData;
         }
    
        return null;
    }
    

    public async getWishListDatacountById<T>(userId: number): Promise<T | null> {
        const query = 'select count(*) from wishlisttable where userid  = ?';
        //const query = 'call getdatafromcart(?)';

        const [rows] = await this.db.query(query, [userId]);
    
        // Assuming rows is an array of results
        if ([rows].length > 0) {
            const productData = rows[0] as T;
            return productData;
         }
    
        return null;
    }





    public async removeWishListDataById<T>(cartId: number): Promise<T | null> {
        //const query = 'select * from carttransactiontable where userid  = ?';
        const query = 'call removedatafromwishlist(?)';

        const [rows] = await this.db.query(query, [cartId] );

       

    
        // Assuming rows is an array of results
        if ([rows].length > 0) {
            const productData = rows[0] as T;
            return productData;
         }
    
        return null;
    }

}  

export default WishListService;
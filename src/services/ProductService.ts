
import Database from '../db/Database';
import Product from '../Models/Product';
import GetProduct from '../Models/GetProduct';

class ProductService {
  private db = Database.getInstance();
  
 
  public async getAllProducts() {
    const query = 'SELECT * FROM products';
    const [rows] = await this.db.execute(query);
    return rows;
  }

  public async getTrendingProducts() {
    const query = 'CALL GetTrendingProducts()';
    const [rows] = await this.db.execute(query);
    return rows;
}


  public async createProduct(product: Product): Promise<void> {
    const query = `
      INSERT INTO products (ProductName, description, price, inventory, sku, imageUrl,istrending,createdby)
      VALUES (?, ?, ?, ?, ?, ?,?,?)
    `;
    const values = [
      product.name,
      product.description,
      product.price,
      product.inventory,
      product.sku,
      product.image,
      product.istrending,
      product.createdby

    ];
    await this.db.execute(query, values);
  }

  public async getProductById(productId: number): Promise<GetProduct | null> {
    const query = 'SELECT * FROM products WHERE ProductId = ?';
    const [rows] = await this.db.query(query, [productId]);

    const productData = rows[0];
  return new GetProduct(
    productData.ProductId,
    productData.name,
    productData.description,
    productData.price,
    productData.inventory,
    productData.sku,
    productData.createdby,      // Include 'createdby'
    productData.istrending,     // Include 'istrending'
    productData.imageUrl          // Ensure 'image' is the correct field from the database
  );

    return null;
  }


}

export default ProductService;


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

public async searchProductsByKeyword(keyword: string): Promise<Product[]> {
  const query = `CALL SearchProductsByKeyword(?)`; // Call the stored procedure
  const values = [keyword]; // Pass the keyword as a parameter

  try {
      const [rows] = await this.db.execute(query, values);
      return rows[0] as Product[]; // Use rows[0] because stored procedures return results as an array of arrays
  } catch (error) {
      console.error('Error executing search query:', error);
      throw new Error('Failed to search products');
  }
}


public async getOfferProducts() {
  const query = 'CALL getOfferProducts()';
  const [rows] = await this.db.execute(query);
  return rows;
}

public async createProduct(product: Product): Promise<void> {
  const query = `
    INSERT INTO products 
    (ProductName, description, price, inventory, sku, imageUrl, istrending, createdby, image2, image3, design, size, keyHighlights, FabricMaterial, SleeveType, Fit, brand, NeckStyle, isoffer, isfestival, isspecial)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    product.name,
    product.description,
    product.price,
    product.inventory,
    product.sku,
    product.imageUrl,
    product.istrending,
    product.createdby,
    product.image2,
    product.image3,
    product.design,
    product.size,
    product.keyHighlights,
    product.FabricMaterial,
    product.SleeveType,
    product.Fit,
    product.brand,
    product.NeckStyle,
    product.isoffer,
    product.isfestival,
    product.isspecial
  ];
  await this.db.execute(query, values);
}


public async getProductById(productId: number): Promise<any> {
  const query = 'SELECT * FROM products WHERE ProductId = ?';
  const [rows] = await this.db.query(query, [productId]);

  // If no product is found, return null
  // if (rows.length === 0) {
  //     return null;
  // }

  // Return the raw data directly
  return rows[0];
}




}

export default ProductService;

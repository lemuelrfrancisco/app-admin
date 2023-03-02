import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";
import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContext";

function Products() {
  const [products, setProducts] = useState([]);
  const productCtx = useContext(ProductContext);

  useEffect(() => {
    axios.get("/products").then((response) => {
      productCtx.updateProducts(response.data);
    });
  }, []);

  const handleDeleteProduct = (data) => {
    productCtx.deleteProduct(data);
  };

  useEffect(() => {
    setProducts(productCtx.products);
  }, [productCtx.products]);
  return (
    <div className="Products">
      <h1>Products</h1>
      <div className="content">
        <div>
          <button>Add Product</button>
        </div>
        <div>
          <table className="products-table" cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <td>ID</td>
                <td></td>
                <td>Name</td>
                <td>Price</td>
                <td>Size</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products !== undefined ? (
                products.map((product, i) => (
                  <tr key={i}>
                    <td>{product.id}</td>
                    <td className="product-thumbnail">
                      <img src={`http://localhost/${product.image}`} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.size}</td>
                    <td>
                      <button>Edit</button>
                      <button onClick={() => handleDeleteProduct(product)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;

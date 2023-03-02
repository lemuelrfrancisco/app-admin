import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/products").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="Products">
      <h1>Products</h1>
      <div className="content">Products page</div>
      <div>
        <table className="products-table" cellspacing="0" cellpadding="0">
          <tr>
            <td>ID</td>
            <td></td>
            <td>Name</td>
            <td>Price</td>
            <td>Size</td>
            <td>Action</td>
          </tr>
          {products.map((product, i) => (
            <tr id={i}>
              <td>{product.id}</td>
              <td className="product-thumbnail">
                <img src={`http://localhost/${product.image}`} />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.size}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Products;

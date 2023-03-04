import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";
import { useContext } from "react";
import { ProductContext } from "../../../Contexts/ProductContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";

function Products() {
  const [products, setProducts] = useState([]);
  const productCtx = useContext(ProductContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    axios.get("/products").then((response) => {
      productCtx.updateProducts(response.data);
    });
  }, []);

  const handleDeleteProduct = (data) => {
    axios
      .delete(`/products/${data.id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.accessToken}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        productCtx.deleteProduct(data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    setProducts(productCtx.products);
  }, [productCtx.products]);
  return (
    <div className="Products">
      <h1>Products</h1>
      <div className="content">
        <div>
          <Link to="/main/products/form">
            <button>Add Product</button>
          </Link>
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
                      <img
                        src={`http://localhost/php-rest-api-git/${product.image}`}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.size}</td>
                    <td>
                      <Link to={`/main/products/form/${product.id}`}>
                        <button>Edit</button>
                      </Link>
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

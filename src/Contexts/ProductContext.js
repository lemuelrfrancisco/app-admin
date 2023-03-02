import { createContext, useState } from "react";

export const ProductContext = createContext({
  products: [],
  updateProducts: () => {},
  addProduct: () => {},
  deleteProduct: () => {},
});

function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  function updateProducts(products) {
    setProducts(products);
  }

  function addProduct(product) {
    let currentProducts = products;
    currentProducts = [...products, product];
    setProducts(currentProducts);
  }

  function deleteProduct(product) {
    //structedClone is javascript function to clone a object
    const newSet = structuredClone(products);
    const index = products.findIndex((data) => data === product);
    //splice is used to remove an element from array
    newSet.splice(index, 1);
    setProducts(newSet);
  }

  const value = {
    products: products,
    updateProducts: updateProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductContextProvider;

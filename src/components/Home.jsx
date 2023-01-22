import React, { useState } from "react";
import Filter from "./Filter";
import Products from "./Products";
import Cart from "./Cart";
import data from "../data.json";

const Home = () => {
  const [item, setItem] = useState(data.products);
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

  const sortProducts = (e) => {
    setSort(e.target.value);
    if (sort === "asc") {
      setItem(data.products.sort((a, b) => (a.id < b.id ? 1 : -1)));
    }
    if (sort === "desc") {
      setItem(data.products.sort((a, b) => (a.id > b.id ? 1 : -1)));
    }
  };

  const filterProducts = (e) => {
    if (e.target.value === "") {
      setBrand(e.target.value);
      setItem(data.products);
    } else {
      setBrand(e.target.value);
      setItem(
        data.products.filter(
          (item) => item.availibleBrand.indexOf(e.target.value) >= 0
        )
      );
    }
  };

  const addProducts = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty + 1 } : element
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeProducts = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);

    if (exist.qty === 1) {
      setCartItems(cartItems.filter((element) => element.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty - 1 } : element
        )
      );
    }
  };

  // setCartItems([...cartItems, { ...product }]);

  return (
    <div>
      <div className="container">
        <header>
          <a href="">فروشگاه تاپ لرن</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={item.length}
                sortProducts={sortProducts}
                brand={brand}
                filterProducts={filterProducts}
              />
              <Products items={item} addProducts={addProducts} />
            </div>
            <div className="sidebar">
              <Cart removeProducts={removeProducts} cartItems={cartItems} />
            </div>
          </div>
        </main>
        <footer>طراحی توسط من و تو</footer>
      </div>
    </div>
  );
};

export default Home;

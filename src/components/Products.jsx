import React from "react";
import formatCurrency from "./util";

function Products({ items, addProducts }) {
  return (
    <div>
      <ul className="products">
        {items.map((item) => {
          return (
            <li key={item.id}>
              <div className="product">
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <div className="product-price">
                  <button onClick={() => addProducts(item)}>
                    افزودن به سبد خرید
                  </button>
                  <div className="price">{formatCurrency(item.price)}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Products;

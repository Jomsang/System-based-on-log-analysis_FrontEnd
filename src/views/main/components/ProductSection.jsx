import React from "react";
import "./ProductSection.module.css";

const products = [
  { name: "Men Shoes", price: "$70", img: "shoe-img-url" },
  { name: "Velvet Shoes", price: "$200", img: "velvet-shoe-img-url" },
  { name: "Women Sweater", price: "$60", img: "sweater-img-url" },
  { name: "Beige Handbag", price: "$220", img: "handbag-img-url" },
  { name: "Classic Glasses", price: "$60", img: "glasses-img-url" },
  { name: "Pink Dress", price: "$160", img: "dress-img-url" },
  { name: "Men Sweater", price: "$60", img: "men-sweater-img-url" },
];

function ProductSection() {
  return (
    <div className="product-section">
      <h2>Explore New Products</h2>
      <div className="product-categories">
        <button>Technologies</button>
        <button>Fashion</button>
        <button>Furniture</button>
        <button>Beauty</button>
        <button>Books</button>
        <button>Toys</button>
      </div>
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.name}>
            <img src={product.img} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSection;

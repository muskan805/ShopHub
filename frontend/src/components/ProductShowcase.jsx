import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

function ProductShowcase() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `/api/products?keyword=${keyword}`
        );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <section
      style={{
        padding: "30px",
      }}
    >
      <h2
        style={{
          fontSize: "40px",
          marginBottom: "30px",
          color: "#1E293B",
        }}
      >
        Featured Products
      </h2>

      {products.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
            color: "#555",
          }}
        >
          No Products Found
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "20px",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  minHeight: "430px",
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    borderRadius: "15px",
                    background: "#fff",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Product Name */}
                <h3
                  style={{
                    color: "#1E293B",
                    marginTop: "20px",
                    fontSize: "22px",
                  }}
                >
                  {product.name}
                </h3>

                {/* Brand */}
                <p
                  style={{
                    color: "#64748B",
                    marginTop: "8px",
                  }}
                >
                  {product.brand}
                </p>

                {/* Rating */}
                <p
                  style={{
                    color: "#F59E0B",
                    marginTop: "8px",
                    fontWeight: "bold",
                  }}
                >
                  ⭐ {product.rating || 4.5} (
                  {product.numReviews || 0} Reviews)
                </p>

                {/* Price */}
                <p
                  style={{
                    color: "#59b7ee",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  ₹{product.price}
                </p>

                {/* Stock */}
                <p
                  style={{
                    color:
                      product.countInStock > 0
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  {product.countInStock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </p>

                {/* View Button */}
                <button
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    background: "#84e2fc",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  View Product
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductShowcase;
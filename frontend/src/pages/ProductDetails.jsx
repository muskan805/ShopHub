import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existItem = cartItems.find(
      (item) => item.product === product._id
    );

    if (existItem) {
      existItem.qty += 1;
    } else {
      cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
        numReviews: product.numReviews,
        category: product.category,
        price: product.price,
        qty: 1,
      });
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

    navigate("/cart");
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        
        {/* Product Image */}

        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Product Information */}

        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1>{product.name}</h1>

          <h2
            style={{
              color: "#42A5F5",
              marginTop: "10px",
            }}
          >
            ₹{product.price.toLocaleString()}
          </h2>

          <p>
            <strong>Brand:</strong> {product.brand}
          </p>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.countInStock > 0
              ? "In Stock"
              : "Out Of Stock"}
          </p>

          <hr />

          <h3>Description</h3>

          <p>{product.description}</p>

          <button
            onClick={addToCartHandler}
            style={{
              background: "linear-gradient(90deg,#42A5F5,#64B5F6)",
               
              color: "white",
              border: "none",
              padding: "14px 35px",
              borderRadius: "30px",
              fontSize: "17px",
              cursor: "pointer",
              marginTop: "25px",
              fontWeight: "bold",
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
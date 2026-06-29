import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/cart" element={<Cart />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/myorders" element={<MyOrders />} />
       <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
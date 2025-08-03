import { FaBeer } from "react-icons/fa"
import Products from "./components/Products"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import NavBar from "./components/NavBar"
import About from "./components/about/About"
import Contact from "./components/contact/Contact"
import { Toaster } from "react-hot-toast"
import Cart from "./components/cart/Cart"
import Login from "./components/login/Login"
import PrivateRoute from "./components/routes/PrivateRoute"
import Register from "./components/register/Register"

function App() {

  return (
    <>
   <BrowserRouter>
   <NavBar />
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/" element={<PrivateRoute publicPage />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
   </BrowserRouter>
   <Toaster position="bottom-right" />
   </>
  )
}

export default App

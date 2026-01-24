import Navbar from "./customer/components/navbar/Navbar"
import { ThemeProvider } from "@mui/material"
import customTheme from "./theme/customTheme"
import Home from "./customer/pages/home/Home"
import Product from "./customer/pages/product/Product"
import ProductDetails from "./customer/pages/page-details/ProductDetails"
import Review from "./customer/pages/review/Review"
import Cart from "./customer/pages/cart/Cart"
import Checkout from "./customer/checkout/Checkout"
import Account from "./customer/pages/account/Account"
import { Route, Routes } from "react-router-dom"
import BecomeSeller from "./customer/pages/become-seller/BecomeSeller"
import SellerAccountForm from "./customer/pages/become-seller/SellerAccountForm"
function App() {

  return (
    
    <ThemeProvider theme={customTheme}>

    <div >
      <Navbar/>
      {/* <Home/> */}
      {/* <Product/> */}
      {/* <ProductDetails/> */}
      {/* <Review/> */}
      {/* <Cart/> */}
      {/* <Checkout/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<Product/>}/>
        <Route path='/reviews/:productId' element={<Review/>}/>
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/become-seller' element={<BecomeSeller/>}/>
        <Route path='/account/*' element={<Account/>}/>
        <Route path='/seller/*' element={<Account/>}/>
      </Routes>
    </div>

    </ThemeProvider>
  )
}

export default App

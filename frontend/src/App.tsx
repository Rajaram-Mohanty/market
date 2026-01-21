import Navbar from "./customer/components/navbar/Navbar"
import { ThemeProvider } from "@mui/material"
import customTheme from "./theme/customTheme"
import Home from "./customer/pages/home/Home"
import Product from "./customer/pages/product/Product"
import ProductDetails from "./customer/pages/page-details/ProductDetails"
import Review from "./customer/pages/review/Review"
import Cart from "./customer/pages/cart/Cart"
function App() {

  return (
    
    <ThemeProvider theme={customTheme}>

    <div >
      <Navbar/>
      {/* <Home/> */}
      {/* <Product/> */}
      {/* <ProductDetails/> */}
      {/* <Review/> */}
      <Cart/>
    </div>

    </ThemeProvider>
  )
}

export default App

import React, { useEffect } from "react"
import { Provider } from "react-redux";
import store from "./redux-setup/store";
import { getCategories } from "./services/Api";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import Shared
import Header from "./shared/components/Layout/Header"
import Menu from "./shared/components/Layout/Menu"
import Slider from "./shared/components/Layout/Slider";
import Footer from "./shared/components/Layout/Footer";
import Sidebar from "./shared/components/Layout/Sidebar"

// Import Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Category from "./pages/Category"
import Search from "./pages/Search"
import Success from "./pages/Success"
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"

const App = () => {
  const [categories, setCategories] = React.useState([])
  useEffect(()=>{
    getCategories({}).then(({data})=>{
      
      return setCategories(data.data.docs);
    });
  },[]);
  return ( 
    <>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          < div id="body" >
            <div className="container">
              <div className="row">
                <Menu item={categories}/>
              </div>
              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  {/*	Slider	*/}
                  <Slider />
                  {/*	End Slider	*/}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category-:id" element={<Category />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/productdetails-:id" element={<ProductDetails />} />
                    <Route path="/*" element={<NotFound />} />
                    
                  </Routes>
                </div>
                <Sidebar />
              </div>
            </div>
          </div >
          <Footer />
        </div>
      </BrowserRouter>
      </Provider>
    </>
  )
}
export default App
import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import Authlogin from "./pages/auth/login"
import Authregister from "./pages/auth/register"
import Adminlayout from "./components/admin-view/layout"
import Admindashboard from "./pages/admin-view/dashboard"
import Adminproducts from "./pages/admin-view/products"

import Adminfeatures from "./pages/admin-view/features"
import Shoppinglayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListion from "./pages/shopping-view/listing"
import ShoppingListing from "./pages/shopping-view/listing"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingAccount from "./pages/shopping-view/account"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"

import { Skeleton } from "@/components/ui/skeleton"
import AdminordersView from "./components/admin-view/orders"
import PaypalReturnPage from "./pages/shopping-view/paypal-return"
import PaymentSuccessPage from "./pages/shopping-view/payment-success"
import SearchProducts from "./pages/shopping-view/search"


function App() {

  

  //use redux store
  const {user,isAuthenticated, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(checkAuth())

  },[dispatch])

  if(isLoading) return <Skeleton className="w-[800] bg-black h-[600px] rounded-full" />




  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        } >
          <Route path="login" element={<Authlogin/>} />
          <Route path="register" element={<Authregister/>} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <Adminlayout/>
          </CheckAuth>
        } >
          <Route path="dashboard" element={<Admindashboard/>} />
          <Route path="products" element={<Adminproducts/>} />
          <Route path="orders" element={<AdminordersView/>} />
          <Route path="features" element={<Adminfeatures/>} />
        </Route>
        <Route path="/shop"  element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <Shoppinglayout/>
          </CheckAuth>
        }>
          
          <Route path="home" element={<ShoppingHome/>} />
          <Route path="listing" element={<ShoppingListing/>} />
          <Route path="checkout" element={<ShoppingCheckout/>} />
          <Route path="account" element={<ShoppingAccount/>} />
          <Route path="paypal-return" element={<PaypalReturnPage/>} />
          <Route path="payment-success" element={<PaymentSuccessPage/>} />
          <Route path="search" element={<SearchProducts/>} />
        </Route>
       
       
        <Route path="/unauth-page" element={<UnauthPage/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App

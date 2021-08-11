import React from "react";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/home";
import AddProduct from "./components/Products/AddProduct";
import ListProduct from "./components/Products/ListProduct";
import EditProduct from "./components/Products/EditProduct";
import Register from "./components/Auth/Register";
import GuestRoute from "./components/GuestRoute";
import Layout from "./components/Layout";
import ForgetPassword from './components/Auth/forgetpassword';
import ResetPassword from './components/Auth/resetPassword';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <Layout>
        <div>
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <GuestRoute path="/change-password/:slug" component={ResetPassword} />
          <GuestRoute path="/add-product" exact component={AddProduct} />
          <GuestRoute path="/list-product" exact component={ListProduct} />
           <GuestRoute path="/product-edit/:id" exact component={EditProduct} />
        </div>
        <Route path="/" exact component={Home} />
      </Layout>
    </Router>
  );
}

export default App;

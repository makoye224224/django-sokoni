import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Cart from './components/Cart';
import BuyNow from './components/BuyNow';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CheckEmail from './components/CheckEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountDetails from './components/AccountDetails';
import Orders from './components/Orders';
import ProductForm from './ProductForm';
import MyProducts from './components/MyProducts';
import Facebook from './pages/Facebook';
import Google from './pages/Google';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import Activate from './pages/Activate';
import ProductList from './pages/ProductList';
import Shipping from './components/Shipping';
import AccountCreated from './components/AccountCreated';
import UserProfile from './pages/UserProfile';

function App() {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 55 * 16) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#D3D3D3', minHeight: '60rem' }}>
        <div>
        <Header />
        </div>
       
        <br />
        <div className="App">
          <Route exact path='/' component={ProductList} />
          <Route path="/buynow/:productId" component={BuyNow} />
          <Route path="/details/:productId" component={ProductDetails} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ForgotPassword} />
          <Route path="/checkemail" component={CheckEmail} />
          <Route path="/account" component={UserProfile} />
          <Route path="/orders" component={Orders} />
          <Route path="/products" component={MyProducts} />
          <Route exact path='/facebook' component={Facebook} />
          <Route exact path='/google' component={Google} />
          <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
          <Route exact path='/activate/:uid/:token' component={Activate} />
          <Route exact path='/account_created' component={AccountCreated} />
          <Route path="/cart" component={Cart} />
        </div>
        {showGoToTop && (
          
          <><p
            className="d-flex justify-content-center"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } }
            style={{ cursor: 'pointer', color: '#2dace4' }}
          >
            go to top
          </p><hr /></>
        )}
        <br />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;

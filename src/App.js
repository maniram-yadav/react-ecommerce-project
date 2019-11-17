import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal'


class App extends Component {
    render() {
        return (
            <React.Fragment>
             <Navbar></Navbar>
         
             <Switch>
                 <Route path="/details" component={Details} ></Route>
                 <Route path="/cart" component={Cart} ></Route>
                 <Route path="/" exact component={()=><ProductList />} ></Route>
                 <Route  component={Default} ></Route>
             </Switch>
               <Modal />
            </React.Fragment>
        )
    }
}

export default App

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
import ProductContext from './Context';


class App extends Component {
    
    render() {
        return (
            <React.Fragment>
             <Navbar></Navbar>
         
             <Switch>
                 <Route path="/details" component={Details} ></Route>
                 <Route path="/cart" component={Cart} ></Route>
                 <Route path="/" exact component={()=><ProductList activecategory={this.context.categoryFilter} />} ></Route>
                 <Route  component={Default} ></Route>
             </Switch>
               <Modal />
            </React.Fragment>
        )
    }
}

App.contextType=ProductContext;

export default App

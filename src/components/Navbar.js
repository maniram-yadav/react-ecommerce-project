import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import logo from '../logo.svg'
import {ButtonContainer} from './Button';
import styled from 'styled-components'



export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary
            navbar-dark px-sm-5">
             <Link to="/" >
             <img src={logo} alt="store"
             className="navbar-brand"
             / >
             </Link>
            <ul className="navbar-nav align-items-center">
                <li className="navbar-item ml-5">
                    <Link to="/" className="nav-link">Products</Link>
                </li>
            </ul>
            <Link to="/cart" className="ml-auto" >
            <ButtonContainer style={{color :"#d4e4ee"}}>
                 <span className="mr-2">
                    <i className="fas fa-cart-plus"/>
                 </span>
                 
                 my cart
            </ButtonContainer>
            </Link>


{/*             
https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk  */}

            </NavWrapper>
        )
    }
}

const NavWrapper=styled.nav`
background-color: var(--mainBlue);
.nav-link{
    color:var(--mainWhite)!important;
    font-size:1.3rem;
    text-transform:capitalize!important;
}
`
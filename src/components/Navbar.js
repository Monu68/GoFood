import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import {useCart } from './ContextReducer';

import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from './Cart';
export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }
    const items=useCart();

    const closeModal = () => {
        setCartView(false);
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white py-3 rounded">
                <Link className="navbar-brand fs-3 custom-brand" to="/"><span className='text-warning text-black fst-italic'>FoodCall</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    <ul className="navbar-nav me-auto ">
                        {(localStorage.getItem('authToken')) ?
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 " to="/" aria-current="page"><span className='text-white fs-3'>|</span> </Link>
                            </li>
                            : ""}
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <div className='d-flex me-2'>
                            <Link className="btn text-white fs-5 " to="/login"><span className='text-warning text-black'>Login</span></Link>
                            <div className='text-black fs-3'>|</div>
                            <Link className="btn text-white fs-5" to="/createuser"><span className='text-warning text-black'>Sign Up</span></Link>
                        </div>
                        :
                        <div>
                        <div className='btn text-primary fs-5' onClick={() => setCartView(true)}>
                            My Cart{' '}
                            <Badge pill bg='danger'>
                                {items.length}
                            </Badge>
                        </div>
                        {cartView && (
                            <Modal onClose={closeModal}>
                                <Cart />
                            </Modal>
                        )}
                        <div className='btn text-primary mx-2 fs-5' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                    }
                </div>
            </nav>
        </div>
    )
}

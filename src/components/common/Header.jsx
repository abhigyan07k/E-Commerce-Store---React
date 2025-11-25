import React, { useContext } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router';
import { cartContent } from '../../context/MainContext';

export default function Header() {

   let {cart}  =useContext(cartContent)


  return (
    <header className='shadow-lg py-3'>
        <div className='max-w-[1320px] mx-auto flex justify-between items-center'>
            <div>
                <Link to={'/'}>
                    <img width={120} src="https://ecom-kappa-umber-19.vercel.app/assets/logo-DL0RA_g2.png" alt="" />
                </Link>
            </div>
            <div className='text-center'>
                <Link to={'/cart'}>
                
                
                <span className='flex items-center'>
                        <FaCartShopping/>({cart.length})  
                </span>
              
                <b>Cart</b>
                </Link>
            </div>
        </div>
    </header>
  )
}

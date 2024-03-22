import React, {useState, useEffect} from 'react';
import ListCart from './ListCart';

export default function Cart({cart, removeFromCart})
{
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div className='panier'>
            <h3>Panier</h3>
            <ListCart cart={cart} removeFromCart={removeFromCart}/>
            <h4>Total : {total}€</h4>
        </div>
    )
}
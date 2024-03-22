import React from 'react';

export default function ListCart({cart, removeFromCart})
{
    return (
        <>
            {cart.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.price}€</p>
                    <p>Quantité : {item.quantity}</p>
                    <button onClick={() => removeFromCart(item)}>retirer</button>
                </div>
            ))}
        </>
    )
}
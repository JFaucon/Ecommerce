import React from 'react';

export default function ListCart({cart, removeFromCart, addToCart,Products})
{
    return (
        <>
            {cart.map((item, index) => (
                <div key={index}>
                    <h2>{item.name}</h2>
                    <p>{item.price}€</p>
                    <p>Quantité : {item.quantity}</p>
                    <button onClick={() => removeFromCart(item)}>retirer</button>
                    <button onClick={() => addToCart(item)} disabled={Products.find(p => p.id === item.id) && Products.find(p => p.id === item.id).quantity === 0}>ajouter</button>
                </div>
            ))}
        </>
    )
}
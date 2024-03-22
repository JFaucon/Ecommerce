import React, {useState, useEffect} from 'react';

export default function ProductCard({product, addToCart})
{

    return (
        <>
            <div key={product.id} className='product'>
                <img src={'http://ecommerce.api.pierre-jehan.com/' + product.image.contentUrl}/>
                <div className='description'>
                    <h3>{product.name}</h3>
                    <div className='prix'>{product.price}€</div>
                    <div>Stock : {product.quantity}</div>
                    <button onClick={() => addToCart(product)} disabled={product.quantity === 0}>Ajouter au panier</button>
                </div>
            </div>
        </>
    )
}
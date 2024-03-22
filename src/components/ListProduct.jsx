import ProductCard from './ProductCard';

export default function ListProduct({Product,addToCart, removeFromCart})
{

    return (
        <>
        {Product.map(product => (<ProductCard key={product.id} product={product} addToCart={addToCart}/>))}
        </>
    )
}
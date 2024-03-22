import { useState,useEffect,useRef } from 'react'
import ListProduct from './components/ListProduct'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const [Product, setProduct] = useState([])
  const firstUpdate = useRef(true);

    useEffect(() => {

      let savedCart = localStorage.getItem('cart');
      if (savedCart) {
        savedCart = JSON.parse(savedCart);
        setCart(savedCart);
      }

      fetch('http://ecommerce.api.pierre-jehan.com/products')
      .then(response => response.json())
      .then(data => {
        if (savedCart) {
          setProduct(data['hydra:member'].map(product => {
            const existingProduct = savedCart.find(item => item.id === product.id);
            if (existingProduct) {
              return {...product, quantity: product.quantity - existingProduct.quantity};
            }
            return product;
          }));
        } else {
          setProduct(data['hydra:member']);
        }
      });
    }, []);
    
    useEffect(() => {
        // Stocker le panier dans le localStorage chaque fois que le panier change
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Le produit existe déjà dans le panier, augmentez la quantité
      setCart(cart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        ));
    } else {
        // Le produit n'est pas dans le panier, ajoutez-le avec une quantité de 1
        setCart([...cart, {...product, quantity: 1}]);
    }
    //product.quantity--;
    setProduct(Product.map(item => 
      item.id === product.id ? {...item, quantity: item.quantity - 1} : item
    ));
  }
  const removeFromCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct.quantity > 1) {
        // Si la quantité du produit est supérieure à 1, décrémentez la quantité
        setCart(cart.map(item => 
            item.id === product.id ? {...item, quantity: item.quantity - 1} : item
        ));
    } else {
        // Si la quantité du produit est 1, supprimez le produit du panier
        setCart(cart.filter(item => item.id !== product.id));
    }
    setProduct(Product.map(item => 
      item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    ));
  }

  return (
    <>
      <div className='container'>
        <div className='grid'>
          <ListProduct Product={Product} addToCart={addToCart} removeFromCart={removeFromCart}/>
        </div>
      </div>
      <div className='container-2'>
        <Cart cart={cart} Products={Product} removeFromCart={removeFromCart} addToCart={addToCart}/>
      </div>
    </>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Carrinho from './pages/Carrinho';
import Mercado from './pages/Mercado';
import './css/app.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('bioMarketCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
        localStorage.removeItem('bioMarketCart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bioMarketCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produto) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === produto.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...produto, quantity: 1 }];
    });
    
    alert(`✅ ${produto.nome} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('bioMarketCart');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="main-content">
        <Mercado addToCart={addToCart} />
      </main>
      
      <Carrinho
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import Header from './components/Header';
import Mercado from './pages/Mercado';
import './css/app.css';

function App() {
  const [cart, setCart] = useState([]);

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

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main className="main-content">
        <Mercado addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
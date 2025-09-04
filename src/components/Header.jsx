import React from 'react';
import '../css/header.css';

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-left">
          <a href="#home">Home</a>
        </nav>

        <h1 className="logo">Bio Market</h1>

        <nav className="nav-right">
          <a href="#produtos">Produtos</a>
          <button className="cart-btn" onClick={onCartClick}>
            Carrinho ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
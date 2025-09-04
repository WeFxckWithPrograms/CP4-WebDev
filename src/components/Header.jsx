import React from 'react';
import '../css/header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">DIPLOSER Market</h1>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#produtos">Produtos</a>
          <a href="#carrinho">Carrinho ({cartCount})</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

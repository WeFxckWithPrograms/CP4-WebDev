import React from 'react';
import '../css/header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav-left">
          <a href="#home">Home</a>
        </nav>

        <h1 className="logo">DIPLOSER Market</h1>

        <nav className="nav-right">
          <a href="#produtos">Produtos</a>
          <a href="#carrinho">Carrinho ({cartCount})</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

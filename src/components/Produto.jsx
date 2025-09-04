import React from 'react';
import '../css/produto.css';

const Produto = ({ produto, onAddToCart }) => {
  const renderInfoEspecifica = () => {
    switch (produto.classe) {
      case 'Roupas':
        return <p className="produto-especifico">Tamanho: {produto.tamanho}</p>;
      case 'Calçados':
        return <p className="produto-especifico">Número: {produto.numero}</p>;
      case 'Beleza':
        return produto.conteudo ? <p className="produto-especifico">Conteúdo: {produto.conteudo}</p> : null;
      case 'Tecnologia Verde':
        return <p className="produto-especifico">{produto.capacidade}</p>;
      case 'Casa Sustentável':
        return <p className="produto-especifico">{produto.duracao}</p>;
      default:
        return null;
    }
  };

  return (

        <div className="produto-card">
          <div className="produto-imagem-placeholder">
            <img className='produto-imagem' src={produto.imagem} alt={produto.nome} />
          </div>
            <div className="produto-info">
              <h3 className="produto-nome">{produto.nome}</h3>
              <p className="produto-classe">{produto.classe}</p>
              {renderInfoEspecifica()}
              <p className="produto-descricao">{produto.descricao}</p>
              <div className="produto-preco">R$ {produto.preco.toFixed(2)}</div>
              <button className="btn-comprar" onClick={() => onAddToCart(produto)}>
                Adicionar ao Carrinho
              </button>
            </div>
        </div>


  );
};

export default Produto;

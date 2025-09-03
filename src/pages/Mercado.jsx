import React, { useState, useEffect } from 'react';
import Produto from '../components/Produto';
import { fetchProdutos } from '../services/api';
import '../css/global.css';

const Mercado = ({ addToCart }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Mercado component mounted - iniciando carga de produtos');
    
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Chamando fetchProdutos...');
        const dados = await fetchProdutos();
        
        console.log('Dados retornados:', dados);
        console.log('Quantidade de produtos:', dados.length);
        
        setProdutos(dados);
        
      } catch (err) {
        console.error('Erro no Mercado:', err);
        setError('Erro ao carregar produtos: ' + err.message);
      } finally {
        setLoading(false);
        console.log('Loading finalizado');
      }
    };

    carregarProdutos();
  }, []);

  // Debug do estado
  useEffect(() => {
    console.log('Estado de produtos atualizado:', produtos);
  }, [produtos]);

  if (loading) {
    console.log('Renderizando loading...');
    return <div className="loading">Carregando produtos sustentáveis...</div>;
  }

  if (error) {
    console.log('Renderizando error:', error);
    return <div className="error">{error}</div>;
  }

  console.log('Renderizando produtos grid com', produtos.length, 'produtos');

  return (
    <div className="mercado-container">
      <h2>Nossos Produtos Sustentáveis</h2>
      <p className="subtitulo">Descubra itens ecológicos para um estilo de vida consciente</p>
      
      {produtos.length === 0 ? (
        <div className="no-products">
          <h3>Nenhum produto encontrado</h3>
          <p>Verifique se o arquivo produto.json está em public/data/</p>
          <p>Abra o console do navegador (F12) para ver detalhes do erro</p>
        </div>
      ) : (
        <div className="produtos-grid">
          {produtos.map(produto => (
            <Produto
              key={produto.id}
              produto={produto}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mercado;
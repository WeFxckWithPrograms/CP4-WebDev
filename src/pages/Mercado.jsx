import React, { useState, useEffect } from 'react';
import Produto from '../components/Produto';
import Filtros from '../pages/Filtros';
import { fetchProdutos } from '../services/api';
import '../css/global.css';

const Mercado = ({ addToCart }) => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
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
        setProdutosFiltrados(dados);
        
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

  const aplicarFiltros = (filtros) => {
    let produtosFiltrados = [...produtos];

    if (filtros.categoria !== 'todos') {
      produtosFiltrados = produtosFiltrados.filter(
        produto => produto.classe === filtros.categoria
      );
    }

    if (filtros.precoMin !== '') {
      produtosFiltrados = produtosFiltrados.filter(
        produto => produto.preco >= Number(filtros.precoMin)
      );
    }

    if (filtros.precoMax !== '') {
      produtosFiltrados = produtosFiltrados.filter(
        produto => produto.preco <= Number(filtros.precoMax)
      );
    }

    switch (filtros.ordenacao) {
      case 'preco-crescente':
        produtosFiltrados.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-decrescente':
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
        break;
      case 'nome-a-z':
        produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'nome-z-a':
        produtosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        break;
    }

    setProdutosFiltrados(produtosFiltrados);
  };

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

  console.log('Renderizando produtos grid com', produtosFiltrados.length, 'produtos filtrados');

  return (
    <div className="mercado-container">
      <div className="mercado-header">
        <h2>Nossos Produtos Sustentáveis</h2>
        <p className="subtitulo">Descubra itens ecológicos para um estilo de vida consciente</p>
      </div>

      <Filtros 
        produtos={produtos} 
        onFiltrosChange={aplicarFiltros} 
      />
      
      <div className="resultados-filtro">
        <p>
          {produtosFiltrados.length === produtos.length 
            ? `Mostrando todos os ${produtos.length} produtos`
            : `Mostrando ${produtosFiltrados.length} de ${produtos.length} produtos`
          }
        </p>
      </div>
      
      {produtosFiltrados.length === 0 ? (
        <div className="no-products">
          <h3>Nenhum produto encontrado</h3>
          <p>Nenhum produto corresponde aos filtros aplicados.</p>
          <p>Tente ajustar os critérios de filtragem.</p>
        </div>
      ) : (
        <div className="produtos-container">
          {produtosFiltrados.map(produto => (
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
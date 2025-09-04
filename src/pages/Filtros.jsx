import React, { useState, useEffect } from 'react';
import '../css/filtros.css';

const Filtros = ({ produtos, onFiltrosChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    precoMin: '',
    precoMax: '',
    ordenacao: 'padrao'
  });

  
  useEffect(() => {
    if (produtos.length > 0) {
      const categoriasUnicas = [...new Set(produtos.map(produto => produto.classe))];
      setCategorias(categoriasUnicas);
    }
  }, [produtos]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    const novosFiltros = {
      ...filtros,
      [name]: value
    };
    
    setFiltros(novosFiltros);
    onFiltrosChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = {
      categoria: 'todos',
      precoMin: '',
      precoMax: '',
      ordenacao: 'padrao'
    };
    
    setFiltros(filtrosLimpos);
    onFiltrosChange(filtrosLimpos);
  };

  const temFiltrosAtivos = filtros.categoria !== 'todos' || 
                          filtros.precoMin !== '' || 
                          filtros.precoMax !== '' || 
                          filtros.ordenacao !== 'padrao';

  return (
    <div className="filtros-container">
      <h3>Filtrar Produtos</h3>
      
      <div className="filtro-group">
        <label htmlFor="categoria">Categoria:</label>
        <select 
          id="categoria"
          name="categoria" 
          value={filtros.categoria} 
          onChange={handleFiltroChange}
          className="filtro-select"
        >
          <option value="todos">Todas as categorias</option>
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-group">
        <label>Faixa de Preço:</label>
        <div className="preco-inputs">
          <input
            type="number"
            name="precoMin"
            placeholder="Mínimo"
            value={filtros.precoMin}
            onChange={handleFiltroChange}
            min="0"
            className="preco-input"
          />
          <span className="preco-separador">-</span>
          <input
            type="number"
            name="precoMax"
            placeholder="Máximo"
            value={filtros.precoMax}
            onChange={handleFiltroChange}
            min="0"
            className="preco-input"
          />
        </div>
      </div>

      <div className="filtro-group">
        <label htmlFor="ordenacao">Ordenar por:</label>
        <select 
          id="ordenacao"
          name="ordenacao" 
          value={filtros.ordenacao} 
          onChange={handleFiltroChange}
          className="filtro-select"
        >
          <option value="padrao">Padrão</option>
          <option value="preco-crescente">Preço: Menor para Maior</option>
          <option value="preco-decrescente">Preço: Maior para Menor</option>
          <option value="nome-a-z">Nome: A-Z</option>
          <option value="nome-z-a">Nome: Z-A</option>
        </select>
      </div>

      {temFiltrosAtivos && (
        <button 
          className="btn-limpar-filtros"
          onClick={limparFiltros}
        >
          Limpar Filtros
        </button>
      )}
    </div>
  );
};

export default Filtros;
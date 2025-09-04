import React, { useState, useEffect } from 'react';
import '../css/carrinho.css';

const Carrinho = ({ isOpen, onClose, cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [historicoCompras, setHistoricoCompras] = useState([]);
  const [compraData, setCompraData] = useState(null);
  const total = cartItems.reduce((sum, item) => sum + (item.preco * item.quantity), 0);

  useEffect(() => {
    const savedHistory = localStorage.getItem('bioMarketHistory');
    if (savedHistory) {
      try {
        setHistoricoCompras(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Erro ao carregar histórico do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (historicoCompras.length > 0) {
      localStorage.setItem('bioMarketHistory', JSON.stringify(historicoCompras));
    }
  }, [historicoCompras]);


  const processarPagamento = (dadosCompra) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const sucesso = Math.random() > 0.1;
        
        if (sucesso) {
          resolve({
            codigo: Math.random().toString(36).substring(2, 10).toUpperCase(),
            mensagem: 'Pagamento processado com sucesso!'
          });
        } else {
          reject(new Error('Falha no processamento do pagamento. Tente novamente.'));
        }
      }, 2000); 
    });
  };

  const handleFinalizarCompra = async () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    if (!nomeCliente.trim()) {
      alert('Por favor, informe seu nome para finalizar a compra.');
      return;
    }

    const totalComDesconto = formaPagamento === 'pix' ? total * 0.95 : total;
    
    try {
  
      alert('Processando seu pagamento...');

      const resultadoPagamento = await processarPagamento({
        cliente: nomeCliente,
        total: totalComDesconto,
        formaPagamento
      });

      const novaCompra = {
        id: Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        cliente: nomeCliente,
        formaPagamento,
        items: [...cartItems],
        total: totalComDesconto,
        codigoTransacao: resultadoPagamento.codigo
      };
      
      setCompraData(novaCompra);
      setHistoricoCompras(prev => [novaCompra, ...prev]);
      setCompraFinalizada(true);
      clearCart(); 
      
    } catch (error) {
      alert(`❌ Erro: ${error.message}`);
    }
  };

  const handleFecharCarrinho = () => {
    setCompraFinalizada(false);
    setNomeCliente('');
    setFormaPagamento('pix');
    setCompraData(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('bioMarketCustomerName');
      if (savedName) {
        setNomeCliente(savedName);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (nomeCliente) {
      localStorage.setItem('bioMarketCustomerName', nomeCliente);
    }
  }, [nomeCliente]);

  useEffect(() => {
    const savedPayment = localStorage.getItem('bioMarketPaymentMethod');
    if (savedPayment) {
      setFormaPagamento(savedPayment);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bioMarketPaymentMethod', formaPagamento);
  }, [formaPagamento]);

  if (compraFinalizada && compraData) {
    return (
      <>
        <div className={`carrinho-sidebar ${isOpen ? 'open' : ''}`}>
          <div className="carrinho-header">
            <h2>Compra Finalizada!</h2>
            <button className="fechar-carrinho" onClick={handleFecharCarrinho}>×</button>
          </div>
          
          <div className="compra-finalizada">
            <div className="icone-sucesso">✓</div>
            <h3>Obrigado, {compraData.cliente}!</h3>
            <p>Sua compra no valor de <strong>R$ {compraData.total.toFixed(2)}</strong> foi realizada com sucesso.</p>
            <p>Forma de pagamento: <strong>
              {compraData.formaPagamento === 'pix' && 'PIX'}
              {compraData.formaPagamento === 'debito' && 'Cartão de Débito'}
              {compraData.formaPagamento === 'credito' && 'Cartão de Crédito'}
            </strong></p>
            <p>Código da transação: <strong>{compraData.codigoTransacao}</strong></p>
            <p>Data: {compraData.data}</p>
            <p>Em breve você receberá um e-mail com os detalhes da sua compra.</p>
            
            <button className="btn-voltar-as-compras" onClick={handleFecharCarrinho}>
              Voltar às Compras
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div 
            className="carrinho-overlay" 
            onClick={handleFecharCarrinho}
          />
        )}
      </>
    );
  }

  const totalComDesconto = formaPagamento === 'pix' ? total * 0.95 : total;

  return (
    <>
      <div className={`carrinho-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="carrinho-header">
          <h2>Seu Carrinho</h2>
          <button className="fechar-carrinho" onClick={handleFecharCarrinho}>×</button>
        </div>
        
        <div className="carrinho-items">
          {cartItems.length === 0 ? (
            <p className="carrinho-vazio">Seu carrinho está vazio</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="carrinho-item">
                <div className="carrinho-item-imagem">
                  <img src={item.imagem} alt={item.nome} />
                </div>
                <div className="carrinho-item-info">
                  <h4>{item.nome}</h4>
                  <p>{item.classe}</p>
                  <p>R$ {item.preco.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Subtotal: R$ {(item.preco * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remover-item" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="dados-cliente">
            <div className="form-group">
              <label htmlFor="nome">Seu Nome:</label>
              <input
                type="text"
                id="nome"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Forma de Pagamento:</label>
              <div className="opcoes-pagamento">
                <label className="opcao-pagamento">
                  <input
                    type="radio"
                    name="pagamento"
                    value="pix"
                    checked={formaPagamento === 'pix'}
                    onChange={() => setFormaPagamento('pix')}
                  />
                  <span>PIX (5% de desconto)</span>
                </label>
                
                <label className="opcao-pagamento">
                  <input
                    type="radio"
                    name="pagamento"
                    value="debito"
                    checked={formaPagamento === 'debito'}
                    onChange={() => setFormaPagamento('debito')}
                  />
                  <span>Débito</span>
                </label>
                
                <label className="opcao-pagamento">
                  <input
                    type="radio"
                    name="pagamento"
                    value="credito"
                    checked={formaPagamento === 'credito'}
                    onChange={() => setFormaPagamento('credito')}
                  />
                  <span>Crédito</span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        <div className="carrinho-footer">
          {cartItems.length > 0 && (
            <button 
              className="limpar-carrinho"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
                  clearCart();
                }
              }}
            >
              Limpar Carrinho
            </button>
          )}
          
          <div className="carrinho-total">
            <strong>Total: R$ {total.toFixed(2)}</strong>
            {formaPagamento === 'pix' && (
              <div className="desconto-pix">
                Com desconto PIX: <strong>R$ {totalComDesconto.toFixed(2)}</strong>
              </div>
            )}
          </div>
          
          <button 
            className="finalizar-compra"
            onClick={handleFinalizarCompra}
            disabled={cartItems.length === 0 || !nomeCliente.trim()}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="carrinho-overlay" 
          onClick={handleFecharCarrinho}
        />
      )}
    </>
  );
};

export default Carrinho;
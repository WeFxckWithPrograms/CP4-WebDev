// services/api.js
export const fetchProdutos = async () => {
  try {
    console.log('Tentando carregar produtos...');
    const response = await fetch('/data/produto.json');
    
    console.log('Status da resposta:', response.status);
    console.log('URL do fetch:', response.url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Dados recebidos do JSON:', data);
    return data.produtos;
  } catch (error) {
    console.error('Erro detalhado:', error);
    
    // Dados de fallback para teste
    const fallbackData = [
      {
        id: 1,
        nome: "Camisa de Algodão Orgânico",
        classe: "Roupas",
        tamanho: "M",
        descricao: "Camisa confortável feita 100% de algodão orgânico.",
        preco: 79.90
      },
      {
        id: 2,
        nome: "Tênis Sustentável",
        classe: "Calçados",
        numero: "40",
        descricao: "Tênis produzido com garrafas PET recicladas.",
        preco: 199.90
      },
      {
        id: 3,
        nome: "Shampoo Natural Vegano",
        classe: "Beleza",
        conteudo: "500 ml",
        descricao: "Shampoo vegano formulado com ingredientes naturais, sem químicos agressivos e livre de crueldade animal.",
        preco: 32.50
      },
      {
        id: 4,
        nome: "Sabonete Artesanal de Carvão Ativado",
        classe: "Beleza",
        descricao: "Sabonete artesanal vegano que ajuda na limpeza profunda da pele, removendo impurezas e oleosidade.",
        preco: 12.00
      },
      {
        id: 5,
        nome: "Escova de Dentes de Bambu",
        classe: "Higiene",
        descricao: "Escova de dentes sustentável com cabo de bambu biodegradável e cerdas macias.",
        preco: 15.00
      },
      {
        id: 6,
        nome: "Carregador Portátil Solar",
        classe: "Tecnologia Verde",
        capacidade: "Carrega ate duas cargas completas",
        descricao: "Carregador portátil movido a energia solar, perfeito para viagens e uso ao ar livre.",
        preco: 149.90
      },
      {
        id: 7,
        nome: "Bolsa de Tecido Reutilizável",
        classe: "Acessórios",
        descricao: "Bolsa durável feita de tecido reutilizável, substitui sacolas plásticas e ajuda a reduzir resíduos.",
        preco: 39.90
      },
      {
        id: 8,
        nome: "Luminária Solar de Mesa",
        classe: "Casa Sustentável",
        duracão: "Dura cerca de 24 horas com carga cheia",
        descricao: "Luminária compacta que utiliza energia solar para iluminar ambientes de forma econômica e ecológica.",
        preco: 89.90
      }
    ];
    
    console.log('Usando dados fallback:', fallbackData);
    return fallbackData;
  }
};
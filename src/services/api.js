export const fetchProdutos = async () => {
  try {
    console.log('Tentando carregar produtos...');
    const response = await fetch('/db.json'); 

    console.log('Status da resposta:', response.status);
    console.log('URL do fetch:', response.url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados recebidos do JSON:', data);

    return data.produtos;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    throw error; 
  }
};

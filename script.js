// 1. Substitua pela sua URL do Web App gerada no Google Sheets
const dbUrl = 'https://script.google.com/macros/s/AKfycbyoAYcut9iXcGCdU7aX-JlBOFYiB9lBOxwn2YKtyJKgk88cnGhVjDVeXB6t0dwPKSNFHw/exec';

// 2. Seleciona o formulário pelo ID (criaremos isso no HTML depois)
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Impede o recarregamento da página

  // 3. Monta o objeto JSON com os valores dos campos
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    servico: document.getElementById('servico').value // ex: Tráfego Pago, Gestão de Redes, SEO
  };

  try {
    // 4. Envia os dados para a API do Google Sheets
    const requisicao = await fetch(dbUrl, {
      method: 'POST',
      // O Content-Type 'text/plain' evita bloqueios de segurança (CORS) no navegador
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(dados)
    });

    // 5. Verifica se o envio funcionou e limpa o formulário
    if (requisicao.ok) {
      console.log('Novo lead da Lucra+ registrado no banco de dados!');
      alert('Cadastro realizado com sucesso!');
      form.reset(); 
    }
    
  } catch (erro) {
    console.error('Falha na comunicação com o banco de dados:', erro);
    alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
  }
});
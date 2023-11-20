const mostrarBotao = document.getElementById('mostrarBotao');
        const minhaSecao = document.getElementById('minhaSecao');

        // Adiciona um ouvinte de evento para o clique no botão
        mostrarBotao.addEventListener('click',function() {
            console.log('Clicou');
            event.preventDefault();
            // Alterna a classe 'oculta' para mostrar ou ocultar a seção
            minhaSecao.classList.toggle('oculta'); });


    // Número total de assentos
    const totalAssentos = 252;
    // Número de colunas desejado
    const colunas = 9; // Altere este valor conforme necessário
    const linhas = 2; // Altere este valor conforme necessário

    // Elemento onde os assentos serão adicionados
    const mapaAssentos = document.getElementById('mapa-assentos');

    // Adiciona os assentos ao mapa
    for (let i = 1; i <= totalAssentos; i++) {
        const assento = document.createElement('div');
        assento.className = 'assento';
        assento.textContent = i;
        // Calcula a linha e coluna com base no índice atual
         const colunaAtual = (i - 1) % colunas;
         const linhaAtual = Math.floor((i - 1) / colunas);
        // Define o estilo de grid para os assentos
        assento.style.gridColumn = colunaAtual + 1;
        assento.style.gridRow = linhaAtual + 1;
    
        assento.addEventListener('click', selecionarAssento);
        mapaAssentos.appendChild(assento);
    }

    // Função para selecionar/deselecionar um assento
    function selecionarAssento() {
        this.classList.toggle('selecionado');
    }
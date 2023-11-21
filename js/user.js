const mostrarBotao = document.getElementById('mostrarBotao');
        const minhaSecao = document.getElementById('minhaSecao');

        // Adiciona um ouvinte de evento para o clique no botão
        mostrarBotao.addEventListener('click',function() {
            console.log('Clicou');
            event.preventDefault();
            // Alterna a classe 'oculta' para mostrar ou ocultar a seção
            minhaSecao.classList.toggle('oculta'); });


  // Número total de assentos
const totalAssentos = 40;
// Array contendo as letras do alfabeto
const letrasDoAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Número de colunas desejado
const colunas = 4;
let margemPar = 0;
let margemTres = 0;

// Verifica se o número de colunas é múltiplo de 2
if (colunas % 2 === 0) {
    margemPar = 50;
}

// Verifica se o número de colunas é múltiplo de 3
if (colunas % 3 === 0) {
    margemTres = 50;
}

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

    // Adiciona margem para elementos da primeira linha
    if (linhaAtual === 0) {
        assento.style.marginTop = '500px';
    }

    // Adiciona margem para elementos da última linha
    if (linhaAtual === Math.floor((totalAssentos - 1) / colunas)) {
        assento.style.marginBottom = '500px';
    }

    // Adiciona margens para a primeira coluna
    if (colunaAtual === 0) {
        assento.style.marginRight = '0px';
        assento.style.marginLeft = '50px';
    }

    // Adiciona margem para colunas pares apenas se a coluna não for múltiplo de 3
    if (margemPar !== 0 && margemTres === 0 && (colunaAtual + 1) % 2 === 0) {
        assento.style.marginRight = margemPar + 'px';
    }

    // Adiciona margem para colunas múltiplos de 3 ou múltiplos de 2 e 3
    if ((margemTres !== 0 || (margemPar !== 0 && margemTres !== 0)) && (colunaAtual + 1) % 3 === 0) {
        assento.style.marginRight = margemTres + 'px';
    }
    const letraAtual = letrasDoAlfabeto[colunaAtual];
    assento.textContent = `${letraAtual}${i}`;


    assento.addEventListener('click', selecionarAssento);
    mapaAssentos.appendChild(assento);
}



// Função para selecionar/deselecionar um assento
function selecionarAssento() {
    this.classList.toggle('selecionado');
}

// Resto do código...

    
    function calcularElementosPrimeiraLinha(totalAssentos, colunas) {
        // Calcula quantas linhas existem
        const linhas = Math.ceil(totalAssentos / colunas);
        // Calcula quantos elementos estão na última linha
        const elementosPrimeiraLinha = totalAssentos - (linhas - 1) * colunas;
        return elementosPrimeiraLinha;
    }
    
    function calcularElementosUltimaLinha(totalAssentos, colunas) {
        // Calcula quantas linhas existem
        const linhas = Math.ceil(totalAssentos / colunas);
        // Calcula quantos elementos estão na última linha
        const elementosUltimaLinha = totalAssentos % colunas || colunas;
        return elementosUltimaLinha;
    }
    
    chmada
    const elementosPrimeiraLinha = calcularElementosPrimeiraLinha(totalAssentos, colunas);
    const elementosUltimaLinha = calcularElementosUltimaLinha(totalAssentos, colunas);
    
    console.log("Elementos na primeira linha:", elementosPrimeiraLinha);
    console.log("Elementos na última linha:", elementosUltimaLinha);
    

    /* COMENTARIOS 
    Configuração Inicial:
    *PRIMEIRO PASSO
    Define o número total de assentos (totalAssentos) e o número de colunas desejado (colunas).
    Verificação de Múltiplos:
    *VERIFICAÇÃO DA COLUNA
    Verifica se o número de colunas é múltiplo de 2 ou de 3, atribuindo valores às variáveis margemPar e margemTres conforme necessário.
    Criação do Mapa de Assentos:
    *CRIAÇÃO DO ELEMENTO  ASSENTO
    Usa um loop para criar elementos de assento (div) e adicioná-los ao elemento com o ID mapa-assentos.
    *ADICIONA LINHA E COLUNA
    Calcula a linha e coluna com base no índice atual.
    Define o estilo de grid para os assentos.
    Adição de Margens:
    ADICÇAÕ DE MARGEM PARA PRIMEIRA E ULTIMA LINHA PARA O BORDER-RADIUS FAZER EFEITO DE UMA AERONAVE
    Adiciona margem para elementos da primeira linha e última linha, conforme especificado.
    Adiciona margens para a primeira coluna.
    Adiciona margem para colunas pares, dependendo das condições especificadas.
    Adiciona margem para colunas múltiplos de 3 ou múltiplos de 2 e 3, dependendo das condições especificadas.
    Evento de Clique:

    Adiciona um evento de clique aos assentos para alternar a classe 'selecionado', proporcionando uma interatividade básica.
    Funções para Calcular Elementos nas Linhas:

    Define duas funções (calcularElementosPrimeiraLinha e calcularElementosUltimaLinha) para calcular o número de elementos na primeira e última linha, respectivamente.
    Chamada e Exibição no Console:

    Chama essas funções e exibe o resultado no console.*/ 




//------------------------------ LISTAR VOOS -----------------------------------------
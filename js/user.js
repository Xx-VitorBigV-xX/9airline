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
//fazer um codigo que verifica o total de assentos
// Array contendo as letras do alfabeto
const letrasDoAlfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Número de colunas desejado
const colunas = 4;
let margemPar = 0;
let margemTres = 0;
//OBS se tiver duas colunas tem que a margem left tem que ser 100px
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
    /*totalAssentos - 1: Subtrai 1 do número total de assentos. 
    Isso é feito porque, quando dividir pelos números de colunas, queremos garantir que a última linha seja tratada corretamente. 
    Se tivermos, 20 assentos e 5 colunas, precisamos considerar que a última linha terá apenas 4 assentos.
    Math.floor((totalAssentos - 1) / colunas): Divide o resultado do passo anterior pelo número de colunas e arredonda para baixo usando Math.floor. 
    Isso nos dá o número da última linha completa na grade de assentos.*/ 

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
    if (colunas === 2 && colunaAtual === 0){
        assento.style.marginRight = '0px';
        assento.style.marginLeft = '100px';
    }
     else if (colunaAtual === 0) {
        assento.style.marginRight = '0px';
        assento.style.marginLeft = '50px';
    }

    // Adiciona margem para colunas pares apenas se a coluna não for múltiplo de 3
    if (margemPar !== 0 && margemTres === 0 && (colunaAtual + 1) % 2 === 0) {
        assento.style.marginRight = margemPar + 'px'; //a margem px esta sendo passada pela variavel 
    }

    // Adiciona margem para colunas múltiplos de 3 ou múltiplos de 2 e 3
    if ((margemTres !== 0 || (margemPar !== 0 && margemTres !== 0)) && (colunaAtual + 1) % 3 === 0) {
        assento.style.marginRight = margemTres + 'px';//a margem px esta sendo passada pela variavel 
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


// debugando para saber se o codigo esta pegando  a primeira linha e a ultima linha
    
    function calcularElementosPrimeiraLinha(totalAssentos, colunas) {
        // Calcula quantas linhas existem
        const linhas = Math.ceil(totalAssentos / colunas);//Calcula o número total de linhas necessárias para alocar todos os assentos, usa a função math.ceil para aredondar  o numero de linha  para cima, pois é uma divisão e vai dar numero quebrado 
        // Calcula quantos elementos estão na última linha
        const elementosPrimeiraLinha = totalAssentos - (linhas - 1) * colunas; //esta é para pegar o numero de elementos(assentos) que foram preenchidos antes da ultima linha, pois a ultima linha pode dar um numero que nao é o numero total de colunas quebrará o codigo
        return elementosPrimeiraLinha;
    }
    
    function calcularElementosUltimaLinha(totalAssentos, colunas) {
        // Calcula quantas linhas existem
        const linhas = Math.ceil(totalAssentos / colunas); // esta conta serve para saber  quantas linhas precisam para acomodar os assentos de acordo com o numero total de assentos e o numero de colunas 
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
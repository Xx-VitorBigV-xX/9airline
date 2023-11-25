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
    
    // chmada
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




//------------------------------ LISTAR VOOS -----------------------------------------//
//--------------------------------requisições--------------------------------------

async function requestListaVoo() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('http://localhost:3000/listarVoo', requestOptions);
    return response.json();
  }

async function requestBuscaAeroporto() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('http://localhost:3000/BuscarAeroportosAtravesDeCidades', requestOptions);
    return response.json();
  } 

  async function requestListCidade() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('http://localhost:3000/listarCidades', requestOptions);
    return response.json();
  
  }


//--------------------------------------------------------- BUSCA AEROPORTOS APARTIR DA CIDADE
async function consultacidade() {


    requestListCidade().then(customResponse => {
      if (customResponse.status === "SUCCESS") {
         console.log("retornou cidade");
         console.log(customResponse.payload);
        CriarElementoSelectCidades(JSON.parse(JSON.stringify(customResponse.payload)))

        CriarElementoSelectCidadesDestino(JSON.parse(JSON.stringify(customResponse.payload)))
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    }); 
  }consultacidade()
 //Criando elementeo no select para Elemento Cidade -------------------------------------------------    
  function CriarElementoSelectCidades(cidades) {


            // Seletor da cidade de origem
const elementoCidadesID = document.getElementById("origem");

    // Seletor da cidade de destino
    const elementoCidadesDestinoID = document.getElementById("Destino");

// Adicionar evento de mudança para a cidade de origem
  elementoCidadesID.addEventListener('change', async (event) => {
    const cidadeOrigem = elementoCidadesID.value;
    const cidadeDestino = elementoCidadesDestinoID.value;

    // Verificar se a cidade de destino é igual à cidade de origem
    if (cidadeDestino === cidadeOrigem) {
        console.error('A cidade de destino não pode ser igual à cidade de origem.');
        // Adicione o código adicional ou mensagem que deseja exibir quando a condição não for atendida.
        return;
    }  })

    for (let i = 0; i < cidades.length; i++){
      const cidade = cidades[i];
      console.log(cidades)
      console.log("dados da cidades: " + JSON.stringify(cidade));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${cidade[1]}">${cidade[1]}</option>
        `;
        elementoCidadesID.appendChild(row);
    }
    console.log("select cidade origem criada?");
    }

 //Criando elementeo no select para Elemento Cidade -------------------------------------------------    
  function CriarElementoSelectCidadesDestino(cidades) {

    

            // Seletor da cidade de origem
const elementoCidadesID = document.getElementById("origem");

// Seletor da cidade de destino
const elementoCidadesDestinoID = document.getElementById("Destino");

// Adicionar evento de mudança para a cidade de origem
elementoCidadesDestinoID.addEventListener('change', async (event) => {
const cidadeOrigem = elementoCidadesID.value;
const cidadeDestino = elementoCidadesDestinoID.value;

// Verificar se a cidade de destino é igual à cidade de origem
if (cidadeOrigem === cidadeDestino ) {
    console.error('A cidade de destino não pode ser igual à cidade de origem.');
    // Adicione o código adicional ou mensagem que deseja exibir quando a condição não for atendida.
    return;
}  })
    for (let i = 0; i < cidades.length; i++){
      const cidade = cidades[i];
      console.log(cidades)
      console.log("dados da cidades: " + JSON.stringify(cidade));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${cidade[1]}">${cidade[1]}</option>
        `;
        elementoCidadesDestinoID.appendChild(row);
    }
    console.log("select cidade destino criada?");
    }

// CONSULTA VOO ---------------------------------------------------------------------------------------
 async function consultavoo() {

    requestListaVoo().then(customResponse => {
        if (customResponse.status === "SUCCESS") {
           console.log("retornou");
           console.log(customResponse.payload);
        } else {
          console.log(customResponse.message);
        }
      })
      .catch((e) => {
        console.log("Não foi possível exibir." + e);
      });
        
        
    }
    consultavoo();
//CONSTRUTOR DO ELEMENTO SELECT DA AEROPORTO ORIGEM ----------------------------------------------------------  
const selectorOrigem = document.getElementById('origem')
 selectorOrigem.addEventListener('change', async (event) => {
    const busca = getDadosForm();
    console.log('seletor origem -> ',selectorOrigem.value)
    if(selectorOrigem.value === selectorDestino.value){
      exibirMensagemErro('A cidade de destino não pode ser igual à cidade de origem.');

    }else{
      console.log('Dados da -- após getDadosForm:',busca);
    // CriarElementoSelectAeroportoOrigem(busca)
    await new Promise(resolve => setTimeout(resolve, 1000));
    enviarParaApiInserir(busca);
    }
    
});

  
async function BuscaAeroporto() {
    

    requestBuscaAeroporto().then(customResponse => {
      if (customResponse.payload !== 'undefined') {
         console.log("retornou");
         console.log("busca aqui",customResponse.payload);
        } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
  }

  
 
function getDadosForm() { // pegando o dado do formulario e checando se nao esta vazio
    const getCidadeOrigem = document.querySelector('#origem');
    if (getCidadeOrigem.value.trim() === '' ) {
        console.error('Campo vazio');
        return;
    }
    const busca = {
        nome: getCidadeOrigem.value,//passando parametro para api
    };
    console.log('Dados da select após getDadosForm:', busca);
    return busca;
}

async function CriarElementoSelectAeroportoOrigem(busca) {

    const elementoAeroportoOrigemID=document.getElementById("AeroportoOrigem");
    elementoAeroportoOrigemID.children.value='';
   
    for (let i = 0; i < busca.length; i++){
      const buscas = busca[i];
      console.log('->',busca)
      console.log("dados da busca: " + JSON.stringify(buscas));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${buscas[0]}">${buscas[0]}</option>
        `;
        elementoAeroportoOrigemID.appendChild(row);
    }
    console.log("select aeroporto criada?");
    }
//CONSTRUÇÃO  DO ELEMENTO SELECT AEROPORTO DESTINO -----------------------------------------------

const selectorDestino = document.getElementById('Destino')
selectorDestino.addEventListener('change', async (event) => {
    const buscaDestino = getDadosFormDestino();
    console.log('Dados da -- após getDadosForm:',buscaDestino);
    if(selectorOrigem.value === selectorDestino.value){
      exibirMensagemErro('A cidade de destino não pode ser igual à cidade de origem.');
    }else{
       CriarElementoSelectAeroportoDestino(buscaDestino)
    await new Promise(resolve => setTimeout(resolve, 1000));
    enviarParaApiInserir2(buscaDestino);
    }
   
});
function getDadosFormDestino() { // pegando o dado do formulario e checando se nao esta vazio
    const getCidadeDestino = document.querySelector('#Destino');
    if (getCidadeDestino.value.trim() === '' ) {
        console.error('Campo vazio');
        return;
    }
    const buscaDestino = {
        nome: getCidadeDestino.value,//passando parametro para api
    };
    console.log('Dados da select após getDadosForm:', buscaDestino);
    return buscaDestino;
}

async function CriarElementoSelectAeroportoDestino(buscaDestino) {

    const elementoAeroportoDestinoID=document.getElementById("AeroportoDestino");
    // elementoAeroportoOrigemID.children.value='';
   
    for (let i = 0; i < buscaDestino.length; i++){
      const buscas = buscaDestino[i];
      console.log('->',buscaDestino)
      console.log("dados da busca: " + JSON.stringify(buscas));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${buscas[0]}">${buscas[0]}</option>
        `;
        elementoAeroportoDestinoID.appendChild(row);
    }
    console.log("select aeroporto criada?");
    }



//MANDA PARA A API --------------------------------------------------------------------------------   
    async function enviarParaApiInserir(busca) {
        let respostaURL;
        try {
          console.log('Enviando dados para a API:', busca);
      
          // Transformando os parâmetros em uma string de consulta
          const parametrosConsulta = new URLSearchParams({ nome: busca.nome }).toString();
          
      
          // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.log("esta vindo",parametrosConsulta)
      
          // Adicionando os parâmetros de consulta à URL
          const url = `http://localhost:3000/BuscarAeroportosAtravesDeCidades?${parametrosConsulta}`;
      
          // Fazendo a requisição GET sem o corpo
          respostaURL = await fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
            },
          });
        
          // console.log('Resposta da API:', await resposta.json());
          const elementoCidadesID=document.getElementById("origem");
          const elementoCidadesDestinoID=document.getElementById("Destino");

          if (respostaURL.ok) {
            console.log('BUSCA REALIZADA COM SUCESSO');
            console.log('oq tem no elemento dentro da api',elementoCidadesDestinoID.value)
            console.log('oq tem no elemento dentro da api',elementoCidadesID.value)
            const dadosResposta = await respostaURL.json();
            CriarElementoSelectAeroportoOrigem(dadosResposta.payload);
            console.log("busca aqui",dadosResposta.payload);



            // limparCamposAeronave();
          } else {
            console.log('Erro na busca');
          }
        } catch (erro) {
          console.error(erro);
        }
      }
      

//MANDA PARA A API --------------------------------------------------------------------------------   
    async function enviarParaApiInserir2(busca) {
      let respostaURL;
      try {
        console.log('Enviando dados para a API:', busca);
    
        // Transformando os parâmetros em uma string de consulta
        const parametrosConsulta = new URLSearchParams({ nome: busca.nome }).toString();
        
    
        // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("esta vindo",parametrosConsulta)
    
        // Adicionando os parâmetros de consulta à URL
        const url = `http://localhost:3000/BuscarAeroportosAtravesDeCidades?${parametrosConsulta}`;
    
        // Fazendo a requisição GET sem o corpo
        respostaURL = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
        });
      
        // console.log('Resposta da API:', await resposta.json());
        const elementoCidadesID=document.getElementById("origem");
        const elementoCidadesDestinoID=document.getElementById("Destino");

        if (respostaURL.ok) {
          console.log('BUSCA REALIZADA COM SUCESSO');
          console.log('oq tem no elemento dentro da api',elementoCidadesDestinoID.value)
          console.log('oq tem no elemento dentro da api',elementoCidadesID.value)
          const dadosResposta = await respostaURL.json();
          CriarElementoSelectAeroportoDestino(dadosResposta.payload);
          console.log("busca aqui",dadosResposta.payload);



          // limparCamposAeronave();
        } else {
          console.log('Erro na busca');
        }
      } catch (erro) {
        console.error(erro);
      }
    }
    
     
// Função para exibir mensagem de erro na página
function exibirMensagemErro(mensagem) {
  // Crie um elemento de parágrafo para a mensagem de erro
  const mensagemErro = document.createElement('p');
  mensagemErro.style.color = 'red'; // Pode estilizar a mensagem de erro como desejar
  mensagemErro.textContent = mensagem;
  setTimeout(() => {
    mensagemErro.style.display = 'none';
  }, 3000);

  

  // Adicione a mensagem de erro ao corpo do documento (ou ao local desejado na sua estrutura HTML)
  document.body.appendChild(mensagemErro);
}




   BuscaAeroporto();
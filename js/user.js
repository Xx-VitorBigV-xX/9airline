/* GLOSSÁRIO

user.js é a parte lógica do user.html  e user.cc
este documento esta dividido em 8 sessões 

1-sesão variaveis globais:
    declaração de variaveis globais.
2-sessão requisições:
    funções de requisições  das respectivas apis, seus métodos e urls.
3-sessão enviar para api:
    funções que recebem parametros para fazer chamadas ou inserções das apis, passando body ou para casos de query, um parametro na url
4-sessão consulta:
    funções que consultam uma requisição da api e faz suas validações.
5-sessão cria elemento:
    funções que criam elementos dinâmicos de acordo com cada parametro recebido.
6-sessão get informações:
    funções que recuperam elementos do html especificos e passam para sintaxe json.
7-sessão listener:
    através da recuperação de um elemento html, utiliza-se um metodo listener que espera um evento para realizar oq cada um foi programado há fazer
8-sessão validação:
    validação dos respectivos elementos.

em cada sessão há comentários a direita com a finalidade de facilitar a busca de um código,  
para fazer uma busca eficiente (crl+f no windowns) escreva tudo em letras maiúsculas -> (nome da sessão) + a função que aquele codigo faz
exemplo:
quero buscar a criação do elemento mapa de assento 
'CRIA-ELEMENTO-ASSENTOS'

    



*/

// 1-SESSÃO-VARIAVEIS GLOBAIS ============================================================================================================

let valorSelecionadoVoo6Global;
let valorSelectVoo7Global;
let valorselectdados1Global;
let valorselecionadoVoo4Global;
let valorDoAssento;
let listaDeStatus;
let valorDoStatus;
let valorselectdados0Global;

// ===================================================  2-SESSÃO-REQUISIÇÕES  ================================================================

// ---------------------------------------------------------------------------------------- REQUISIÇÃO-VOO
async function requestListaVoo() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "http://localhost:3000/listarVoo",
    requestOptions
  );
  return response.json();
}
// ---------------------------------------------------------------------------------------- REQUISIÇÃO-BUSCA-AEROPORTO
async function requestBuscaAeroporto() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "http://localhost:3000/BuscarAeroportosAtravesDeCidades",
    requestOptions
  );
  return response.json();
}
// ---------------------------------------------------------------------------------------- REQUISIÇÃO-LISTA-CIDADE
async function requestListCidade() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "http://localhost:3000/listarCidades",
    requestOptions
  );
  return response.json();
}

//  ===================================================  3-SESSÃO-ENVIA-PARA-API  =======================================================================

// ---------------------------------------------------------------------------------------- ENVIAR-PARA-API-MUDAR-STATUS
async function eviarParaApiMudarStatus(jason) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API:", jason);

    // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(`http://localhost:3000/updateAssentos`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(jason),
    });

    // console.log('Resposta da API:', await resposta.json());
    if (respostaURL.ok) {
      console.log("RESERVA REALIZADA COM SUCESSO");

      // limparCamposAeronave();
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}

// ---------------------------------------------------------------------------------------- ENVIAR-PARA-API-NOVO-TICKET
async function enviarParaApiNovoTicket(tikect) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API TICKES:", tikect);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("esta vindo@@@", tikect);

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(`http://localhost:3000/NovoTicket`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(tikect),
    });

    // console.log('Resposta da API:', await resposta.json());

    if (respostaURL.ok) {
      console.log("EMITIDO  COM SUCESSO");
      const dadosResposta = await respostaURL.json();
      console.log("resposta aqui", dadosResposta.payload);
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}

// ---------------------------------------------------------------------------------------- ENVIAR-PARA-API-BUSCAR-AEROPORTO-ORIGEM
async function enviarParaApiInserir(busca) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API:", busca);

    // Transformando os parâmetros em uma string de consulta
    const parametrosConsulta = new URLSearchParams({
      nome: busca.nome,
    }).toString();

    // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("esta vindo", parametrosConsulta);

    // Adicionando os parâmetros de consulta à URL
    const url = `http://localhost:3000/BuscarAeroportosAtravesDeCidades?${parametrosConsulta}`;

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    // console.log('Resposta da API:', await resposta.json());
    const elementoCidadesID = document.getElementById("origem");
    const elementoCidadesDestinoID = document.getElementById("Destino");

    if (respostaURL.ok) {
      console.log("BUSCA REALIZADA COM SUCESSO");
      console.log(
        "oq tem no elemento dentro da api",
        elementoCidadesDestinoID.value
      );
      console.log("oq tem no elemento dentro da api", elementoCidadesID.value);
      const dadosResposta = await respostaURL.json();
      CriarElementoSelectAeroportoOrigem(dadosResposta.payload);
      console.log("busca aqui", dadosResposta.payload);

      // limparCamposAeronave();
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}
// ---------------------------------------------------------------------------------------- ENVIA-PARA-API-2-BUSCA-AEROPORTO-DESTINO
async function enviarParaApiInserir2(busca) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API:", busca);

    // Transformando os parâmetros em uma string de consulta
    const parametrosConsulta = new URLSearchParams({
      nome: busca.nome,
    }).toString();

    // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("esta vindo", parametrosConsulta);

    // Adicionando os parâmetros de consulta à URL
    const url = `http://localhost:3000/BuscarAeroportosAtravesDeCidades?${parametrosConsulta}`;

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    // console.log('Resposta da API:', await resposta.json());
    const elementoCidadesID = document.getElementById("origem");
    const elementoCidadesDestinoID = document.getElementById("Destino");

    if (respostaURL.ok) {
      console.log("BUSCA REALIZADA COM SUCESSO");
      console.log(
        "oq tem no elemento dentro da api",
        elementoCidadesDestinoID.value
      );
      console.log("oq tem no elemento dentro da api", elementoCidadesID.value);
      const dadosResposta = await respostaURL.json();
      CriarElementoSelectAeroportoDestino(dadosResposta.payload);
      console.log("busca aqui", dadosResposta.payload);

      // limparCamposAeronave();
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}

// ---------------------------------------------------------------------------------------- ENVIA-APARA-API-BUSCAR-VOO
async function enviarParaApiBuscarVoo(buscaDataIda) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API DATA:", buscaDataIda);

    // Transformando os parâmetros em uma string de consulta
    const parametrosConsulta = new URLSearchParams({
      dia_partida: buscaDataIda.dia_partida,
    }).toString();

    // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("esta vindo@@@", parametrosConsulta);

    // Adicionando os parâmetros de consulta à URL
    const url = `http://localhost:3000/BuscarVooAtravezDaDataIda?${parametrosConsulta}`;

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });

    // console.log('Resposta da API:', await resposta.json());

    if (respostaURL.ok) {
      console.log("BUSCA REALIZADA COM SUCESSO");
      const dadosResposta = await respostaURL.json();
      CriarElementoSelectVoo(dadosResposta.payload);
      console.log("resposta aqui", dadosResposta.payload);
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}

// ---------------------------------------------------------------------------------------- ENVIA-PARA-API-EMITIR-NOVO-TICKET
async function enviarParaApiNovoTicket(tikect) {
  let respostaURL;
  try {
    console.log("Enviando dados para a API TICKES:", tikect);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("esta vindo@@@", tikect);

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(`http://localhost:3000/NovoTicket`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(tikect),
    });

    // console.log('Resposta da API:', await resposta.json());

    if (respostaURL.ok) {
      console.log("EMITIDO  COM SUCESSO");
      const dadosResposta = await respostaURL.json();
      console.log("resposta aqui", dadosResposta.payload);
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}
// ---------------------------------------------------------------------------------------- ENVIAR-PARA-API-BUSCAR-ASSENTOS
async function enviarParaApiBuscarAssento(valorselectdados0Global) {
  console.log("/**");
  let respostaURL;
  try {
    console.log(
      "Enviando dados para a API PARA BUSCAR ASSENTO:",
      valorselectdados0Global
    );

    // Transformando os parâmetros em uma string de consulta
    const parametrosConsulta = new URLSearchParams({
      id_voo: valorselectdados0Global,
    }).toString();

    // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("PARAMETRO", parametrosConsulta);

    // Adicionando os parâmetros de consulta à URL
    const url = `http://localhost:3000/listarAssentos?${parametrosConsulta}`;

    // Fazendo a requisição GET sem o corpo
    respostaURL = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "applipacation/json",
        "Content-type": "application/json",
      },
    });

    // console.log('Resposta da API:', await resposta.json());

    if (respostaURL.ok) {
      console.log("A S S E N T O ");
      const dadosResposta = await respostaURL.json();

      const tamanhoResposta = dadosResposta.payload.length;
      console.log("!!!!!Tamanho da resposta:", dadosResposta);
      listaDeStatus = dadosResposta.payload;
      console.log("-->>", listaDeStatus);
      CostroiAssento(dadosResposta.payload, tamanhoResposta);
      // console.log("--------",listaDeStatus.payload.length);
    } else {
      console.log("Erro na busca");
    }
  } catch (erro) {
    console.error(erro);
  }
}

// ===================================================  4-SESSÃO-CONSULTAS  =================================================================

//---------------------------------------------------------------------------------------- CONSULTA-CIADADE
async function consultacidade() {
  requestListCidade()
    .then((customResponse) => {
      if (customResponse.status === "SUCCESS") {
        console.log("retornou cidade");
        console.log(customResponse.payload);
        CriarElementoSelectCidades(
          JSON.parse(JSON.stringify(customResponse.payload))
        );

        CriarElementoSelectCidadesDestino(
          JSON.parse(JSON.stringify(customResponse.payload))
        );
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}
consultacidade();
//---------------------------------------------------------------------------------------- CONSULTA-(BUSCA)-AEROPORTO
async function BuscaAeroporto() {
  requestBuscaAeroporto()
    .then((customResponse) => {
      if (customResponse.payload !== "undefined") {
        console.log("retornou");
        console.log("busca aqui", customResponse.payload);
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
}
BuscaAeroporto();
//---------------------------------------------------------------------------------------- CONSULTA-VOO
async function consultavoo() {
  requestListaVoo()
    .then((customResponse) => {
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
//---------------------------------------------------------------------------------------- CONSULTA ASSENTOS
function consultaAssentos() {
  console.log("retornou");
  console.log("parametro^^");
  enviarParaApiBuscarAssento(valorselectdados0Global).catch((e) => {
    console.log("Não foi possível exibir." + e);
  });
}
consultaAssentos();

//  ===================================================  5-SESSÃO-CRIA-ELEMENTOS  =======================================================================

//---------------------------------------------------------------------------------------- CRIA-ELEMENTO-ASSENTOS
function CostroiAssento(dadosResposta, tamanho) {
  // Número total de assentos
  // console.log('numero##',tamanho)
  const totalAssentos = tamanho;
  //fazer um codigo que verifica o total de assentos
  // Array contendo as letras do alfabeto
  const letrasDoAlfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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

  const mapaAssentos = document.getElementById("mapa-assentos");
  // Adiciona os assentos ao mapa
  for (let i = 1; i <= totalAssentos; i++) {
    const assento = document.createElement("div");

    const status = listaDeStatus[i - 1];
    console.log(`Elemento na posição ${i}: ${status[0]}`);
    let nw = "ocupado";
    if (status[0] == nw) {
      console.log("entrou de fato!", i, status[0]);
      assento.className = "ocupado";
    } else {
      assento.className = "assento";
    }

    console.log("valor do assento:", assento);
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
      assento.style.marginTop = "500px";
    }

    // Adiciona margem para elementos da última linha
    if (linhaAtual === Math.floor((totalAssentos - 1) / colunas)) {
      assento.style.marginBottom = "500px";
    }

    // Adiciona margens para a primeira coluna
    if (colunas === 2 && colunaAtual === 0) {
      assento.style.marginRight = "0px";
      assento.style.marginLeft = "100px";
    } else if (colunaAtual === 0) {
      assento.style.marginRight = "0px";
      assento.style.marginLeft = "50px";
    }

    // Adiciona margem para colunas pares apenas se a coluna não for múltiplo de 3
    if (margemPar !== 0 && margemTres === 0 && (colunaAtual + 1) % 2 === 0) {
      assento.style.marginRight = margemPar + "px"; //a margem px esta sendo passada pela variavel
    }

    // Adiciona margem para colunas múltiplos de 3 ou múltiplos de 2 e 3
    if (
      (margemTres !== 0 || (margemPar !== 0 && margemTres !== 0)) &&
      (colunaAtual + 1) % 3 === 0
    ) {
      assento.style.marginRight = margemTres + "px"; //a margem px esta sendo passada pela variavel
    }
    const letraAtual = letrasDoAlfabeto[colunaAtual];
    const assentoValue = `${letraAtual}${i}`;
    const assentoPAPI = `${i}`;
    assento.textContent = assentoValue;

    console.log("valor do assento:", assento, assentoPAPI);
    // assento.textContent = dadosResposta.payload[i];

    assento.addEventListener("click", () => {
      selecionarAssento(assento, assentoPAPI);
    });

    mapaAssentos.appendChild(assento);
  }
}
// Função para selecionar/deselecionar um assento
function selecionarAssento(assento, assentoPAPI) {
  assento.classList.toggle("selecionado");
  console.log("XXX", assentoPAPI);
  valorDoAssento = assentoPAPI;
  // debugando para saber se o codigo esta pegando  a primeira linha e a ultima linha

  // function calcularElementosPrimeiraLinha(totalAssentos, colunas) {
  //     // Calcula quantas linhas existem
  //     const linhas = Math.ceil(totalAssentos / colunas);//Calcula o número total de linhas necessárias para alocar todos os assentos, usa a função math.ceil para aredondar  o numero de linha  para cima, pois é uma divisão e vai dar numero quebrado
  //     // Calcula quantos elementos estão na última linha
  //     const elementosPrimeiraLinha = totalAssentos - (linhas - 1) * colunas; //esta é para pegar o numero de elementos(assentos) que foram preenchidos antes da ultima linha, pois a ultima linha pode dar um numero que nao é o numero total de colunas quebrará o codigo
  //     return elementosPrimeiraLinha;
  // }

  // function calcularElementosUltimaLinha(totalAssentos, colunas) {
  //     // Calcula quantas linhas existem
  //     const linhas = Math.ceil(totalAssentos / colunas); // esta conta serve para saber  quantas linhas precisam para acomodar os assentos de acordo com o numero total de assentos e o numero de colunas
  //     // Calcula quantos elementos estão na última linha
  //     const elementosUltimaLinha = totalAssentos % colunas || colunas;
  //     return elementosUltimaLinha;
  // }

  // // chmada
  // const elementosPrimeiraLinha = calcularElementosPrimeiraLinha(totalAssentos, colunas);
  // const elementosUltimaLinha = calcularElementosUltimaLinha(totalAssentos, colunas);

  // console.log("Elementos na primeira linha:", elementosPrimeiraLinha);
  // console.log("Elementos na última linha:", elementosUltimaLinha);

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
}
//---------------------------------------------------------------------------------------- CRIA-ELEMENTO-SELECT-CIDADES-ORIGEM
function CriarElementoSelectCidades(cidades) {
  // Seletor da cidade de origem
  const elementoCidadesID = document.getElementById("origem");
  // Seletor da cidade de destino
  for (let i = 0; i < cidades.length; i++) {
    const cidade = cidades[i];
    console.log(cidades);
    console.log("dados da cidades: " + JSON.stringify(cidade));

    const row = document.createElement("option");
    row.innerHTML = `<option  value="${cidade[1]}">${cidade[1]}</option>
        `;
    elementoCidadesID.appendChild(row);
  }
  console.log("select cidade origem criada?");
}
// --------------------------------------------------------------------------------------- CRIA-ELEMENTO-SELECT-CIDADES-DESTINO
function CriarElementoSelectCidadesDestino(cidades) {
  // Seletor da cidade de origem
  const elementoCidadesID = document.getElementById("origem");

  // Seletor da cidade de destino
  const elementoCidadesDestinoID = document.getElementById("Destino");

  // Adicionar evento de mudança para a cidade de origem
  elementoCidadesDestinoID.addEventListener("change", async (event) => {
    const cidadeOrigem = elementoCidadesID.value;
    const cidadeDestino = elementoCidadesDestinoID.value;

    // Verificar se a cidade de destino é igual à cidade de origem
    if (cidadeOrigem === cidadeDestino) {
      console.error(
        "A cidade de destino não pode ser igual à cidade de origem."
      );
      // Adicione o código adicional ou mensagem que deseja exibir quando a condição não for atendida.
      return;
    }
  });
  for (let i = 0; i < cidades.length; i++) {
    const cidade = cidades[i];
    console.log("cidade", cidades);
    console.log("dados da cidades: " + JSON.stringify(cidade));

    const row = document.createElement("option");
    row.innerHTML = `<option  value="${cidade[1]}">${cidade[1]}</option>
        `;
    elementoCidadesDestinoID.appendChild(row);
  }
  console.log("select cidade destino criada?");
}
//---------------------------------------------------------------------------------------  CRIA-ELEMENTO-SELECT-AEROPORTO-ORIGEM
async function CriarElementoSelectAeroportoOrigem(busca) {
  const elementoAeroportoOrigemID = document.getElementById("AeroportoOrigem");
  elementoAeroportoOrigemID.children.value = "";

  for (let i = 0; i < busca.length; i++) {
    const buscas = busca[i];
    console.log("->", busca);
    console.log("dados da busca: " + JSON.stringify(buscas));

    const row = document.createElement("option");
    row.innerHTML = `<option  value="${buscas[0]}">${buscas[0]}</option>
        `;
    elementoAeroportoOrigemID.appendChild(row);
  }
  console.log("select aeroporto criada?");
}
// --------------------------------------------------------------------------------------  CRIA-ELEMENTO-SELECT-AEROPORTO-DESTINO
async function CriarElementoSelectAeroportoDestino(buscaDestino) {
  const elementoAeroportoDestinoID =
    document.getElementById("AeroportoDestino");
  // elementoAeroportoOrigemID.children.value='';

  for (let i = 0; i < buscaDestino.length; i++) {
    const buscas = buscaDestino[i];
    console.log("->", buscaDestino);
    console.log("dados da busca: " + JSON.stringify(buscas));

    const row = document.createElement("option");
    row.innerHTML = `<option  value="${buscas[0]}">${buscas[0]}</option>
        `;
    elementoAeroportoDestinoID.appendChild(row);
  }
  console.log("select aeroporto criada?");
}
// --------------------------------------------------------------------------------------  CRIA-ELEMENTO-SELECT-VOO
function CriarElementoSelectVoo(voos) {
  // Seletor da cidade de origem
  const elementoVooID = document.getElementById("voos_Disponiveis");
  // Seletor da cidade de destino
  for (let i = 0; i < voos.length; i++) {
    const voo = voos[i];
    console.log(voos);
    console.log("dados da cidades: " + JSON.stringify(voo));

    const row = document.createElement("option");
    row.innerHTML = `<option value="${voo[6]}">${voo[7]}</option>
`;

    elementoVooID.appendChild(row);
    valorselectdados0Global = voo[0];
    valorselectdados1Global = voo[1];
    valorselecionadoVoo4Global = voo[4];
    valorSelectVoo7Global = voo[7];
    valorSelecionadoVoo6Global = voo[6];
    console.log("Valor selecionado de voo[6]:", valorSelecionadoVoo6Global);
    PegaElemento(valorSelecionadoVoo6Global);
  }
  console.log("select cidade origem criada?");
}

// =================================================== 6-SESSÃO-GET-INFORMAÇÕES ===============================================================

// --------------------------------------------------------------------------------------  GET-DADOS-DIA-DE-IDA
function getDadosDataIdaForm() {
  const getdataIda = document.querySelector("#DataIda");
  if (getdataIda.value.trim() === "") {
    exibirMensagemErro('ERRO')
    return;
  }
  const buscaDataIda = {
    dia_partida: getdataIda.value,
  };
  console.log("Dados data ->>>", buscaDataIda);
  return buscaDataIda;
}
// --------------------------------------------------------------------------------------  GET-DADOS-DIA-DE-VOLTA
function getDadosDataVoltaForm() {
  const getdataVolta = document.querySelector("#DataVolta");
  //passar cidade como parametro tmb
  if (getdataVolta.value.trim() === "") {
    console.error("campo Vazio");
    return;
  }
  const busca = {
    dia_partida: getdataVolta.value,
  };
  console.log("Dados data ->>>", busca);
  return busca;
}
// --------------------------------------------------------------------------------------  GET-DADOS-CIDADE-DE-ORIGEM
function getDadosForm() {
  // pegando o dado do formulario e checando se nao esta vazio
  const getCidadeOrigem = document.querySelector("#origem");
  if (getCidadeOrigem.value.trim() === "") {
    console.error("Campo vazio");
    return;
  }
  const busca = {
    nome: getCidadeOrigem.value, //passando parametro para api
  };
  console.log("Dados da select após getDadosForm:", busca);
  return busca;
}
// --------------------------------------------------------------------------------------  GET-DADOS-CIDADE-DE-DESTINOS
function getDadosFormDestino() {
  // pegando o dado do formulario e checando se nao esta vazio
  const getCidadeDestino = document.querySelector("#Destino");
  if (getCidadeDestino.value.trim() === "") {
    console.error("Campo vazio");
    return;
  }
  const buscaDestino = {
    nome: getCidadeDestino.value, //passando parametro para api
  };
  console.log("Dados da select após getDadosForm:", buscaDestino);
  return buscaDestino;
}

// =================================================== SESSÃO-LISTENER =========================================================================

//--------------------------------------------------------------------------------------  LISTENER-BOTÃO-PAGAR
const btnAssento = document.getElementById("btnAssento");
const nome = document.getElementById("nomeCompleto");
const email = document.getElementById("E-mail");
btnAssento.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("...........", nome.value, email.value);
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (nome.value.trim() == "" || email.value.trim() == "") {
   exibirMensagemErro("é Necessario preencher todos os campos .");
    return;
  } else {
    console.log("...>>>>:>", email.value);
    const msgerro = document.querySelector(".erroPgamento");
    msgerro.textContent = "";
    if (Math.floor(Math.random(valorselectdados0Global) * 2) === 1) {
      const json = {
        id_voo: valorselectdados0Global,
        numero: valorDoAssento,
      };
      eviarParaApiMudarStatus(json);

        exibirMensagemPositiva("Sua passagem aerea foi emitida e enviada para seu endereço de email");
      console.log(email.value);
      const jsonTickets = {
        email: email.value,
        nome: nome.value,
        FK_id_voo: valorselectdados0Global,
        assento: valorDoAssento,
      };
      enviarParaApiNovoTicket(jsonTickets);
    } else {
      console.log("PAGAMENTO NEGADO");
      
      exibirMensagemErro("Lamentamos o contratempo. Verifique os dados de pagamento e tente novamente.")
        
    }

    console.log("RANDOMICO");
  }
});
//--------------------------------------------------------------------------------------  LISTENER-BOTÃO-ASSENTO
const mostrarBotao = document.getElementById("mostrarBotao");
const minhaSecao = document.getElementById("minhaSecao");
// Adiciona um ouvinte de evento para o clique no botão
mostrarBotao.addEventListener("click", function () {
  console.log("Clicou");
  event.preventDefault();
  consultaAssentos();
  CostroiAssento();
  minhaSecao.classList.toggle("oculta");

});
//--------------------------------------------------------------------------------------  LISTENER-SELECT(COMBO-BOX)-CIDADE-ORIGEM
const selectorOrigem = document.getElementById("origem");
selectorOrigem.addEventListener("change", async (event) => {
  const busca = getDadosForm();
  console.log("seletor origem -> ", selectorOrigem.value);
  if (selectorOrigem.value === selectorDestino.value) {
    exibirMensagemErro(
      "A cidade de destino não pode ser igual à cidade de origem."
    );
  } else {
    console.log("Dados da -- após getDadosForm:", busca);
    // CriarElementoSelectAeroportoOrigem(busca)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    enviarParaApiInserir(busca);
  }
});
//--------------------------------------------------------------------------------------  LISTENER-SELECT(COMBOBOX)-CIDADE-DESTINO
const selectorDestino = document.getElementById("Destino");
selectorDestino.addEventListener("change", async (event) => {
  const buscaDestino = getDadosFormDestino();
  console.log("Dados da -- após getDadosForm:", buscaDestino);
  if (selectorOrigem.value === selectorDestino.value) {
    exibirMensagemErro(
      "A cidade de destino não pode ser igual à cidade de origem."
    );
  } else {
    CriarElementoSelectAeroportoDestino(buscaDestino);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    enviarParaApiInserir2(buscaDestino);
  }
});
//--------------------------------------------------------------------------------------  LISTENER-BOTÃO-BUSCAR-VOO
const btnBuscaVoo = document.getElementById("buscar_voo");
btnBuscaVoo.addEventListener("click", async (event) => {
  event.preventDefault();
  const buscaDataIda = getDadosDataIdaForm();
  const cidadeOrigem =document.getElementById('origem')
  const aeroportoOrigem =document.getElementById('AeroportoOrigem')
  const cidadeDestino =document.getElementById('Destino')
  const aeroporoDestino =document.getElementById('AeroportoDestino')
  const dataIda =document.getElementById('DataIda')
  const dataVolta =document.getElementById('DataVolta')
  const vos =document.getElementById('voos_Disponiveis')

  if(cidadeOrigem.value.trim()==='*' || aeroportoOrigem.value.trim()==='Aeroporto' || cidadeDestino.value.trim()==='Cidade' || aeroporoDestino.value.trim()==='Aeroporto' || dataIda.value.trim()==='' || vos.value.trim()==='VOOS'){
    exibirMensagemErro('todos os campos devem ser preenchidos!')
    console.log('ERRROOO')
    return;}else{
       enviarParaApiBuscarVoo(buscaDataIda);
  let passandoID = document.getElementById("mostrarBotao");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  passandoID.className = "mostrarBotao";

  console.log(
    "---------->>>>>>>>>>>>>>>",
    getDadosForm(),
    getDadosFormDestino(),
    getDadosDataIdaForm(),
    getDadosDataVoltaForm()
  );
    }



 
});
//--------------------------------------------------------------------------------------  LISTENER-SVG-CARTÃO
const cartao = document.getElementById("svgCartao");
let formulario = document.querySelector("#gabi");
let formularioPix = document.querySelector("#id_pix");
const selectDestino = document.querySelector(".DataVolta"); //!!!!!
const navtabIdaVolta = document.querySelector(".nav_linkactiveDisplay");
cartao.addEventListener("click", () => {
  console.log("entronou no cartao", formulario);

  formulario.style.display = "block";
  formularioPix.style.display = "none";
});
//--------------------------------------------------------------------------------------  LISTENER-NAV-TAB-IDA-E-VOLTA
navtabIdaVolta.addEventListener("click", () => {
  console.log("clicou no nav-tab", navtabIdaVolta);
  let passandoIDvolta = document.getElementById("nav_home_tab");
  passandoIDvolta.className = "nav_linkactiveDisplay";
  let passandoID = document.getElementById("nav-profile-tab");
  passandoID.className = "nav-link";

  selectDestino.className = "DataVoltaDisplay";
});
//--------------------------------------------------------------------------------------  LISTENER-NAV-TAB-VOLTA
const navVolta = document.querySelector(".nav_linkactive");
navVolta.addEventListener("click", () => {
  console.log("clicou no nav-tab", navtabIdaVolta);
  let passandoID = document.getElementById("nav-profile-tab");
  passandoID.className = "nav-linkDisplay";
  let passandoIDvolta = document.getElementById("nav_home_tab");
  passandoIDvolta.className = "nav_linkactive";
  selectDestino.className = "DataVolta";
});
//--------------------------------------------------------------------------------------  LISTENER-BOTÃO-PIX

const idpix = document.getElementById('svgPix')

idpix.addEventListener('click',async(event)=>{
  await new Promise((resolve) => setTimeout(resolve,700))
  event.preventDefault()
  const msgerro = document.querySelector(".erroPgamento");
  msgerro.textContent = "";
  
  if (nome.value.trim() == "" || email.value.trim() == "") {
   exibirMensagemErro('É necessário preecher todos os campos')
    return;
  }else{
    formulario.style.display = "none";
    formularioPix.style.display = "block";
  if (Math.floor(Math.random(valorselectdados0Global) * 2) === 1) {
    const json = {
      id_voo: valorselectdados0Global,
      numero: valorDoAssento,
    };
    eviarParaApiMudarStatus(json);

   exibirMensagemPositiva('Sua passagem aerea foi emitida e enviada para seu endereço de email');
    console.log(email.value);
    const jsonTickets = {
      email: email.value,
      nome: nome.value,
      FK_id_voo: valorselectdados0Global,
      assento: valorDoAssento,
    };
    enviarParaApiNovoTicket(jsonTickets);
  } else {
    console.log("PAGAMENTO NEGADO");
    
      exibirMensagemErro("Lamentamos o contratempo. Verifique os dados de pagamento e tente novamente.");
   
  }

  console.log("RANDOMICO");}
})

// =================================================== SESSÃO-VALIDAÇÃO ===========================================================

//--------------------------------------------------------------------------------------  VALIDAÇÃO-INPUT-CVV
const cvv = document.getElementById("cvv");
const errorMessage = document.getElementById("error-messagecvv");
cvv.addEventListener("input", function () {
  const maxLength = 3;
  const minLength = 3;
  if (cvv.value.length > maxLength || cvv.value.length < minLength) {
    cvv.value = cvv.value.slice(0, maxLength);
    errorMessage.textContent = "CVV deve ter no máximo 3 dígitos";
    cvv.classList.add("error");
  } else {
    errorMessage.textContent = "";
    cvv.classList.remove("error");
  }
});
//--------------------------------------------------------------------------------------  VALIDAÇÃO-ENVIA-MENSAGEM-DE-ERRO
// Função para exibir mensagem de erro na página
function exibirMensagemErro(mensagem) {
  const mensagemErro = document.createElement("p");
  mensagemErro.id = "mensagemErro";
  mensagemErro.textContent = mensagem;
 
  setTimeout(() => {
    mensagemErro.style.display = "none";
  }, 3000);
  document.body.appendChild(mensagemErro);
}
function exibirMensagemPositiva(mensagem) {
  const mensagemPos = document.createElement("p");
  mensagemPos.id = "mensagemPos";
  mensagemPos.textContent = mensagem;

  setTimeout(() => {
    mensagemPos.style.display = "none";
  }, 3000);
  document.body.appendChild(mensagemPos);}
//-------------------------------------------------------------------------------------- VALIDAÇÃO-PADRÃO-DATA
function validarData() {
  const input = document.getElementById("datavalidade");
  const errorMessage = document.getElementById("error-message");
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!dateRegex.test(input.value)) {
    errorMessage.textContent = "Formato inválido. Use MM/AA";
    input.classList.add("error");
  } else {
    errorMessage.textContent = "";
    input.classList.remove("error");
  }
}
const dataInput = document.getElementById("datavalidade");
dataInput.addEventListener("blur", validarData);
// //valida a data de partida e ida ------------------------------------------------
// function validarDataIda() {
//   const input = document.getElementById('DataIda');
//   const errorMessage = document.getElementById('error-message');
//   const dateRegex = /^(0[1-9]|1[0-2])\/20[23-99]$/;

//   if (!dateRegex.test(input.value)) {
//     errorMessage.textContent = 'Formato inválido. Use DD/MM/AAAA';
//     input.classList.add('error');
//     const btnBuscarVoo = document.getElementById('buscar_voo')
//     btnBuscarVoo.style.disabled
//   } else {
//     errorMessage.textContent = '';
//     input.classList.remove('error');
//   }
// }const dataIda = document.getElementById('DataIda');
// dataIda.addEventListener('blur', validarDataIda);
// //validar data volta ---------------------------------------------------------------

// function validarDataVolta() {
//   const input = document.getElementById('DataVolta');
//   const errorMessage = document.getElementById('error-messageVolta');
//   const dateRegex = /^(0[1-9]|1[0-2])\/20[23-99]$/;

//   if (!dateRegex.test(input.value)) {
//     errorMessage.textContent = 'Formato inválido. Use DD/MM/AAAA';
//     input.classList.add('error');
//   } else {
//     errorMessage.textContent = '';
//     input.classList.remove('error');
//   }
// }

// const dataVolta = document.getElementById('DataVolta');
// dataVolta.addEventListener('blur', validarDataVolta);

// PAGAMENTO

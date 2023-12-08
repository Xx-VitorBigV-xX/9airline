/*GLOSSÁRIO*/ 

let CidadeOrigem 
// ========================================== REQUISIÇÕES ==========================================
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
async function requestListaAeroportos() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    "http://localhost:3000/listarAeroporto",
    requestOptions
  );
  return response.json();
}

async function requestListaTrechos() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      "http://localhost:3000/listarTrecho",
      requestOptions
    );
    return response.json();
  }









const CadastrarTrechos= document.querySelector('#btnCadastrarTrechos');
CadastrarTrechos.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Clicou no botão');
  
    // Pegar os dados e enviar para a API
    const nome=document.getElementById('trechos')
    const cidadeOrigem=document.getElementById('CidadeOrigem')
    const cidadeDestino=document.getElementById('CidadeDestino')
    const aeroportoOrigem=document.getElementById('AeroportoOrigem')
    const aeroportoDestino=document.getElementById('AeroportoDestino')
    // const JsonTrecho = {
    //   nome:nome
    //   FK_id_cidade_origem:
    //   FK_nome_cidade_origem:cidadeOrigem
    //   FK_id_aeroporto_origem:
    //   FK_nome_aeroporto_origem:aeroportoOrigem
    //   FK_id_cidade_destino:
    //   FK_nome_cidade_destino:cidadeDestino
    //   FK_id_aeroporto_destino:
    //   FK_nome_aeroporto_destino:aeroportoDestino
    // }

    console.log('Dados do trecho:>', trecho);
  
    
    enviarParaApiInserirTrecho(trecho);
});
  const btnExcluir = document.querySelector('#listagem-Trechos')
  btnExcluir.addEventListener('click', function (event) {
    console.log('clicou');
  
    // Obtenha o elemento do botão clicado
    const botaoClicado = event.target;
  
    // Obtenha o elemento pai da célula do botão clicado (linha da tabela)
    const linha = botaoClicado.closest('tr');
  
    // Obtenha o conteúdo da célula na coluna de ID
    const id = linha.querySelector('td:first-child').textContent;
  
    // Criar um objeto com o ID
    const id_aeroporto = {
        id_aeroporto: id
    };
  
    // Enviar para a API excluir
    enviarParaApiexcluir(id_aeroporto);
  });



function getDadosFormAeroporto() {
    const getNome = document.querySelector('#aeroporto');
    const elementoCidadesID = document.getElementById("origem");

    if (getNome.value.trim() === "") {
        console.log('Campo vazio');
        return;
    }
    const aeroporto = {
        nome: getNome.value,
        fk_nome_cidade:elementoCidadesID.value
    };
    return aeroporto;
}



function limparCampos() {
    document.querySelector('#aeroporto').value = '';
}
/*-----------------------------------------------------LISTAR AERONAVE---------------------------------------------------*/ 
async function consultaAeroporto() {

    requestListaAeroportos().then(customResponse => {
    if (customResponse.status === "SUCCESS") {
       console.log("retornou");
       console.log(customResponse.payload);
       CriarElementoSelectCidades(JSON.parse(JSON.stringify(customResponse.payload)))
    } else {
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    console.log("Não foi possível exibir." + e);
  });


} consultaAeroporto();

//-------------------------------------------------------------------------------------------------------------------------


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
function CriarElementoSelectCidades(cidades) {
  // Seletor da cidade de origem
  const elementoCidadesID = document.getElementById("CidadeOrigem");
  // Seletor da cidade de destino
  for (let i = 0; i < cidades.length; i++) {
    const cidade = cidades[i];
    console.log(cidades);
    console.log("dados da cidades: " + JSON.stringify(cidade));

    const row = document.createElement("option");
    row.innerHTML = `<option id="cddOrigem" value="${cidade[0]}">${cidade[1]}</option>
        `;
    elementoCidadesID.appendChild(row);
    
    
  }
  console.log("select cidade origem criada?");
}
function CriarElementoSelectCidadesDestino(cidades) {
  // Seletor da cidade de origem
  const elementoCidadesID = document.getElementById("CidadeDestino");
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

const selectorOrigem = document.getElementById("CidadeOrigem");
selectorOrigem.addEventListener("change", async (event) => {
  const busca = getDadosForm();
  console.log("seletor origem -> ", selectorOrigem.value);
  console.log('>>>>>>>',CidadeOrigem)
  
  // if (selectorOrigem.value === selectorDestino.value) {
  //   exibirMensagemErro(
  //     "A cidade de destino não pode ser igual à cidade de origem."
  //   );
  // } else {
    console.log("Dados da -- após getDadosForm:", busca);
    // CriarElementoSelectAeroportoOrigem(busca)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    enviarParaApiInserir(busca);
  // }
});


const selectorDestino = document.getElementById("CidadeDestino");
selectorDestino.addEventListener("change", async (event) => {
  const buscaDestino = getDadosFormDestino();
  console.log("Dados da -- após getDadosForm:", buscaDestino);
  // if (selectorOrigem.value === selectorDestino.value) {
  //   exibirMensagemErro(
  //     "A cidade de destino não pode ser igual à cidade de origem."
  //   );
  // } else {
    CriarElementoSelectAeroportoDestino(buscaDestino);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    enviarParaApiInserir2(buscaDestino);
  // }
});

function getDadosForm() {
  // pegando o dado do formulario e checando se nao esta vazio
  const getCidadeOrigem = document.getElementById("CidadeOrigem");
  const getCddOrigem =document.getElementById('cddOrigem')
  console.log('>>>>',getCddOrigem)
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
function getDadosFormDestino() {
  // pegando o dado do formulario e checando se nao esta vazio
  const getCidadeDestino = document.getElementById("CidadeDestino");
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


  async function ConsultaTrecho(){
    requestListaTrechos().then(customResponse=>{
        if(customResponse.message==="Dados obtidos"){
            console.log("retornou");
            console.log(customResponse.payload);
            CriarElementoTabelaTrechos(JSON.parse(JSON.stringify(customResponse.payload)))
        }else{
            console.log(customResponse.message);
            console.log('entrou?')
        }
    })
    .catch((e) => {
            console.log("Não foi possível exibir." + e);
          });
  }ConsultaTrecho();
 function  CriarElementoTabelaTrechos(trechos){
    console.log('trechos->',trechos)
    const elementoTrechoId=document.getElementById('td-trechos');
    for (let i = 0; i < trechos.length; i++){
        const trecho = trechos[i];
        console.log('recebendo->',trecho)
        console.log("dados do trecho: ", + JSON.stringify(trecho));
        const row = document.createElement("tr");
        row.innerHTML = 
        `<td id="td-id_trecho" class="leftText">${trecho[0]}</td>
        <td class="leftText">${trecho[1]}</td>
        <td class="leftText">${trecho[3]}</td>
        <td class="leftText">${trecho[5]}</td>
        <td class="leftText">${trecho[7]}</td>
        <td class="leftText">${trecho[9]}</td>




        <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;
  
        elementoTrechoId.appendChild(row);
    }
    console.log("Tabela criada?");
 }



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
    const elementoCidadesID = document.getElementById("CidadeOrigem");
    const elementoCidadesDestinoID = document.getElementById("CidadeDestino");

    if (respostaURL.ok) {
      console.log("BUSCA REALIZADA COM SUCESSO");
      console.log(
        "oq tem no elemento dentro da api",
        // elementoCidadesDestinoID.value
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
    const elementoCidadesID = document.getElementById("CidadeOrigem");
    const elementoCidadesDestinoID = document.getElementById("CidadeDestino");

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









async function enviarParaApiInserirTrecho(Trecho) {
  try {
      console.log('Enviando dados para a API:', Trecho);

      // Adicionar um pequeno atraso para facilitar a visualização das mensagens de console
      await new Promise(resolve => setTimeout(resolve, 1000));

      const resposta = await fetch('http://localhost:3000/inserirTrecho', {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify(Trecho)
      });

      console.log('Resposta da API:', resposta);

      if (resposta.ok) {
          console.log('Aeroporto cadastrado com sucesso');
          limparCampos();
      } else {
          console.log('Erro ao cadastrar trecho');
      }
  } catch (erro) {
      console.error('Erro:', erro);
  }
}
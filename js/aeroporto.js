const btnCadasAeroporto = document.querySelector('#btnCadastrarAeroporto');

btnCadasAeroporto.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Clicou no botão');
  
    // Pegar os dados e enviar para a API
    const aeroporto = getDadosFormAeroporto();
    console.log('Dados do aeroporto:', aeroporto);
  
    
    enviarParaApiaeroporto(aeroporto);
});

function getDadosFormAeroporto() {
    const getNome = document.querySelector('#aeroporto');
    if (getNome.value.trim() === "") {
        console.log('Campo vazio');
        return;
    }
    const aeroporto = {
        nome: getNome.value
    };
    return aeroporto;
}

async function enviarParaApiaeroporto(aeroporto) {
    try {
        console.log('Enviando dados para a API:', aeroporto);

        // Adicionar um pequeno atraso para facilitar a visualização das mensagens de console
        await new Promise(resolve => setTimeout(resolve, 1000));

        const resposta = await fetch('http://localhost:3000/inserirAeroporto', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(aeroporto)
        });

        console.log('Resposta da API:', resposta);

        if (resposta.ok) {
            console.log('Aeroporto cadastrado com sucesso');
            limparCampos();
        } else {
            console.log('Erro ao cadastrar aeroporto');
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

function limparCampos() {
    document.querySelector('#aeroporto').value = '';
}
/*-----------------------------------------------------LISTAR AERONAVE---------------------------------------------------*/ 



async function requestListaCidade() {//função assincrona que vai requerir a api listaaeronave com o (metodoGET) 
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('http://localhost:3000/listarAeroporto', requestOptions);
  return response.json();
}


async function consultaAeroporto() {

    requestListaAeroportos().then(customResponse => {
    if (customResponse.status === "SUCCESS") {
       console.log("retornou");
       console.log(customResponse.payload);
      CriarElemento(JSON.parse(JSON.stringify(customResponse.payload)))
    } else {
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    console.log("Não foi possível exibir." + e);
  });
    
    
}

function CriarElemento(aeroportos) {

  const elementoAeroportosID=document.getElementById("aeroportoLista");
 
  for (let i = 0; i < aeroportos.length; i++){
    const aeroporto = aeroportos[i];
    console.log(aeroportos)
    console.log("dados da aeronave: " + JSON.stringify(aeroporto));

    const row = document.createElement("tr");
    row.innerHTML = 
      `<td id="td-id_aeroporto" class="leftText">${aeroporto[0]}</td>
      <td class="leftText">${aeroporto[1]}</td>
      <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;

      elementoAeroportosID.appendChild(row);
  }
  console.log("Tabela criada?");
  }



  consultaAeroporto();

  //----------------------------------------------------------EXCLUIR-----------------------------------------------------//

  const btnExcluir = document.querySelector('#listagem-aeroporto')
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
  
  
//   function getDadosInputExcluir(){
//     const getId=document.querySelector('#td-id_aeroporto')
//     if (getId.value.trim() === "") {
//       console.log('Campo vazio');
//       return;
//     }
//     const id_aeroporto={
//       id_aeroporto:getId.value
//     }
//     return td-id_aeroporto
//   }
  
  async function enviarParaApiexcluir(id_aeroporto){
    try{
   const resposta = await fetch('http://localhost:3000/excluirAeroporto',{
    //especificar o method
    method: 'DELETE',
    //especificando os dados
    headers:{
        Accept: 'application/json',
        'Content-type':'application/json'
    },
    body: JSON.stringify(id_aeroporto)
   })
   console.log('Resposta da API:', resposta);
    if (resposta.ok){
      console.log('ok')
    }else{
      console.error('erro ao excluir aeroporto')
    }
  }catch(erro){
    console.error(erro)
  }
  }
  
  
  
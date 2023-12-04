const btnCadasCidade = document.querySelector('#btnCadastrarCidade')
btnCadasCidade.addEventListener('click',()=>{
    
//   //pegar os dados e enviar para api
  const cidade=getDadosFormCidade()
  enviarParaApi(cidade)

})
function getDadosFormCidade(){
  const getCidade=document.querySelector('#cidade')

  if (getCidade.value.trim() === "") {
    console.log('Campo vazio');

    return;
  }
  const cidade={
   
    nome:getCidade.value,
    
  }
  return cidade
}

async function enviarParaApi(cidade){
  try{
 const resposta = await fetch('http://localhost:3000/inserirCidade',{
  //especificar o method
  method: 'PUT',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(cidade)
 })
  if (resposta.ok){
    limparCampos()
  }else{
    console.log('erro ao adicionar cidade')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  document.querySelector('#cidade').value=''
}
//-------------------------------------LISTAR CIDADES----------------------------

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

async function consultacidade() {
  requestListCidade()
    .then((customResponse) => {
      if (customResponse.status === "SUCCESS") {
        console.log("retornou cidade");
        console.log(customResponse.payload);
        CriarElementoSelectCidades(
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




function CriarElementoSelectCidades(Cidades) {

  const elementoCidadeID=document.getElementById("td-cidades");
 
  for (let i = 0; i < Cidades.length; i++){
    const cidade = Cidades[i];
    console.log(Cidades)
    console.log("dados da aeronave: " + JSON.stringify(cidade));

    const row = document.createElement("tr");
    row.innerHTML = 
      `<td id="td-Numero_de_identificacao" class="leftText">${cidade[0]}</td>
      <td class="leftText">${cidade[1]}</td>
      <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;

    elementoCidadeID.appendChild(row);
  }
  console.log("Tabela criada?");
  }






// ------------------
const btnExcluir = document.querySelector('#listagem-cidade') 
console.log('#listagem-cidade');
btnExcluir.addEventListener('click', function (event) {
 
  // Obtenha o elemento do botão clicado
  const botaoClicado = event.target;

  // Obtenha o elemento pai da célula do botão clicado (linha da tabela)
  const linha = botaoClicado.closest('tr');

  // Obtenha o conteúdo da célula na coluna de ID
  const id = linha.querySelector('td:first-child').textContent;

  // Criar um objeto json com o ID
  const id_cidade = {
    id_cidade: id
  };
  

  // Enviar para a API excluir
  enviarParaApiexcluir(id_cidade);
});


async function enviarParaApiexcluir(id_cidade){
  try{
 const resposta = await fetch('http://localhost:3000/excluirCidade',{
  //especificar o method
  method: 'DELETE',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(id_cidade)
 })
 console.log('Resposta da API:', resposta);
  if (resposta.ok){
    console.log('ok')
  }else{
    console.error('erro ao excluir Cidade')
  }
}catch(erro){
  console.error(erro)
}
}
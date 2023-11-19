const btnCadasCidade = document.querySelector('#btnCadastrarCidade')
btnCadasCidade.addEventListener('click',()=>{
    
//   //pegar os dados e enviar para api
  const cidade=getDadosFormCidade()
  enviarParaApi(cidade)

})
function getDadosFormCidade(){
  const getCidade=document.querySelector('#cidade')
  const getIdAeronave=document.querySelector('#id-aeroporto')

 
  if (getCidade.value.trim() === "" || getIdAeronave.value.trim()==="") {
    console.log('Campo vazio');
    return;
  }
  const cidade={
   
    nome:getCidade.value,
    fk_id_aeroporto:getIdAeronave.value
    
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
  document.querySelector('#id-aeroporto').value=''
}
//-------------------------------------LISTAR CIDADES----------------------------

const elementoAeronaves = document.querySelector('#aeronaves')


async function requestListaAeronave() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('http://localhost:3000/listarAeronaves', requestOptions);
  return response.json();
}


async function consultaAeronaves() {

  requestListaAeronave().then(customResponse => {
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

function CriarElemento(aeronaves) {

  const elementoAeronaveID=document.getElementById("aeronave");
 
  for (let i = 0; i < aeronaves.length; i++){
    const aeronave = aeronaves[i];
    console.log(aeronaves)
    console.log("dados da aeronave: " + JSON.stringify(aeronave));

    const row = document.createElement("tr");
    row.innerHTML = 
      `<td id="td-Numero_de_identificacao" class="leftText">${aeronave[0]}</td>
      <td class="leftText">${aeronave[1]}</td>
      <td class="leftText">${aeronave[2]}</td>
      <td class="centerText">${aeronave[3]}</td>
      <td class="centerText">${aeronave[4]}</td>
      <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;

    elementoAeronaveID.appendChild(row);
  }
  console.log("Tabela criada?");
  }



consultaAeronaves();


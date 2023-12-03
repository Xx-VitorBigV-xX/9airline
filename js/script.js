


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
      <td class="leftText">${aeronave[3]}</td>
      <td class="leftText">${aeronave[2]}</td>
      <td class="text-center">${aeronave[1]}</td>
      <td class="">${aeronave[4]}</td>
      <td class="text-center">${aeronave[5]}</td>
      <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;

    elementoAeronaveID.appendChild(row);
  }
  console.log("Tabela criada?");
  }



consultaAeronaves();



//-----------------------------------------------------INSERIR AERONAVE-----------------------------------------------------------------------------
const btninserir = document.querySelector('#btncadastro')
btninserir.addEventListener('click', async (event) => {
    console.log('Clicou');
    event.preventDefault();
    const aeronave = getDadosForm();
    console.log('Dados da aeronave após getDadosForm:', aeronave);
    await new Promise(resolve => setTimeout(resolve, 1000));
    enviarParaApiInserir(aeronave);
});
function getDadosForm() {
  const getFabricante = document.querySelector('#fabricante');
  const getAno_de_fabricacao = document.querySelector('#ano_de_fabricação');
  const getModelo = document.querySelector('#modelo');
  const getAssento = document.querySelector('#qtdAssento');
  if (getFabricante.value.trim() === '' || getAno_de_fabricacao.value.trim() === '' || getModelo.value.trim() === '' || getAssento.value.trim() === '') {
      console.error('Campo vazio');
      return;
  }
  const aeronave = {
      modelo: getModelo.value,
      fabricante: getFabricante.value,
      qtdAssento: getAssento.value,
      ano_de_fabricação: getAno_de_fabricacao.value
  };
  console.log('Dados da aeronave após getDadosForm:', aeronave);
  return aeronave;
}


async function enviarParaApiInserir(aeronave) {
  let resposta; // Declare a variável fora do bloco try

  try {
      console.log('Enviando dados para a API:', aeronave);

      // Adicione um pequeno atraso para facilitar a visualização das mensagens de console
      await new Promise(resolve => setTimeout(resolve, 1000));

      resposta = await fetch('http://localhost:3000/inserirAeronave', {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-type': 'application/json'
          },
          body: JSON.stringify(aeronave)
      });

      console.log('Resposta da API:', resposta);

      if (resposta.ok) {
          console.log('Aeronave adicionada com sucesso');
          limparCamposAeronave();
      } else {
          console.log('Erro ao adicionar aeronave');
      }
  } catch (erro) {
      console.error(erro);
  }
}


  
//++++++++++++++++++++++++++++++++++++++++++++++++EXCLUIR AERONAVE+++++++++++++++++++++++++++++++++++++++++++++++++
const btnExcluir = document.querySelector('#listagem-aeronaves')
btnExcluir.addEventListener('click', function (event) {
  console.log('clicou');

  // Obtenha o elemento do botão clicado
  const botaoClicado = event.target;
  // console.log(botaoClicado)

  // Obtenha o elemento pai da célula do botão clicado (linha da tabela)
  const linha = botaoClicado.closest('tr');
  // console.log(linha)
  // Obtenha o conteúdo da célula na coluna de ID
  const id = linha.querySelector('td:first-child').textContent;
  console.log(id)
  // Criar um objeto com o ID
  const Numero_de_identificacao = {
    Numero_de_identificacao: id
  };

  // Enviar para a API excluir
  enviarParaApiexcluirAeronave(Numero_de_identificacao);
});

// funcção antiga
// function getDadosInputExcluir(){
//   const getId=document.querySelector('#td-Numero_de_identificacao')
//   if (getId.value.trim() === "") {
//     console.log('Campo vazio');
//     return;
//   }
//   const Numero_de_identificacao={
//     id_aeroporto:getId.value
//   }
//   return Numero_de_identificacao
// }


async function enviarParaApiexcluirAeronave(Numero_de_identificacao){
  try{
 const resposta = await fetch('http://localhost:3000/excluirAeronave',{
  //especificar o method
  method: 'DELETE',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(Numero_de_identificacao)
 })
  if (resposta.ok){
    console.log('excluido com susseso')
  }else{
    console.log('erro ao excluir aeronave')
  }
}catch(erro){
  console.error(erro)
}
}




//-------------------------------------------------ATUALIZAR AERONAVE------------------------------------------------------

const btnAttAeronave = document.querySelector('#btnAA')
btnAttAeronave.addEventListener('click',()=>{
  event.preventDefault();
  console.log('clicou')
  //pegar os dados e enviar para api
  const identificacao=getDadosAtualizarAeronave()
  enviarParaApiAtualizarAeronave(identificacao)

})
function getDadosAtualizarAeronave(){
  const getFabricante=document.querySelector('#attfabricante')
  const getAnodefabricação=document.querySelector('#attano_de_fabricação')
  const getModelo=document.querySelector('#attmodelo')
  const getAssento=document.querySelector('#attqtdAcento')
  const getId=document.querySelector('#id_aeronave')
  if (getFabricante.value.trim() === "" || getAnodefabricação.value.trim() === "" || getModelo.value.trim() === "" || getAssento.value.trim() === "" || getId.value.trim()==="") {
    console.log('Campo vazio');
    return;
  }
  const identificacao={
    modelo:getModelo.value,
    fabricante:getFabricante.value,
    ano_de_fabricação:getAnodefabricação.value,
    qtdAssento:getAssento.value,
    Numero_de_identificacao:getId.value
  }
  return identificacao
}

async function enviarParaApiAtualizarAeronave(identificacao){
  try{
 const resposta = await fetch('http://localhost:3000/atualizarAeronave',{
  //especificar o method
  method: 'PUT',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(identificacao)
 })
  if (resposta.status === 200){
    limparCamposaeronave()
  }else{
    console.log('erro ao atualizar')
  }
}catch(erro){
  console.error(erro)
}
}
 function limparCamposaeronave(){
  document.querySelector('#attfabricante').value=''
  document.querySelector('#attano_de_fabricação').value=''
  document.querySelector('#attmodelo').value=''
  document.querySelector('#attqtdAcento').value=''
  document.querySelector('#id_aeronave').value=''
}





//------------------------------------------cadastrar aeroporto------------------------------------------------------



/*********************************************************************************************************************************** */
const btnExcluirAeroporto = document.querySelector('#botaoExcluirAeroporto')
btnExcluirAeroporto.addEventListener('click',()=>{
  console.log('clicou')
  //pegar os dados e enviar para api
  const codigo=getDadosInputExcluirAeroporto()
  enviarParaApiexcluirAeroporto(codigo)

})
function getDadosInputExcluirAeroporto(){
  const getId=document.querySelector('#id_aeroporto')
  if (getId.value.trim() === "") {
    console.log('Campo vazio');
    return;
  }
  const id_aeroporto={
    id_aeroporto:getId.value
  }
  return id_aeroporto
}

async function enviarParaApiexcluirAeroporto(id_aeroporto){
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
  if (resposta.status === 201){
    limparCampos()
  }else{
    console.log('erro ao excluir aeroporto')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  document.querySelector('#id_aeroporto').value=''
}

//--------------------------------------------------------------------------------------------------------------------
const btnAttAeroporto = document.querySelector('#btnAtualizarAeroporto')
btnAttAeroporto.addEventListener('click',()=>{
  console.log('clicou')
  //pegar os dados e enviar para api
  const codigo=getDadosAtualizarAeroporto()
  enviarParaApiAtualizarAeroporto(codigo)

})
function getDadosAtualizarAeroporto(){
  const getIdAeroporto=document.querySelector('#id_Aeroporto')
  const getnome=document.querySelector('#attAeroporto')
  if (getIdAeroporto.value.trim() === ''||getnome.value.trim()==='') {
    console.log('Campo vazio');
    return;
  }
  const codigo={
    
    nome:getnome.value,
    id_aeroporto:getIdAeroporto.value
  }
  return codigo
}

async function enviarParaApiAtualizarAeroporto(codigo){
  try{
 const resposta = await fetch('http://localhost:3000/atualizarAeroporto',{
  //especificar o method
  method: 'PUT',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(codigo)
 })
  if (resposta.status === 201){
    limparCampos()
  }else{
    console.log('erro ao atualizar')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  document.querySelector('#id_Aeroporto').value=''
  document.querySelector('#attAeroporto').value=''
}




//--------------------------------------------------CIDADE-----------------------------------------------------------------------



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const botaoExCidade = document.querySelector('#botaoExcluirCidade')
botaoExCidade.addEventListener('click',()=>{
  console.log('clicou')
  //pegar os dados e enviar para api
  const codigo=getDadosInputExcluirCidade()
  enviarParaApiExcluirCidade(codigo)

})
function getDadosInputExcluirCidade(){
  const getId=document.querySelector('#id_cidade')
  if (getId.value.trim() === "") {
    console.log('Campo vazio');
    return;
  }
  const cidade={
    id_cidade:getId.value
  }
  return cidade
}

async function enviarParaApiExcluirCidade(cidade){
  try{
 const resposta = await fetch('http://localhost:3000/excluirCidade',{
  //especificar o method
  method: 'DELETE',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(cidade)
 })
  if (resposta.status === 201){
    limparCampos()
  }else{
    console.log('erro ao excluir aeroporto')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  document.querySelector('#id_cidade').value=''
}

//////////////////////////////////////////////////////////ATT CIDADE/////////////////////////////////////////////////////////////
const btnAtt = document.querySelector('#btnAtualizar')
btnAtt.addEventListener('click',()=>{
  console.log('clicou')
  //pegar os dados e enviar para api
  const codigo=getDadosAtualizar()
  enviarParaApiAtualizar(codigo)

})
function getDadosAtualizar(){
  const getIdcidade=document.querySelector('#id_Cidade')
  const getnome=document.querySelector('#nome')
  if (getIdcidade.value.trim() === ''||getnome.value.trim()==='') {
    console.log('Campo vazio');
    return;
  }
  const codigo={
    
    nome:getnome.value,
    id_cidade:getIdcidade.value
  }
  return codigo
}

async function enviarParaApiAtualizar(codigo){
  try{
 const resposta = await fetch('http://localhost:3000/atualizarCidade',{
  //especificar o method
  method: 'PUT',
  //especificando os dados
  headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
  },
  body: JSON.stringify(codigo)
 })
  if (resposta.status === 201){
    limparCampos()
  }else{
    console.log('erro ao atualizar')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  document.querySelector('#id_idCidade').value=''
  document.querySelector('#nome').value=''
}

//********************************************CADASTRAR TRECHO ****************************/
const btn = document.querySelector('#btnCadastrarCidade')
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
   
    nome:getCidade.value
    
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
  if (resposta.status === 201){
    limparCampos()
  }else{
    console.log('erro ao adicionar cidade')
  }
}catch(erro){
  console.error(erro)
}
}
function limparCampos(){
  documen.querySelector('#cidade').value=''
}
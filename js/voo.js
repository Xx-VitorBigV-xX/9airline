//------------------------------LISTAR-VOOS---------------------------------------------


//========================================== REQUISIÇÕES HTTPS DA API
async function requestListAeroporto() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('http://localhost:3000/listarAeroporto', requestOptions);
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
async function requestListaAeronave() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('http://localhost:3000/listarAeronaves', requestOptions);
  return response.json();

}
async function requestListTrecho() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch('http://localhost:3000/listarTrecho', requestOptions);
  return response.json();
}

async function requestListaVoo() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('http://localhost:3000/listarVoo', requestOptions);
    return response.json();
  }

//================================================= CONSULTAS  
async function consultaAeroporto() {

  requestListAeroporto().then(customResponse => {
    if (customResponse.status === "SUCCESS") {
       console.log("retornou");
       console.log(customResponse.payload);
       CriarElementoSelectNomeAeroporto(JSON.parse(JSON.stringify(customResponse.payload)))
       CriarElementoSelectAeroportoDestino(JSON.parse(JSON.stringify(customResponse.payload)))
    } else {
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    console.log("Não foi possível exibir." + e);
  }); 
}

async function consultacidade() {

  requestListCidade().then(customResponse => {
    if (customResponse.status === "SUCCESS") {
       console.log("retornou");
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
}

async function consultavoo() {

  requestListaVoo().then(customResponse => {
      if (customResponse.status === "SUCCESS") {
         console.log("retornou");
         console.log(customResponse.payload);
         CriarElementoListvoo(JSON.parse(JSON.stringify(customResponse.payload)))
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
      
      
  }
  async function consultaTrecho() {

    requestListTrecho().then(customResponse => {
      if (customResponse.status === "SUCCESS") {
         console.log("retornou Trecho");
         console.log(customResponse.payload);
         CriarElementoSelectTrecho(JSON.parse(JSON.stringify(customResponse.payload)))
      } else {
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível exibir." + e);
    });
      
      
  }

async function consultaAeronaves() {

  requestListaAeronave().then(customResponse => {
    if (customResponse.status === "SUCCESS") {
       console.log("retornou");
       console.log(customResponse.payload);
       CriarElementoSelectAeronave(JSON.parse(JSON.stringify(customResponse.payload)))
    } else {
      console.log(customResponse.message);
    }
  })
  .catch((e) => {
    console.log("Não foi possível exibir." + e);
  });
    
    
}
//============================================ FUNÇÕES DE CRIAÇÃO DE ELEMENTO
//----------------------------------------------------------------  CRIADOR TABELA VOO 
function CriarElementoListvoo(voos) {

    const elementoVooID=document.getElementById("ListVoo");
   
    for (let i = 0; i < voos.length; i++){
      const voo = voos[i];
      console.log(voo)
      console.log("dados da VOO: " + JSON.stringify(voo));
  
      const row = document.createElement("tr");
      row.innerHTML = 
        `
        <td class="leftText">${voo[0]}</td>
        <td class="centerText">${voo[1]}</td>
        <td class="centerText">${voo[2]}</td>
        <td class="text-center">${voo[3]}</td>
        <td class="text-center">${voo[4]}</td>
        <td class="text-start">R$:${voo[5]}</td>
        <td class="text-start">${voo[6]}</td>
        <td class="text-center">${voo[7]}</td>
        <td class="text-center">${voo[8]}</td>
        <td class="text-center">${voo[9]}</td>
        <td class="text-center">${voo[10]}</td>
        <td class="text-center">${voo[11]}</td>
        <td class="td-acoes" style="text-align: center;"> <button id="btnExcluir" class="btnExcluir" style="color:withe;cursor:pointer;font-weigth:bold;padding:5px;background-color:red;border-radius:5px;display:inline-block;"> excluir</button>`;
        ;
  
      elementoVooID.appendChild(row);
    }
    console.log("Tabela criada?");
    }

//----------------------------------------------------------------  CRIADOR SELECT AEROPORTO
function CriarElementoSelectNomeAeroporto(aeroportos) {

  const elementoAeroportoID=document.getElementById("SelectNomeAeroporto");
 
  for (let i = 0; i < aeroportos.length; i++){
    const aeroporto = aeroportos[i];
    console.log(aeroportos)
    console.log("dados da cidades: " + JSON.stringify(aeroporto));

    const row = document.createElement("option");
    row.innerHTML = 
      `<option  value="${aeroporto[0]}">${aeroporto[1]}</option>
      `;
      elementoAeroportoID.appendChild(row);
  }
  console.log("select cidade origem criada?");
  }
//----------------------------------------------------------------  CRIADOR SELECT CIDADE DESTINO
function CriarElementoSelectCidadesDestino(cidades) {

    const elementoCidadesDestinoID=document.getElementById("SelectCidadeDestino");
  
   
    for (let i = 0; i < cidades.length; i++){
      const cidade = cidades[i];
      console.log(cidades)
      console.log("dados da cidades: " + JSON.stringify(cidade));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${cidade[0]}">${cidade[1]}</option>
        `;
        elementoCidadesDestinoID.appendChild(row);
    }
    console.log("select cidade origem criada?");
    }
//----------------------------------------------------------------  CRIADOR SELECT AEROPORTO DESTINO
function CriarElementoSelectAeroportoDestino(aeroportos) {

    const elementoAeroportoDestinoID=document.getElementById("SelectNomeAeroportoDestino");
  
   
    for (let i = 0; i < aeroportos.length; i++){
      const aeroporto = aeroportos[i];
      console.log(aeroportos)
      console.log("dados da cidades: " + JSON.stringify(aeroporto));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${aeroporto[0]}">${aeroporto[1]}</option>
        `;
        elementoAeroportoDestinoID.appendChild(row);
    }
    console.log("select cidade origem criada?");
    }
//----------------------------------------------------------------  CRIADOR SELECT CIDADE
function CriarElementoSelectCidades(cidades) {

  const elementoCidadesID=document.getElementById("SelectCidadeOrigem");

 
  for (let i = 0; i < cidades.length; i++){
    const cidade = cidades[i];
    console.log(cidades)
    console.log("dados da cidades: " + JSON.stringify(cidade));

    const row = document.createElement("option");
    row.innerHTML = 
      `<option  value="${cidade[0]}">${cidade[1]}</option>
      `;
      elementoCidadesID.appendChild(row);
  }
  console.log("select cidade origem criada?");
  }
//----------------------------------------------------------------  CRIADOR SELECT AERONAVES
function CriarElementoSelectAeronave(aeronaves) {

  const elementoAeronaveID=document.getElementById("SelectAeronave");
 
  for (let i = 0; i < aeronaves.length; i++){
    const aeronave = aeronaves[i];
    console.log(aeronaves)
    console.log("dados da aeronave: " + JSON.stringify(aeronave));

    const row = document.createElement("option");
    row.innerHTML = 
      `<option  value="${aeronave[0]}">${aeronave[1]}</option>
      `;

    elementoAeronaveID.appendChild(row);
  }
  console.log("Tabela criada?");
  }
//----------------------------------------------------------------  CRIADOR SELECT TRECHOS
function CriarElementoSelectTrecho(trechos) {

    const elementotrechosID=document.getElementById("SelectTrecho");
   
    for (let i = 0; i < trechos.length; i++){
      const trecho = trechos[i];
      console.log(trechos)
      console.log("dados da aeronave: " + JSON.stringify(trecho));
  
      const row = document.createElement("option");
      row.innerHTML = 
        `<option  value="${trecho[0]}">${trecho[1]}</option>
        `;
  
        elementotrechosID.appendChild(row);
    }
    console.log("Tabela criada?");
    }
//----------------------------------------------------------------  CHAMADA DA FUNÇÃO


consultaAeroporto();
consultacidade();
consultaTrecho();
consultaAeronaves();
consultavoo();


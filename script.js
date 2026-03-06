const API = "http://localhost:3000"

const formulario = document.querySelector('.form')
const nomeProduto = document.querySelector('#nome')
const precoProduto = document.querySelector('#preco')
const decricaoProduto = document.querySelector('#descricao')
const listaProduto = document.querySelector('.lista-produtos')

async function salvarProduto(e) {

    e.preventDefault()

   try {
    //Fetch
    //Ela serve para:
    // buscar dados
   // enviar dados
   // comunicar com um backend (API)
     await fetch(API + '/cadastro', {
        //metodo 
        method: 'POST',
       //tipo de contexto que ele precisa é json
        headers: {'Content-Type': 'application/json'},
        //O corpo da pagina
        body: JSON.stringify({
            nome: nomeProduto.value,
            preco: precoProduto.value,
            descricao: decricaoProduto.value,
        }),
    })
    alert("produto cadastrado com sucesso!!!")
    limparCampo()
   }
    catch (error) {
    console.log("Erro ao salvar produto: " + error);
    
   }
}
function criarItensProduto(produto){
    const li = document.createElement('li')
    const nomeP = document.createElement('h3')    
    const precoP = document.createElement('p')    
    const descricaoP = document.createElement('p')
    const acoes = document.createElement('div')
    const botaoEditar = document.createElement('button')
    const botaoExcluir = document.createElement('button')
    
    //Adcionar evento ao botão, fazendo excluir baseado no id
    botaoExcluir.addEventListener('click', () => excluirProduto(produto.id))

    //Adcionando o texto
    // pegar do banco
    nomeP.textContent = produto.nome
    precoP.textContent = produto.preco
    descricaoP.textContent = produto.descricao
    botaoEditar.textContent = "Editar"
    botaoExcluir.textContent = "Excluir"

    //adcionando classe
     li.classList.add('produto')
     acoes.classList.add('acoes')

    //Adcionando filhos
    acoes.append(botaoEditar,botaoExcluir)
    li.append(nomeP, precoP,descricaoP, acoes)

    listaProduto.appendChild(li)
    
}

async function buscarProdutos() {
    
    try{
        const dados = await fetch(API+'/') //Puxa os dados de banco

        const json = await dados.json() //Tranforma em json

        console.log(json)
        
    } catch(erro){

    }  
}

buscarProdutos()

function limparCampo () {
    nomeProduto.value = ''

    precoProduto.value = ''

    decricaoProduto.value = ''

    nomeProduto.focus()
}

//ao clicar no botão de enviar de enviar ele vai salvar o produto 
formulario.addEventListener('submit', salvarProduto)
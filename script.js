
/*
========================================
1. CONFIGURAÇÃO DA API
========================================
*/

// Endereço da API Beeceptor.
const API_URL = "https://ca9cf6fbde3b0a705399.free.beeceptor.com/api/users";

/*
========================================
2. ELEMENTOS DO HTML
========================================
*/

// Capturamos os elementos que serão utilizados.
const formulario = document.getElementById("form-cliente");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const listaClientes = document.getElementById("lista-clientes");
const mensagem = document.getElementById("mensagem");
const listaVazia = document.getElementById("lista-vazia");

/*
========================================
3. EXIBIR MENSAGENS
========================================
*/

// Exibe uma mensagem de sucesso ou erro.
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.dataset.tipo = tipo;
}

/*
========================================
4. GET - LISTAR CLIENTES
========================================
*/

async function listarClientes() {
    try {
        // Busca os clientes na API.
        const resposta = await fetch(API_URL, {
            method: "GET"
        });

        // Verifica se a requisição funcionou.
        if (!resposta.ok) {
            throw new Error("Erro ao buscar clientes");
        }

        // Converte o JSON recebido em um array.
        const clientes = await resposta.json();

        // Atualiza a lista no HTML.
        renderizarClientes(clientes);

    } catch (erro) {
        console.error(erro);
        exibirMensagem("Erro ao carregar clientes.", "erro");
    }
}

/*
========================================
5. MOSTRAR CLIENTES NA TELA
========================================
*/

function renderizarClientes(clientes) {

    // Limpa a lista antes de renderizar novamente.
    listaClientes.innerHTML = "";

    // Exibe a mensagem caso não existam clientes.
    listaVazia.hidden = clientes.length > 0;

    // Percorre todos os clientes recebidos.
    clientes.forEach((cliente) => {

        // Cria o elemento da lista.
        const item = document.createElement("li");
        item.classList.add("cliente-card");

        // Cria a área das informações.
        const informacoes = document.createElement("div");
        informacoes.classList.add("cliente-info");

        // Cria o nome.
        const nome = document.createElement("strong");
        nome.textContent = cliente.name;

        // Cria o e-mail.
        const email = document.createElement("p");
        email.textContent = cliente.email;

        // Cria o botão de exclusão.
        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("btn-excluir");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";

        // Quando clicar, exclui o cliente pelo ID.
        botaoExcluir.addEventListener("click", () => {
            excluirCliente(cliente.id);
        });

        // Organiza os elementos.
        informacoes.append(nome, email);
        item.append(informacoes, botaoExcluir);

        // Adiciona o cliente à lista.
        listaClientes.appendChild(item);
    });
}

/*
========================================
6. POST - CADASTRAR CLIENTE
========================================
*/

async function cadastrarCliente(evento) {

    // Impede o formulário de recarregar a página.
    evento.preventDefault();

    // Captura os valores digitados.
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();

    // Verifica se os campos estão preenchidos.
    if (!nome || !email) {
        exibirMensagem("Preencha todos os campos.", "erro");
        return;
    }

    // Cria o objeto que será enviado para a API.
    const novoCliente = {
        name: nome,
        email: email
    };

    try {
        // Envia os dados utilizando POST.
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoCliente)
        });

        // Verifica se o cadastro funcionou.
        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar cliente");
        }

        // Limpa o formulário.
        formulario.reset();

        // Exibe a mensagem de sucesso.
        exibirMensagem("Cliente cadastrado com sucesso!");

        // Atualiza a lista automaticamente.
        await listarClientes();

    } catch (erro) {
        console.error(erro);
        exibirMensagem("Erro ao cadastrar cliente.", "erro");
    }
}

/*
========================================
7. DELETE - EXCLUIR CLIENTE
========================================
*/

async function excluirCliente(id) {

    // Impede a exclusão sem identificador.
    if (!id) {
        exibirMensagem("Cliente sem ID.", "erro");
        return;
    }

    try {
        // Envia DELETE com o ID do cliente.
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        // Verifica se a exclusão funcionou.
        if (!resposta.ok) {
            throw new Error("Erro ao excluir cliente");
        }

        // Exibe mensagem de sucesso.
        exibirMensagem("Exclusão solicitada com sucesso!");

        // Atualiza a lista automaticamente.
        await listarClientes();

    } catch (erro) {
        console.error(erro);
        exibirMensagem("Erro ao excluir cliente.", "erro");
    }
}

/*
========================================
8. EFEITO PARALLAX SOMENTE NO FUNDO
========================================
*/

// Verifica se o usuário permite animações.
const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

// Ativa o parallax somente se permitido.
if (!movimentoReduzido.matches) {

    // Detecta o movimento do mouse na página.
    document.addEventListener("mousemove", (evento) => {

        // Calcula a posição do mouse
        // em relação ao centro da tela.
        const x = evento.clientX - window.innerWidth / 2;
        const y = evento.clientY - window.innerHeight / 2;

        // Atualiza as variáveis CSS que
        // movimentam somente o fundo.
        document.documentElement.style.setProperty(
            "--mouse-x",
            `${x * 0.05}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${y * 0.05}px`
        );
    });
}

/*
========================================
9. INICIALIZAÇÃO
========================================
*/

// Executa o cadastro ao enviar o formulário.
formulario.addEventListener("submit", cadastrarCliente);

// Busca os clientes quando a página é aberta.
listarClientes();

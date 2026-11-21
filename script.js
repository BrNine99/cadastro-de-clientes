
/*
========================================
1. CONFIGURAÇÃO DA API
========================================
*/

// URL da API de sua preferencia.
// Substitua SEU_TOKEN pelo token gerado no site.
// "clientes" é o nome da coleção utilizada.
const API_URL = "https://ca9cf6fbde3b0a705399.free.beeceptor.com/api/users";


/*
========================================
2. CAPTURA DOS ELEMENTOS DO DOM
========================================
*/

// Captura o formulário de cadastro.
const formulario = document.getElementById("form-cliente");

// Captura os campos de nome e e-mail.
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");

// Captura a lista onde os clientes serão exibidos.
const listaClientes = document.getElementById("lista-clientes");

// Captura o elemento responsável pelas mensagens.
const mensagem = document.getElementById("mensagem");

// Captura a mensagem de lista vazia.
const listaVazia = document.getElementById("lista-vazia");


/*
========================================
3. FUNÇÃO PARA EXIBIR MENSAGENS
========================================
*/

// Exibe mensagens de sucesso ou erro na interface.
function exibirMensagem(texto) {

    // Atualiza o conteúdo do elemento HTML.
    mensagem.textContent = texto;
}


/*
========================================
4. GET - BUSCAR CLIENTES
========================================
*/

// Função assíncrona responsável por buscar
// todos os clientes cadastrados na API.
async function listarClientes() {

    try {

        // Envia uma requisição HTTP GET para a API.
        // O await aguarda a resposta do servidor.
        const resposta = await fetch(API_URL, {
            method: "GET"
        });

        // Verifica se a resposta HTTP indica sucesso.
        // resposta.ok é true para status entre 200 e 299.
        if (!resposta.ok) {
            throw new Error(
                `Erro ao buscar clientes: ${resposta.status}`
            );
        }

        // Converte o JSON recebido em dados JavaScript.
        // Neste caso, esperamos um array de clientes.
        const clientes = await resposta.json();

        // Mostra os dados recebidos no console.
        console.log("Clientes recebidos:", clientes);

        // Envia os clientes para a função que
        // atualiza a listagem no HTML.
        renderizarClientes(clientes);

    } catch (erro) {

        // Exibe o erro no console para depuração.
        console.error("Erro ao listar clientes:", erro);

        // Informa ao usuário que ocorreu um erro.
        exibirMensagem(
            "Não foi possível carregar os clientes."
        );
    }
}


/*
========================================
5. RENDERIZAÇÃO DOS CLIENTES NO DOM
========================================
*/

// Recebe o array de clientes retornado pela API.
function renderizarClientes(clientes) {

    // Remove os elementos da listagem anterior.
    // Isso evita duplicar clientes na tela.
    listaClientes.innerHTML = "";

    // Exibe a mensagem de lista vazia somente
    // quando não existem clientes cadastrados.
    listaVazia.hidden = clientes.length > 0;

    // Percorre cada cliente do array.
    clientes.forEach((cliente) => {

        // Cria um elemento <li> para o cliente.
        const item = document.createElement("li");

        // Cria um elemento para exibir o nome.
        const nome = document.createElement("strong");

        // Insere o nome recebido da API.
        nome.textContent = cliente.nome;

        // Cria um parágrafo para o e-mail.
        const email = document.createElement("p");

        // Insere o e-mail recebido da API.
        email.textContent = cliente.email;

        // Cria o botão de exclusão.
        const botaoExcluir = document.createElement("button");

        // Define o tipo do botão.
        botaoExcluir.type = "button";

        // Define o texto apresentado no botão.
        botaoExcluir.textContent = "Excluir";

        // Adiciona um evento de clique ao botão.
        botaoExcluir.addEventListener("click", () => {

            // Chama a função de exclusão passando
            // o identificador único do cliente.
            excluirCliente(cliente._id);
        });

        // Adiciona os elementos ao <li>.
        item.append(nome, email, botaoExcluir);

        // Insere o <li> na lista do HTML.
        listaClientes.appendChild(item);
    });
}


/*
========================================
6. POST - CADASTRAR CLIENTE
========================================
*/

// Função executada quando o formulário é enviado.
async function cadastrarCliente(evento) {

    // Impede o comportamento padrão do formulário,
    // que seria recarregar a página.
    evento.preventDefault();

    // Obtém os valores digitados nos campos.
    // trim() remove espaços no início e no final.
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();

    // Verifica se os campos estão preenchidos.
    if (!nome || !email) {

        exibirMensagem("Preencha todos os campos.");

        // Interrompe a execução da função.
        return;
    }

    // Cria um objeto com os dados do cliente.
    // Esse objeto será enviado para a API.
    const novoCliente = {
        nome: nome,
        email: email
    };

    try {

        // Envia uma requisição HTTP POST.
        const resposta = await fetch(API_URL, {

            // Define o método de criação.
            method: "POST",

            // Informa que os dados enviados
            // estão no formato JSON.
            headers: {
                "Content-Type": "application/json"
            },

            // Converte o objeto JavaScript
            // em uma string JSON.
            body: JSON.stringify(novoCliente)
        });

        // Verifica se o cadastro foi realizado.
        if (!resposta.ok) {
            throw new Error(
                `Erro ao cadastrar: ${resposta.status}`
            );
        }

        // Exibe o resultado no console.
        console.log("Cliente cadastrado com sucesso!");

        // Limpa os campos do formulário.
        formulario.reset();

        // Informa o sucesso ao usuário.
        exibirMensagem(
            "Cliente cadastrado com sucesso!"
        );

        // Busca novamente os clientes na API
        // para atualizar a listagem automaticamente.
        await listarClientes();

    } catch (erro) {

        // Exibe o erro no console.
        console.error("Erro ao cadastrar cliente:", erro);

        // Exibe uma mensagem de erro na interface.
        exibirMensagem(
            "Não foi possível cadastrar o cliente."
        );
    }
}


/*
========================================
7. DELETE - EXCLUIR CLIENTE
========================================
*/

// Recebe o identificador do cliente a excluir.
async function excluirCliente(id) {

    try {

        // Envia uma requisição DELETE para a API.
        // O ID identifica qual cliente será excluído.
        const resposta = await fetch(`${API_URL}/${id}`, {

            // Define o método HTTP de exclusão.
            method: "DELETE"
        });

        // Verifica se a exclusão foi bem-sucedida.
        if (!resposta.ok) {
            throw new Error(
                `Erro ao excluir: ${resposta.status}`
            );
        }

        // Registra a exclusão no console.
        console.log("Cliente excluído:", id);

        // Exibe uma mensagem de sucesso.
        exibirMensagem(
            "Cliente excluído com sucesso!"
        );

        // Atualiza a lista após a exclusão.
        await listarClientes();

    } catch (erro) {

        // Registra o erro no console.
        console.error("Erro ao excluir cliente:", erro);

        // Informa o erro ao usuário.
        exibirMensagem(
            "Não foi possível excluir o cliente."
        );
    }
}

/*
========================================
8. PARALLAX 3D DO FUNDO
========================================
*/

// Respeita a preferência de movimento reduzido.
const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

// Verifica se o dispositivo permite mouse com hover.
const possuiMouse = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
);

if (!movimentoReduzido.matches && possuiMouse.matches) {
    let posicaoX = 0;
    let posicaoY = 0;

    let atualX = 0;
    let atualY = 0;

    let animacaoAtiva = false;

    // Atualiza suavemente as variáveis CSS.
    function animarParallax() {
        atualX += (posicaoX - atualX) * 0.07;
        atualY += (posicaoY - atualY) * 0.07;

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${atualX.toFixed(2)}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${atualY.toFixed(2)}px`
        );

        const diferencaX = Math.abs(posicaoX - atualX);
        const diferencaY = Math.abs(posicaoY - atualY);

        if (diferencaX > 0.1 || diferencaY > 0.1) {
            requestAnimationFrame(animarParallax);
        } else {
            animacaoAtiva = false;
        }
    }

    // Captura a posição do cursor.
    window.addEventListener("pointermove", (evento) => {
        const centroX = window.innerWidth / 2;
        const centroY = window.innerHeight / 2;

        const normalizadoX =
            (evento.clientX - centroX) / centroX;

        const normalizadoY =
            (evento.clientY - centroY) / centroY;

        posicaoX = normalizadoX * 35;
        posicaoY = normalizadoY * 35;

        if (!animacaoAtiva) {
            animacaoAtiva = true;
            requestAnimationFrame(animarParallax);
        }
    }, { passive: true });
}

/*
========================================
9. EFEITO 3D NOS PAINÉIS
========================================
*/

if (!movimentoReduzido.matches && possuiMouse.matches) {
    const paineis = document.querySelectorAll(
        "main > section"
    );

    paineis.forEach((painel) => {
        painel.addEventListener("pointermove", (evento) => {
            const area = painel.getBoundingClientRect();

            const x = (evento.clientX - area.left) / area.width;
            const y = (evento.clientY - area.top) / area.height;

            const rotacaoX = (0.5 - y) * 3;
            const rotacaoY = (x - 0.5) * 3;

            painel.style.setProperty(
                "--rotate-x",
                `${rotacaoX.toFixed(2)}deg`
            );

            painel.style.setProperty(
                "--rotate-y",
                `${rotacaoY.toFixed(2)}deg`
            );
        });

        painel.addEventListener("pointerleave", () => {
            painel.style.setProperty("--rotate-x", "0deg");
            painel.style.setProperty("--rotate-y", "0deg");
        });
    });
}

/*
========================================
10. EVENTOS E INICIALIZAÇÃO
========================================
*/

// Escuta o envio do formulário.
formulario.addEventListener("submit", cadastrarCliente);

// Busca os clientes assim que a página carregar.
listarClientes();

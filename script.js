// Carregar usuários existentes ou criar padrão
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (!usuarios) {
  usuarios = [
    { usuario: "admin", senha: "1234" },
    { usuario: "teste", senha: "abcd" }
  ];
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Lista de cães
const listaCaes = document.getElementById("listaCaes");
let caes = JSON.parse(localStorage.getItem("caesDesaparecidos")) || [];

// Salvar cães no localStorage
function salvarLocalmente() {
  localStorage.setItem("caesDesaparecidos", JSON.stringify(caes));
}

// Cadastrar cão
function cadastrarCao() {
  const nome = document.getElementById("nome").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const caracteristicas = document.getElementById("caracteristicas").value.trim();
  const sexo = document.getElementById("sexo").value;
  const localizacao = document.getElementById("localizacao").value.trim();
  const imagem = document.getElementById("imagem").value.trim();
  const recompensa = document.getElementById("recompensa").value.trim();

  if (!nome || !descricao || !idade || !sexo || !localizacao || !imagem) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const cao = {
    nome,
    descricao,
    idade,
    caracteristicas,
    sexo,
    localizacao,
    imagem,
    recompensa,
    localizacoesAvisadas: []
  };

  caes.push(cao);
  salvarLocalmente();
  atualizarLista();
  document.getElementById("cadastroCaoForm").reset();
}

// Atualizar lista de cães
function atualizarLista() {
  listaCaes.innerHTML = caes.length ? "" : "<p>Nenhum cão cadastrado.</p>";
  caes.forEach((cao, i) => {
    listaCaes.innerHTML += `
      <div class="dog-card">
        <div class="dog-card-header">
          <img src="${cao.imagem}" alt="${cao.nome}" />
          <div>
            <h3>${cao.nome} <span class="sexo">(${cao.sexo})</span></h3>
            <p><strong>Idade:</strong> ${cao.idade}</p>
            ${cao.caracteristicas ? `<p><strong>Características:</strong> ${cao.caracteristicas}</p>` : ''}
            <p><strong>Localização:</strong> ${cao.localizacao}</p>
            <p><strong>Descrição:</strong> ${cao.descricao}</p>
            ${cao.recompensa ? `<p class="recompensa">Recompensa: <strong>${cao.recompensa}</strong></p>` : ''}
          </div>
        </div>
        <div class="dog-card-actions">
          <button onclick="avisarLocalizacao(${i})">Avisar possível localização</button>
          <button onclick="confirmarAchado(${i})">Confirmar achado</button>
        </div>
        <div class="dog-card-locais">
          <strong>Locais avisados:</strong> ${cao.localizacoesAvisadas.length ? cao.localizacoesAvisadas.join(", ") : "Nenhum"}
        </div>
      </div>`;
  });
}

// Avisar localização
function avisarLocalizacao(index) {
  const local = prompt("Digite onde o cão foi visto:");
  if (local) {
    caes[index].localizacoesAvisadas.push(local);
    salvarLocalmente();
    atualizarLista();
  }
}

// Confirmar achado
function confirmarAchado(index) {
  if (confirm(`Confirma que ${caes[index].nome} foi encontrado?`)) {
    caes.splice(index, 1);
    salvarLocalmente();
    atualizarLista();
  }
}

// Mostrar/ocultar menu
function toggleMenu() {
  const dropdown = document.getElementById("menuDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// Voltar à tela inicial com fade
function voltarInicio() {
  document.getElementById("inicioPublicacao").style.opacity = "0";
  document.querySelector(".dog-list").style.opacity = "0";
  document.getElementById("configuracoes").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("inicioPublicacao").style.display = "block";
    document.querySelector(".dog-list").style.display = "block";
    document.getElementById("configuracoes").style.display = "none";
    document.getElementById("inicioPublicacao").style.opacity = "1";
    document.querySelector(".dog-list").style.opacity = "1";
  }, 300);
}

// Abrir configurações com fade
function abrirConfiguracoes() {
  document.getElementById("inicioPublicacao").style.opacity = "0";
  document.querySelector(".dog-list").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("inicioPublicacao").style.display = "none";
    document.querySelector(".dog-list").style.display = "none";
    document.getElementById("configuracoes").style.display = "block";
    document.getElementById("configuracoes").style.opacity = "1";

    const perfil = JSON.parse(localStorage.getItem("perfil")) || {};
    document.getElementById("perfilNome").value = perfil.nome || "";
    document.getElementById("perfilEmail").value = perfil.email || "";
    document.getElementById("perfilTelefone").value = perfil.telefone || "";
  }, 300);
}

// Salvar perfil
function salvarPerfil() {
  const perfil = {
    nome: document.getElementById("perfilNome").value.trim(),
    email: document.getElementById("perfilEmail").value.trim(),
    telefone: document.getElementById("perfilTelefone").value.trim()
  };
  localStorage.setItem("perfil", JSON.stringify(perfil));
  alert("Perfil salvo com sucesso!");
}

// Mostrar campo de publicação
function abrirPublicacao() {
  document.getElementById("publicacaoForm").style.display = "block";
  document.getElementById("inicioPublicacao").querySelector("input").style.display = "none";
}

// Login e cadastro
function mostrarCadastro() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("cadastroBox").style.display = "block";
}
function mostrarLogin() {
  document.getElementById("cadastroBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}
function fazerCadastro() {
  const novoUsuario = document.getElementById("novoUsuario").value.trim();
  const novaSenha = document.getElementById("novaSenha").value.trim();

  if (!novoUsuario || !novaSenha) {
    alert("Preencha todos os campos.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.find(u => u.usuario === novoUsuario)) {
    alert("Usuário já existe.");
    return;
  }

  usuarios.push({ usuario: novoUsuario, senha: novaSenha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cadastrado com sucesso!");
  mostrarLogin();
}

// Fazer login
function fazerLogin() {
  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("senha").value.trim();

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const valido = usuarios.find(u => u.usuario === user && u.senha === pass);
  if (valido) {
    localStorage.setItem("logado", "true");
    mostrarConteudo();
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

// Fazer logout
function fazerLogout() {
  localStorage.removeItem("logado");
  document.getElementById("conteudoPrincipal").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

// Mostrar conteúdo após login
function mostrarConteudo() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("cadastroBox").style.display = "none";
  document.getElementById("conteudoPrincipal").style.display = "block";
  atualizarLista();
}

// Se já logado, mostrar conteúdo
if (localStorage.getItem("logado") === "true") mostrarConteudo();
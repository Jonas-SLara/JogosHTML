const input_nome = document.querySelector(".login-nome");
const botao_login = document.querySelector(".login-botao");
const formulario_login = document.querySelector(".login-formulario");
const input_menu = document.querySelector("#menu");

const validar_entrada = ({ target }) => {
  //desestruturação de objetos para obter target de event
  if (target.value.length > 2) {
    botao_login.removeAttribute("disabled"); //se tiver mais de 2 letras habilita o botão
  } else {
    botao_login.setAttribute("disabled", "");
  }
};

const mudar_jogo = () => {
  let novo_nome;
  switch (input_menu.value) {
    case "jogo_memoria":
      novo_nome = "Jogo da Memória";
      break;
    case "jogo_cobrinha":
      novo_nome = "Jogo da Cobrinha";
      break;
  }
  document.querySelector("#nome_jogo").innerHTML = novo_nome;
};

const tratar_submit = (event) => {
  event.preventDefault(); //bloqueia o comportamento padrao, no caso de enviar os dados e recarregar a pagina
  localStorage.setItem("jogador_nome", input_nome.value); //guarda no armazenamento local do browse
  console.log(localStorage.getItem("jogador_nome"));

  switch (input_menu.value) {
    case "jogo_memoria":
      window.location = "./paginas/memoria.html";
      break;
    case "jogo_cobrinha":
      window.location = "./paginas/cobra.html";
      break;
  }
  //redireciona para onde esta o game usando o atributo location de window
};

input_menu.addEventListener("input", mudar_jogo);
input_nome.addEventListener("input", validar_entrada); //passa o event a função
formulario_login.addEventListener("submit", tratar_submit);

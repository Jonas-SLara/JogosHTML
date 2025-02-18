const input_nome = document.querySelector(".login-nome");
const botao_login = document.querySelector(".login-botao");
const formulario_login = document.querySelector(".login-formulario");

const validar_entrada = ({ target })=>{//desestruturação de objetos para obter target de event
    if(target.value.length > 2){
        botao_login.removeAttribute('disabled');//se tiver mais de 2 letras habilita o botão
    }else{
        botao_login.setAttribute('disabled', '');
    }
}

const tratar_submit = (event)=>{
    event.preventDefault();//bloqueia o comportamento padrao, no caso de enviar os dados e recarregar a pagina
    localStorage.setItem('jogador_nome', input_nome.value);//guarda no armazenamento local do browse
    console.log(localStorage.getItem('jogador_nome'));
    window.location='./paginas/memoria.html';//redireciona para onde esta o game usando o atributo location de window

}

input_nome.addEventListener("input", validar_entrada);//passa o event a função
formulario_login.addEventListener("submit", tratar_submit);

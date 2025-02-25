const grid = document.querySelector(".grid");

const cartas = [
  "1guerraMundial.jpg",
  "1revolucaoIndustrial.jpeg",
  "2guerraMundial.jpg",
  "cruzadas.jpg",
  "grandesNavegacoes.jpg",
  "guerraFria.jpg",
  "ia4revolucaoIndustrial.webp",
  "pesteNegra.jpg",
  "pandemiaCovid19.jpg",
  "revolucaoFrancesa.jpg",
];

let carta1 = null;
let carta2 = null;
let pares_achados = 0;
let timer = null;

function obterRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const criarElemento = (tag, classe) => {
  const novo = document.createElement(tag);
  novo.className = classe;
  return novo;
};

const checar_fim = () => {
  if (pares_achados === 10) {
    alert(`Parabéns ${localStorage.getItem('jogador_nome')} você completou em 
      ${document.querySelector('.tempo_m').innerHTML}:${document.querySelector('.tempo_s').innerHTML}`);
    clearInterval(timer);
  }
};

//obtem os atributos das 2 cartas, compara, limpa as variaveis das cartas, vira devolta caso sejam diferentes
const comparar_carta = () => {
  if (!carta1 || !carta2) return; //se carta1 e carta2 nao terem sido definidas ainda

  const primeiro = carta1.getAttribute("data-id");
  const segundo = carta2.getAttribute("data-id");

  if (primeiro === segundo) {
    carta1.firstChild.classList.add("carta_bloqueada");
    carta2.firstChild.classList.add("carta_bloqueada");

    carta1 = null;
    carta2 = null;
    pares_achados++;
    checar_fim();
  } else {
    setTimeout(() => {
      carta1.classList.remove("revelar_carta");
      carta2.classList.remove("revelar_carta");
      carta1 = null;
      carta2 = null;
    }, 500);
  }
};

const revelarCarta = ({ target }) => {
  if (target.parentNode.className.includes("revelar_carta")) {
    return;
  }
  if (carta1 == null) {
    target.parentNode.classList.add("revelar_carta");
    carta1 = target.parentNode;
    console.log(carta1);
  } else if (carta2 == null) {
    target.parentNode.classList.add("revelar_carta");
    carta2 = target.parentNode;
    console.log(carta2);
  }

  comparar_carta();
};

const criarCarta = (valor) => {
  const nova_carta = criarElemento("div", "carta");
  const frente = criarElemento("div", "face frente");
  const fundo = criarElemento("div", "face fundo");

  frente.style.backgroundImage = `url('../img/${valor}')`;

  nova_carta.appendChild(frente);
  nova_carta.appendChild(fundo);

  nova_carta.addEventListener("click", (evento) => {
    revelarCarta(evento);
  });
  nova_carta.setAttribute("data-id", valor);
  return nova_carta;
};

const duplicar = (cartas_array) => {
  let i = 0;
  max = cartas_array.length;
  while (i < max) {
    cartas_array.push(cartas_array[i]);
    i++;
  }
};

//algoritmo de embaralhar cartas com numeros randomicos
const trocarLugares = (valor, index, array) => {
  let index_troca = obterRandomInt(0, array.length);
  array[index] = array[index_troca];
  array[index_troca] = valor;
};

const carregarJogo = () => {
  cartas.forEach((valor, indice) => {
    const carta = criarCarta(valor);
    grid.appendChild(carta);
  });
};


const escrever_tempo = ()=>{
  const tempo_s = document.querySelector('.tempo_s');
  let s = Number(tempo_s.innerHTML);
  s++;

  if(s===60){
    const tempo_m  = document.querySelector('.tempo_m');
    let m = Number(tempo_m.innerHTML);
    m++;
    tempo_s.innerHTML='00';
    tempo_m.innerHTML = m<10 ? '0' + m : m;
  }
  else{

    tempo_s.innerHTML = s<10 ? '0' + s: s;
  }
}

const inicializacao = ()=>{
  let nome  = localStorage.getItem("jogador_nome");
  document.getElementById("jogador").innerHTML=nome;
  duplicar(cartas);
  cartas.forEach(trocarLugares);
  carregarJogo();
  timer = setInterval(escrever_tempo, 1000);//passar a referencia da função e não a função em si como os ()
}

window.onload = inicializacao();




const tela_cobra = document.querySelector("#tela_cobra"); //obter o elemeto canvas para renderizar na tela
const ctx = tela_cobra.getContext("2d"); //selecione o contexto como 2d

const tamanho = 25; //tamanho de cada parte da cobra

//akira é o nome da cobra, iniciar akira com 3 quadrados de 25 cada
const akira = [
  { x: 150, y: 150 },
  { x: 175, y: 150 },
  { x: 200, y: 150 },
];

let direcao = null,
  id_loop = null;

//criar uma função para desenhar a akira sendo a cabeça dela com uma textura diferente
const desenhar_akira = () => {
  ctx.fillStyle = "rgb(0, 200, 0)";
  akira.forEach((posicao, index) => {
    if (index === akira.length - 1) ctx.fillStyle = "rgb(0, 150, 0)";
    ctx.fillRect(posicao.x, posicao.y, tamanho, tamanho);
  });
};

const mover_akira = () => {
  if (!direcao) return;

  const cabeca = akira[akira.length - 1]; //obtem o ultimo objeto da array que é as coordenadas da cabeça

  akira.shift(); //retira o primeiro elemento da array

  switch (direcao) {
    case "D":
      akira.push({ x: cabeca.x + tamanho, y: cabeca.y });
      break;
    case "E":
      akira.push({ x: cabeca.x - tamanho, y: cabeca.y });
      break;
    case "C":
      akira.push({ x: cabeca.x, y: cabeca.y - tamanho });
      break;
    case "B":
      akira.push({ x: cabeca.x, y: cabeca.y + tamanho });
      break;
  }
};

const desenhar_grid = () => {
  ctx.lineWidth = 1;//define largura da linha para desenho em 1
  ctx.strokeStyle = 'rgb(100,0,0)';//define estilo da linha como branco

  for(let i=25; i<tela_cobra.width; i+=25){//desenhe linhas verticais
    ctx.beginPath();//inicia um novo desenho no contexto
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 500);
    ctx.stroke();//desenha a linha

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(500, i);
    ctx.stroke();
  }
}

/*
uma solução de fazer o ciclo de jogo, porém pode haver o atraso na demora da execução e acumular chamadas de função 
setInterval(() => {
  ctx.clearRect(0, 0, 500, 500); 
  desenhar_akira();
}, 300);
*/

//ciclo de jogo para limpar o canvas e depois fazer as atualizaçoes e emfim desenhar objetos
const ciclo_jogo = () => {
  clearTimeout(id_loop); //reiniciar timer

  ctx.clearRect(0, 0, 500, 500); //limpar antes de desenhar no canvas
  mover_akira();
  desenhar_grid();
  desenhar_akira();

  id_loop = setTimeout(() => {
    ciclo_jogo(); //chama o próximo ciclo
  }, 300);
};

//implementar o controle de movimento observando que a cobra não pode passar por si mesma
document.addEventListener("keydown", ({ key }) => { //é passado o objeto event como parametro, mas se usa a destruturação
  switch (key) {
    case "ArrowRight":
      direcao = direcao === 'E' ? 'E' : 'D'; //se ja estiver na esquerda nao pode ir para a direita
      break;
    case "ArrowLeft":
      direcao = direcao === 'D' ? 'D' : 'E'; //caso ja esteje na direita nao pode ir para a esquerda
      break;
    case "ArrowUp":
      direcao = direcao === 'B' ? 'B' : 'C'; //caso ja esteje para baixo nao pode ir para cima
      break;
    case "ArrowDown":
      direcao = direcao === 'C' ? 'C' : 'B'; //caso esteje para cima, nao podei ir para baixo
      break;
  }
});


//ciclo_jogo();

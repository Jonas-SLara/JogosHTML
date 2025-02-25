const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const estrelas = new Array();

//uma classe estrela para criar e renderizar estrelas na tela do canvas
class Estrela {
  constructor(x, y, raio, velocidade) {
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
    this.raio = raio;
  }

  //atualiza as posiçoes das estrelas com suas velocidades em x e y
  atualizar() {
    this.x += this.velocidade.x;
    this.y += this.velocidade.y;
    //para caso a estrela saia dos limites da tela ela aparece no lado simetrico
    if (this.x > canvas.width) this.x = 0;
    if (this.y > canvas.height) this.y = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y < 0) this.y = canvas.height;
  }

  desenhar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2); //desenha o circulo sendo 2PI radianos = 360
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

//função para criar uma estrela e retornala como um objeto
function criar_estrela() {
  let raio = Math.random() * 1.5 + 0.5; //raio entre 0.5 e 2
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let velocidade = { x: Math.random() * 0.5, y: Math.random() * 0.5 };
  return new Estrela(x, y, raio, velocidade);
}

const desenhar_fundo = (x) => {
  for (let i = 0; i < x; i++) {
    estrelas.push(criar_estrela());
  }
};

const animar_fundo = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let x of estrelas){
        x.atualizar();
        x.desenhar();
    }
    requestAnimationFrame(animar_fundo)
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
desenhar_fundo(50);
animar_fundo();
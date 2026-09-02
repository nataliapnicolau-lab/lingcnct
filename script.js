const questions=[
['“Fazem dois anos que não nos vemos.”','errado','Na gramática normativa, o verbo “fazer”, quando indica tempo decorrido, é impessoal: “Faz dois anos...”.'],
['“Houveram muitos problemas durante a reunião.”','errado','Na norma-padrão, “haver” com sentido de existir é impessoal: “Houve muitos problemas...”.'],
['“Isso aconteceu há muito tempo”','certo','Correto! O verbo “haver” na acepção de tempo decorrido indica o pretérito, sendo impessoal e correto no singular.'],
['“Nós vai chegar mais cedo.”','errado','Na gramática normativa, a concordância padrão exige que o verbo acompanhe a pessoa do discurso no plural: “Nós vamos chegar mais cedo.”'],
['“Quem fala diferente da norma-padrão está falando português errado.”','errado','']
];
let q=0,answered=false;
const qt=document.querySelector('#questionText'),
      fb=document.querySelector('#feedback'),
      bar=document.querySelector('#progressBar'),
      label=document.querySelector('#progressLabel'),
      card=document.querySelector('#questionCard'),
      buttons=document.querySelectorAll('.answer-btn'),
      nextBtn=document.querySelector('#nextQuestion');

function renderQ(){
qt.textContent=questions[q][0];
fb.textContent='';
nextBtn.classList.remove('show');
buttons.forEach(b=>{b.classList.remove('selected');b.disabled=false});
answered=false;
label.textContent=`PERGUNTA ${q+1} DE ${questions.length}`;
bar.style.width=`${(q+1)/questions.length*100}%`
}

buttons.forEach(b=>b.onclick=()=>{
if(answered)return;
answered=true;
buttons.forEach(x=>x.disabled=true);
b.classList.add('selected');

if(q === questions.length - 1){
  card.classList.add('out');
  setTimeout(()=>{
    go(document.querySelector('#stageSociolinguistics'));
  },320);
  return;
}

let ok=b.dataset.answer===questions[q][1];
fb.textContent=(ok?'✓ ':'↳ Quase! ')+questions[q][2];

setTimeout(()=>{
  nextBtn.classList.add('show');
}, 400);
});

nextBtn.onclick=()=>{
card.classList.add('out');
setTimeout(()=>{
  q++;
  renderQ();
  card.classList.remove('out');
  card.classList.add('in');
  setTimeout(()=>card.classList.remove('in'),500)
},320);
};

function go(next){
let cur=document.querySelector('.stage.active');
cur.style.opacity='0';
cur.style.transform='translateY(-18px)';
setTimeout(()=>{
cur.classList.remove('active');
cur.style='';
next.classList.add('active');
scrollTo({top:0,behavior:'smooth'});
},450)
}

document.querySelector('#startQuiz').onclick=()=>go(document.querySelector('#stage1'));
document.querySelector('#toThinking').onclick=()=>go(document.querySelector('#stage2'));
document.querySelector('#learnMore').onclick=()=>go(document.querySelector('#stage3'));

const cards=[
['⚠️','O PROBLEMA','A circulação de informações sobre a língua na internet.','A circulação pública de informações sobre a língua portuguesa na internet costuma tratar a "norma padrão" como a única correta, o que reforça preconceitos e discriminações linguísticas. Plataformas digitais de grande acesso, como Google, Wikipédia e ferramentas de inteligência artificial (ChatGPT e Gemini), frequentemente não oferecem explicações neutras e embasadas sobre as variações da língua, o que acaba distanciando o conhecimento científico da população em geral.'],
['💡','A PROPOSTA','Recursos abertos e colaborativos.','A proposta principal do projeto é criar recursos digitais abertos e colaborativos para qualificar o conhecimento público sobre o idioma e reduzir estigmas. A pesquisa se desenvolve em três etapas integradas: revisão de terminologias, intervenção em espaços digitais de grande consulta e desenvolvimento de uma ferramenta online de conversão entre normas.'],
['🎯','O OBJETIVO','Transformação social e direitos linguísticos.','O objetivo final da pesquisa é contribuir, a médio e longo prazo, para uma transformação social voltada aos direitos linguísticos, melhorando a qualidade do que se lê sobre o português na internet. O projeto busca diminuir preconceitos sobre as diferentes formas de falar, apoiar práticas mais justas na educação e na comunicação, e consolidar referências gratuitas, verificáveis e duradouras sobre a variação da nossa língua no meio digital.']
];

let c=0;const fc=document.querySelector('#flashcard'),dots=document.querySelector('#dots');
function dotsMake(){
dots.innerHTML='';
cards.forEach((_,i)=>{let d=document.createElement('button');d.className='dot';d.onclick=()=>renderC(i);dots.appendChild(d)})
}

function renderC(i){
c=(i+cards.length)%cards.length;
fc.classList.add('switching');
setTimeout(()=>{
let x=cards[c];
document.querySelector('#cardNumber').textContent=String(c+1).padStart(2,'0');
document.querySelector('#cardIcon').textContent=x[0];
document.querySelector('#cardTag').textContent=x[1];
document.querySelector('#cardTitle').textContent=x[2];
document.querySelector('#cardText').textContent=x[3];
[...dots.children].forEach((d,j)=>d.classList.toggle('active',j===c));
fc.classList.remove('switching');
},150);
}

document.querySelector('.prev').onclick=()=>renderC(c-1);
document.querySelector('.next').onclick=()=>renderC(c+1);

let touchStartX=0;let touchEndX=0;
fc.addEventListener('touchstart', e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
fc.addEventListener('touchend', e=>{
    touchEndX=e.changedTouches[0].screenX;
    let diff=touchEndX-touchStartX;
    if(Math.abs(diff)>50){if(diff>0)renderC(c-1);else renderC(c+1);}
},{passive:true});

document.querySelector('#restart').onclick=()=>{
q=0;
c=0;
renderQ();
dotsMake();
renderC(0);
go(document.querySelector('#stageHome'));
};

dotsMake();
renderQ();
renderC(0);

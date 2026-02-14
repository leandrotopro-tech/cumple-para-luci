const titulo=document.getElementById("titulo");
const mensaje=document.getElementById("mensaje");
const boton=document.getElementById("cambiarFormato");
const body=document.body;

const botonImagen=document.getElementById("botonImagen");
const subirImagen=document.getElementById("subirImagen");
const previewImagen=document.getElementById("previewImagen");

const carta=document.getElementById("carta");
const juego=document.getElementById("juego");
const areaJuego=document.getElementById("areaJuego");
const puntosTxt=document.getElementById("puntos");
const secreto=document.getElementById("secreto");

const canvas=document.getElementById("efectos");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let modoActual=0;
let puntos=0;

const modos=["modo1","modo2","modo3","modo4","modo5"];

const textos=[
{titulo:"🎉 ¡Feliz Cumple Mi Luci! 💕",mensaje:"Hoy celebramos TU cumpleaños, hoy es cuando cumples un año más aca en la tierra, y este pequeño detalle es lo minimo que te puedo hacer, espero lo disfrutes."},
{titulo:"🎂 Que todos tus sueños se hagan realidad ✨",mensaje:"Que cada vela que soples represente un deseo cumplido, que cada sueño se envuelva en un manto de realidad, donde puedas ser acompañada por todos tus seres queridos y aquellos que siempre te apoyaron en todo, así que empecemos con esto."},
{titulo:"💖 Un año más de magia en tu vida",mensaje:"¿Te acuerdas de esas fotos que te dije qué tanto me gustaban? Aquellas donde saliamos tú y yo, quiero ver que tan bien las conoces, subelas y muestramelas, escoge tres."},
{titulo:"🌸 Celebrando tu resplandor",mensaje:"Ahora sube tres fotos que te recuerden, tanto tu vida como de la actualidad, pueden ser fotos de ahora o de pequeña que te gusten, sé tu misma"},
{titulo:"🌙 Hoy es tu noche especial",mensaje:"Que este nuevo año dentro de tu vida sea mejor que los anteriores, porque siempre mejoras, pase lo que pase."}
];

function escribir(el, texto, vel = 35){
  el.textContent = "";

  if (el._timer) {
    clearTimeout(el._timer);
  }

  let i = 0;

  function t(){
    if (i < texto.length){
      el.textContent += texto[i++];
      el._timer = setTimeout(t, vel);
    }
  }

  t();
}

function actualizar(){
escribir(titulo,textos[modoActual].titulo);
escribir(mensaje,textos[modoActual].mensaje);

botonImagen.hidden=modoActual<2;
carta.hidden=modoActual!==3;
juego.hidden=modoActual!==4;
secreto.hidden=modoActual!==4;

previewImagen.style.display = modoActual >= 2 ? "block" : "none";
}

boton.onclick=()=>{
body.classList.remove(modos[modoActual]);
modoActual=(modoActual+1)%modos.length;
body.classList.add(modos[modoActual]);
actualizar();
};

botonImagen.onclick=()=>subirImagen.click();

subirImagen.onchange=e=>{
const f=e.target.files[0];
if(f){
const r=new FileReader();
r.onload=x=>{
previewImagen.src=x.target.result;
previewImagen.style.display="block";
};
r.readAsDataURL(f);
}
};

actualizar();

setInterval(()=>{
if(modoActual!==4)return;
const c=document.createElement("div");
c.className="corazon";
c.textContent="💖";
c.style.left=Math.random()*260+"px";
c.onclick=()=>{puntos++;puntosTxt.textContent=puntos;c.remove();}
areaJuego.appendChild(c);
setTimeout(()=>c.remove(),3000);
},800);

function verSecreto(){
const clave=document.getElementById("clave").value;
const txt=document.getElementById("mensajeSecreto");
if(clave==="17 años"){
txt.textContent="💖 Eres lo mejor que me ha pasado, gracias por ser esa chica maravillosa que eres💖";
}else{
txt.textContent="❌ Contraseña incorrecta";
}
}
window.verSecreto=verSecreto;

let nieve=[],fuegos=[],estrellas=[];
for(let i=0;i<120;i++)nieve.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3});
for(let i=0;i<80;i++)estrellas.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height});

function animar(){
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";
estrellas.forEach(s=>ctx.fillRect(s.x,s.y,1,1));

nieve.forEach(n=>{
ctx.beginPath();
ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
ctx.fill();
n.y+=0.6;
if(n.y>canvas.height)n.y=0;
});

if(modoActual===1&&Math.random()<0.05){
for(let i=0;i<40;i++){
fuegos.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height/2,dx:(Math.random()-0.5)*4,dy:(Math.random()-0.5)*4,l:40});
}
}
fuegos.forEach((f,i)=>{
ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;
ctx.fillRect(f.x,f.y,3,3);
f.x+=f.dx;f.y+=f.dy;f.l--;
if(f.l<=0)fuegos.splice(i,1);
});

requestAnimationFrame(animar);
}
animar();

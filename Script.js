// --- 1. ESTADO DEL JUEGO ---
const palabrasDisponibles = ["JAVASCRIPT", "PROGRAMACION", "DESARROLLADOR", "DOM", "ETIQUETA"];
let palabraSecreta = "";
let letrasIntentadas = []; 
let intentosMaximos = 6;   
let erroresActuales = 0;
let juegoTerminado = false; // Bandera para bloquear el teclado cuando termine el juego

function iniciarJuego() {
  const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
  palabraSecreta = palabrasDisponibles[indiceAleatorio];
  
  letrasIntentadas = [];
  erroresActuales = 0;
  juegoTerminado = false;
  
  actualizarTablero();
}

function actualizarTablero() {
  const contenedorPalabra = document.getElementById("palabra-container");
  let estadoPalabraHTML = "";
  let letrasFaltantes = 0;

  for (let i = 0; i < palabraSecreta.length; i++) {
    const letra = palabraSecreta[i];
    
    if (letrasIntentadas.includes(letra)) {
      estadoPalabraHTML += `<span class="letra-adivinada">${letra}</span> `;
    } else {
      estadoPalabraHTML += `<span class="guion">_ </span>`;
      letrasFaltantes++;
    }
  }

  contenedorPalabra.innerHTML = estadoPalabraHTML;
  actualizarMuneco();

  // Verificamos si ganó
  if (letrasFaltantes === 0 && palabraSecreta.length > 0 && !juegoTerminado) {
    juegoTerminado = true;
    setTimeout(() => alert("¡Felicidades, has ganado el juego!"), 100);
  }
}

function actualizarMuneco() {
  for (let i = 0; i < intentosMaximos; i++) {
    const parte = document.getElementById(`parte-${i}`);
    if (parte) {

      parte.classList.toggle("oculto", i >= erroresActuales);
    }
  }
}


document.addEventListener("keydown", (event) => {
  if (juegoTerminado) return;

  const letra = event.key.toUpperCase();

  const esUnaLetraValida = (letra >= "A" && letra <= "Z" || letra === "Ñ") && letra.length === 1;

  if (esUnaLetraValida) {
    if (!letrasIntentadas.includes(letra)) {
      letrasIntentadas.push(letra);
      
      if (!palabraSecreta.includes(letra)) {
        erroresActuales++;


        if (erroresActuales >= intentosMaximos) {
          juegoTerminado = true;
          actualizarTablero();
          setTimeout(() => alert(`Te has quedado sin intentos. La palabra era: ${palabraSecreta}`), 100);
          return;
        }
      }

      actualizarTablero();
    }
  }
});


if (btnReiniciar) {
  btnReiniciar.addEventListener("click", iniciarJuego);
}


iniciarJuego();
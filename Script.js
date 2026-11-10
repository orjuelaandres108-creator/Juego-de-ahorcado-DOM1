// --- 1. ESTADO DEL JUEGO ---
const palabrasDisponibles = ["MANZANA", "PERA", "BANANO", "NARANJA", "FRESA", "MANGO", "CEREZA", "UVA", "PIÑA", "COCO"];
let palabraSecreta = "";
let letrasIntentadas = []; 
let intentosMaximos = 6;   
let erroresActuales = 0;
let juegoTerminado = false; // Bandera para bloquear el teclado cuando termine el juego

// --- 2. FUNCIONES DE LÓGICA Y DOM ---
function iniciarJuego() {
  const indiceAleatorio = Math.floor(Math.random() * palabrasDisponibles.length);
  palabraSecreta = palabrasDisponibles[indiceAleatorio];
  letrasIntentadas = [];
  erroresActuales = 0;
  juegoTerminado = false;
  console.log("Palabra secreta seleccionada:", palabraSecreta); 
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
      letrasFaltantes++; // Contamos cuántas letras faltan por descubrir
    }
  }

  contenedorPalabra.innerHTML = estadoPalabraHTML;
  actualizarMuneco();

  // Verificamos si ganó (si no quedan letras ocultas y el juego no ha terminado)
  if (letrasFaltantes === 0 && palabraSecreta.length > 0 && !juegoTerminado) {
    juegoTerminado = true;
    alert("¡Felicidades, has ganado el juego!!");
  }
}

function actualizarMuneco() {
  for (let i = 0; i < intentosMaximos; i++) {
    const parte = document.getElementById(`parte-${i}`);
    // Se muestra si el número de errores ya llegó a esa parte
    parte.classList.toggle("oculto", i >= erroresActuales);
  }
}

// --- 3. CAPTURAR LA TECLA DEL USUARIO ---
document.addEventListener("keydown", (event) => {
  // Si el juego ya terminó, ignoramos las teclas
  if (juegoTerminado) return;

  const letra = event.key.toUpperCase();
  const esUnaLetraValida = letra >= "A" && letra <= "Z" && letra.length === 1;

  if (esUnaLetraValida) {
    if (!letrasIntentadas.includes(letra)) {
      letrasIntentadas.push(letra);

      if (palabraSecreta.includes(letra)) {
        console.log(`¡Bien! La letra ${letra} es correcta.`);
      } else {
        erroresActuales++;
        console.log(`Fallaste. Errores: ${erroresActuales} de ${intentosMaximos}`);

        // Verificamos si perdió
        if (erroresActuales >= intentosMaximos) {
          juegoTerminado = true;
          alert(`Te has quedado sin intentos. La palabra era: ${palabraSecreta}`);
        }
      }
      actualizarTablero();
    } else {
      console.log(`Ya habías intentado la letra ${letra}. ¡Prueba con otra!`);
    }
  }
});

// --- 4. BOTÓN DE REINICIO ---
document.getElementById("btn-reiniciar").addEventListener("click", () => {
  iniciarJuego();
});

// Iniciamos el juego al cargar
iniciarJuego();
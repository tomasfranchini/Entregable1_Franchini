// Palabras disponibles
const palabras = [
    { palabra: 'gato', dificultad: 'fácil' },
    { palabra: 'bicicleta', dificultad: 'intermedio' },
    { palabra: 'extraterrestre', dificultad: 'difícil' },
    { palabra: 'pelota', dificultad: 'fácil' },
    { palabra: 'hipopotamo', dificultad: 'difícil' }
];

let palabraSeleccionada = '';
let letrasCorrectas = [];
let letrasIncorrectas = [];
let intentosRestantes = 6;

const palabraDiv = document.getElementById('palabra');
const ahorcadoDiv = document.getElementById('ahorcado-dibujo');
const resultadoDiv = document.getElementById('resultado');

// Escoger palabra aleatoria
function escogerPalabra() {
    const indice = Math.floor(Math.random() * palabras.length);
    palabraSeleccionada = palabras[indice].palabra;
    console.log(`Palabra seleccionada: ${palabraSeleccionada} (Dificultad: ${palabras[indice].dificultad})`);
    mostrarGuiones();
}

// Mostrar guiones de la palabra
function mostrarGuiones() {
    palabraDiv.innerHTML = '';
    for (let letra of palabraSeleccionada) {
        if (letrasCorrectas.includes(letra)) {
            palabraDiv.innerHTML += letra.toUpperCase() + ' ';
        } else {
            palabraDiv.innerHTML += '_ ';
        }
    }
}

// Verificar letra ingresada
function verificarLetra(letra) {
    if (palabraSeleccionada.includes(letra.toLowerCase())) {
        letrasCorrectas.push(letra.toLowerCase());
        console.log(`Letra correcta: ${letra}`);
    } else {
        letrasIncorrectas.push(letra.toLowerCase());
        intentosRestantes--;
        console.log(`Letra incorrecta: ${letra}`);
    }
    verificarFinJuego();
    mostrarGuiones();
    dibujarAhorcado();
}

// Dibujar el estado del ahorcado
function dibujarAhorcado() {
    ahorcadoDiv.innerHTML = `Intentos restantes: ${intentosRestantes}`;
}

// Verificar si se ha ganado o perdido
function verificarFinJuego() {
    if (intentosRestantes === 0) {
        alert(`¡Perdiste! La palabra era: ${palabraSeleccionada.toUpperCase()}`);
        if (confirm("¿Quieres jugar de nuevo?")) {
            reiniciarJuego();
        }
    } else if (!palabraDiv.textContent.includes('_')) {
        alert('¡Ganaste! Adivinaste la palabra.');
        if (confirm("¿Quieres jugar de nuevo?")) {
            reiniciarJuego();
        }
    }
}

// Solicitar letra al usuario mediante prompt
function solicitarLetra() {
    if (intentosRestantes > 0 && palabraDiv.textContent.includes('_')) {
        const letra = prompt('Ingresa una letra:').toUpperCase();
        if (letra && letra.length === 1 && /^[A-Z]$/.test(letra)) {
            verificarLetra(letra);
        } else {
            alert('Por favor, ingresa una sola letra válida.');
        }
    }
}

// Reiniciar el juego
function reiniciarJuego() {
    palabraSeleccionada = '';
    letrasCorrectas = [];
    letrasIncorrectas = [];
    intentosRestantes = 6;
    resultadoDiv.textContent = '';
    ahorcadoDiv.textContent = '';
    escogerPalabra();
    mostrarGuiones();
    dibujarAhorcado();
}

// Iniciar juego
escogerPalabra();
dibujarAhorcado();

// Solicitar letras repetidamente hasta que el juego termine
(function cicloDeJuego() {
    setInterval(() => {
        solicitarLetra();
    }, 1000);
})();

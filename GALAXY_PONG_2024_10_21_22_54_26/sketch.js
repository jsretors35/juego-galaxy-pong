let anchoCanvas = 800;
let altoCanvas = 400;

let jugadorX = 15;
let jugadorY;
let anchoRaqueta = 10;
let altoRaqueta = 100;

let computadoraX = anchoCanvas - 25;
let computadoraY;

let pelotaX, pelotaY;
let diametroPelota = 20;
let velocidadPelotaX = 5;
let velocidadPelotaY = 5;
let anguloPelota = 0;

let grosorMarco = 10;

let jugadorScore = 0;
let computadoraScore = 0;

let fondo;
let barraJugador;
let barraComputadora;
let bola;
let sonidoRebote;
let sonidoGol;

let juegoIniciado = false;
let juegoTerminado = false; // Variable para verificar si el juego ha terminado
let botonInicio;
let botonReiniciar; // Botón para reiniciar el juego
let mensajePreparar; // Mensaje para mostrar "¡Prepárate!"

function preload() {
    fondo = loadImage('fondo1.png');
    barraJugador = loadImage('barra1.png');
    barraComputadora = loadImage('barra2.png');
    bola = loadImage('bola.png');
    sonidoRebote = loadSound('bounce.wav');
    sonidoGol = loadSound('jingle_win_synth_02.wav');
}

function setup() {
    createCanvas(anchoCanvas, altoCanvas);
    jugadorY = height / 2 - altoRaqueta / 2;
    computadoraY = height / 2 - altoRaqueta / 2;
    resetPelota();
    
    // Crear el botón de reinicio y ocultarlo al inicio
    crearBotonReiniciar();

    // Crear el botón de inicio con efectos
    crearBotonInicio();
}

function draw() {
    if (!juegoIniciado) {
        mostrarPantallaInicio();
    } else if (juegoTerminado) {
        if (jugadorScore >= 20) {
            mostrarPantallaYouWin();
        } else {
            mostrarPantallaGameOver();
        }
    } else {
        background(fondo);
        dibujarMarcos();
        dibujarRaquetas();
        dibujarPelota();
        mostrarPuntaje();
        moverPelota();
        moverComputadora();
        verificarColisiones();
        moverJugadorConMouse(); // Mover la barra del jugador con el mouse
    }
}

function moverJugadorConMouse() {
    jugadorY = mouseY - altoRaqueta / 2; // Actualiza la posición Y del jugador según la posición del mouse
    jugadorY = constrain(jugadorY, grosorMarco, height - grosorMarco - altoRaqueta); // Limitar movimiento
}

function mostrarPantallaInicio() {
    background(fondo);
    textSize(70);
    textStyle(ITALIC);
    fill('gold');
    textAlign(CENTER, CENTER);
    text('Galaxy Pong', width / 2, height / 3); // Título del juego
    botonInicio.show();
}

function mostrarPantallaGameOver() {
    background(fondo);
    textAlign(CENTER, CENTER);
    
    // Mensaje de fin de juego
    fill('red'); // Color del texto rojo
    textSize(80); // Tamaño de letra más grande
    textStyle(ITALIC); // Estilo de la letra en cursiva
    text('Game Over', width / 2, height / 4); // Mensaje si el computador gana
    
    // Mostrar puntaje final
    fill(255, 215, 0); // Color dorado para el puntaje
    textSize(32); // Tamaño de letra para el puntaje final
    text('Puntaje Final:', width / 2, height / 2 - 50);
    textSize(28);
    text(jugadorScore + ' a ' + computadoraScore, width / 2, height / 2); // Mostrar el puntaje final

    // Botón de reinicio
    botonReiniciar.position(width / 2 - 150, height / 2 + 40); // Centrar el botón
    botonReiniciar.show(); // Mostrar el botón de reinicio
}

function mostrarPantallaYouWin() {
    background(fondo);
    textAlign(CENTER, CENTER);
    
    // Mensaje de victoria
    fill(255, 215, 0); // Color dorado
    textSize(80); // Tamaño más grande para "You Win!"
    textStyle(ITALIC); // Estilo de la letra en cursiva
    text('You Win!', width / 2, height / 4); // Mensaje si el jugador gana
    
    // Mostrar puntaje final
    textSize(32); // Tamaño de letra para el puntaje final
    fill(255, 215, 0); // Color dorado
    text('Puntaje Final:', width / 2, height / 2 - 50);
    textSize(28);
    text(jugadorScore + ' a ' + computadoraScore, width / 2, height / 2); // Mostrar el puntaje final

    // Botón de reinicio
    botonReiniciar.position(width / 2 - 150, height / 2 + 40); // Centrar el botón
    botonReiniciar.show(); // Mostrar el botón de reinicio
}

function iniciarJuego() {
    juegoIniciado = true;
    juegoTerminado = false; // Reiniciar estado de juego terminado
    botonInicio.hide();
    botonReiniciar.hide(); // Ocultar el botón de reinicio al iniciar el juego
}

function mostrarMensajePreparar() {
    botonInicio.hide(); // Ocultar el botón de inicio
    mensajePreparar = createDiv('¡Prepárate!');
    mensajePreparar.position(width / 2 - 100, height / 2); // Centrar el mensaje
    mensajePreparar.style('font-size', '50px'); // Tamaño de letra
    mensajePreparar.style('color', 'gold'); // Color dorado
    mensajePreparar.style('font-style', 'italic'); // Estilo de letra en cursiva
    setTimeout(() => {
        mensajePreparar.remove(); // Eliminar mensaje después de 2 segundos
        iniciarJuego(); // Iniciar el juego
    }, 2000);
}

function volverInicio() {
    jugadorScore = 0;
    computadoraScore = 0;
    juegoIniciado = false;
    juegoTerminado = false;
    botonReiniciar.hide();
    resetPelota();
}

function crearBotonInicio() {
    botonInicio = createButton('INICIA EL JUEGO');
    botonInicio.position(width / 2 - 150, height / 2 + 50);
    configurarBoton(botonInicio); // Aplicar el mismo diseño
    botonInicio.mousePressed(mostrarMensajePreparar);
}

function crearBotonReiniciar() {
    botonReiniciar = createButton('Volver al Inicio');
    botonReiniciar.position(width / 2 - 150, height / 2 + 80);
    configurarBoton(botonReiniciar); // Aplicar el mismo diseño que el botón de inicio
    botonReiniciar.mousePressed(volverInicio); // Función para reiniciar el juego
    botonReiniciar.hide(); // Ocultar botón de reinicio al inicio
}

function configurarBoton(boton) {
    boton.style('padding', '20px 50px');
    boton.style('font-size', '20px');
    boton.style('font-weight', 'bold');
    boton.style('color', '#fff');
    boton.style('border', '2px solid #2B3FD6');
    boton.style('background-color', 'transparent');
    boton.style('border-radius', '50px');
    boton.style('cursor', 'pointer');
    boton.style('position', 'absolute'); // Posición absoluta para centrar
}

function dibujarMarcos() {
    fill(color("#2B3FD6"));
    rect(0, 0, width, grosorMarco); // Marco superior
    rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior
}

function dibujarRaquetas() {
    image(barraJugador, jugadorX, jugadorY, anchoRaqueta, altoRaqueta);
    image(barraComputadora, computadoraX, computadoraY, anchoRaqueta, altoRaqueta);
}

function dibujarPelota() {
    push();
    translate(pelotaX, pelotaY);
    rotate(anguloPelota);
    imageMode(CENTER);
    image(bola, 0, 0, diametroPelota, diametroPelota);
    pop();
}

function mostrarPuntaje() {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill('gold'); // Color dorado para el puntaje
    text('Jugador: ' + jugadorScore, 80, 30);
    text('Computadora: ' + computadoraScore, width - 150, 30);
}

function moverPelota() {
    pelotaX += velocidadPelotaX;
    pelotaY += velocidadPelotaY;

    let velocidadTotal = sqrt(velocidadPelotaX * velocidadPelotaX + velocidadPelotaY * velocidadPelotaY);
    anguloPelota += map(velocidadTotal, 0, 10, -0.1, 0.1); // Aumentar la velocidad de rotación

    if (pelotaY < 0 || pelotaY > height) {
        velocidadPelotaY *= -1; // Cambiar dirección vertical
    }
}

function moverComputadora() {
    if (pelotaY < computadoraY + altoRaqueta / 2) {
        computadoraY -= 6; // Movimiento de la computadora hacia arriba
    } else if (pelotaY > computadoraY + altoRaqueta / 2) {
        computadoraY += 6; // Movimiento de la computadora hacia abajo
    }

    // Limitar el movimiento de la computadora
    computadoraY = constrain(computadoraY, grosorMarco, height - altoRaqueta - grosorMarco);
}

function verificarColisiones() {
    if (pelotaX - diametroPelota / 2 < jugadorX + anchoRaqueta &&
        pelotaY > jugadorY && pelotaY < jugadorY + altoRaqueta) {
        velocidadPelotaX *= -1;
        aumentarVelocidad(); // Aumentar velocidad en cada colisión
        sonidoRebote.play();
    } else if (pelotaX + diametroPelota / 2 > computadoraX &&
        pelotaY > computadoraY && pelotaY < computadoraY + altoRaqueta) {
        velocidadPelotaX *= -1;
        aumentarVelocidad(); // Aumentar velocidad en cada colisión
        sonidoRebote.play();
    }

    // Verificación de puntuación
    if (pelotaX < 0) {
        computadoraScore++;
        sonidoGol.play();
        narrarMarcador();
        verificarFinJuego();
        resetPelota();
    } else if (pelotaX > width) {
        jugadorScore++;
        sonidoGol.play();
        narrarMarcador();
        verificarFinJuego();
        resetPelota();
    }
}

// Nueva función para aumentar la velocidad de la pelota
function aumentarVelocidad() {
    velocidadPelotaX *= 1.1; // Aumentar en un 10%
    velocidadPelotaY *= 1.1; // Aumentar en un 10%
}

function narrarMarcador() {
    let narrador = new SpeechSynthesisUtterance(`El marcador es ${jugadorScore} a ${computadoraScore}`);
    window.speechSynthesis.speak(narrador);
}

function resetPelota() {
    pelotaX = width / 2;
    pelotaY = height / 2;
    velocidadPelotaX = 5 * (Math.random() > 0.5 ? 1 : -1);
    velocidadPelotaY = 5 * (Math.random() > 0.5 ? 1 : -1);
    anguloPelota = 0;
}

function verificarFinJuego() {
    if (jugadorScore >= 20) {
        juegoTerminado = true; // Marcar que el juego ha terminado
        mostrarPantallaYouWin(); // Mostrar pantalla de victoria
    } else if (computadoraScore >= 20) {
        juegoTerminado = true; // Marcar que el juego ha terminado
        mostrarPantallaGameOver(); // Mostrar pantalla de game over
    }
}


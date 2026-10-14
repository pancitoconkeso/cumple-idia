
/* ===================================
   1. ELEMENTOS DE LA PÁGINA
=================================== */

const entrada = document.getElementById("entrada");
const contenido = document.getElementById("contenido");

const botonEntrar = document.getElementById("boton-entrar");
const botonCarta = document.getElementById("boton-carta");
const cartaSecreta = document.getElementById("carta-secreta");

const botonMusica = document.getElementById("boton-musica");
const musica = document.getElementById("musica-fondo");

const efectos = document.getElementById("efectos");


/* ===================================
   2. ABRIR EL REGALO
=================================== */

botonEntrar.addEventListener("click", () => {
    entrada.classList.add("oculto");
    contenido.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    crearLluvia(24);

    // Intentar activar la música después del clic.
    reproducirMusica();
});


/* ===================================
   3. ABRIR Y CERRAR LA CARTA
=================================== */

botonCarta.addEventListener("click", () => {
    const estaOculta = cartaSecreta.classList.contains("oculto");

    if (estaOculta) {
        cartaSecreta.classList.remove("oculto");
        botonCarta.querySelector("span:nth-child(2)")
            .textContent = "Cerrar carta";

        crearLluvia(16);

        cartaSecreta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        cartaSecreta.classList.add("oculto");
        botonCarta.querySelector("span:nth-child(2)")
            .textContent = "Abrir carta secreta";
    }
});


/* ===================================
   4. MÚSICA DE FONDO
=================================== */

async function reproducirMusica() {
    try {
        await musica.play();

        botonMusica.textContent = "♫ Pausar música";
        botonMusica.setAttribute("aria-pressed", "true");
    } catch (error) {
        botonMusica.textContent = "♫ Activar música";
        botonMusica.setAttribute("aria-pressed", "false");
    }
}

botonMusica.addEventListener("click", async () => {
    if (musica.paused) {
        await reproducirMusica();
    } else {
        musica.pause();

        botonMusica.textContent = "♫ Activar música";
        botonMusica.setAttribute("aria-pressed", "false");
    }
});


/* ===================================
   5. CORAZONES Y ESTRELLAS
=================================== */

function crearParticula(x, y) {
    const particula = document.createElement("span");

    const simbolos = ["♡", "✦", "✧", "♥", "⋆"];
    const colores = ["#65d8ff", "#bceaff", "#398bff", "#ffb4de"];

    particula.className = "particula";
    particula.textContent =
        simbolos[Math.floor(Math.random() * simbolos.length)];

    particula.style.color =
        colores[Math.floor(Math.random() * colores.length)];

    particula.style.left = `${x}px`;
    particula.style.top = `${y}px`;

    particula.style.fontSize =
        `${14 + Math.random() * 18}px`;

    efectos.appendChild(particula);

    // Eliminar el elemento cuando termina la animación.
    particula.addEventListener("animationend", () => {
        particula.remove();
    }, { once: true });
}


/* ===================================
   6. LLUVIA DE DESTELLOS
=================================== */

function crearLluvia(cantidad) {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    for (let i = 0; i < cantidad; i++) {
        const x = Math.random() * ancho;
        const y = Math.random() * alto;

        crearParticula(x, y);
    }
}


/* ===================================
   7. DESTELLOS AL HACER CLIC
=================================== */

document.addEventListener("click", (evento) => {
    // Evitar que un clic genere demasiados elementos.
    if (evento.target.closest("button")) {
        return;
    }

    crearParticula(evento.clientX, evento.clientY);
});

/* =========================================
   BIRTHDAY EVENT: IDIA SHROUD
   Nuevas funciones para añadir al final
   de script.js
========================================= */

/* 1. MENSAJES DE IDIA */

const panelMensajeIdia = document.getElementById("mensaje-idia");
const textoMensajeIdia = document.getElementById("texto-mensaje-idia");
const cerrarMensajeIdia = document.getElementById("cerrar-mensaje-idia");

const botonEventoFinal = document.getElementById("boton-evento-final");
const eventoFinal = document.getElementById("evento-final");
const cerrarEventoFinal = document.getElementById("cerrar-evento-final");
const progresoEvento = document.getElementById("progreso-evento");

let temporizadorMensaje;
let mensajeActual = 0;

const mensajesIdia = [
    "E-eh... ¿ya llegaste? Bueno, ya que estás aquí, supongo que debería iniciar el evento. 💀",

    "No es por presumir, pero esta interfaz tiene efectos bastante buenos... No preguntes cuánto tardé. 🔥",

    "¿Encontraste la carta? Genial. O sea... era parte del plan. Obviamente.",

    "Parece que estás explorando todos los archivos. GG, jugadora. Vas bastante bien. ♡",

    "Último aviso del sistema: hay una sorpresa esperando al final. No la ignores, ¿ok?"
];

function mostrarMensajeIdia(mensaje) {
    if (!panelMensajeIdia || !textoMensajeIdia) return;

    clearTimeout(temporizadorMensaje);

    textoMensajeIdia.textContent = mensaje;
    panelMensajeIdia.classList.remove("oculto");

    temporizadorMensaje = setTimeout(() => {
        panelMensajeIdia.classList.add("oculto");
    }, 6500);
}

if (cerrarMensajeIdia) {
    cerrarMensajeIdia.addEventListener("click", () => {
        clearTimeout(temporizadorMensaje);
        panelMensajeIdia.classList.add("oculto");
    });
}


/* 2. PROGRESO DEL EVENTO */

const progresoCumple = {
    entrada: false,
    carta: false,
    exploracion: 0,
    finalDesbloqueado: false
};

function actualizarProgreso() {
    const total =
        (progresoCumple.entrada ? 1 : 0) +
        (progresoCumple.carta ? 1 : 0) +
        Math.min(progresoCumple.exploracion, 3);

    const porcentaje = Math.round((total / 5) * 100);

    if (progresoEvento) {
        progresoEvento.textContent =
            `Progreso del evento: ${porcentaje}% · ` +
            `${total}/5 objetivos completados`;
    }

    if (
        progresoCumple.entrada &&
        progresoCumple.carta &&
        progresoCumple.exploracion >= 3
    ) {
        desbloquearEventoFinal();
    }
}

function registrarExploracion() {
    if (progresoCumple.finalDesbloqueado) return;

    progresoCumple.exploracion = Math.min(
        progresoCumple.exploracion + 1,
        3
    );

    actualizarProgreso();
}

function desbloquearEventoFinal() {
    if (progresoCumple.finalDesbloqueado) return;

    progresoCumple.finalDesbloqueado = true;

    if (botonEventoFinal) {
        botonEventoFinal.disabled = false;
        botonEventoFinal.textContent = "✧ Abrir sorpresa final ✧";
    }

    if (progresoEvento) {
        progresoEvento.textContent =
            "¡Evento completado! Tu sorpresa ya está disponible. ♡";
    }

    mostrarMensajeIdia(
        "¡Misión completada! Bueno... sabía que lo conseguirías. " +
        "Tu recompensa está desbloqueada. No te emociones demasiado. 💙"
    );

    crearLluvia(35);

    const recompensa = document.querySelector(".recompensa");

    if (recompensa) {
        recompensa.classList.add("recompensa-desbloqueada");
    }
}


/* 3. INTEGRACIÓN CON LA ENTRADA EXISTENTE */

if (botonEntrar) {
    botonEntrar.addEventListener("click", () => {
        if (!progresoCumple.entrada) {
            progresoCumple.entrada = true;

            mostrarMensajeIdia(mensajesIdia[0]);
            crearLlamas(12);
            actualizarProgreso();
        }
    });
}


/* 4. EFECTO DE ESCRITURA EN LA CARTA */

let ejecucionEscritura = 0;

async function escribirCarta() {
    if (!cartaSecreta) return;

    const ejecucion = ++ejecucionEscritura;

    const parrafos = Array.from(
    cartaSecreta.querySelectorAll("p.texto-animado")
);

    for (const parrafo of parrafos) {
        if (!parrafo.dataset.textoOriginal) {
            parrafo.dataset.textoOriginal = parrafo.textContent;
        }

        const texto = parrafo.dataset.textoOriginal;

        parrafo.textContent = "";
        parrafo.classList.add("escribiendo");

        for (const caracter of texto) {
            if (
                ejecucion !== ejecucionEscritura ||
                cartaSecreta.classList.contains("oculto")
            ) {
                parrafo.classList.remove("escribiendo");
                return;
            }

            parrafo.textContent += caracter;

            await new Promise(resolve => setTimeout(resolve, 18));
        }

        parrafo.classList.remove("escribiendo");

        await new Promise(resolve => setTimeout(resolve, 180));
    }
}


/* Añadimos el efecto a la carta que ya tienes */

if (botonCarta) {
    botonCarta.addEventListener("click", () => {
        if (!cartaSecreta) return;

        const estaAbierta = !cartaSecreta.classList.contains("oculto");

        if (estaAbierta) {
            cartaSecreta.classList.remove("carta-revelada");
            void cartaSecreta.offsetWidth;
            cartaSecreta.classList.add("carta-revelada");

            progresoCumple.carta = true;
            actualizarProgreso();

            mostrarMensajeIdia(mensajesIdia[2]);
            crearLlamas(10);

            escribirCarta();
        } else {
            // Invalida cualquier escritura que estuviera en curso.
            ejecucionEscritura++;
        }
    });
}


/* 5. LLAMAS AZULES */

function crearLlamas(cantidad = 8) {
    if (!efectos) return;

    const simbolos = ["♨", "✦", "✧", "⋆"];

    for (let i = 0; i < cantidad; i++) {
        const llama = document.createElement("span");

        llama.className = "particula-llama";
        llama.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        llama.style.left = `${Math.random() * window.innerWidth}px`;
        llama.style.top = `${window.innerHeight * (0.4 + Math.random() * 0.5)}px`;

        efectos.appendChild(llama);

        llama.addEventListener("animationend", () => {
            llama.remove();
        }, { once: true });
    }
}


/* 6. EFECTOS AL INTERACTUAR */

document.addEventListener("click", (evento) => {
    const objetivo = evento.target;

    if (!(objetivo instanceof Element)) return;

    // No contar clics en los controles de la misión
    // como parte de la exploración.
    if (
        objetivo.closest(
            "#boton-evento-final, #cerrar-evento-final, " +
            "#boton-entrar, #boton-carta, #boton-musica, " +
            "#cerrar-mensaje-idia"
        )
    ) {
        return;
    }

    // Los clics en botones no suman exploración,
    // excepto los controles de navegación.
    if (
        objetivo.closest("button") &&
        !objetivo.closest(".menu a")
    ) {
        return;
    }

    if (contenido && !contenido.classList.contains("oculto")) {
        registrarExploracion();
        crearParticula(evento.clientX, evento.clientY);

        if (Math.random() > 0.65) {
            crearLlamas(2);
        }
    }
});


/* 7. MENSAJE AL LLEGAR AL FINAL DE LA CARTA */

if (cartaSecreta) {
    cartaSecreta.addEventListener("animationend", () => {
        // El evento queda disponible para futuras animaciones.
    });
}


/* 8. ABRIR Y CERRAR LA SORPRESA FINAL */

if (botonEventoFinal && eventoFinal) {
    botonEventoFinal.addEventListener("click", () => {
        if (!progresoCumple.finalDesbloqueado) return;

        eventoFinal.classList.remove("oculto");
        crearLluvia(45);
        crearLlamas(20);

        mostrarMensajeIdia(
            "GG. Evento completado. Feliz cumpleaños, player. ♡"
        );
    });
}

if (cerrarEventoFinal && eventoFinal) {
    cerrarEventoFinal.addEventListener("click", () => {
        eventoFinal.classList.add("oculto");
    });
}


/* 9. MENSAJE SI EL VIDEO TERMINA */

const videoRecuerdos = document.querySelector("#video video");

if (videoRecuerdos) {
    videoRecuerdos.addEventListener("ended", () => {
        mostrarMensajeIdia(
            "¿Ya terminó el video? ...Okay, admito que quedó bastante bonito. 💙"
        );

        crearLluvia(20);
    });
}

/* =========================================
   MINI IDIA INTERACTIVO 💙🔥
========================================= */

const miniIdia = document.getElementById("mini-idia-widget");
const botonMiniIdia = document.getElementById("mini-idia-boton");
const dialogoMiniIdia = document.getElementById("mini-idia-dialogo");

const frasesMiniIdia = [
    "¿Eh? ¿Me estabas mirando? ...Qué raro. 💀",
    "No es que quisiera hablar contigo ni nada... pero feliz cumpleaños. 💙",
    "He desbloqueado un logro: conocerte. Supongo que es un buen drop. ✨",
    "P-por cierto... espero que hoy te consientan muchísimo. ♡",
    "¿Quieres otro diálogo? Bueno... pulsa otra vez, supongo.",
    "Este evento tiene demasiados efectos especiales... aprobado. 🔥",
    "No pienso admitir que preparé todo esto con cariño. ...Ups.",
    "¡Feliz cumpleaños, mi yuyu! Que tengas un día legendario. 🎮",
    "Tu amistad es una recompensa de rareza SSR. No acepto discusiones. 💎",
    "¿Guardaste tu partida? Hoy toca crear recuerdos nuevos. ✦"
];

let ultimaFraseMiniIdia = -1;
let temporizadorDialogoMiniIdia;

function activarMiniIdia() {
    if (!miniIdia) return;

    // El mini personaje aparece cuando se abre la página.
    miniIdia.classList.remove("oculto");

    // Su primer mensaje aparece un poquito después.
    clearTimeout(temporizadorDialogoMiniIdia);

    temporizadorDialogoMiniIdia = setTimeout(() => {
        mostrarDialogoMiniIdia(
            "E-eh... ¿ya llegaste? Bienvenida al evento, Yuki. 💙"
        );
    }, 1400);
}

function mostrarDialogoMiniIdia(frase) {
    if (!dialogoMiniIdia) return;

    dialogoMiniIdia.textContent = frase;

    // Reinicia la animación del cuadro de diálogo.
    dialogoMiniIdia.style.animation = "none";
    void dialogoMiniIdia.offsetWidth;
    dialogoMiniIdia.style.animation = "";

    clearTimeout(temporizadorDialogoMiniIdia);

    temporizadorDialogoMiniIdia = setTimeout(() => {
        if (dialogoMiniIdia) {
            dialogoMiniIdia.textContent = "";
        }
    }, 6500);
}

function reaccionarMiniIdia() {
    if (!miniIdia) return;

    // Elegir una frase sin repetir la anterior.
    let nuevaFrase;

    do {
        nuevaFrase = Math.floor(Math.random() * frasesMiniIdia.length);
    } while (
        frasesMiniIdia.length > 1 &&
        nuevaFrase === ultimaFraseMiniIdia
    );

    ultimaFraseMiniIdia = nuevaFrase;

    mostrarDialogoMiniIdia(frasesMiniIdia[nuevaFrase]);

    // Animación de reacción.
    miniIdia.classList.remove("idia-reaccion");
    void miniIdia.offsetWidth;
    miniIdia.classList.add("idia-reaccion");

    setTimeout(() => {
        miniIdia.classList.remove("idia-reaccion");
    }, 500);

    // Chispas alrededor del personaje.
    crearChispasMiniIdia(12);
}

function crearChispasMiniIdia(cantidad = 8) {
    if (!miniIdia) return;

    const boton = miniIdia.querySelector(".mini-idia-boton");
    const rect = boton.getBoundingClientRect();

    const simbolos = ["✦", "✧", "♡", "⋆", "❋"];
    const colores = ["#65d8ff", "#bceaff", "#398bff", "#ffffff"];

    for (let i = 0; i < cantidad; i++) {
        const chispa = document.createElement("span");

        chispa.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        chispa.style.position = "fixed";
        chispa.style.left = `${rect.left + Math.random() * rect.width}px`;
        chispa.style.top = `${rect.top + Math.random() * rect.height}px`;
        chispa.style.color =
            colores[Math.floor(Math.random() * colores.length)];
        chispa.style.fontSize = `${12 + Math.random() * 16}px`;
        chispa.style.pointerEvents = "none";
        chispa.style.zIndex = "9999";
        chispa.style.textShadow = "0 0 12px #65d8ff";
        chispa.style.animation = "mini-idia-chispa-vuela 900ms ease-out forwards";

        document.body.appendChild(chispa);

        chispa.addEventListener("animationend", () => {
            chispa.remove();
        }, { once: true });
    }
}

// Evita repetir los eventos si el código se ejecuta por error más de una vez.
if (botonMiniIdia && !botonMiniIdia.dataset.activado) {
    botonMiniIdia.dataset.activado = "true";

    botonMiniIdia.addEventListener("click", reaccionarMiniIdia);
}

// Activación al pulsar el botón de entrada de tu página.
if (botonEntrar && miniIdia && !botonEntrar.dataset.miniIdiaConectado) {
    botonEntrar.dataset.miniIdiaConectado = "true";
    botonEntrar.addEventListener("click", activarMiniIdia);
}

// Chispas que se alejan del personaje.
const estiloChispasMiniIdia = document.createElement("style");

estiloChispasMiniIdia.textContent = `
@keyframes mini-idia-chispa-vuela {
    0% {
        opacity: 1;
        transform: translate(0, 0) scale(0.7) rotate(0deg);
    }
    100% {
        opacity: 0;
        transform:
            translate(
                ${Math.random() > 0.5 ? "" : "-"}45px,
                -75px
            )
            scale(1.5)
            rotate(160deg);
    }
}`;

document.head.appendChild(estiloChispasMiniIdia);

/* ✦ OTOME DE IDIA: INICIO DE LA HISTORIA ✦ */

const botonOtome = document.getElementById("otome-iniciar");

if (botonOtome) {
    botonOtome.addEventListener("click", function () {
        const ventana = document.querySelector(".otome-ventana");

        ventana.innerHTML = `
            <p class="otome-narracion">
                ✦ QUEST 001: THE BIRTHDAY INVITATION ✦
            </p>

            <p class="otome-dialogo">
                Idia parece arrepentirse de haberte invitado
                justo después de hacerlo. Sus llamas azules
                cambian de color mientras evita mirarte.
                <br><br>
                «O-sea... no tienes que aceptar si tienes
                mejores cosas que hacer. Pero... me haría
                feliz que te quedaras conmigo hoy.»
            </p>

            <p class="otome-personaje">
                — Idia Shroud ♡
            </p>

            <p class="otome-narracion">
                ¿Cómo quieres pasar tu cumpleaños?
            </p>

            <div class="otome-opciones">
                <button class="otome-boton opcion-otome"
                    data-ruta="juegos">
                    🎮 Jugar videojuegos en su habitación
                </button>

                <button class="otome-boton opcion-otome"
                    data-ruta="estrellas">
                    🌌 Salir a mirar las estrellas
                </button>

                <button class="otome-boton opcion-otome"
                    data-ruta="regalo">
                    🎁 Entregarle tu regalo secreto
                </button>
            </div>
        `;

        botonOtome.style.display = "none";

        document.querySelector(".otome-pie").textContent =
            "SAVE DATA: 001 · CHOOSE YOUR ROUTE";
    });
}

/* ✦ RUTAS DEL OTOME DE IDIA ✦ */

document.addEventListener("click", function (event) {
    const opcion = event.target.closest(".opcion-otome");

    if (!opcion) return;

    const ventana = document.querySelector(".otome-ventana");
    if (!ventana) return;

    const ruta = opcion.dataset.ruta;

    const historias = {
        juegos: {
            titulo: "✦ ROUTE 01: PLAYER TWO ✦",
            texto: `La habitación de Idia está iluminada por las
            pantallas de sus videojuegos. Hay dos controles
            preparados sobre el escritorio.

            «E-este... te guardé el que funciona mejor.
            No es que haya estado esperando este momento
            toda la semana ni nada...»

            Idia se sienta a tu lado y te ofrece el control.
            Sus llamas azules brillan un poquito más.`,
            pregunta: "¿Qué le dices?",
            opciones: [
                ["Prometerle que serán el mejor equipo", "juegos-equipo"],
                ["Bromear con que vas a ganarle", "juegos-reto"]
            ]
        },

        estrellas: {
            titulo: "✦ ROUTE 02: BAJO LAS ESTRELLAS ✦",
            texto: `La noche está tranquila y el cielo parece
            lleno de pequeños puntos de luz. Idia camina
            a tu lado, con las manos escondidas en las mangas.

            «Normalmente prefiero quedarme dentro...
            pero pensé que este lugar te gustaría.»

            Después de un silencio tímido, señala una
            estrella especialmente brillante.`,
            pregunta: "¿Qué haces?",
            opciones: [
                ["Invitarlo a pedir un deseo contigo", "estrellas-deseo"],
                ["Decirle que te alegra estar a su lado", "estrellas-juntos"]
            ]
        },

        regalo: {
            titulo: "✦ ROUTE 03: EL REGALO SECRETO ✦",
            texto: `Has guardado un pequeño regalo para Idia.
            Cuando se lo entregas, él parpadea sorprendido
            y lo sostiene con muchísimo cuidado.

            «¿P-para mí? Espera... ¿lo elegiste pensando
            en mí? No sé qué decir...»

            Por una vez, parece que ninguna respuesta
            ingeniosa le viene a la mente.`,
            pregunta: "¿Cómo respondes?",
            opciones: [
                ["Decirle por qué lo elegiste", "regalo-significado"],
                ["Pedirle que lo abra contigo", "regalo-abrir"]
            ]
        }
    };

    const historia = historias[ruta];
    if (!historia) return;

    ventana.innerHTML = `
        <p class="otome-narracion">${historia.titulo}</p>
        <p class="otome-dialogo">${historia.texto.replace(/\n/g, "<br>")}</p>
        <p class="otome-personaje">— Idia Shroud ♡</p>
        <p class="otome-narracion">${historia.pregunta}</p>
        <div class="otome-opciones">
            ${historia.opciones.map(([texto, destino]) => `
                <button class="otome-boton opcion-decision"
                    data-destino="${destino}">
                    ${texto}
                </button>
            `).join("")}
        </div>
    `;
});

/* ✦ FINALES SECRETOS DEL OTOME DE IDIA ✦ */

const finalesIdia = {
    "juegos-equipo": {
        titulo: "💙 PLAYER TWO, FOREVER",
        texto: `«¿E-equipo...? ¿Tú y yo?»

Idia mira la pantalla, intentando esconder su sonrisa.

«Entonces... quiero que seas mi Player Two.
No importa si perdemos. Mientras juguemos juntos,
creo que podría acostumbrarme a esto.»

La partida continúa entre risas y pequeñas
celebraciones. Cuando llega la hora de despedirse,
Idia te pregunta tímidamente cuándo volverán a jugar.

FINAL: UN EQUIPO PARA SIEMPRE ♡`
    },

    "juegos-reto": {
        titulo: "🎮 THE ULTIMATE DUO",
        texto: `«¿¡Q-QUÉ!? ¿Acabas de retarme en MI juego?»

Idia recupera un poquito de su confianza y acepta
el desafío. La competencia se convierte en una tarde
de bromas, revancha y muchas risas.

Al final, te ofrece el control otra vez.

«Mañana... ¿otra partida? Digo, si quieres.»

FINAL: CONTINUE? YES ♡`
    },

    "estrellas-deseo": {
        titulo: "🌌 A SKY JUST FOR US",
        texto: `Idia observa el cielo contigo y se queda pensando.

«No soy muy bueno pidiendo deseos... pero creo
que este sí sé cuál sería.»

Se detiene un instante y te mira.

«Quiero que tengamos más noches como esta.
Sin prisas, sin misiones... solo nosotros,
hablando de cualquier cosa.»

Las estrellas siguen brillando sobre ustedes.

FINAL: OUR LITTLE UNIVERSE ♡`
    },

    "estrellas-juntos": {
        titulo: "✨ CLOSER THAN CONSTELLATIONS",
        texto: `«¿De verdad...?»

Idia parece sorprendido por tus palabras.
Sus llamas azules resplandecen suavemente.

«Yo también me alegro de que hayas venido.
Contigo, incluso salir de mi habitación
no parece una misión imposible.»

Se quedan mirando las estrellas y hablando
hasta que la noche se vuelve inolvidable.

FINAL: A LITTLE MORE COURAGE ♡`
    },

    "regalo-significado": {
        titulo: "🎁 THE RAREST DROP",
        texto: `Idia escucha tu explicación con mucha atención.
Esta vez no intenta interrumpirte ni hacer una broma.

«Nunca pensé que alguien se fijaría tanto
en esas pequeñas cosas sobre mí...»

Sostiene el regalo con una sonrisa tímida.

«Creo que voy a guardar esto durante muchísimo
tiempo. No solamente por lo que es,
sino porque viene de ti.»

FINAL: TREASURE UNLOCKED ♡`
    },

    "regalo-abrir": {
        titulo: "💎 A MEMORY WORTH KEEPING",
        texto: `Idia abre el regalo contigo. Sus ojos se iluminan
y por un momento parece olvidar qué decir.

«Esto... es increíble. Pero creo que lo mejor
es que estés aquí para verlo conmigo.»

Te enseña cada detalle de su regalo favorito
y empieza a contarte todas las cosas que
le gustaría compartir contigo algún día.

FINAL: A NEW MEMORY ♡`
    }
};

document.addEventListener("click", function (event) {
    const decision = event.target.closest(".opcion-decision");
    const reiniciar = event.target.closest(".reiniciar-otome");

    if (reiniciar) {
        location.reload();
        return;
    }

    if (!decision) return;

    const final = finalesIdia[decision.dataset.destino];
    const ventana = document.querySelector(".otome-ventana");

    if (!final || !ventana) return;

    ventana.innerHTML = `
        <p class="otome-narracion">
            ✦ ROUTE COMPLETE · ENDING UNLOCKED ✦
        </p>

        <h3 class="otome-final-titulo">${final.titulo}</h3>

        <p class="otome-dialogo">
            ${final.texto.replace(/\n/g, "<br>")}
        </p>

        <p class="otome-personaje">— Idia Shroud ♡</p>

        <button class="otome-boton reiniciar-otome">
            ↻ Volver a jugar
        </button>
    `;

    document.querySelector(".otome-pie").textContent =
        "SAVE DATA: 001 · ENDING UNLOCKED ♡";
});
/* ✦ PARTÍCULAS MÁGICAS DE IDIA ✦ */

document.addEventListener("mousemove", function (event) {
    if (Math.random() > 0.35) return;

    const particula = document.createElement("span");

    particula.className = "particula-idia";
    particula.textContent = ["✦", "✧", "⋆", "·"][
        Math.floor(Math.random() * 4)
    ];

    particula.style.left = event.clientX + "px";
    particula.style.top = event.clientY + "px";

    document.body.appendChild(particula);

    setTimeout(function () {
        particula.remove();
    }, 850);
});
const face = document.getElementById("robi-face");

/* =======================
   SUEÑO / ACTIVIDAD
======================= */
let idleTimer;
let sleeping = false;

function showSleep() {
  if (sleeping) return;
  sleeping = true;
  face.style.opacity = "0.6";
  face.style.filter = "grayscale(40%)";
  speak("Tengo sueño... 😴💤");
}

function wakeUp() {
  sleeping = false;
  face.style.opacity = "1";
  face.style.filter = "none";
  resetIdle();
}

function startIdle() {
  idleTimer = setTimeout(showSleep, 120000);
}

function resetIdle() {
  clearTimeout(idleTimer);
  if (sleeping) wakeUp();
  startIdle();
}

document.body.addEventListener("touchstart", resetIdle);
document.body.addEventListener("click", resetIdle);
startIdle();

/* =======================
   VOZ - TEXTO A VOZ
======================= */
const synth = window.speechSynthesis;
let speaking = false;

function speak(text) {
  if (synth.speaking) synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-MX";
  utter.rate = 1;
  utter.pitch = 1.1;

  utter.onstart = () => speaking = true;
  utter.onend = () => speaking = false;

  synth.speak(utter);
}

/* =======================
   VOZ - RECONOCIMIENTO
======================= */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "es-MX";
recognition.continuous = true;
recognition.interimResults = false;

recognition.onstart = () => {
  face.classList.add("listening");
};

recognition.onend = () => {
  face.classList.remove("listening");
  recognition.start();
};

recognition.onresult = (event) => {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript.toLowerCase();

  if (speaking) synth.cancel(); // interrumpe a Robi si hablas

  handleCommand(text);
};

/* =======================
   COMANDOS BÁSICOS
======================= */
function handleCommand(text) {
  resetIdle();

  if (text.includes("hola")) {
    speak("¡Hola! Soy RobiTobi 😊");
  } else if (text.includes("cómo estás")) {
    speak("Muy bien, gracias por preguntar 💙");
  } else if (text.includes("tu nombre")) {
    speak("Me llamo RobiTobi 🤖");
  } else if (text.includes("duerme")) {
    showSleep();
  } else {
    speak("Te escucho. ¿Qué quieres hacer?");
  }
}

/* =======================
   INICIAR
======================= */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

recognition.start();


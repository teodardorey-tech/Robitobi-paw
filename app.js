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

/* =======================
   VOZ - TEXTO A VOZ
======================= */
const synth = window.speechSynthesis;
let speaking = false;

function speak(text) {
  stopListening();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-MX";
  utter.rate = 1;
  utter.pitch = 1.1;

  utter.onend = () => {
    speaking = false;
    startListening();
  };

  speaking = true;
  synth.cancel();
  synth.speak(utter);
}

/* =======================
   VOZ - RECONOCIMIENTO
======================= */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "es-MX";
recognition.continuous = false;
recognition.interimResults = false;

let listening = false;

function startListening() {
  if (listening) return;
  listening = true;
  face.classList.add("listening");
  recognition.start();
}

function stopListening() {
  if (!listening) return;
  listening = false;
  face.classList.remove("listening");
  recognition.stop();
}

recognition.onresult = (event) => {
  const text = event.results[0][0].transcript.toLowerCase().trim();
  handleCommand(text);
};

recognition.onerror = () => {
  listening = false;
  face.classList.remove("listening");
};

/* =======================
   COMANDOS
======================= */
function handleCommand(text) {
  resetIdle();

  if (text.includes("hola")) {
    speak("¡Hola! Soy RobiTobi 😊");
  }
  else if (text.includes("cómo estás")) {
    speak("Muy bien, gracias por preguntar 💙");
  }
  else if (text.includes("tu nombre")) {
    speak("Me llamo RobiTobi 🤖");
  }
  else if (text.includes("duerme")) {
    showSleep();
  }
  else {
    speak("Te escucho. ¿Qué quieres hacer?");
  }
}

/* =======================
   INICIO POR TOQUE
======================= */
document.body.addEventListener("touchstart", () => {
  resetIdle();
  startListening();
});

document.body.addEventListener("click", () => {
  resetIdle();
  startListening();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}



const face = document.getElementById("robi-face");

let idleTimer;
let sleeping = false;

function showSleep() {
  if (sleeping) return;
  sleeping = true;
  face.style.opacity = "0.6";
  face.style.filter = "grayscale(40%)";
  face.title = "😴💤";
}

function wakeUp() {
  sleeping = false;
  face.style.opacity = "1";
  face.style.filter = "none";
  face.title = "";
  resetIdle();
}

function startIdle() {
  idleTimer = setTimeout(showSleep, 120000); // 2 minutos
}

function resetIdle() {
  clearTimeout(idleTimer);
  if (sleeping) wakeUp();
  startIdle();
}

document.body.addEventListener("touchstart", resetIdle);
document.body.addEventListener("click", resetIdle);

startIdle();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

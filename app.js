const face = document.getElementById("robi-face");

let idleTimer;

function startIdle() {
  idleTimer = setTimeout(() => {
    face.style.opacity = "0.7";
  }, 120000); // 2 minutos
}

function resetIdle() {
  clearTimeout(idleTimer);
  face.style.opacity = "1";
  startIdle();
}

document.body.addEventListener("touchstart", resetIdle);
document.body.addEventListener("click", resetIdle);

startIdle();

// PWA support
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

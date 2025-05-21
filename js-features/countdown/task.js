const timer = document.getElementById("timer");
let time = Number(timer.textContent);

const interval = setInterval(() => {
  time--;
  timer.textContent = time;
  if (time === 0) {
    clearInterval(interval);
    alert("Вы победили в конкурсе!");
  }
}, 1000);

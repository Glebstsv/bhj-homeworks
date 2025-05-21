const cookie = document.getElementById("cookie");
const counter = document.getElementById("clicker__counter");

let isBig = false;

cookie.onclick = function () {
  counter.textContent = Number(counter.textContent) + 1;

  if (isBig) {
    cookie.width = 200;
    cookie.height = 200;
  } else {
    cookie.width = 250;
    cookie.height = 250;
  }
  isBig = !isBig;
};

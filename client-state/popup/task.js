document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("subscribe-modal");
  const closeBtn = document.querySelector(".modal__close");

  function getCookie(name) {
    const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  if (getCookie("modalClosed") !== "true") {
    modal.classList.add("modal_active");
  }

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("modal_active");
    document.cookie = "modalClosed=true; max-age=" + 365 * 24 * 60 * 60;
  });
});

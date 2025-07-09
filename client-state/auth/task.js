document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signin__form");
  const signin = document.getElementById("signin");
  const welcome = document.getElementById("welcome");
  const userIdSpan = document.getElementById("user_id");

  const savedUserId = localStorage.getItem("user_id");
  if (savedUserId) {
    showWelcome(savedUserId);
  }

  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);

    fetch("https://students.netoservices.ru/nestjs-backend/auth", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("user_id", data.user_id);
          showWelcome(data.user_id);
          signinForm.reset();
        } else {
          alert("Неверный логин/пароль");
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при авторизации");
      });
  });

  function showWelcome(userId) {
    userIdSpan.textContent = userId;
    signin.classList.remove("signin_active");
    welcome.classList.add("welcome_active");
  }

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Выйти";
  logoutBtn.className = "btn";
  logoutBtn.style.marginTop = "20px";
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user_id");
    welcome.classList.remove("welcome_active");
    signin.classList.add("signin_active");
  });

  welcome.appendChild(logoutBtn);
});

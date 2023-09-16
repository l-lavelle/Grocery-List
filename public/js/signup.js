const submitBtn = document.getElementById("signup-form");
const signupform = document.getElementById("signup-form");
let div = document.createElement("div");
div.className = "mb-3";
let errorMessage = document.createElement("p");
errorMessage.className = "error-signup";
div.append(errorMessage);
signupform.appendChild(div);

submitBtn.addEventListener("submit", async function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const confirmPasswords = document
    .querySelector("#confirm-password")
    .value.trim();

  if (confirmPasswords === password) {
    if (username && password) {
      const response = await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ name, username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        document.location.replace(`/createlist/${data.id}`);
      } else if (data.name === "SequelizeUniqueConstraintError") {
        errorMessage.textContent = "Username already exists";
        errorMessage.style.color = "red";
      } else {
        errorMessage.textContent = "Failed to sign up";
        errorMessage.style.color = "red";
      }
    }
  } else {
    errorMessage.textContent = "Passwords do not match!";
    errorMessage.style.color = "red";
  }
});

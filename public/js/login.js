const signupform = document.getElementById("signup-form");
submitBtn = document.getElementById("submit-btn");
let div = document.createElement("div");
div.className = "mb-3";
let errorMessage = document.createElement("p");
errorMessage.className = "error-signup";
div.append(errorMessage);
signupform.appendChild(div);

submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      document.location.replace(`/api/lists/${data.user.id}`);
    } else {
      errorMessage.textContent = "Incorrect Username or Password";
      errorMessage.style.color = "red";
    }
  }
});

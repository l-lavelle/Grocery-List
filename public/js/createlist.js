const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const name = document.querySelector("#list-name").value.trim();
  if (name) {
    // finds the user_id in the url
    const id = window.location.href.split("/")[4];
    if (id) {
      console.log(id);
      const response = await fetch(`/api/lists/${id}`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        document.location.replace("/");
      }
    }
  }
});

const logout = async () => {
  const response = await fetch("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    setTimeout(function () {
      window.location.href = "/login";
    }, 2000); // Redirect to login page after 2 seconds
  } else {
    alert("Failed to log out.");
  }
};
logout();

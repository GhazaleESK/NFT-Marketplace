"use strict";

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");

  menuToggle.setAttribute("aria-expanded", String(isHidden));
});

const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const formMessage = document.getElementById("form-message");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("text-red-400", "text-green-400");
  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }
  if (passwordInput.value !== confirmPasswordInput.value) {
    formMessage.textContent = "Passwords do not match.";
    formMessage.classList.add("text-red-400");
    return;
  }
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    formMessage.textContent = result.message;
    formMessage.classList.add("text-green-400");
    signupForm.reset();
  } catch (error) {
    formMessage.textContent =
      error.message || "Could not connect to the server.";
    formMessage.classList.add("text-red-400");
  }
});

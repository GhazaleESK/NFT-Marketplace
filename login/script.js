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

signupForm.addEventListener("submit", (event) => {
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

  formMessage.textContent = "Form validation successful!";
  formMessage.classList.add("text-green-400");
});

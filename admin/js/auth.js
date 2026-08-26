import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  auth
} from "./firebase.js";


const loginForm =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginButton =
  document.getElementById("loginButton");

const buttonText =
  document.getElementById("buttonText");

const loginMessage =
  document.getElementById("loginMessage");

const togglePassword =
  document.getElementById("togglePassword");


// Already logged in?
onAuthStateChanged(auth, (user) => {

  if (user) {

    window.location.href =
      "dashboard.html";

  }

});


// Password show/hide
togglePassword.addEventListener(
  "click",
  () => {

    if (passwordInput.type === "password") {

      passwordInput.type = "text";

      togglePassword.textContent = "🙈";

    } else {

      passwordInput.type = "password";

      togglePassword.textContent = "👁";

    }

  }
);


// Login
loginForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


    loginMessage.className =
      "login-message";

    loginMessage.textContent = "";


    loginButton.disabled = true;

    buttonText.textContent =
      "Logging in...";


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      loginMessage.textContent =
        "Login successful! Redirecting...";

      loginMessage.classList.add(
        "success"
      );


      setTimeout(() => {

        window.location.href =
          "dashboard.html";

      }, 700);


    } catch (error) {

      console.error(error);


      let message =
        "Login failed. Please try again.";


      if (
        error.code ===
        "auth/invalid-credential"
      ) {

        message =
          "Invalid email or password.";

      }

      else if (
        error.code ===
        "auth/user-not-found"
      ) {

        message =
          "No account found with this email.";

      }

      else if (
        error.code ===
        "auth/wrong-password"
      ) {

        message =
          "Incorrect password.";

      }

      else if (
        error.code ===
        "auth/too-many-requests"
      ) {

        message =
          "Too many attempts. Try again later.";

      }


      loginMessage.textContent =
        message;

      loginMessage.classList.add(
        "error"
      );


      loginButton.disabled = false;

      buttonText.textContent =
        "Login to Dashboard";

    }

  }
);

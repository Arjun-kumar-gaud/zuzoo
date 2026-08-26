import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import { auth } from "./firebase.js";


const adminEmail =
  document.getElementById("adminEmail");

const logoutButton =
  document.getElementById("logoutButton");


// Check login
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.replace("index.html");
    return;
  }

  adminEmail.textContent = user.email;

});


// Logout
logoutButton.addEventListener("click", async () => {

  logoutButton.disabled = true;
  logoutButton.textContent = "Logging out...";

  try {

    await signOut(auth);

    console.log("Logout successful");

    window.location.replace("index.html");

  } catch (error) {

    console.error("Logout error:", error);

    logoutButton.disabled = false;
    logoutButton.textContent = "🚪 Logout";

    alert("Logout failed: " + error.message);

  }

});

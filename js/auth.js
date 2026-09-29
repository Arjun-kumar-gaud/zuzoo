// =====================================================
// AUTH HELPERS
// =====================================================

async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

async function signUp(email, password, fullName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  return { data, error };
}

async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

// Header user area update
async function renderUserArea() {
  const el = document.getElementById("userArea");
  if (!el) return;
  const user = await getCurrentUser();
  if (user) {
    el.innerHTML = `
      <div class="dropdown">
        <a href="#" class="text-navy text-decoration-none dropdown-toggle d-flex align-items-center gap-2"
           data-bs-toggle="dropdown">
          <i class="bi bi-person-circle fs-4"></i>
          <span class="fw-semibold d-none d-md-inline">${escapeHtml(user.user_metadata?.full_name || user.email.split("@")[0])}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end shadow">
          <li><a class="dropdown-item" href="orders.html"><i class="bi bi-bag-check me-2"></i>My Orders</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="signOut();return false;">
            <i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
        </ul>
      </div>`;
  } else {
    el.innerHTML = `
      <a href="login.html" class="text-navy text-decoration-none d-flex align-items-center gap-1">
        <i class="bi bi-person-circle fs-4"></i>
        <span class="fw-semibold d-none d-md-inline">Sign in</span>
      </a>`;
  }
}

document.addEventListener("DOMContentLoaded", renderUserArea);
// =====================================================
// AUTH HELPERS
// =====================================================

async function getCurrentUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

async function signOut() {
  await supabaseClient.auth.signOut();
  window.location.href = "index.html";
}

// ============ PROFILE ============
async function getProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  const { data } = await supabaseClient
    .from("user_profiles").select("*").eq("id", user.id).maybeSingle();
  return data;
}

async function updateProfile(fields) {
  const user = await getCurrentUser();
  if (!user) return { error: new Error("Not logged in") };
  return await supabaseClient
    .from("user_profiles")
    .upsert({ id: user.id, ...fields, updated_at: new Date().toISOString() });
}

// ============ ADDRESSES ============
async function getAddresses() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabaseClient
    .from("user_addresses").select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}

async function saveAddress(addr) {
  const user = await getCurrentUser();
  if (!user) return { error: new Error("Not logged in") };

  // If setting as default, unset others
  if (addr.is_default) {
    await supabaseClient.from("user_addresses")
      .update({ is_default: false }).eq("user_id", user.id);
  }

  if (addr.id) {
    return await supabaseClient.from("user_addresses")
      .update(addr).eq("id", addr.id).eq("user_id", user.id);
  }
  return await supabaseClient.from("user_addresses")
    .insert({ ...addr, user_id: user.id });
}

async function deleteAddress(id) {
  const user = await getCurrentUser();
  if (!user) return;
  return await supabaseClient.from("user_addresses")
    .delete().eq("id", id).eq("user_id", user.id);
}

// ============ HEADER USER AREA ============
async function renderUserArea() {
  const el = document.getElementById("userArea");
  if (!el) return;

  const user = await getCurrentUser();
  if (user) {
    const profile = await getProfile();
    const displayName = profile?.full_name || user.email.split("@")[0];
    el.innerHTML = `
      <div class="dropdown">
        <a href="#" class="text-navy text-decoration-none dropdown-toggle d-flex align-items-center gap-2"
           data-bs-toggle="dropdown">
          <i class="bi bi-person-circle fs-4"></i>
          <span class="fw-semibold d-none d-md-inline">${escapeHtml(displayName)}</span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end shadow">
          <li><h6 class="dropdown-header">${escapeHtml(user.email)}</h6></li>
          <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>My Profile</a></li>
          <li><a class="dropdown-item" href="orders.html"><i class="bi bi-bag-check me-2"></i>My Orders</a></li>
          <li><a class="dropdown-item" href="profile.html#addresses"><i class="bi bi-geo-alt me-2"></i>My Addresses</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="signOut();return false;">
            <i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
        </ul>
      </div>`;
  } else {
    el.innerHTML = `
      <a href="login.html" class="text-navy text-decoration-none d-flex align-items-center gap-1">
        <i class="bi bi-person-circle fs-4"></i>
        <span class="fw-semibold d-none d-md-inline">Login</span>
      </a>`;
  }
}

document.addEventListener("DOMContentLoaded", renderUserArea);
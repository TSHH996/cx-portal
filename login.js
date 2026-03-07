import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aqqVrDvfsxUFvN_CbfXwMg_3PpS3xw8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const $ = (id) => document.getElementById(id);

function setMsg(text, variant = "") {
  const el = $("msg");
  el.textContent = text || "";
  el.style.color = variant === "bad" ? "rgba(251,113,133,.95)" : "var(--muted)";
}

async function ensureActiveUser(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("is_active, role")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return { ok: false, message: "Profile check failed. Please try again." };
  if (!data) return { ok: false, message: "No profile found for this account. Contact admin." };
  if (data.is_active === false) return { ok: false, message: "This account is disabled. Contact admin." };

  return { ok: true, role: data.role };
}

async function login() {
  const email = ($("email").value || "").trim();
  const password = ($("password").value || "").trim();

  if (!email || !password) {
    setMsg("Please enter email and password.", "bad");
    return;
  }

  setMsg("Signing in...");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setMsg(error.message || "Login failed.", "bad");
    return;
  }

  const userId = data?.user?.id;
  if (!userId) {
    setMsg("Login failed (no user).", "bad");
    return;
  }

  const active = await ensureActiveUser(userId);
  if (!active.ok) {
    setMsg(active.message, "bad");
    // logout just in case
    await supabase.auth.signOut();
    return;
  }

  // ✅ go to portal home
  location.href = "./";
}

$("btnLogin").addEventListener("click", login);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

// If already logged in, go home
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user?.id) {
    const active = await ensureActiveUser(session.user.id);
    if (active.ok) location.href = "./";
  }
})();

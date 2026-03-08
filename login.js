import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aqqVrDvfsxUFvN_CbfXwMg_3PpS3xw8";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const $ = (id) => document.getElementById(id);

function showMessage(type, text) {
  const errorBox = $("errorMsg");
  const successBox = $("successMsg");

  errorBox.classList.remove("show");
  successBox.classList.remove("show");
  errorBox.textContent = "";
  successBox.textContent = "";

  if (type === "error") {
    errorBox.textContent = text;
    errorBox.classList.add("show");
  }

  if (type === "success") {
    successBox.textContent = text;
    successBox.classList.add("show");
  }
}

function setLoading(isLoading) {
  const btn = $("loginBtn");
  const email = $("email");
  const password = $("password");
  const resetBtn = $("btnResetPassword");

  btn.disabled = isLoading;
  email.disabled = isLoading;
  password.disabled = isLoading;
  resetBtn.disabled = isLoading;

  btn.textContent = isLoading ? "Signing in..." : "Sign In";
}

async function redirectIfLoggedIn() {
  const { data: { session }, error } = await supabaseClient.auth.getSession();

  if (error) {
    console.error("Session check error:", error);
    return;
  }

  if (session) {
    location.href = "./index.html";
  }
}

async function handleLogin(event) {
  event.preventDefault();
  showMessage("", "");

  const email = ($("email").value || "").trim();
  const password = ($("password").value || "").trim();

  if (!email || !password) {
    showMessage("error", "Please enter your email and password.");
    return;
  }

  try {
    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error("Login error:", error);
      showMessage("error", error.message || "Login failed.");
      return;
    }

    if (!data?.session) {
      showMessage("error", "No active session was created. Please try again.");
      return;
    }

    showMessage("success", "Login successful. Redirecting...");
    location.href = "./index.html";
  } catch (e) {
    console.error("Login exception:", e);
    showMessage("error", e?.message || "Unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

async function handleResetPassword() {
  showMessage("", "");

  const email = ($("email").value || "").trim();

  if (!email) {
    showMessage("error", "Enter your email first, then click Forgot password.");
    $("email").focus();
    return;
  }

  try {
    setLoading(true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}${location.pathname.replace("login.html", "reset-password.html")}`
    });

    if (error) {
      console.error("Reset password error:", error);
      showMessage("error", error.message || "Could not send reset password email.");
      return;
    }

    showMessage("success", "Password reset email sent. Please check your inbox.");
  } catch (e) {
    console.error("Reset password exception:", e);
    showMessage("error", e?.message || "Unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement?.tagName !== "BUTTON") {
    return;
  }
});

$("loginForm").addEventListener("submit", handleLogin);
$("btnResetPassword").addEventListener("click", handleResetPassword);

redirectIfLoggedIn();

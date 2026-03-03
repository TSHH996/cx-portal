import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_KEY_HERE";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const $ = (id) => document.getElementById(id);

const state = {
  theme: "dark",
  lang: "en"
};

function setView(view){
  ["dashboard","tickets","reports","settings"].forEach(v => {
    const section = $("view-" + v);
    const btn = document.querySelector(`[data-view="${v}"]`);
    if (section) section.classList.toggle("hidden", v !== view);
    if (btn) btn.classList.toggle("active", v === view);
  });
}

function applyTheme(){
  document.body.setAttribute("data-theme", state.theme);
  $("btnThemeTxt").textContent = state.theme === "dark" ? "Dark" : "Light";
}

function openNewTicketModal(){
  $("newTicketModal").classList.add("show");
}

function closeNewTicketModal(){
  $("newTicketModal").classList.remove("show");
}

function initBars(){
  const bars = $("bars");
  if (!bars) return;
  bars.innerHTML = "";
  [25,42,30,61,47,54,36].forEach(v => {
    const el = document.createElement("div");
    el.className = "bar";
    el.style.height = v + "%";
    bars.appendChild(el);
  });
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

$("btnTheme")?.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
});

$("btnNewTicket")?.addEventListener("click", openNewTicketModal);
$("btnCloseNewTicketModal")?.addEventListener("click", closeNewTicketModal);
$("btnCancelNewTicket")?.addEventListener("click", closeNewTicketModal);

$("newTicketModal")?.addEventListener("click", (e) => {
  if (e.target.id === "newTicketModal") closeNewTicketModal();
});

applyTheme();
setView("dashboard");
initBars();

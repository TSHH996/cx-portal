import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aqqVrDvfsxUFvN_CbfXwMg_3PpS3xw8";
const DIRECT_TEST_EMAIL = "thamer.alshehri1@hotmail.com";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const $ = (id) => document.getElementById(id);

const state = {
  theme: "dark",
  lang: "en",
  brandTitle: "CX Portal",
  tickets: [],
  branches: [],
  repliesByTicketId: {},
  attachmentsByTicketId: {},
  selectedId: null
};

function pad(n){ return String(n).padStart(2, "0"); }

function fmtDate(d){
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "—";
  return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

function formatFileSize(bytes){
  if (!bytes || Number.isNaN(Number(bytes))) return "—";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(value){
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function showToast(title, text, variant = "good"){
  const wrap = $("toastWrap");
  if (!wrap) return;

  const el = document.createElement("div");
  el.className = `toast ${variant}`;
  el.innerHTML = `
    <div class="th">${escapeHtml(title)}</div>
    <div class="td">${escapeHtml(text)}</div>
  `;
  wrap.appendChild(el);

  setTimeout(() => el.remove(), 4200);
}

function applyTheme(){
  document.body.setAttribute("data-theme", state.theme);
  $("btnThemeTxt").textContent = state.theme === "dark" ? "Dark" : "Light";
}

function applyLang(){
  const isAr = state.lang === "ar";
  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  $("btnLang").innerHTML = (isAr ? "🇸🇦" : "🇺🇸") + ` <span id="btnLangTxt">${state.lang.toUpperCase()}</span>`;
}

function setView(view){
  ["dashboard","tickets","reports","settings"].forEach(v => {
    const section = $("view-" + v);
    const btn = document.querySelector(`.nav-btn[data-view="${v}"]`);
    if (section) section.classList.toggle("hidden", v !== view);
    if (btn) btn.classList.toggle("active", v === view);
  });

  if (view === "dashboard") {
    $("pageTitle").textContent = "Dashboard";
    $("pageSub").textContent = "Monitor CX performance, ticket flow, and branch replies.";
  } else if (view === "tickets") {
    $("pageTitle").textContent = "Tickets Inbox";
    $("pageSub").textContent = "Search, filter, assign, and update branch replies in one place.";
    renderTickets();
  } else if (view === "reports") {
    $("pageTitle").textContent = "Reports";
    $("pageSub").textContent = "Analytics area.";
  } else if (view === "settings") {
    $("pageTitle").textContent = "Settings";
    $("pageSub").textContent = "Customize portal language, theme, and branding.";
    $("brandInput").value = state.brandTitle;
  }
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

function openNewTicketModal(){
  $("newTicketModal").classList.add("show");
  $("newTicketModal").setAttribute("aria-hidden", "false");
}

function closeNewTicketModal(){
  $("newTicketModal").classList.remove("show");
  $("newTicketModal").setAttribute("aria-hidden", "true");
}

function resetNewTicketForm(){
  $("newCustomerName").value = "Test Customer";
  $("newCustomerPhone").value = "0500000000";
  $("newBranchName").value = "";
  $("newPriority").value = "Medium";
  $("newFeedbackType").value = "WhatsApp";
  $("newStatus").value = "Open";
  $("newFeedbackCategory").value = "test";
  $("newSubCategory").value = "test";
  $("newDescription").value = "test";
  $("newTicketAttachments").value = "";
}

function getNewTicketPayload(){
  return {
    customer_name: ($("newCustomerName").value || "").trim(),
    customer_phone: ($("newCustomerPhone").value || "").trim(),
    branch_name: ($("newBranchName").value || "").trim(),
    feedback_type: ($("newFeedbackType").value || "").trim(),
    feedback_category: ($("newFeedbackCategory").value || "").trim(),
    sub_category: ($("newSubCategory").value || "").trim(),
    description: ($("newDescription").value || "").trim(),
    priority: $("newPriority").value || "Medium",
    status: $("newStatus").value || "Open"
  };
}

async function loadBranches(){
  const { data, error } = await supabaseClient
    .from("branches")
    .select("*")
    .order("branch_name", { ascending: true });

  if (error) {
    console.error(error);
    showToast("Branches load error", error.message || "Could not load branches", "bad");
    return;
  }

  state.branches = data || [];
  renderBranchOptions();
}

function renderBranchOptions(){
  const branchSelect = $("newBranchName");
  if (!branchSelect) return;

  const currentValue = branchSelect.value || "";
  branchSelect.innerHTML = `<option value="">Select branch</option>`;

  state.branches.forEach(branch => {
    const option = document.createElement("option");
    option.value = branch.branch_name;
    option.textContent = branch.branch_name;
    branchSelect.appendChild(option);
  });

  if (currentValue) branchSelect.value = currentValue;
}

async function loadReplies(){
  const { data, error } = await supabaseClient
    .from("ticket_replies")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Replies load error:", error);
    return;
  }

  const map = {};
  (data || []).forEach(item => {
    if (!map[item.ticket_id]) map[item.ticket_id] = [];
    map[item.ticket_id].push(item);
  });

  state.repliesByTicketId = map;
}

async function loadAttachments(){
  const { data, error } = await supabaseClient
    .from("ticket_attachments")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Attachments load error:", error);
    return;
  }

  const map = {};
  (data || []).forEach(item => {
    if (!map[item.ticket_id]) map[item.ticket_id] = [];
    map[item.ticket_id].push(item);
  });

  state.attachmentsByTicketId = map;
}

function computeKPIs(){
  const t = state.tickets || [];
  const open = t.filter(x => x.status === "Open" || x.status === "In Progress").length;
  const replied = t.filter(x => x.status === "Replied").length;
  const closed = t.filter(x => x.status === "Closed").length;

  $("kpiOpen").textContent = open;
  $("kpiReplied").textContent = replied;
  $("kpiClosed").textContent = closed;
  $("kpiAvg").textContent = t.length ? "2h" : "0h";

  $("kpiOpenT").textContent = `${open} active`;
  $("kpiRepliedT").textContent = `${replied} replied`;
  $("kpiClosedT").textContent = `${closed} closed`;
  $("kpiAvgT").textContent = "Live";
}

async function loadTickets(){
  try {
    $("systemMsg").textContent = "Loading tickets...";
    await Promise.all([loadReplies(), loadAttachments()]);

    const { data, error } = await supabaseClient
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      $("systemMsg").textContent = error.message || "Load error";
      return;
    }

    state.tickets = (data || []).map(r => {
      const createdAt = r.created_at ? new Date(r.created_at).getTime() : Date.now();
      const ticketIdLabel = (r.ticket_no !== null && r.ticket_no !== undefined)
        ? `#${r.ticket_no}`
        : (r.id ? "#" + String(r.id).slice(0, 8) : "#—");

      const replies = state.repliesByTicketId[r.id] || [];
      const latestReply = replies.length ? replies[replies.length - 1] : null;
      const attachments = state.attachmentsByTicketId[r.id] || [];

      const timeline = [
        { t: "Ticket created", d: "Loaded from Supabase.", m: fmtDate(createdAt) }
      ];

      if (attachments.length) {
        timeline.push({
          t: "Attachments uploaded",
          d: `${attachments.length} file(s) attached to this ticket.`,
          m: fmtDate(attachments[0]?.created_at || createdAt)
        });
      }

      replies.forEach(rep => {
        timeline.push({
          t: "Reply by Branch",
          d: rep.reply_text || "—",
          m: fmtDate(rep.created_at)
        });

        if (rep.action_taken) {
          timeline.push({
            t: "Action taken",
            d: rep.action_taken,
            m: fmtDate(rep.created_at)
          });
        }
      });

      return {
        rowId: r.id,
        id: ticketIdLabel,
        ticketNo: r.ticket_no ?? null,
        subject: `${ticketIdLabel} • ${r.branch_name || "—"}`,
        status: r.status || "Open",
        priority: r.priority || "Medium",
        branch: r.branch_name || "—",
        category: r.feedback_category || "—",
        source: r.feedback_type || "—",
        customerName: r.customer_name || "—",
        customerPhone: r.customer_phone || "—",
        createdAt,
        assignedTo: r.assign_to || r.assigned_to || "",
        description: r.description || "—",
        branchReply: latestReply?.reply_text || "",
        replyBy: latestReply?.reply_by || "",
        replyAt: latestReply?.created_at ? new Date(latestReply.created_at).getTime() : null,
        attachments,
        timeline,
        raw: r
      };
    });

    if ((!state.selectedId || !state.tickets.find(x => x.rowId === state.selectedId)) && state.tickets.length) {
      state.selectedId = state.tickets[0].rowId;
    }

    computeKPIs();
    renderTickets();
    $("systemMsg").textContent = `Connected. Loaded ${state.tickets.length} ticket(s).`;
  } catch (e) {
    console.error(e);
    $("systemMsg").textContent = e.message || String(e);
  }
}

function filterTickets(){
  const q = ($("globalSearch").value || "").toLowerCase().trim();
  const status = $("filterStatus").value;
  const prio = $("filterPriority").value;
  const branchQ = ($("filterBranch").value || "").toLowerCase().trim();

  return state.tickets.filter(t => {
    const hay = `${t.id} ${t.subject} ${t.branch} ${t.customerName} ${t.customerPhone} ${t.category} ${t.source} ${t.description}`.toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (status !== "all" && t.status !== status) return false;
    if (prio !== "all" && t.priority !== prio) return false;
    if (branchQ && !String(t.branch).toLowerCase().includes(branchQ)) return false;
    return true;
  });
}

function badgeClassByPriority(p){
  if (p === "High") return "warn";
  if (p === "Medium") return "";
  return "good";
}

function badgeClassByStatus(s){
  if (s === "Replied" || s === "Closed") return "good";
  if (s === "Open" || s === "In Progress") return "warn";
  return "";
}

function renderTickets(){
  const rows = $("ticketRows");
  if (!rows) return;

  const list = filterTickets();
  $("resultCount").textContent = `${list.length} tickets`;
  rows.innerHTML = "";

  if (!list.length) {
    rows.innerHTML = `<div style="padding:18px;color:var(--muted)">No tickets found.</div>`;
    renderDetail();
    return;
  }

  list.forEach(t => {
    const row = document.createElement("div");
    row.className = "row" + (t.rowId === state.selectedId ? " active" : "");
    row.onclick = () => {
      state.selectedId = t.rowId;
      renderTickets();
      renderDetail();
    };

    row.innerHTML = `
      <div class="meta">
        <div class="t">${escapeHtml(t.subject)}</div>
        <div class="b">
          <span class="badge ${badgeClassByPriority(t.priority)}">${escapeHtml(t.priority)}</span>
          <span class="badge ${badgeClassByStatus(t.status)}">${escapeHtml(t.status)}</span>
          <span class="badge">${escapeHtml(t.branch)}</span>
          ${t.attachments.length ? `<span class="badge">${t.attachments.length} attachment(s)</span>` : ""}
        </div>
      </div>
      <div class="right-meta">
        <div>${escapeHtml(t.id)}</div>
        <div>${escapeHtml(fmtDate(t.createdAt))}</div>
      </div>
    `;
    rows.appendChild(row);
  });

  renderDetail();
}

function renderAttachments(ticket){
  const wrap = $("ticketAttachmentsList");
  wrap.innerHTML = "";

  const files = ticket?.attachments || [];
  if (!files.length) {
    wrap.innerHTML = `<div class="helper">No attachments uploaded for this ticket.</div>`;
    return;
  }

  files.forEach(file => {
    const item = document.createElement("div");
    item.className = "attachment-item";
    item.innerHTML = `
      <span>📎</span>
      <div>
        <a href="${escapeHtml(file.file_url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(file.file_name || "file")}</a>
        <div class="helper">${escapeHtml(formatFileSize(file.file_size))} • ${escapeHtml(fmtDate(file.created_at))}</div>
      </div>
    `;
    wrap.appendChild(item);
  });
}

function renderDetail(){
  const ticket = state.tickets.find(x => x.rowId === state.selectedId);

  if (!ticket) {
    $("detailTitle").textContent = "Select a ticket";
    $("detailSub").textContent = "Open a ticket to view details.";
    $("ticketInfo").innerHTML = "";
    $("ticketDesc").textContent = "—";
    $("branchReply").value = "";
    $("replyMeta").textContent = "—";
    $("timeline").innerHTML = "";
    $("ticketAttachmentsList").innerHTML = "";
    return;
  }

  $("detailTitle").textContent = ticket.subject;
  $("detailSub").textContent = `${ticket.id} • ${ticket.branch} • ${ticket.status}`;

  const info = [
    ["Ticket", ticket.id],
    ["Status", ticket.status],
    ["Priority", ticket.priority],
    ["Branch", ticket.branch],
    ["Category", ticket.category],
    ["Source", ticket.source],
    ["Customer", ticket.customerName],
    ["Phone", ticket.customerPhone],
    ["Assigned", ticket.assignedTo || "—"],
    ["Created", fmtDate(ticket.createdAt)]
  ];

  $("ticketInfo").innerHTML = info.map(([k,v]) => `<div><b>${escapeHtml(k)}:</b> ${escapeHtml(v)}</div>`).join("");
  $("ticketDesc").textContent = ticket.description || "—";
  $("branchReply").value = ticket.branchReply || "";
  $("replyMeta").textContent = ticket.replyAt ? `Reply by ${ticket.replyBy || "Branch"} • ${fmtDate(ticket.replyAt)}` : "No branch reply yet.";

  renderAttachments(ticket);

  const timeline = $("timeline");
  timeline.innerHTML = "";

  ticket.timeline.forEach(ev => {
    const item = document.createElement("div");
    item.className = "event";
    item.innerHTML = `
      <div class="dot"></div>
      <div class="box">
        <div class="t">${escapeHtml(ev.t)}</div>
        <div class="d">${escapeHtml(ev.d)}</div>
        <div class="m">${escapeHtml(ev.m)}</div>
      </div>
    `;
    timeline.appendChild(item);
  });
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const base64 = String(result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadAttachmentsViaFunction(ticketRow){
  const input = $("newTicketAttachments");
  const files = input?.files ? Array.from(input.files) : [];

  if (!files.length) {
    return { uploaded: 0, failed: 0 };
  }

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const base64 = await fileToBase64(file);

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/upload-ticket-attachment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            ticket_id: ticketRow.id,
            ticket_no: ticketRow.ticket_no,
            file_name: file.name,
            mime_type: file.type || "application/octet-stream",
            file_size: file.size || 0,
            file_base64: base64
          })
        }
      );

      const rawText = await response.text();
      let result = {};

      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch {
        result = { raw: rawText };
      }

      if (!response.ok) {
        console.error("upload-ticket-attachment failed:", result);
        failed += 1;
      } else {
        uploaded += 1;
      }
    } catch (e) {
      console.error("uploadAttachmentsViaFunction exception:", e);
      failed += 1;
    }
  }

  return { uploaded, failed };
}

async function sendBranchEmail(ticket) {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-branch-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        ticket_no: ticket.ticket_no,
        branch_name: ticket.branch_name,
        branch_email: DIRECT_TEST_EMAIL,
        customer_name: ticket.customer_name,
        customer_phone: ticket.customer_phone,
        feedback_type: ticket.feedback_type,
        feedback_category: ticket.feedback_category,
        sub_category: ticket.sub_category,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status
      })
    });

    const rawText = await response.text();

    if (!response.ok) {
      showToast("Email failed", rawText || "Unknown error", "bad");
      return false;
    }

    showToast("Email sent", `Email request sent to ${DIRECT_TEST_EMAIL} ✅`, "good");
    return true;
  } catch (e) {
    console.error(e);
    showToast("Email exception", e.message || String(e), "bad");
    return false;
  }
}

async function createTicket(){
  try {
    const payload = getNewTicketPayload();

    if (!payload.branch_name) {
      alert("Please select a branch first.");
      return;
    }

    const submitBtn = $("btnSubmitNewTicket");
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating...";

    const { data, error } = await supabaseClient
      .from("tickets")
      .insert([payload])
      .select("*");

    if (error) {
      console.error(error);
      alert("Ticket creation failed: " + (error.message || "Unknown error"));
      submitBtn.disabled = false;
      submitBtn.textContent = "Create Ticket";
      return;
    }

    let uploadedCount = 0;
    let failedCount = 0;

    if (data && data[0]) {
      state.selectedId = data[0].id;

      const attachmentResult = await uploadAttachmentsViaFunction(data[0]);
      uploadedCount = attachmentResult.uploaded;
      failedCount = attachmentResult.failed;

      await sendBranchEmail(data[0]);
    }

    resetNewTicketForm();
    closeNewTicketModal();
    await loadTickets();
    setView("tickets");

    let successMessage = "Ticket created successfully ✅";
    if (uploadedCount > 0) successMessage += `\nAttachments uploaded: ${uploadedCount}`;
    if (failedCount > 0) successMessage += `\nAttachments failed: ${failedCount}`;

    alert(successMessage);

    submitBtn.disabled = false;
    submitBtn.textContent = "Create Ticket";
  } catch (e) {
    console.error(e);
    alert("Exception: " + (e.message || e));
    $("btnSubmitNewTicket").disabled = false;
    $("btnSubmitNewTicket").textContent = "Create Ticket";
  }
}

async function saveReply(){
  const t = state.tickets.find(x => x.rowId === state.selectedId);
  if (!t) return alert("Please select a ticket first.");

  const replyText = ($("branchReply").value || "").trim();
  if (!replyText) return alert("Please write a reply first.");

  const { error } = await supabaseClient
    .from("ticket_replies")
    .insert([{
      ticket_id: t.rowId,
      reply_text: replyText,
      reply_by: "Branch",
      action_taken: "Reply saved"
    }]);

  if (error) {
    console.error(error);
    return alert("Save reply failed: " + (error.message || "Unknown error"));
  }

  showToast("Reply saved", "Reply saved in ticket_replies ✅", "good");
  await loadTickets();
}

async function markReplied(){
  const t = state.tickets.find(x => x.rowId === state.selectedId);
  if (!t) return alert("Please select a ticket first.");

  const { error } = await supabaseClient
    .from("tickets")
    .update({ status:"Replied" })
    .eq("id", t.rowId);

  if (error) {
    console.error(error);
    return alert("Mark replied failed: " + (error.message || "Unknown error"));
  }

  showToast("Status updated", "Ticket marked as Replied ✅", "good");
  await loadTickets();
}

async function closeTicket(){
  const t = state.tickets.find(x => x.rowId === state.selectedId);
  if (!t) return alert("Please select a ticket first.");

  const { error } = await supabaseClient
    .from("tickets")
    .update({ status:"Closed" })
    .eq("id", t.rowId);

  if (error) {
    console.error(error);
    return alert("Close failed: " + (error.message || "Unknown error"));
  }

  showToast("Closed", "Ticket marked as Closed ✅", "good");
  await loadTickets();
}

function exportJSON(){
  const data = {
    exportedAt: new Date().toISOString(),
    tickets: state.tickets
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cx_portal_export.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function bindEvents(){
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  $("btnTheme").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
  });

  $("btnLang").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ar" : "en";
    applyLang();
  });

  $("btnNewTicket").addEventListener("click", openNewTicketModal);
  $("btnCloseNewTicketModal").addEventListener("click", closeNewTicketModal);
  $("btnCancelNewTicket").addEventListener("click", closeNewTicketModal);
  $("btnSubmitNewTicket").addEventListener("click", createTicket);

  $("goTickets").addEventListener("click", () => setView("tickets"));
  $("goReports").addEventListener("click", () => setView("reports"));
  $("goSettings").addEventListener("click", () => setView("settings"));

  $("btnRefresh").addEventListener("click", async () => {
    await loadBranches();
    await loadTickets();
    showToast("Refreshed", "Tickets and branches reloaded from Supabase.", "good");
  });

  $("btnExport").addEventListener("click", exportJSON);
  $("btnSaveReply").addEventListener("click", saveReply);
  $("btnMarkReplied").addEventListener("click", markReplied);
  $("btnClose").addEventListener("click", closeTicket);

  $("btnAssign").addEventListener("click", () => showToast("Assign", "Assign action is ready for future connection.", "good"));
  $("btnAddNote").addEventListener("click", () => showToast("Add Note", "Notes action is ready for future connection.", "good"));

  $("saveBrand").addEventListener("click", () => {
    const v = $("brandInput").value.trim();
    if (v) {
      state.brandTitle = v;
      $("brandTitle").textContent = v;
      showToast("Brand saved", "Portal title updated.", "good");
    }
  });

  $("globalSearch").addEventListener("input", renderTickets);
  $("filterStatus").addEventListener("change", renderTickets);
  $("filterPriority").addEventListener("change", renderTickets);
  $("filterBranch").addEventListener("input", renderTickets);

  $("newTicketModal").addEventListener("click", (e) => {
    if (e.target.id === "newTicketModal") closeNewTicketModal();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      $("globalSearch").focus();
    }
    if (e.key === "Escape" && $("newTicketModal").classList.contains("show")) {
      closeNewTicketModal();
    }
  });
}

async function init(){
  applyTheme();
  applyLang();
  initBars();
  setView("dashboard");
  bindEvents();
  await loadBranches();
  await loadTickets();
}

init();

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aqqVrDvfsxUFvN_CbfXwMg_3PpS3xw8";

const DIRECT_TEST_EMAIL = "thamer.alshehri1@hotmail.com";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const $ = (id) => document.getElementById(id);

const state = {
  lang: "en",
  theme: "dark",
  brandTitle: "CX Portal",
  tickets: [],
  branches: [],
  repliesByTicketId: {},
  attachmentsByTicketId: {}, // keyed by ticket UUID now
  selectedId: null
};

/** ✅ SLA helper (Priority-based) */
function computeSlaDueAt(priority){
  let slaHours = 48;               // default
  if (priority === "High") slaHours = 8;
  else if (priority === "Medium") slaHours = 24;
  else if (priority === "Low") slaHours = 48;

  return new Date(Date.now() + slaHours * 60 * 60 * 1000).toISOString();
}

async function loadBranches() {
  const { data, error } = await supabaseClient
    .from("branches")
    .select("*")
    .order("branch_name", { ascending: true });

  if (error) {
    console.error("Error loading branches:", error);
    showToast("Branches load error", error.message || "Could not load branches", "bad");
    return;
  }

  state.branches = data || [];
  renderBranchOptions();
}

function renderBranchOptions() {
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

  if (currentValue && state.branches.some(b => b.branch_name === currentValue)) {
    branchSelect.value = currentValue;
  }
}

function pad(n){
  return String(n).padStart(2, "0");
}

function fmtDate(d){
  if (!d) return "—";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "—";
  return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

function currentView(){
  if ($("view-tickets").style.display !== "none") return "tickets";
  if ($("view-reports").style.display !== "none") return "reports";
  if ($("view-settings").style.display !== "none") return "settings";
  return "dashboard";
}

function showToast(title, text, variant = "good"){
  const wrap = $("toastWrap");
  const el = document.createElement("div");
  el.className = `toast ${variant}`;
  el.innerHTML = `
    <div class="th">${title}</div>
    <div class="td">${text}</div>
  `;
  wrap.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 5200);
}

function setView(view){
  ["dashboard","tickets","reports","settings"].forEach(v => {
    $("view-" + v).style.display = (v === view) ? "" : "none";
    const btn = document.querySelector(`.nav button[data-view="${v}"]`);
    if (btn) btn.classList.toggle("active", v === view);
  });

  if (view === "dashboard") {
    $("pageTitle").textContent = "Dashboard";
    $("pageSub").textContent = "Monitor CX performance, ticket flow, and branch replies.";
  }

  if (view === "tickets") {
    $("pageTitle").textContent = "Tickets Inbox";
    $("pageSub").textContent = "Search, filter, assign, and update branch replies in one place.";
    renderTickets();
  }

  if (view === "reports") {
    $("pageTitle").textContent = "Reports";
    $("pageSub").textContent = "Analytics area.";
  }

  if (view === "settings") {
    $("pageTitle").textContent = "Settings";
    $("pageSub").textContent = "Customize portal language, theme, and branding.";
    $("brandInput").value = state.brandTitle;
  }
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
  $("brandTitle").textContent = state.brandTitle;
}

function statusBadgeClass(s){
  if(s === "Replied") return "good";
  if(s === "In Progress") return "warn";
  if(s === "Open") return "warn";
  if(s === "Closed") return "good";
  return "";
}

function prioBadgeClass(p){
  if(p === "High") return "bad";
  if(p === "Medium") return "warn";
  return "good";
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

  const bars = $("bars");
  bars.innerHTML = "";
  const values = [25, 42, 30, 61, 47, 54, 36];
  values.forEach(v => {
    const el = document.createElement("div");
    el.className = "bar";
    el.style.height = v + "%";
    bars.appendChild(el);
  });
}

async function loadReplies(){
  try{
    const { data, error } = await supabaseClient
      .from("ticket_replies")
      .select("*")
      .order("created_at", { ascending: true });

    if(error){
      console.error("ticket_replies load error:", error);
      return;
    }

    const map = {};
    (data || []).forEach(r => {
      const key = r.ticket_id;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    });

    state.repliesByTicketId = map;
  }catch(e){
    console.error("loadReplies exception:", e);
  }
}

async function loadAttachments(){
  try{
    const { data, error } = await supabaseClient
      .from("ticket_attachments")
      .select("*")
      .order("created_at", { ascending: true });

    if(error){
      console.error("ticket_attachments load error:", error);
      return;
    }

    const map = {};
    (data || []).forEach(a => {
      const key = a.ticket_uuid || null; // ✅ UUID key
      if (!key) return;
      if (!map[key]) map[key] = [];
      map[key].push(a);
    });

    state.attachmentsByTicketId = map;
  }catch(e){
    console.error("loadAttachments exception:", e);
  }
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

  if (!files.length) return { uploaded: 0, failed: 0, attachments: [] };

  let uploaded = 0;
  let failed = 0;
  const attachments = [];

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
            ticket_id: ticketRow.id, // UUID
            ticket_no: ticketRow.ticket_no,
            file_name: file.name,
            mime_type: file.type || "application/octet-stream",
            file_size: file.size || 0,
            source: "cx",
            uploaded_by: "cx portal",
            file_base64: base64
          })
        }
      );

      const rawText = await response.text();
      let result = {};
      try { result = rawText ? JSON.parse(rawText) : {}; } catch { result = { raw: rawText }; }

      if (!response.ok) {
        const msg = result?.error || result?.raw || JSON.stringify(result);
        console.error("upload-ticket-attachment failed:", msg, result);
        showToast("Attachment upload error", msg, "bad");
        failed += 1;
        continue;
      }

      uploaded += 1;
      if (result?.attachment) attachments.push(result.attachment);

    } catch (e) {
      console.error("uploadAttachmentsViaFunction exception:", e);
      showToast("Attachment exception", e?.message || String(e), "bad");
      failed += 1;
    }
  }

  try { if ($("newTicketAttachments")) $("newTicketAttachments").value = ""; } catch {}
  return { uploaded, failed, attachments };
}

async function loadTickets(){
  try{
    $("systemMsg").textContent = "Loading tickets...";
    await loadReplies();
    await loadAttachments();

    const { data, error } = await supabaseClient
      .from("tickets")
      .select("*")
      .order("created_at", { ascending:false });

    if(error){
      console.error("Supabase load error:", error);
      $("systemMsg").textContent = "Load error: " + (error.message || "Unknown error");
      showToast("Load error", error.message || "Unknown load error", "bad");
      return;
    }

    state.tickets = (data || []).map(r => {
      const rowId = r.id || null; // ✅ UUID (single source of truth)
      const createdAt = r.created_at ? new Date(r.created_at).getTime() : Date.now();
      const ticketIdLabel = (r.ticket_no !== null && r.ticket_no !== undefined) ? `#${r.ticket_no}` : (rowId ? "#" + String(rowId).slice(0,8) : "#—");
      const replies = state.repliesByTicketId[rowId] || [];
      const latestReply = replies.length ? replies[replies.length - 1] : null;

      const timeline = [
        { t:"Ticket created", d:"Loaded from Supabase.", m: fmtDate(createdAt) }
      ];

      replies.forEach(rep => {
        timeline.push({ t: "Reply by Branch", d: rep.reply_text || "—", m: fmtDate(rep.created_at) });
        if (rep.action_taken) timeline.push({ t: "Action taken", d: rep.action_taken, m: fmtDate(rep.created_at) });
      });

      const attachments = state.attachmentsByTicketId[rowId] || [];

      return {
        rowId, // UUID
        id: ticketIdLabel,
        ticketNo: r.ticket_no ?? null,
        subject: `${ticketIdLabel} • ${r.branch_name || "—"}`,
        status: r.status || "Open",
        priority: r.priority || "Medium",
        branch: r.branch_name || "—",
        category: r.feedback_category || r.category || "—",
        subCategory: r.sub_category || "—",
        source: r.feedback_type || r.source || "—",
        customerName: r.customer_name || "—",
        customerPhone: r.customer_phone || "—",
        createdAt,
        assignedTo: r.assign_to || r.assigned_to || "",
        description: r.description || "—",
        branchReply: latestReply?.reply_text || "",
        replyBy: latestReply?.reply_by || "",
        replyAt: latestReply?.created_at ? new Date(latestReply.created_at).getTime() : null,
        actionTaken: latestReply?.action_taken || "",
        attachments,
        timeline,
        raw: r
      };
    });

    if ((!state.selectedId || !state.tickets.find(x => x.rowId === state.selectedId)) && state.tickets.length) {
      state.selectedId = state.tickets[0].rowId;
    }

    computeKPIs();
    if (currentView() === "tickets") renderTickets();
    $("systemMsg").textContent = `Connected. Loaded ${state.tickets.length} ticket(s).`;
  }catch(e){
    console.error("loadTickets exception:", e);
    $("systemMsg").textContent = "Exception: " + (e.message || e);
    showToast("Load exception", e.message || String(e), "bad");
  }
}

function filterTickets(){
  const q = ($("globalSearch").value || "").toLowerCase().trim();
  const status = $("filterStatus").value;
  const prio = $("filterPriority").value;
  const branchQ = ($("filterBranch").value || "").toLowerCase().trim();

  return (state.tickets || []).filter(t => {
    const hay = `${t.id} ${t.subject} ${t.branch} ${t.customerName} ${t.customerPhone} ${t.category} ${t.source} ${t.description}`.toLowerCase();
    if (q && !hay.includes(q)) return false;
    if (status !== "all" && t.status !== status) return false;
    if (prio !== "all" && t.priority !== prio) return false;
    if (branchQ && !String(t.branch || "").toLowerCase().includes(branchQ)) return false;
    return true;
  });
}

function renderTickets(){
  const rows = $("ticketRows");
  const list = filterTickets();
  $("resultCount").textContent = `${list.length} tickets`;

  if (!state.selectedId && list[0]) state.selectedId = list[0].rowId;

  rows.innerHTML = "";

  if (!list.length) {
    rows.innerHTML = `<div class="emptyState">No tickets found with current filters.</div>`;
    renderDetail();
    return;
  }

  list.forEach(t => {
    const r = document.createElement("div");
    r.className = "row" + (t.rowId === state.selectedId ? " active" : "");
    r.onclick = () => {
      state.selectedId = t.rowId;
      renderTickets();
      renderDetail();
    };

    const left = document.createElement("div");
    left.className = "meta";

    const title = document.createElement("div");
    title.className = "t";
    title.textContent = t.subject;

    const b = document.createElement("div");
    b.className = "b";
    b.innerHTML = `
      <span class="badge ${prioBadgeClass(t.priority)}">${t.priority}</span>
      <span class="badge ${statusBadgeClass(t.status)}">${t.status}</span>
      <span class="badge">${t.branch}</span>
    `;

    left.appendChild(title);
    left.appendChild(b);

    const right = document.createElement("div");
    right.className = "rightMeta";
    right.innerHTML = `<div>${t.id}</div><div>${fmtDate(t.createdAt)}</div>`;

    r.appendChild(left);
    r.appendChild(right);
    rows.appendChild(r);
  });

  renderDetail();
}

function renderDetail(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);

  if (!t) {
    $("detailTitle").textContent = "Select a ticket";
    $("detailSub").textContent = "Open a ticket to view details.";
    $("ticketInfo").innerHTML = "";
    $("ticketDesc").textContent = "—";
    $("branchReply").value = "";
    $("replyMeta").textContent = "—";
    $("timeline").innerHTML = "";
    const attWrap0 = $("ticketAttachmentsList");
    if (attWrap0) attWrap0.innerHTML = "";
    return;
  }

  $("detailTitle").textContent = t.subject;
  $("detailSub").textContent = `${t.id} • ${t.branch} • ${t.status}`;

  const info = [
    ["Ticket", t.id],
    ["Status", t.status],
    ["Priority", t.priority],
    ["Branch", t.branch],
    ["Category", t.category],
    ["Source", t.source],
    ["Customer", t.customerName],
    ["Phone", t.customerPhone],
    ["Assigned", t.assignedTo || "—"],
    ["Created", fmtDate(t.createdAt)]
  ];

  $("ticketInfo").innerHTML = info.map(([k,v]) => `<div><b>${k}:</b> ${v}</div>`).join("");
  $("ticketDesc").textContent = t.description || "—";
  $("branchReply").value = t.branchReply || "";

  if (t.replyAt) $("replyMeta").textContent = `Reply by ${t.replyBy || "Branch"} • ${fmtDate(t.replyAt)}`;
  else $("replyMeta").textContent = "No branch reply yet.";

  const attWrap = $("ticketAttachmentsList");
  if (attWrap) {
    const files = t.attachments || [];
    if (!files.length) {
      attWrap.innerHTML = `<div style="color:var(--muted2);font-size:12px">No attachments.</div>`;
    } else {
      attWrap.innerHTML = files.map(f => {
        const url = f.public_url || f.file_url || f.url || "#";
        const name = f.file_name || "file";
        const tag = f.source ? ` <span style="opacity:.65;font-size:11px">(${f.source})</span>` : "";
        return `<div><a href="${url}" target="_blank" style="color:var(--brand);text-decoration:underline">${name}</a>${tag}</div>`;
      }).join("");
    }
  }

  const tl = $("timeline");
  tl.innerHTML = "";
  (t.timeline || []).forEach(ev => {
    const wrap = document.createElement("div");
    wrap.className = "event";
    wrap.innerHTML = `
      <div class="dot"></div>
      <div class="box">
        <div class="t">${ev.t}</div>
        <div class="d">${ev.d}</div>
        <div class="m">${ev.m}</div>
      </div>
    `;
    tl.appendChild(wrap);
  });
}

function openNewTicketModal(){
  $("newTicketModal").classList.add("show");
  $("newTicketModal").setAttribute("aria-hidden", "false");
}

function closeTicketModal(){
  $("newTicketModal").classList.remove("show");
  $("newTicketModal").setAttribute("aria-hidden", "true");
}

function getNewTicketPayload(){
  const priority = $("newPriority").value || "Medium";

  return {
    customer_name: ($("newCustomerName").value || "Test Customer").trim() || "Test Customer",
    customer_phone: ($("newCustomerPhone").value || "0500000000").trim() || "0500000000",
    branch_name: ($("newBranchName").value || "").trim(),
    feedback_type: ($("newFeedbackType").value || "WhatsApp").trim() || "WhatsApp",
    feedback_category: ($("newFeedbackCategory").value || "test").trim() || "test",
    sub_category: ($("newSubCategory").value || "test").trim() || "test",
    description: ($("newDescription").value || "test").trim() || "test",
    priority,
    status: $("newStatus").value || "Open",

    /** ✅ SLA fields */
    sla_due_at: computeSlaDueAt(priority),
    sla_status: "pending"
  };
}

async function sendBranchEmail(ticket, attachmentsList = []) {
  try {
    const attachment_links = (attachmentsList || [])
      .map(a => ({
        name: a?.file_name,
        url: a?.public_url || a?.file_url || a?.url || a?.publicUrl || null
      }))
      .filter(x => x?.url);

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/send-branch-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          ticket_id: ticket.id || ticket.rowId || ticket.uuid || ticket.ticket_uuid,
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
          status: ticket.status,
          attachment_links
        })
      }
    );

    const rawText = await response.text();
    let result = {};
    try { result = rawText ? JSON.parse(rawText) : {}; } catch { result = { raw: rawText }; }

    if (!response.ok || !result?.success) {
      showToast("Email failed", result?.error || result?.raw || "Unknown error", "bad");
      console.error("send-branch-email failed:", result);
      return false;
    }

    if (result.reply_url) {
      showToast("Email sent", `Sent to ${DIRECT_TEST_EMAIL} ✅ (Reply link ready)`, "good");
      console.log("Reply URL:", result.reply_url);
    } else {
      showToast("Email sent", `Email request sent to ${DIRECT_TEST_EMAIL} ✅`, "good");
    }

    return true;
  } catch (e) {
    console.error("sendBranchEmail exception:", e);
    showToast("Email exception", e.message || String(e), "bad");
    return false;
  }
}

async function createTicket(){
  try{
    const payload = getNewTicketPayload();

    if (!payload.branch_name) {
      alert("Please select a branch first.");
      return;
    }

    const { data, error } = await supabaseClient
      .from("tickets")
      .insert([payload])
      .select("*");

    if(error){
      console.error("Insert error:", error);
      alert("Ticket creation failed: " + (error.message || "Unknown error"));
      return;
    }

    if (data && data[0]) {
      if (data[0].id) state.selectedId = data[0].id;

      const attachmentResult = await uploadAttachmentsViaFunction(data[0]);
      if (attachmentResult.failed > 0) showToast("Attachments", `Failed: ${attachmentResult.failed}`, "bad");
      else if (attachmentResult.uploaded > 0) showToast("Attachments", `Uploaded: ${attachmentResult.uploaded}`, "good");

      await sendBranchEmail(data[0], attachmentResult.attachments || []);
    }

    closeTicketModal();
    await loadTickets();
    setView("tickets");
    renderTickets();
    alert("Ticket created successfully ✅");
  }catch(e){
    console.error("createTicket exception:", e);
    alert("Exception: " + (e.message || e));
  }
}

async function saveReply(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert("Please select a ticket first.");
    return;
  }

  const replyText = ($("branchReply").value || "").trim();
  if (!replyText) {
    alert("Please write a reply first.");
    return;
  }

  try{
    const { error } = await supabaseClient
      .from("ticket_replies")
      .insert([{
        ticket_id: t.rowId,
        reply_text: replyText,
        reply_by: "Branch",
        action_taken: "Reply saved"
      }]);

    if(error){
      console.error("Save reply error:", error);
      alert("Save reply failed: " + (error.message || "Unknown error"));
      return;
    }

    showToast("Reply saved", "Reply saved in ticket_replies ✅", "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("saveReply exception:", e);
    alert("Exception: " + (e.message || e));
  }
}

async function markReplied(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert("Please select a ticket first.");
    return;
  }

  try{
    const { error } = await supabaseClient
      .from("tickets")
      .update({ status:"Replied" })
      .eq("id", t.rowId);

    if(error){
      console.error("Mark replied error:", error);
      alert("Mark replied failed: " + (error.message || "Unknown error"));
      return;
    }

    showToast("Status updated", "Ticket marked as Replied ✅", "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("markReplied exception:", e);
    alert("Exception: " + (e.message || e));
  }
}

async function closeTicket(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert("Please select a ticket first.");
    return;
  }

  try{
    const { error } = await supabaseClient
      .from("tickets")
      .update({ status:"Closed" })
      .eq("id", t.rowId);

    if(error){
      console.error("Close ticket error:", error);
      alert("Close failed: " + (error.message || "Unknown error"));
      return;
    }

    showToast("Closed", "Ticket marked as Closed ✅", "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("closeTicket exception:", e);
    alert("Exception: " + (e.message || e));
  }
}

function assignTicket(){ showToast("Assign", "Assign action is ready for future connection.", "good"); }
function addNote(){ showToast("Add Note", "Notes action is ready for future connection.", "good"); }

function exportJSON(){
  const data = { exportedAt: new Date().toISOString(), tickets: state.tickets };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cx_portal_export.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

document.addEventListener("keydown", (e) => {
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k"){
    e.preventDefault();
    $("globalSearch").focus();
  }
  if (e.key === "Escape" && $("newTicketModal").classList.contains("show")) closeTicketModal();
});

document.querySelectorAll(".nav button").forEach(btn => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

$("goTickets").onclick = () => setView("tickets");
$("goReports").onclick = () => setView("reports");
$("goSettings").onclick = () => setView("settings");

["filterStatus","filterPriority","filterBranch"].forEach(id => {
  $(id).addEventListener("input", renderTickets);
  $(id).addEventListener("change", renderTickets);
});

$("globalSearch").addEventListener("input", renderTickets);

$("btnTheme").onclick = () => { state.theme = state.theme === "dark" ? "light" : "dark"; applyTheme(); };

$("btnLang").onclick = () => {
  state.lang = state.lang === "en" ? "ar" : "en";
  applyLang();
  renderTickets();
  setView(currentView());
};

$("btnNewTicket").onclick = openNewTicketModal;
$("btnCloseNewTicketModal").onclick = closeTicketModal;
$("btnCancelNewTicket").onclick = closeTicketModal;
$("btnSubmitNewTicket").onclick = createTicket;

$("btnRefresh").onclick = async () => {
  await loadBranches();
  await loadTickets();
  renderTickets();
  showToast("Refreshed", "Tickets and branches reloaded from Supabase.", "good");
};

$("btnExport").onclick = exportJSON;
$("btnSaveReply").onclick = saveReply;
$("btnMarkReplied").onclick = markReplied;
$("btnClose").onclick = closeTicket;
$("btnAssign").onclick = assignTicket;
$("btnAddNote").onclick = addNote;

$("saveBrand").onclick = () => {
  const v = $("brandInput").value.trim();
  if(v){
    state.brandTitle = v;
    $("brandTitle").textContent = v;
    showToast("Brand saved", "Portal title updated.", "good");
  }
};

$("newTicketModal").addEventListener("click", (e) => {
  if (e.target.id === "newTicketModal") closeTicketModal();
});

(async function init(){
  applyTheme();
  applyLang();
  computeKPIs();
  setView("dashboard");

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    location.href = "./login.html";
    return;
  }

  await loadBranches();
  await loadTickets();
})();

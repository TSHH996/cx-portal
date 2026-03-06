// reply.js (debug-friendly)
const SUPABASE_FUNCTION_BASE = "https://zwowuhfsorfnhmhvoqsm.supabase.co/functions/v1";

function qs(name) {
  return new URLSearchParams(location.search).get(name) || "";
}

function setMsg(text, cls = "muted") {
  const el = document.getElementById("msg");
  el.className = `card ${cls}`;
  el.textContent = text;
}

async function fileToBase64(file) {
  const buf = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function safeReadText(res) {
  try { return await res.text(); } catch { return ""; }
}

async function loadTicket() {
  const ticket = qs("ticket");
  const token = qs("token");

  if (!ticket || !token) {
    setMsg("Missing ticket or token in URL.", "error");
    return;
  }

  setMsg("Loading ticket…");

  const url = `${SUPABASE_FUNCTION_BASE}/branch-reply-api?ticket=${encodeURIComponent(ticket)}&token=${encodeURIComponent(token)}`;

  let res;
  try {
    res = await fetch(url, { method: "GET" });
  } catch (e) {
    // ✅ هذا يمسك CORS/Network errors
    setMsg(`Fetch failed (network/CORS). ${e?.message || e}`, "error");
    return;
  }

  if (!res.ok) {
    const txt = await safeReadText(res);
    setMsg(`API Error ${res.status}: ${txt || "No response body"}`, "error");
    return;
  }

  const txt = await safeReadText(res);
  let data = {};
  try {
    data = txt ? JSON.parse(txt) : {};
  } catch {
    setMsg(`API returned non-JSON: ${txt.slice(0, 200)}`, "error");
    return;
  }

  if (data.error) {
    setMsg(data.error, "error");
    return;
  }

  const t = data.ticket || {};

  document.getElementById("ticketNo").value = t.ticket_no || "";
  document.getElementById("branchName").value = t.branch_name || "";
  document.getElementById("customerName").value = t.customer_name || "";
  document.getElementById("customerPhone").value = t.customer_phone || "";
  document.getElementById("ticketDesc").value = t.description || "";

  document.getElementById("ticketCard").style.display = "block";
  setMsg("Ready. Please submit your reply.", "ok");

  const filesInput = document.getElementById("files");
  const hint = document.getElementById("filesHint");
  filesInput.addEventListener("change", () => {
    const files = Array.from(filesInput.files || []);
    hint.textContent = files.length ? `${files.length} file(s) selected` : "";
  });

  document.getElementById("submitBtn").addEventListener("click", async () => {
    await submitReply(ticket, token);
  });
}

async function submitReply(ticket_id, token) {
  const reply_text = (document.getElementById("replyText").value || "").trim();
  const action_taken = (document.getElementById("actionTaken").value || "").trim();
  const status = document.getElementById("status").value || "Replied";
  const filesInput = document.getElementById("files");
  const files = Array.from(filesInput.files || []);

  if (!reply_text) {
    setMsg("Reply Text is required.", "error");
    return;
  }

  setMsg("Submitting… please wait.");

  const payload = { ticket_id, token, reply_text, action_taken, status, files: [] };

  for (const f of files) {
    const b64 = await fileToBase64(f);
    payload.files.push({
      file_name: f.name,
      mime_type: f.type || "application/octet-stream",
      file_size: f.size,
      file_base64: b64,
    });
  }

  let res;
  try {
    res = await fetch(`${SUPABASE_FUNCTION_BASE}/branch-reply-api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    setMsg(`Submit failed (network/CORS). ${e?.message || e}`, "error");
    return;
  }

  const txt = await safeReadText(res);

  if (!res.ok) {
    setMsg(`Submit API Error ${res.status}: ${txt || "No body"}`, "error");
    return;
  }

  let data = {};
  try { data = txt ? JSON.parse(txt) : {}; } catch {}
  if (data.error) {
    setMsg(data.error, "error");
    return;
  }

  setMsg("Reply submitted successfully ✅", "ok");
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").textContent = "Submitted ✅";
}

loadTicket();

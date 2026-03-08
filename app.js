import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zwowuhfsorfnhmhvoqsm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aqqVrDvfsxUFvN_CbfXwMg_3PpS3xw8";
const DIRECT_TEST_EMAIL = "thamer.alshehri1@hotmail.com";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const $ = (id) => document.getElementById(id);

const SUB_CATEGORIES = {
  "Food Quality": ["Beef","Chicken","Fish","Shrimp","Sushi","Avocado","Katsu Curry","Rice","Salad","Noodles","Soup","Sichuan","Cold Food","Oily","Spicy Food","Soy Sauce","Curry","Portion Quantity Issue","Foreign Object","Taste","Wrong Order","Missing Item","No Sauce","Pickle","Satay","Undercooked/Overcooked","Expired Product","Small Portion","Presentation Issue"],
  "Service Quality": ["Cashier","Service Provider","Service Delay","Order Delay","Manager Communication","Service","Rude Staff","Long Waiting Time","Incorrect Bill","Staff Appearance","No Greeting"],
  "Ambiance": ["Hair","Insect","Hygiene","Noise Level","Temperature","Broken Furniture","Bad Smell","Parking Issue","Crowded"],
  "Cleanliness": ["Dirty Tables","Dirty Utensils","Dirty Bathroom","Dirty Floor","Dirty Uniform"],
  "Overall": ["Overall"],
  "Foreign Object": ["Foreign Object"],
  "Poisoning": ["Poisoning"],
  "Delivery": ["Late Delivery","Wrong Address","Damaged Packaging","Cold Food on Arrival","Missing Items"],
  "App/Online": ["App Crash","Payment Issue","Wrong Order on App","Promo Not Applied"],
  "Pricing": ["Overcharged","Wrong Price on Menu","Hidden Fees"]
};


function updateSubCategoryOptions() {
  const cat = $("newFeedbackCategory")?.value || "";
  const subSelect = $("newSubCategory");
  if (!subSelect) return;
  const subs = SUB_CATEGORIES[cat] || [];
  subSelect.innerHTML = subs.length
    ? subs.map(s => `<option value="${s}">${s}</option>`).join("")
    : `<option value="">—</option>`;
}

const translations = {
  en: {
    brandEyebrow: "PFC Internal",
    brandTitleDefault: "CX Portal",
    brandSub: "Tickets • Branch Replies • Reports",
    workspace: "Workspace",
    navDashboardTitle: "Dashboard",
    navDashboardSub: "Overview & KPIs",
    navDashboardPill: "Live",
    navTicketsTitle: "Tickets",
    navTicketsSub: "Inbox & details",
    navTicketsPill: "Inbox",
    navReportsTitle: "Reports",
    navReportsSub: "Analytics & trends",
    navReportsPill: "Weekly",
    navSettingsTitle: "Settings",
    navSettingsSub: "Profile & portal",
    navSettingsPill: "UI",
    userTeamTitle: "CX Team",
    userTeamSub: "Customer Experience Operations",
    branchesBadge: "60+ Branches",
    btnThemeTxtDark: "Dark",
    btnThemeTxtLight: "Light",
    btnNewTicketTxt: "New Ticket",
    topbarEyebrow: "Customer Experience Portal",
    searchPlaceholder: "Search tickets, branches, customers...",
    btnRefreshTxt: "Refresh",
    btnExportTxt: "Export",
    pageDashboardTitle: "Dashboard",
    pageDashboardSub: "Monitor CX performance, ticket flow, and branch replies.",
    pageTicketsTitle: "Tickets Inbox",
    pageTicketsSub: "Search, filter, assign, and update branch replies in one place.",
    pageReportsTitle: "Reports",
    pageReportsSub: "Analytics area.",
    pageSettingsTitle: "Settings",
    pageSettingsSub: "Customize portal language, theme, and branding.",
    statOpenLabel: "Open Tickets",
    statRepliedLabel: "Branch Replied",
    statClosedLabel: "Closed Tickets",
    statAvgLabel: "Avg Response",
    overviewTitle: "Today Overview",
    kpiSub: "Live snapshot",
    connectedBadge: "Connected",
    chartLeftLabel: "Ticket Volume",
    chartRightLabel: "Live",
    quickActionsTitle: "Quick Actions",
    quickActionsSub: "What do you want to do now?",
    goTicketsTxt: "Go to Tickets Inbox",
    goReportsTxt: "Open Reports",
    goSettingsTxt: "Customize UI",
    currentSetupTitle: "Current Setup",
    currentSetupText: 'New Ticket inserts directly into <b>tickets</b> and sends email via Supabase Edge Function <b>send-branch-email</b>.',
    emailModeTitle: "Current Email Mode",
    emailModeText: "Direct test mode is active for reliable delivery during setup.",
    filtersTitle: "Filters",
    filterAllStatus: "All Status",
    filterOpen: "Open",
    filterInProgress: "In Progress",
    filterReplied: "Replied",
    filterClosed: "Closed",
    filterAllPriority: "All Priority",
    filterHigh: "High",
    filterMedium: "Medium",
    filterLow: "Low",
    filterBranchPlaceholder: "Branch contains...",
    slaFocusTitle: "SLA Focus",
    slaFocusText: "Track pending tickets, identify replies at risk, and monitor first-response compliance.",
    ticketsInboxTitle: "Tickets Inbox",
    ticketsInboxSub: "Live ticket stream across branches",
    detailEyebrow: "Ticket Details",
    detailTitleEmpty: "Select a ticket",
    detailSubEmpty: "Open a ticket to view details.",
    btnAssignTxt: "Assign",
    btnCloseTxt: "Close",
    btnAddNoteTxt: "Add Note",
    ticketInfoTitle: "Ticket Info",
    descriptionTitle: "Description",
    attachmentsTitle: "Attachments",
    branchReplyTitle: "Branch Reply",
    branchReplyPlaceholder: "Write branch reply here...",
    btnSaveReplyTxt: "Save Reply",
    btnMarkRepliedTxt: "Mark as Replied",
    timelineTitle: "Timeline",
    reportsTitle: "Reports",
    reportsSub: "Analytics area",
    reportsReadyTitle: "Ready for analytics",
    reportsReadyText: "Add Power BI, Excel export, SLA reports, complaint categories, and branch performance.",
    settingsMainTitle: "Settings",
    settingsMainSub: "Customize this portal UI",
    settingsItemProfile: "Profile",
    settingsItemBranding: "Branding",
    settingsItemNotifications: "Notifications",
    settingsItemPreferences: "Portal Preferences",
    settingsItemEmail: "Email Mode",
    newTicketEyebrow: "Create Ticket",
    newTicketTitle: "Create New Ticket",
    newTicketSub: "Enter customer complaint details and send to branch",
    btnCloseModalTxt: "Close",
    labelCustomerName: "Customer Name",
    labelCustomerPhone: "Customer Phone",
    labelBranchName: "Branch Name",
    labelBrand: "Brand",
    labelPriority: "Priority",
    labelFeedbackType: "Feedback Type",
    labelStatus: "Status",
    labelFeedbackCategory: "Feedback Category",
    labelSubCategory: "Sub Category",
    labelDescription: "Description",
    descriptionHelper: "Use branch dropdown selection. Current direct test email mode will still send to your email for setup verification.",
    labelAttachments: "Attachments",
    attachmentsHelper: "Upload images, PDFs, or documents. (Uploaded via Edge Function)",
    btnCancelTxt: "Cancel",
    btnCreateTxt: "Create Ticket",
    optionSelectBranch: "Select branch",
    ticketCount: "tickets",
    noTicketsFound: "No tickets found with current filters.",
    noAttachments: "No attachments.",
    noBranchReplyYet: "No branch reply yet.",
    replyByMeta: "Reply by",
    createdTimeline: "Ticket created",
    loadedFromDb: "Loaded from Supabase.",
    replyByBranchTimeline: "Reply by Branch",
    actionTakenTimeline: "Action taken",
    assignReady: "Assign action is ready for future connection.",
    addNoteReady: "Notes action is ready for future connection.",
    refreshedTitle: "Refreshed",
    refreshedText: "Tickets and branches reloaded from Supabase.",
    brandSavedTitle: "Brand saved",
    brandSavedText: "Portal title updated.",
    branchesLoadError: "Branches load error",
    ticketLoadError: "Load error",
    ticketLoadException: "Load exception",
    attachmentUploadError: "Attachment upload error",
    attachmentException: "Attachment exception",
    attachmentsTitleToast: "Attachments",
    emailFailed: "Email failed",
    emailSent: "Email sent",
    emailException: "Email exception",
    saveReplySuccess: "Reply saved",
    saveReplyText: "Reply saved in ticket_replies ✅",
    statusUpdated: "Status updated",
    ticketMarkedReplied: "Ticket marked as Replied ✅",
    closedTitle: "Closed",
    closedText: "Ticket marked as Closed ✅",
    exportReadyTitle: "Export ready",
    exportReadyText: "Open tickets exported for Excel successfully.",
    exportEmptyText: "No open/replied tickets to export.",
    pleaseSelectBranch: "Please select a branch first.",
    createSuccess: "Ticket created successfully ✅",
    pleaseSelectTicket: "Please select a ticket first.",
    writeReplyFirst: "Please write a reply first.",
    customerNameDefault: "Test Customer",
    customerPhoneDefault: "0500000000",
    feedbackTypeDefault: "WhatsApp",
    feedbackCategoryDefault: "test",
    subCategoryDefault: "test",
    descriptionDefault: "test",
    ticketInfoLabels: {
      ticket: "Ticket",
      status: "Status",
      priority: "Priority",
      branch: "Branch",
      category: "Category",
      source: "Source",
      customer: "Customer",
      phone: "Phone",
      assigned: "Assigned",
      created: "Created",
      sla: "SLA",
      slaStatus: "SLA Status"
    },
    settingsContent: {
      profileTitle: "Profile",
      profileSub: "User profile and account identity",
      profileBodyTitle: "Profile",
      profileBodyText: "Profile details area is ready for user name, role, branch scope, and account details.",
      brandingTitle: "Branding",
      brandingSub: "Update portal title and general interface identity",
      portalTitle: "Portal Title",
      save: "Save",
      emailModePanelTitle: "Email Mode",
      emailModePanelText: "Current code uses direct email mode for testing. Once confirmed, we can switch back to reading from the branches table.",
      notificationsTitle: "Notifications",
      notificationsSub: "Notification preferences and alerts",
      notificationsBodyTitle: "Notifications",
      notificationsBodyText: "Here later we can control branch reply alerts, SLA reminders, and admin notifications.",
      preferencesTitle: "Portal Preferences",
      preferencesSub: "Theme and language controls",
      preferencesBodyTitle: "Appearance",
      preferencesBodyText: "Theme is controlled from the sidebar. Language toggle is also controlled from the sidebar.",
      emailTitle: "Email Mode",
      emailSub: "Current outbound email behavior",
      emailBodyTitle: "Direct Test Email",
      emailBodyText: "The portal is currently sending branch emails to the configured test address for setup validation."
    }
  },

  ar: {
    brandEyebrow: "نظام داخلي",
    brandTitleDefault: "بوابة تجربة العميل",
    brandSub: "التذاكر • ردود الفروع • التقارير",
    workspace: "مساحة العمل",
    navDashboardTitle: "لوحة التحكم",
    navDashboardSub: "نظرة عامة ومؤشرات",
    navDashboardPill: "مباشر",
    navTicketsTitle: "التذاكر",
    navTicketsSub: "الصندوق والتفاصيل",
    navTicketsPill: "الوارد",
    navReportsTitle: "التقارير",
    navReportsSub: "التحليلات والاتجاهات",
    navReportsPill: "أسبوعي",
    navSettingsTitle: "الإعدادات",
    navSettingsSub: "الملف الشخصي والبوابة",
    navSettingsPill: "واجهة",
    userTeamTitle: "فريق تجربة العميل",
    userTeamSub: "عمليات تجربة العميل",
    branchesBadge: "60+ فرع",
    btnThemeTxtDark: "داكن",
    btnThemeTxtLight: "فاتح",
    btnNewTicketTxt: "تذكرة جديدة",
    topbarEyebrow: "بوابة تجربة العميل",
    searchPlaceholder: "ابحث في التذاكر والفروع والعملاء...",
    btnRefreshTxt: "تحديث",
    btnExportTxt: "تصدير",
    pageDashboardTitle: "لوحة التحكم",
    pageDashboardSub: "راقب أداء تجربة العميل، وحركة التذاكر، وردود الفروع.",
    pageTicketsTitle: "صندوق التذاكر",
    pageTicketsSub: "ابحث وفلتر وعيّن وحدّث ردود الفروع من مكان واحد.",
    pageReportsTitle: "التقارير",
    pageReportsSub: "منطقة التحليلات.",
    pageSettingsTitle: "الإعدادات",
    pageSettingsSub: "خصص اللغة والثيم والعلامة داخل البوابة.",
    statOpenLabel: "التذاكر المفتوحة",
    statRepliedLabel: "ردود الفروع",
    statClosedLabel: "التذاكر المغلقة",
    statAvgLabel: "متوسط الاستجابة",
    overviewTitle: "نظرة اليوم",
    kpiSub: "لقطة مباشرة",
    connectedBadge: "متصل",
    chartLeftLabel: "حجم التذاكر",
    chartRightLabel: "مباشر",
    quickActionsTitle: "إجراءات سريعة",
    quickActionsSub: "ماذا تريد أن تفعل الآن؟",
    goTicketsTxt: "الانتقال إلى صندوق التذاكر",
    goReportsTxt: "فتح التقارير",
    goSettingsTxt: "تخصيص الواجهة",
    currentSetupTitle: "الوضع الحالي",
    currentSetupText: 'إنشاء التذكرة يضيف مباشرة في جدول <b>tickets</b> ويرسل إيميل عبر Supabase Edge Function <b>send-branch-email</b>.',
    emailModeTitle: "وضع الإيميل الحالي",
    emailModeText: "وضع الإرسال التجريبي المباشر مفعل حاليًا لضمان وصول الرسائل أثناء الإعداد.",
    filtersTitle: "الفلاتر",
    filterAllStatus: "كل الحالات",
    filterOpen: "مفتوح",
    filterInProgress: "قيد المعالجة",
    filterReplied: "تم الرد",
    filterClosed: "مغلق",
    filterAllPriority: "كل الأولويات",
    filterHigh: "عالية",
    filterMedium: "متوسطة",
    filterLow: "منخفضة",
    filterBranchPlaceholder: "اسم الفرع يحتوي...",
    slaFocusTitle: "تركيز SLA",
    slaFocusText: "تابع التذاكر المعلقة، واكتشف الردود المعرضة للتأخر، وراقب الالتزام بأول رد.",
    ticketsInboxTitle: "صندوق التذاكر",
    ticketsInboxSub: "تدفق مباشر للتذاكر عبر الفروع",
    detailEyebrow: "تفاصيل التذكرة",
    detailTitleEmpty: "اختر تذكرة",
    detailSubEmpty: "افتح تذكرة لعرض التفاصيل.",
    btnAssignTxt: "إسناد",
    btnCloseTxt: "إغلاق",
    btnAddNoteTxt: "إضافة ملاحظة",
    ticketInfoTitle: "معلومات التذكرة",
    descriptionTitle: "الوصف",
    attachmentsTitle: "المرفقات",
    branchReplyTitle: "رد الفرع",
    branchReplyPlaceholder: "اكتب رد الفرع هنا...",
    btnSaveReplyTxt: "حفظ الرد",
    btnMarkRepliedTxt: "تعيين كتم الرد",
    timelineTitle: "التسلسل الزمني",
    reportsTitle: "التقارير",
    reportsSub: "منطقة التحليلات",
    reportsReadyTitle: "جاهز للتحليلات",
    reportsReadyText: "يمكن إضافة Power BI وتصدير Excel وتقارير SLA وتصنيفات الشكاوى وأداء الفروع.",
    settingsMainTitle: "الإعدادات",
    settingsMainSub: "خصص هذه البوابة",
    settingsItemProfile: "الملف الشخصي",
    settingsItemBranding: "الهوية",
    settingsItemNotifications: "التنبيهات",
    settingsItemPreferences: "تفضيلات البوابة",
    settingsItemEmail: "وضع الإيميل",
    newTicketEyebrow: "إنشاء تذكرة",
    newTicketTitle: "إنشاء تذكرة جديدة",
    newTicketSub: "أدخل تفاصيل شكوى العميل وأرسلها للفرع",
    btnCloseModalTxt: "إغلاق",
    labelCustomerName: "اسم العميل",
    labelCustomerPhone: "رقم العميل",
    labelBranchName: "اسم الفرع",
    labelBrand: "العلامة التجارية",
    labelPriority: "الأولوية",
    labelFeedbackType: "نوع المصدر",
    labelStatus: "الحالة",
    labelFeedbackCategory: "التصنيف الرئيسي",
    labelSubCategory: "التصنيف الفرعي",
    labelDescription: "الوصف",
    descriptionHelper: "اختر الفرع من القائمة. وضع الإيميل التجريبي الحالي سيستمر بالإرسال إلى بريدك للتحقق أثناء الإعداد.",
    labelAttachments: "المرفقات",
    attachmentsHelper: "ارفع صورًا أو ملفات PDF أو مستندات. (الرفع يتم عبر Edge Function)",
    btnCancelTxt: "إلغاء",
    btnCreateTxt: "إنشاء التذكرة",
    optionSelectBranch: "اختر الفرع",
    ticketCount: "تذكرة",
    noTicketsFound: "لا توجد تذاكر مطابقة للفلاتر الحالية.",
    noAttachments: "لا توجد مرفقات.",
    noBranchReplyYet: "لا يوجد رد من الفرع حتى الآن.",
    replyByMeta: "الرد بواسطة",
    createdTimeline: "تم إنشاء التذكرة",
    loadedFromDb: "تم تحميلها من Supabase.",
    replyByBranchTimeline: "رد من الفرع",
    actionTakenTimeline: "الإجراء المتخذ",
    assignReady: "خيار الإسناد جاهز للربط لاحقًا.",
    addNoteReady: "خيار الملاحظات جاهز للربط لاحقًا.",
    refreshedTitle: "تم التحديث",
    refreshedText: "تم إعادة تحميل التذاكر والفروع من Supabase.",
    brandSavedTitle: "تم حفظ الاسم",
    brandSavedText: "تم تحديث اسم البوابة.",
    branchesLoadError: "خطأ في تحميل الفروع",
    ticketLoadError: "خطأ في التحميل",
    ticketLoadException: "استثناء في التحميل",
    attachmentUploadError: "خطأ في رفع المرفق",
    attachmentException: "استثناء أثناء رفع المرفق",
    attachmentsTitleToast: "المرفقات",
    emailFailed: "فشل الإرسال",
    emailSent: "تم الإرسال",
    emailException: "استثناء في الإيميل",
    saveReplySuccess: "تم حفظ الرد",
    saveReplyText: "تم حفظ الرد في ticket_replies ✅",
    statusUpdated: "تم تحديث الحالة",
    ticketMarkedReplied: "تم تعيين التذكرة كتم الرد ✅",
    closedTitle: "تم الإغلاق",
    closedText: "تم إغلاق التذكرة ✅",
    exportReadyTitle: "تم تجهيز التصدير",
    exportReadyText: "تم تصدير التذاكر المفتوحة بصيغة مناسبة لـ Excel.",
    exportEmptyText: "لا توجد تذاكر مفتوحة أو تم الرد عليها للتصدير.",
    pleaseSelectBranch: "اختر الفرع أولًا.",
    createSuccess: "تم إنشاء التذكرة بنجاح ✅",
    pleaseSelectTicket: "اختر تذكرة أولًا.",
    writeReplyFirst: "اكتب الرد أولًا.",
    customerNameDefault: "عميل تجريبي",
    customerPhoneDefault: "0500000000",
    feedbackTypeDefault: "واتساب",
    feedbackCategoryDefault: "تجربة",
    subCategoryDefault: "تجربة",
    descriptionDefault: "تجربة",
    ticketInfoLabels: {
      ticket: "التذكرة",
      status: "الحالة",
      priority: "الأولوية",
      branch: "الفرع",
      category: "التصنيف",
      source: "المصدر",
      customer: "العميل",
      phone: "الهاتف",
      assigned: "المسند إليه",
      created: "تاريخ الإنشاء",
      sla: "المهلة",
      slaStatus: "حالة المهلة"
    },
    settingsContent: {
      profileTitle: "الملف الشخصي",
      profileSub: "بيانات المستخدم وهوية الحساب",
      profileBodyTitle: "الملف الشخصي",
      profileBodyText: "هذه المنطقة جاهزة لاحقًا لاسم المستخدم والدور ونطاق الفروع وبيانات الحساب.",
      brandingTitle: "الهوية",
      brandingSub: "تحديث اسم البوابة والهوية العامة للواجهة",
      portalTitle: "اسم البوابة",
      save: "حفظ",
      emailModePanelTitle: "وضع الإيميل",
      emailModePanelText: "الكود الحالي يستخدم وضع الإرسال المباشر للتجربة. بعد التأكد يمكننا الرجوع للقراءة من جدول الفروع.",
      notificationsTitle: "التنبيهات",
      notificationsSub: "إعدادات التنبيهات والإشعارات",
      notificationsBodyTitle: "التنبيهات",
      notificationsBodyText: "هنا لاحقًا يمكننا التحكم في تنبيهات ردود الفروع وتذكيرات SLA وإشعارات الإدارة.",
      preferencesTitle: "تفضيلات البوابة",
      preferencesSub: "إعدادات اللغة والثيم",
      preferencesBodyTitle: "المظهر",
      preferencesBodyText: "التحكم بالثيم من الشريط الجانبي، وكذلك تبديل اللغة من الشريط الجانبي.",
      emailTitle: "وضع الإيميل",
      emailSub: "سلوك الإرسال الحالي",
      emailBodyTitle: "الإيميل التجريبي المباشر",
      emailBodyText: "البوابة ترسل حاليًا رسائل الفروع إلى البريد التجريبي المحدد للتحقق أثناء الإعداد."
    }
  }
};

const state = {
  lang: "en",
  theme: "dark",
  brandTitle: "CX Portal",
  tickets: [],
  branches: [],
  repliesByTicketId: {},
  attachmentsByTicketId: {},
  selectedId: null,
  currentSettingsTab: "profile"
};

function tr(key) {
  return translations[state.lang]?.[key] ?? translations.en[key] ?? key;
}

function trSettings(key) {
  return translations[state.lang]?.settingsContent?.[key] ?? translations.en.settingsContent[key] ?? key;
}

function computeSlaDueAt(priority){
  let slaHours = 48;
  if (priority === "High") slaHours = 8;
  else if (priority === "Medium") slaHours = 24;
  else if (priority === "Low") slaHours = 48;
  return new Date(Date.now() + slaHours * 60 * 60 * 1000).toISOString();
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
  setTimeout(() => el.remove(), 5200);
}

function applyTheme(){
  document.body.setAttribute("data-theme", state.theme);
  $("btnThemeTxt").textContent = state.theme === "dark" ? tr("btnThemeTxtDark") : tr("btnThemeTxtLight");
}

function setStatusOptions() {
  $("filterStatus").innerHTML = `
    <option value="all">${tr("filterAllStatus")}</option>
    <option value="Open">${tr("filterOpen")}</option>
    <option value="In Progress">${tr("filterInProgress")}</option>
    <option value="Replied">${tr("filterReplied")}</option>
    <option value="Closed">${tr("filterClosed")}</option>
  `;

  $("newStatus").innerHTML = `
    <option value="Open">${tr("filterOpen")}</option>
    <option value="In Progress">${tr("filterInProgress")}</option>
    <option value="Replied">${tr("filterReplied")}</option>
    <option value="Closed">${tr("filterClosed")}</option>
  `;
}

function setPriorityOptions() {
  $("filterPriority").innerHTML = `
    <option value="all">${tr("filterAllPriority")}</option>
    <option value="High">${tr("filterHigh")}</option>
    <option value="Medium">${tr("filterMedium")}</option>
    <option value="Low">${tr("filterLow")}</option>
  `;

  $("newPriority").innerHTML = `
    <option value="High">High</option>
    <option value="Medium" selected>Medium</option>
    <option value="Low">Low</option>
  `;
}

function renderStaticTranslations(){
  $("brandEyebrow").textContent = tr("brandEyebrow");
  $("brandSub").textContent = tr("brandSub");
  $("workspaceLabel").textContent = tr("workspace");
  $("navDashboardTitle").textContent = tr("navDashboardTitle");
  $("navDashboardSub").textContent = tr("navDashboardSub");
  $("navDashboardPill").textContent = tr("navDashboardPill");
  $("navTicketsTitle").textContent = tr("navTicketsTitle");
  $("navTicketsSub").textContent = tr("navTicketsSub");
  $("navTicketsPill").textContent = tr("navTicketsPill");
  $("navReportsTitle").textContent = tr("navReportsTitle");
  $("navReportsSub").textContent = tr("navReportsSub");
  $("navReportsPill").textContent = tr("navReportsPill");
  $("navSettingsTitle").textContent = tr("navSettingsTitle");
  $("navSettingsSub").textContent = tr("navSettingsSub");
  $("navSettingsPill").textContent = tr("navSettingsPill");
  $("userTeamTitle").textContent = tr("userTeamTitle");
  $("userTeamSub").textContent = tr("userTeamSub");
  $("branchesBadge").textContent = tr("branchesBadge");
  $("btnNewTicketTxt").textContent = tr("btnNewTicketTxt");
  $("topbarEyebrow").textContent = tr("topbarEyebrow");
  $("globalSearch").placeholder = tr("searchPlaceholder");
  $("btnRefreshTxt").textContent = tr("btnRefreshTxt");
  $("btnExportTxt").textContent = tr("btnExportTxt");
  $("statOpenLabel").textContent = tr("statOpenLabel");
  $("statRepliedLabel").textContent = tr("statRepliedLabel");
  $("statClosedLabel").textContent = tr("statClosedLabel");
  $("statAvgLabel").textContent = tr("statAvgLabel");
  $("overviewTitle").textContent = tr("overviewTitle");
  $("kpiSub").textContent = tr("kpiSub");
  $("connectedBadge").innerHTML = `<span class="liveDot"></span>${tr("connectedBadge")}`;
  $("chartLeftLabel").textContent = tr("chartLeftLabel");
  $("chartRightLabel").textContent = tr("chartRightLabel");
  $("quickActionsTitle").textContent = tr("quickActionsTitle");
  $("quickActionsSub").textContent = tr("quickActionsSub");
  $("goTicketsTxt").textContent = tr("goTicketsTxt");
  $("goReportsTxt").textContent = tr("goReportsTxt");
  $("goSettingsTxt").textContent = tr("goSettingsTxt");
  $("currentSetupTitle").textContent = tr("currentSetupTitle");
  $("currentSetupText").innerHTML = tr("currentSetupText");
  $("emailModeTitle").textContent = tr("emailModeTitle");
  $("emailModeText").textContent = tr("emailModeText");
  $("filtersTitle").textContent = tr("filtersTitle");
  $("filterBranch").placeholder = tr("filterBranchPlaceholder");
  $("slaFocusTitle").textContent = tr("slaFocusTitle");
  $("slaFocusText").textContent = tr("slaFocusText");
  $("ticketsInboxTitle").textContent = tr("ticketsInboxTitle");
  $("ticketsInboxSub").textContent = tr("ticketsInboxSub");
  $("detailEyebrow").textContent = tr("detailEyebrow");
  $("btnAssignTxt").textContent = tr("btnAssignTxt");
  $("btnCloseTxt").textContent = tr("btnCloseTxt");
  $("btnAddNoteTxt").textContent = tr("btnAddNoteTxt");
  $("ticketInfoTitle").textContent = tr("ticketInfoTitle");
  $("descriptionTitle").textContent = tr("descriptionTitle");
  $("attachmentsTitle").textContent = tr("attachmentsTitle");
  $("branchReplyTitle").textContent = tr("branchReplyTitle");
  $("branchReply").placeholder = tr("branchReplyPlaceholder");
  $("btnSaveReplyTxt").textContent = tr("btnSaveReplyTxt");
  $("btnMarkRepliedTxt").textContent = tr("btnMarkRepliedTxt");
  $("timelineTitle").textContent = tr("timelineTitle");
  $("reportsTitle").textContent = tr("reportsTitle");
  $("reportsSub").textContent = tr("reportsSub");
  $("reportsReadyTitle").textContent = tr("reportsReadyTitle");
  $("reportsReadyText").textContent = tr("reportsReadyText");
  $("settingsMainTitle").textContent = tr("settingsMainTitle");
  $("settingsMainSub").textContent = tr("settingsMainSub");
  $("settingsItemProfile").textContent = tr("settingsItemProfile");
  $("settingsItemBranding").textContent = tr("settingsItemBranding");
  $("settingsItemNotifications").textContent = tr("settingsItemNotifications");
  $("settingsItemPreferences").textContent = tr("settingsItemPreferences");
  $("settingsItemEmail").textContent = tr("settingsItemEmail");
  $("newTicketEyebrow").textContent = tr("newTicketEyebrow");
  $("newTicketTitle").textContent = tr("newTicketTitle");
  $("newTicketSub").textContent = tr("newTicketSub");
  $("btnCloseModalTxt").textContent = tr("btnCloseModalTxt");
  $("labelCustomerName").textContent = tr("labelCustomerName");
  $("labelCustomerPhone").textContent = tr("labelCustomerPhone");
  $("labelBranchName").textContent = tr("labelBranchName");
  $("labelBrand").textContent = tr("labelBrand");
  $("labelPriority").textContent = tr("labelPriority");
  $("labelFeedbackType").textContent = tr("labelFeedbackType");
  $("labelStatus").textContent = tr("labelStatus");
  $("labelFeedbackCategory").textContent = tr("labelFeedbackCategory");
  $("labelSubCategory").textContent = tr("labelSubCategory");
  $("labelDescription").textContent = tr("labelDescription");
  $("descriptionHelper").textContent = tr("descriptionHelper");
  $("labelAttachments").textContent = tr("labelAttachments");
  $("attachmentsHelper").textContent = tr("attachmentsHelper");
  $("btnCancelTxt").textContent = tr("btnCancelTxt");
  $("btnCreateTxt").textContent = tr("btnCreateTxt");

  setStatusOptions();
  setPriorityOptions();
}

function applyLang(){
  const isAr = state.lang === "ar";
  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  $("btnLang").innerHTML = (isAr ? "🇸🇦" : "🇺🇸") + ` <span id="btnLangTxt">${state.lang.toUpperCase()}</span>`;
  $("brandTitle").textContent = state.brandTitle;
  renderStaticTranslations();
  applyTheme();
  setView(currentView());
  renderBranchOptions();
  renderSettingsContent();
  renderTickets();
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

  $("kpiOpenT").textContent = state.lang === "ar" ? `${open} نشطة` : `${open} active`;
  $("kpiRepliedT").textContent = state.lang === "ar" ? `${replied} تم الرد` : `${replied} replied`;
  $("kpiClosedT").textContent = state.lang === "ar" ? `${closed} مغلقة` : `${closed} closed`;
  $("kpiAvgT").textContent = tr("chartRightLabel");

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

async function loadBranches() {
  const { data, error } = await supabaseClient
    .from("branches")
    .select("*")
    .order("branch_name", { ascending: true });

  if (error) {
    console.error("Error loading branches:", error);
    showToast(tr("branchesLoadError"), error.message || "Could not load branches", "bad");
    return;
  }

  state.branches = data || [];
  renderBranchOptions();
}

function renderBranchOptions() {
  const branchSelect = $("newBranchName");
  if (!branchSelect) return;

  const currentValue = branchSelect.value || "";
  branchSelect.innerHTML = `<option value="">${tr("optionSelectBranch")}</option>`;

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
      const key = a.ticket_uuid || null;
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

      const response = await fetch(`${SUPABASE_URL}/functions/v1/upload-ticket-attachment`, {
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
          source: "cx",
          uploaded_by: "cx portal",
          file_base64: base64
        })
      });

      const rawText = await response.text();
      let result = {};
      try { result = rawText ? JSON.parse(rawText) : {}; } catch { result = { raw: rawText }; }

      if (!response.ok) {
        const msg = result?.error || result?.raw || JSON.stringify(result);
        console.error("upload-ticket-attachment failed:", msg, result);
        showToast(tr("attachmentUploadError"), msg, "bad");
        failed += 1;
        continue;
      }

      uploaded += 1;
      if (result?.attachment) attachments.push(result.attachment);
    } catch (e) {
      console.error("uploadAttachmentsViaFunction exception:", e);
      showToast(tr("attachmentException"), e?.message || String(e), "bad");
      failed += 1;
    }
  }

  try { if ($("newTicketAttachments")) $("newTicketAttachments").value = ""; } catch {}
  return { uploaded, failed, attachments };
}

async function loadTickets(){
  try{
    $("systemMsg").textContent = state.lang === "ar" ? "جاري تحميل التذاكر..." : "Loading tickets...";
    await loadReplies();
    await loadAttachments();

    const { data, error } = await supabaseClient
      .from("tickets")
      .select("*")
      .order("created_at", { ascending:false });

    if(error){
      console.error("Supabase load error:", error);
      $("systemMsg").textContent = (state.lang === "ar" ? "خطأ في التحميل: " : "Load error: ") + (error.message || "Unknown error");
      showToast(tr("ticketLoadError"), error.message || "Unknown load error", "bad");
      return;
    }

    state.tickets = (data || []).map(r => {
      const rowId = r.id || null;
      const createdAt = r.created_at ? new Date(r.created_at).getTime() : Date.now();
      const ticketIdLabel = (r.ticket_no !== null && r.ticket_no !== undefined) ? `#${r.ticket_no}` : (rowId ? "#" + String(rowId).slice(0,8) : "#—");
      const replies = state.repliesByTicketId[rowId] || [];
      const latestReply = replies.length ? replies[replies.length - 1] : null;

      const timeline = [
        { t: tr("createdTimeline"), d: tr("loadedFromDb"), m: fmtDate(createdAt) }
      ];

      replies.forEach(rep => {
        timeline.push({ t: tr("replyByBranchTimeline"), d: rep.reply_text || "—", m: fmtDate(rep.created_at) });
        if (rep.action_taken) timeline.push({ t: tr("actionTakenTimeline"), d: rep.action_taken, m: fmtDate(rep.created_at) });
      });

      const attachments = state.attachmentsByTicketId[rowId] || [];
      const slaDueAt = r.sla_due_at ? new Date(r.sla_due_at).getTime() : null;
      const now = Date.now();

      let slaComputedStatus = r.sla_status || "pending";
      let slaRemainingText = "—";

      if (slaDueAt) {
        const diffMs = slaDueAt - now;

        if ((slaComputedStatus === "pending" || !slaComputedStatus) && diffMs < 0) {
          slaComputedStatus = "breached";
        }

        const abs = Math.abs(diffMs);
        const h = Math.floor(abs / (1000 * 60 * 60));
        const m = Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60));

        slaRemainingText = diffMs >= 0
          ? (state.lang === "ar" ? `متبقي ${h}س ${m}د` : `Remaining ${h}h ${m}m`)
          : (state.lang === "ar" ? `متأخر ${h}س ${m}د` : `Overdue ${h}h ${m}m`);
      }

      return {
        rowId,
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
        slaDueAt,
        slaComputedStatus,
        slaRemainingText,
        raw: r
      };
    });

    if ((!state.selectedId || !state.tickets.find(x => x.rowId === state.selectedId)) && state.tickets.length) {
      state.selectedId = state.tickets[0].rowId;
    }

    computeKPIs();
    if (currentView() === "tickets") renderTickets();
    $("systemMsg").textContent = state.lang === "ar"
      ? `تم الاتصال. تم تحميل ${state.tickets.length} تذكرة.`
      : `Connected. Loaded ${state.tickets.length} ticket(s).`;
  }catch(e){
    console.error("loadTickets exception:", e);
    $("systemMsg").textContent = (state.lang === "ar" ? "استثناء: " : "Exception: ") + (e.message || e);
    showToast(tr("ticketLoadException"), e.message || String(e), "bad");
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
  $("resultCount").textContent = `${list.length} ${tr("ticketCount")}`;

  if (!state.selectedId && list[0]) state.selectedId = list[0].rowId;
  rows.innerHTML = "";

  if (!list.length) {
    rows.innerHTML = `<div class="emptyState">${tr("noTicketsFound")}</div>`;
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
    $("detailTitle").textContent = tr("detailTitleEmpty");
    $("detailSub").textContent = tr("detailSubEmpty");
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

  const labels = tr("ticketInfoLabels");
  const info = [
    [labels.ticket, t.id],
    [labels.status, t.status],
    [labels.priority, t.priority],
    [labels.branch, t.branch],
    [labels.category, t.category],
    [labels.source, t.source],
    [labels.customer, t.customerName],
    [labels.phone, t.customerPhone],
    [labels.assigned, t.assignedTo || "—"],
    [labels.created, fmtDate(t.createdAt)],
    [labels.sla, t.slaRemainingText || "—"],
    [labels.slaStatus, t.slaComputedStatus || "pending"],
  ];

  $("ticketInfo").innerHTML = (info || [])
    .filter(x => Array.isArray(x) && x.length >= 2)
    .map(([k,v]) => `<div><b>${k}:</b> ${v}</div>`)
    .join("");

  $("ticketDesc").textContent = t.description || "—";
  $("branchReply").value = t.branchReply || "";

  if (t.replyAt) $("replyMeta").textContent = `${tr("replyByMeta")} ${t.replyBy || "Branch"} • ${fmtDate(t.replyAt)}`;
  else $("replyMeta").textContent = tr("noBranchReplyYet");

  const attWrap = $("ticketAttachmentsList");
  if (attWrap) {
    const files = t.attachments || [];
    if (!files.length) {
      attWrap.innerHTML = `<div style="color:var(--muted2);font-size:12px">${tr("noAttachments")}</div>`;
    } else {
      attWrap.innerHTML = files.map(f => {
        const url = f.public_url || f.file_url || f.url || "#";
        const name = f.file_name || "file";
        const tag = f.source ? ` <span style="opacity:.65;font-size:11px">(${f.source})</span>` : "";
        return `<div><a href="${url}" target="_blank" style="color:var(--brand2);text-decoration:underline">${name}</a>${tag}</div>`;
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

function setView(view){
  ["dashboard","tickets","reports","settings"].forEach(v => {
    $("view-" + v).style.display = (v === view) ? "" : "none";
    const btn = document.querySelector(`.nav button[data-view="${v}"]`);
    if (btn) btn.classList.toggle("active", v === view);
  });

  if (view === "dashboard") {
    $("pageTitle").textContent = tr("pageDashboardTitle");
    $("pageSub").textContent = tr("pageDashboardSub");
  }

  if (view === "tickets") {
    $("pageTitle").textContent = tr("pageTicketsTitle");
    $("pageSub").textContent = tr("pageTicketsSub");
    renderTickets();
  }

  if (view === "reports") {
    $("pageTitle").textContent = tr("pageReportsTitle");
    $("pageSub").textContent = tr("pageReportsSub");
  }

  if (view === "settings") {
    $("pageTitle").textContent = tr("pageSettingsTitle");
    $("pageSub").textContent = tr("pageSettingsSub");
    renderSettingsContent();
  }
}

function renderSettingsContent(){
  const wrap = $("settingsContent");
  if (!wrap) return;

  const tab = state.currentSettingsTab;

  if (tab === "profile") {
    wrap.innerHTML = `
      <div class="card">
        <div class="cardHeader">
          <div>
            <div class="h">${trSettings("profileTitle")}</div>
            <div class="s">${trSettings("profileSub")}</div>
          </div>
        </div>
        <div class="cardBody">
          <div class="panel">
            <div class="ph">${trSettings("profileBodyTitle")}</div>
            <div class="panelText">${trSettings("profileBodyText")}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (tab === "branding") {
    wrap.innerHTML = `
      <div class="card">
        <div class="cardHeader">
          <div>
            <div class="h">${trSettings("brandingTitle")}</div>
            <div class="s">${trSettings("brandingSub")}</div>
          </div>
        </div>
        <div class="cardBody">
          <div class="panel">
            <div class="ph">${trSettings("portalTitle")}</div>
            <div class="fieldRow">
              <input class="chipInput" id="brandInput" placeholder="${trSettings("portalTitle")}" value="${state.brandTitle}" />
              <button class="btn primary" id="saveBrand">💾 ${trSettings("save")}</button>
            </div>
          </div>
          <div class="panel">
            <div class="ph">${trSettings("emailModePanelTitle")}</div>
            <div class="helper">${trSettings("emailModePanelText")}</div>
          </div>
        </div>
      </div>
    `;

    const saveBtn = $("saveBrand");
    if (saveBtn) {
      saveBtn.onclick = () => {
        const v = $("brandInput")?.value?.trim();
        if (v) {
          state.brandTitle = v;
          $("brandTitle").textContent = v;
          showToast(tr("brandSavedTitle"), tr("brandSavedText"), "good");
        }
      };
    }
  }

  if (tab === "notifications") {
    wrap.innerHTML = `
      <div class="card">
        <div class="cardHeader">
          <div>
            <div class="h">${trSettings("notificationsTitle")}</div>
            <div class="s">${trSettings("notificationsSub")}</div>
          </div>
        </div>
        <div class="cardBody">
          <div class="panel">
            <div class="ph">${trSettings("notificationsBodyTitle")}</div>
            <div class="panelText">${trSettings("notificationsBodyText")}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (tab === "preferences") {
    wrap.innerHTML = `
      <div class="card">
        <div class="cardHeader">
          <div>
            <div class="h">${trSettings("preferencesTitle")}</div>
            <div class="s">${trSettings("preferencesSub")}</div>
          </div>
        </div>
        <div class="cardBody">
          <div class="panel">
            <div class="ph">${trSettings("preferencesBodyTitle")}</div>
            <div class="panelText">${trSettings("preferencesBodyText")}</div>
          </div>
        </div>
      </div>
    `;
  }

  if (tab === "email") {
    wrap.innerHTML = `
      <div class="card">
        <div class="cardHeader">
          <div>
            <div class="h">${trSettings("emailTitle")}</div>
            <div class="s">${trSettings("emailSub")}</div>
          </div>
        </div>
        <div class="cardBody">
          <div class="panel">
            <div class="ph">${trSettings("emailBodyTitle")}</div>
            <div class="panelText">${trSettings("emailBodyText")}</div>
          </div>
        </div>
      </div>
    `;
  }

  document.querySelectorAll(".settingsItem").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.settings === state.currentSettingsTab);
  });
}

function initSettingsMenu() {
  document.querySelectorAll(".settingsItem").forEach(item => {
    item.addEventListener("click", () => {
      state.currentSettingsTab = item.dataset.settings;
      renderSettingsContent();
    });
  });
}

function openNewTicketModal(){
  $("newTicketModal").classList.add("show");
  $("newTicketModal").setAttribute("aria-hidden", "false");
  updateSubCategoryOptions();
}

function closeTicketModal(){
  $("newTicketModal").classList.remove("show");
  $("newTicketModal").setAttribute("aria-hidden", "true");
}

function getNewTicketPayload(){
  const priority = $("newPriority").value || "Medium";

  return {
    customer_name: ($("newCustomerName").value || tr("customerNameDefault")).trim() || tr("customerNameDefault"),
    customer_phone: ($("newCustomerPhone").value || tr("customerPhoneDefault")).trim() || tr("customerPhoneDefault"),
    branch_name: ($("newBranchName").value || "").trim(),
    brand: ($("newBrand").value || "").trim(),
    feedback_type: ($("newFeedbackType").value || "").trim(),
    feedback_category: ($("newFeedbackCategory").value || "").trim(),
    sub_category: ($("newSubCategory").value || "").trim(),
    description: ($("newDescription").value || tr("descriptionDefault")).trim() || tr("descriptionDefault"),
    priority,
    status: $("newStatus").value || "Open",
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

    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-branch-email`, {
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
        brand: ticket.brand,
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
    });

    const rawText = await response.text();
    let result = {};
    try { result = rawText ? JSON.parse(rawText) : {}; } catch { result = { raw: rawText }; }

    if (!response.ok || !result?.success) {
      showToast(tr("emailFailed"), result?.error || result?.raw || "Unknown error", "bad");
      console.error("send-branch-email failed:", result);
      return false;
    }

    showToast(
      tr("emailSent"),
      state.lang === "ar"
        ? `تم الإرسال إلى ${DIRECT_TEST_EMAIL} ✅`
        : `Sent to ${DIRECT_TEST_EMAIL} ✅`,
      "good"
    );

    return true;
  } catch (e) {
    console.error("sendBranchEmail exception:", e);
    showToast(tr("emailException"), e.message || String(e), "bad");
    return false;
  }
}

async function createTicket(){
  try{
    const payload = getNewTicketPayload();

    if (!payload.branch_name) {
      alert(tr("pleaseSelectBranch"));
      return;
    }

    let { data, error } = await supabaseClient
      .from("tickets")
      .insert([payload])
      .select("*");

    // If new columns don't exist yet in the schema, retry without them
    if (error && error.message && error.message.includes("schema cache")) {
      console.warn("Schema mismatch — retrying without new columns:", error.message);
      const { brand, feedback_type, feedback_category, sub_category, ...basePayload } = payload;
      ({ data, error } = await supabaseClient
        .from("tickets")
        .insert([basePayload])
        .select("*"));
    }

    if(error){
      console.error("Insert error:", error);
      alert((state.lang === "ar" ? "فشل إنشاء التذكرة: " : "Ticket creation failed: ") + (error.message || "Unknown error"));
      return;
    }

    if (data && data[0]) {
      if (data[0].id) state.selectedId = data[0].id;

      const attachmentResult = await uploadAttachmentsViaFunction(data[0]);
      if (attachmentResult.failed > 0) showToast(tr("attachmentsTitleToast"), `${state.lang === "ar" ? "فشل:" : "Failed:"} ${attachmentResult.failed}`, "bad");
      else if (attachmentResult.uploaded > 0) showToast(tr("attachmentsTitleToast"), `${state.lang === "ar" ? "تم الرفع:" : "Uploaded:"} ${attachmentResult.uploaded}`, "good");

      await sendBranchEmail(data[0], attachmentResult.attachments || []);
    }

    closeTicketModal();
    await loadTickets();
    setView("tickets");
    renderTickets();
    alert(tr("createSuccess"));
  }catch(e){
    console.error("createTicket exception:", e);
    alert((state.lang === "ar" ? "استثناء: " : "Exception: ") + (e.message || e));
  }
}

async function saveReply(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert(tr("pleaseSelectTicket"));
    return;
  }

  const replyText = ($("branchReply").value || "").trim();
  if (!replyText) {
    alert(tr("writeReplyFirst"));
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
      alert((state.lang === "ar" ? "فشل حفظ الرد: " : "Save reply failed: ") + (error.message || "Unknown error"));
      return;
    }

    showToast(tr("saveReplySuccess"), tr("saveReplyText"), "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("saveReply exception:", e);
    alert((state.lang === "ar" ? "استثناء: " : "Exception: ") + (e.message || e));
  }
}

async function markReplied(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert(tr("pleaseSelectTicket"));
    return;
  }

  try{
    const { error } = await supabaseClient
      .from("tickets")
      .update({ status:"Replied" })
      .eq("id", t.rowId);

    if(error){
      console.error("Mark replied error:", error);
      alert((state.lang === "ar" ? "فشل تحديث الحالة: " : "Mark replied failed: ") + (error.message || "Unknown error"));
      return;
    }

    showToast(tr("statusUpdated"), tr("ticketMarkedReplied"), "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("markReplied exception:", e);
    alert((state.lang === "ar" ? "استثناء: " : "Exception: ") + (e.message || e));
  }
}

async function closeTicket(){
  const t = (state.tickets || []).find(x => x.rowId === state.selectedId);
  if (!t || !t.rowId) {
    alert(tr("pleaseSelectTicket"));
    return;
  }

  try{
    const { error } = await supabaseClient
      .from("tickets")
      .update({ status:"Closed" })
      .eq("id", t.rowId);

    if(error){
      console.error("Close ticket error:", error);
      alert((state.lang === "ar" ? "فشل الإغلاق: " : "Close failed: ") + (error.message || "Unknown error"));
      return;
    }

    showToast(tr("closedTitle"), tr("closedText"), "good");
    await loadTickets();
    renderTickets();
  }catch(e){
    console.error("closeTicket exception:", e);
    alert((state.lang === "ar" ? "استثناء: " : "Exception: ") + (e.message || e));
  }
}

function assignTicket(){ showToast(tr("btnAssignTxt"), tr("assignReady"), "good"); }
function addNote(){ showToast(tr("btnAddNoteTxt"), tr("addNoteReady"), "good"); }

function exportJSON(){
  const rows = (state.tickets || [])
    .filter(t => t.status !== "Closed")
    .map(t => ({
      "Ticket No": t.ticketNo ?? "",
      "Ticket Label": t.id ?? "",
      "Status": t.status ?? "",
      "Priority": t.priority ?? "",
      "Branch": t.branch ?? "",
      "Category": t.category ?? "",
      "Sub Category": t.subCategory ?? "",
      "Source": t.source ?? "",
      "Customer Name": t.customerName ?? "",
      "Customer Phone": t.customerPhone ?? "",
      "Description": (t.description || "").replace(/\n/g, " "),
      "Branch Reply": (t.branchReply || "").replace(/\n/g, " "),
      "Reply By": t.replyBy ?? "",
      "Reply At": t.replyAt ? fmtDate(t.replyAt) : "",
      "Created At": t.createdAt ? fmtDate(t.createdAt) : "",
      "SLA": t.slaRemainingText ?? "",
      "SLA Status": t.slaComputedStatus ?? ""
    }));

  if (!rows.length) {
    showToast(tr("btnExportTxt"), tr("exportEmptyText"), "bad");
    return;
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(row =>
      headers.map(h => {
        const val = row[h] ?? "";
        const safe = String(val).replace(/"/g, '""');
        return `"${safe}"`;
      }).join(",")
    )
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `cx_open_tickets_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);

  showToast(tr("exportReadyTitle"), tr("exportReadyText"), "good");
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

$("newFeedbackCategory").addEventListener("change", updateSubCategoryOptions);

$("globalSearch").addEventListener("input", renderTickets);

$("btnTheme").onclick = () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
};

$("btnLang").onclick = () => {
  state.lang = state.lang === "en" ? "ar" : "en";
  applyLang();
};

$("btnNewTicket").onclick = openNewTicketModal;
$("btnCloseNewTicketModal").onclick = closeTicketModal;
$("btnCancelNewTicket").onclick = closeTicketModal;
$("btnSubmitNewTicket").onclick = createTicket;

$("btnRefresh").onclick = async () => {
  await loadBranches();
  await loadTickets();
  renderTickets();
  showToast(tr("refreshedTitle"), tr("refreshedText"), "good");
};

$("btnExport").onclick = exportJSON;
$("btnSaveReply").onclick = saveReply;
$("btnMarkReplied").onclick = markReplied;
$("btnClose").onclick = closeTicket;
$("btnAssign").onclick = assignTicket;
$("btnAddNote").onclick = addNote;

$("newTicketModal").addEventListener("click", (e) => {
  if (e.target.id === "newTicketModal") closeTicketModal();
});

(async function init(){
  applyTheme();
  renderStaticTranslations();
  initSettingsMenu();
  renderSettingsContent();
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

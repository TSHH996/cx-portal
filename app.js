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
      brand: "Brand",
      category: "Feedback Category",
      subCategory: "Sub Category",
      source: "Feedback Type",
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
      brand: "العلامة التجارية",
      category: "التصنيف الرئيسي",
      subCategory: "التصنيف الفرعي",
      source: "نوع المصدر",
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
  currentSettingsTab: "profile",
  reportFilters: { dateFrom: "", dateTo: "", brand: "all", status: "all", source: "all", priority: "all", slaStatus: "all", category: "all" },
  currentReportTab: "executive"
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
  renderDashboardFilterCopy();
}

function renderDashboardFilterCopy(){
  const isAr = state.lang === "ar";
  const labels = {
    period: isAr ? "الفترة" : "Period",
    status: isAr ? "الحالة" : "Status",
    priority: isAr ? "الأولوية" : "Priority",
    branchCity: isAr ? "الفرع / المدينة" : "Branch / City",
    reset: isAr ? "إعادة تعيين" : "Reset",
    allTime: isAr ? "كل الوقت" : "All Time",
    last24: isAr ? "آخر 24 ساعة" : "Last 24h",
    last7: isAr ? "آخر 7 أيام" : "Last 7 days",
    last30: isAr ? "آخر 30 يومًا" : "Last 30 days",
    branchPlaceholder: isAr ? "فلترة حسب الفرع أو المدينة" : "Filter by branch or city"
  };

  const q = (selector) => document.querySelector(selector);

  if (q('label[for="dashRange"]')) q('label[for="dashRange"]').textContent = labels.period;
  if (q('label[for="dashStatus"]')) q('label[for="dashStatus"]').textContent = labels.status;
  if (q('label[for="dashPriority"]')) q('label[for="dashPriority"]').textContent = labels.priority;
  if (q('label[for="dashBranch"]')) q('label[for="dashBranch"]').textContent = labels.branchCity;
  if ($("dashResetFilters")) $("dashResetFilters").textContent = labels.reset;
  if ($("dashBranch")) $("dashBranch").placeholder = labels.branchPlaceholder;

  if ($("dashRange")) {
    const opts = $("dashRange").options;
    if (opts[0]) opts[0].text = labels.allTime;
    if (opts[1]) opts[1].text = labels.last24;
    if (opts[2]) opts[2].text = labels.last7;
    if (opts[3]) opts[3].text = labels.last30;
  }
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
  computeKPIs();
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

function getDashCopy(){
  return state.lang === "ar"
    ? {
        total: "إجمالي التذاكر",
        open: "التذاكر المفتوحة",
        closed: "التذاكر المغلقة",
        near: "قرب انتهاء SLA",
        overdue: "تذاكر متأخرة",
        inView: "ضمن العرض الحالي",
        unresolved: "غير مغلقة",
        completed: "مغلقة",
        atRisk: "معرضة للتأخير",
        breached: "متجاوزة SLA",
        asOf: "آخر تحديث",
        chartRight: "تذكرة"
      }
    : {
        total: "Total Tickets",
        open: "Open Tickets",
        closed: "Closed Tickets",
        near: "Near SLA Breach",
        overdue: "Overdue Tickets",
        inView: "in current view",
        unresolved: "unresolved",
        completed: "completed",
        atRisk: "at risk",
        breached: "breached",
        asOf: "As of",
        chartRight: "tickets"
      };
}

function getTicketCity(ticket){
  const raw = ticket?.raw || {};
  return raw.city || raw.branch_city || raw.city_name || raw.branch_city_name || "Unspecified";
}

function getDashboardFilteredTickets(){
  const range = $("dashRange")?.value || "7d";
  const status = $("dashStatus")?.value || "all";
  const priority = $("dashPriority")?.value || "all";
  const q = ($("dashBranch")?.value || "").toLowerCase().trim();
  const now = Date.now();

  let list = [...(state.tickets || [])];

  if (range !== "all") {
    let ms = 0;
    if (range === "24h") ms = 24 * 60 * 60 * 1000;
    if (range === "7d") ms = 7 * 24 * 60 * 60 * 1000;
    if (range === "30d") ms = 30 * 24 * 60 * 60 * 1000;
    if (ms > 0) {
      const threshold = now - ms;
      list = list.filter(t => (t.createdAt || 0) >= threshold);
    }
  }

  if (status !== "all") list = list.filter(t => t.status === status);
  if (priority !== "all") list = list.filter(t => t.priority === priority);

  if (q) {
    list = list.filter(t => {
      const branch = String(t.branch || "").toLowerCase();
      const city = String(getTicketCity(t) || "").toLowerCase();
      return branch.includes(q) || city.includes(q);
    });
  }

  return list;
}

function countBy(items, keyGetter, limit = 6){
  const bucket = {};
  items.forEach(item => {
    const label = (keyGetter(item) || "Unspecified").toString().trim() || "Unspecified";
    bucket[label] = (bucket[label] || 0) + 1;
  });
  const total = items.length || 1;
  return Object.entries(bucket)
    .sort((a,b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({
      label,
      count,
      pct: Math.round((count / total) * 100)
    }));
}

function renderBreakdown(containerId, rows){
  const wrap = $(containerId);
  if (!wrap) return;
  if (!rows.length) {
    wrap.innerHTML = `<div class="emptyDash">${state.lang === "ar" ? "لا توجد بيانات" : "No data available"}</div>`;
    return;
  }

  wrap.innerHTML = rows.map(r => `
    <div class="breakdownRow">
      <div class="breakdownHead">
        <span>${r.label}</span>
        <span>${r.count} (${r.pct}%)</span>
      </div>
      <div class="breakdownTrack">
        <div class="breakdownFill" style="width:${Math.max(4, r.pct)}%"></div>
      </div>
    </div>
  `).join("");
}

function renderCompact(containerId, rows, metaText){
  const wrap = $(containerId);
  if (!wrap) return;
  if (!rows.length) {
    wrap.innerHTML = `<div class="emptyDash">${state.lang === "ar" ? "لا توجد بيانات" : "No data available"}</div>`;
    return;
  }

  wrap.innerHTML = rows.map(r => `
    <div class="compactRow">
      <div class="compactHead">
        <span>${r.label}</span>
        <span>${r.count}</span>
      </div>
      <div class="compactMeta">${metaText(r)}</div>
    </div>
  `).join("");
}

function renderOperationalAlerts(filtered, near, overdue){
  const wrap = $("dashboardAlerts");
  if (!wrap) return;

  const highOpen = filtered.filter(t => t.priority === "High" && t.status !== "Closed").length;
  const missingSla = filtered.filter(t => t.status !== "Closed" && !t.slaDueAt).length;
  const alerts = [];

  if (overdue > 0) {
    alerts.push({
      cls: "bad",
      title: state.lang === "ar" ? "تذاكر تجاوزت SLA" : "Tickets breached SLA",
      meta: state.lang === "ar" ? `${overdue} تحتاج تصعيد فوري` : `${overdue} require immediate escalation`
    });
  }
  if (near > 0) {
    alerts.push({
      cls: "warn",
      title: state.lang === "ar" ? "تذاكر قرب انتهاء SLA" : "Tickets near SLA breach",
      meta: state.lang === "ar" ? `${near} معرضة للتأخير` : `${near} are at risk`
    });
  }
  if (highOpen > 0) {
    alerts.push({
      cls: "warn",
      title: state.lang === "ar" ? "أولوية عالية مفتوحة" : "High priority still open",
      meta: state.lang === "ar" ? `${highOpen} تذكرة بانتظار المعالجة` : `${highOpen} tickets waiting for action`
    });
  }
  if (missingSla > 0) {
    alerts.push({
      cls: "warn",
      title: state.lang === "ar" ? "تذاكر بدون SLA" : "Tickets missing SLA target",
      meta: state.lang === "ar" ? `${missingSla} تحتاج تحديد موعد SLA` : `${missingSla} need SLA due date`
    });
  }

  if (!alerts.length) {
    wrap.innerHTML = `<div class="emptyDash">${state.lang === "ar" ? "لا توجد تنبيهات حرجة حالياً" : "No critical alerts at the moment."}</div>`;
    return;
  }

  wrap.innerHTML = alerts.map(a => `
    <div class="alertRow ${a.cls}">
      <div class="compactHead"><span>${a.title}</span></div>
      <div class="alertMeta">${a.meta}</div>
    </div>
  `).join("");
}

function renderRecentActivity(filtered){
  const wrap = $("dashboardRecentActivity");
  if (!wrap) return;

  const prioritized = [...filtered].sort((a,b) => {
    const aRisk = (a.slaComputedStatus === "breached" || (a.slaDueAt && a.slaDueAt < Date.now())) ? 1 : 0;
    const bRisk = (b.slaComputedStatus === "breached" || (b.slaDueAt && b.slaDueAt < Date.now())) ? 1 : 0;
    if (aRisk !== bRisk) return bRisk - aRisk;
    if (a.priority !== b.priority) {
      const rank = { High: 3, Medium: 2, Low: 1 };
      return (rank[b.priority] || 0) - (rank[a.priority] || 0);
    }
    return (b.createdAt || 0) - (a.createdAt || 0);
  }).slice(0, 8);

  if (!prioritized.length) {
    wrap.innerHTML = `<div class="emptyDash">${state.lang === "ar" ? "لا توجد أنشطة حديثة" : "No recent activity."}</div>`;
    return;
  }

  wrap.innerHTML = prioritized.map(t => `
    <div class="activityRow">
      <div class="activityHead">
        <span>${t.id} - ${t.status}</span>
        <span>${t.priority}</span>
      </div>
      <div class="activityBranch">${t.branch}</div>
      <div class="activityMeta">${fmtDate(t.createdAt)} ${t.slaRemainingText ? `- ${t.slaRemainingText}` : ""}</div>
    </div>
  `).join("");
}

function renderDashboardBars(filtered){
  const bars = $("bars");
  if (!bars) return;
  bars.innerHTML = "";

  const now = new Date();
  const byDay = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    byDay.push({ key, count: 0 });
  }

  filtered.forEach(t => {
    const d = new Date(t.createdAt || 0);
    const key = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
    const slot = byDay.find(x => x.key === key);
    if (slot) slot.count += 1;
  });

  const peak = Math.max(1, ...byDay.map(x => x.count));
  byDay.forEach((x, idx) => {
    const el = document.createElement("div");
    el.className = "bar";
    el.style.height = `${Math.max(8, Math.round((x.count / peak) * 100))}%`;
    el.style.animationDelay = `${0.04 * (idx + 1)}s`;
    el.title = `${x.key}: ${x.count}`;
    bars.appendChild(el);
  });
}

function computeKPIs(){
  const copy = getDashCopy();
  const filtered = getDashboardFilteredTickets();
  const now = Date.now();

  const total = filtered.length;
  const open = filtered.filter(t => t.status !== "Closed").length;
  const closed = filtered.filter(t => t.status === "Closed").length;
  const near = filtered.filter(t => {
    if (t.status === "Closed" || !t.slaDueAt) return false;
    const diff = t.slaDueAt - now;
    return diff >= 0 && diff <= 4 * 60 * 60 * 1000;
  }).length;
  const overdue = filtered.filter(t => {
    if (t.status === "Closed") return false;
    return t.slaComputedStatus === "breached" || (t.slaDueAt && t.slaDueAt < now);
  }).length;

  if ($("statTotalLabel")) $("statTotalLabel").textContent = copy.total;
  if ($("statOpenLabel")) $("statOpenLabel").textContent = copy.open;
  if ($("statClosedLabel")) $("statClosedLabel").textContent = copy.closed;
  if ($("statRepliedLabel")) $("statRepliedLabel").textContent = copy.near;
  if ($("statAvgLabel")) $("statAvgLabel").textContent = copy.overdue;

  if ($("kpiTotal")) $("kpiTotal").textContent = total;
  if ($("kpiOpen")) $("kpiOpen").textContent = open;
  if ($("kpiClosed")) $("kpiClosed").textContent = closed;
  if ($("kpiReplied")) $("kpiReplied").textContent = near;
  if ($("kpiAvg")) $("kpiAvg").textContent = overdue;

  if ($("kpiTotalT")) $("kpiTotalT").textContent = `${total} ${copy.inView}`;
  if ($("kpiOpenT")) $("kpiOpenT").textContent = `${open} ${copy.unresolved}`;
  if ($("kpiClosedT")) $("kpiClosedT").textContent = `${closed} ${copy.completed}`;
  if ($("kpiRepliedT")) $("kpiRepliedT").textContent = `${near} ${copy.atRisk}`;
  if ($("kpiAvgT")) $("kpiAvgT").textContent = `${overdue} ${copy.breached}`;

  if ($("chartRightLabel")) $("chartRightLabel").textContent = `${total} ${copy.chartRight}`;
  if ($("dashboardAsOf")) $("dashboardAsOf").textContent = `${copy.asOf} ${fmtDate(Date.now())}`;

  renderDashboardBars(filtered);
  renderBreakdown("sourceBreakdown", countBy(filtered, t => t.raw?.source || t.source));
  renderBreakdown("brandBreakdown", countBy(filtered, t => t.brand));
  renderBreakdown("cityBreakdown", countBy(filtered, t => getTicketCity(t)));
  renderBreakdown("feedbackTypeBreakdown", countBy(filtered, t => t.raw?.feedback_type || t.source));
  renderCompact("topCategories", countBy(filtered, t => t.category), r => `${r.pct}%`);
  renderCompact("topBranches", countBy(filtered, t => t.branch), r => `${r.pct}%`);
  renderOperationalAlerts(filtered, near, overdue);
  renderRecentActivity(filtered);
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
        brand: r.brand || "—",
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
    if (currentView() === "reports") renderReports(state.currentReportTab);
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
    [labels.brand, t.brand],
    [labels.source, t.source],
    [labels.category, t.category],
    [labels.subCategory, t.subCategory],
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
  document.body.classList.toggle("dashboard-active", view === "dashboard");

  ["dashboard","tickets","reports","settings"].forEach(v => {
    $("view-" + v).style.display = (v === view) ? "" : "none";
    const btn = document.querySelector(`.nav button[data-view="${v}"]`);
    if (btn) btn.classList.toggle("active", v === view);
  });

  if (view === "dashboard") {
    $("pageTitle").textContent = tr("pageDashboardTitle");
    $("pageSub").textContent = tr("pageDashboardSub");
    computeKPIs();
  }

  if (view === "tickets") {
    $("pageTitle").textContent = tr("pageTicketsTitle");
    $("pageSub").textContent = tr("pageTicketsSub");
    renderTickets();
  }

  if (view === "reports") {
    $("pageTitle").textContent = tr("pageReportsTitle");
    $("pageSub").textContent = tr("pageReportsSub");
    renderReports(state.currentReportTab);
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

/* ═══════════════════════════════════
   REPORTS — Full Reporting Workspace
   ═══════════════════════════════════ */

// ── Helpers ──────────────────────────

function getReportTickets() {
  const f = state.reportFilters;
  return (state.tickets || []).filter(t => {
    if (f.brand !== "all" && t.brand !== f.brand) return false;
    if (f.status !== "all" && t.status !== f.status) return false;
    if (f.source !== "all" && t.source !== f.source) return false;
    if (f.priority !== "all" && t.priority !== f.priority) return false;
    if (f.slaStatus !== "all" && t.slaComputedStatus !== f.slaStatus) return false;
    if (f.category !== "all" && t.category !== f.category) return false;
    if (f.dateFrom) { const from = new Date(f.dateFrom).getTime(); if (t.createdAt < from) return false; }
    if (f.dateTo)   { const to   = new Date(f.dateTo).getTime() + 86400000; if (t.createdAt > to) return false; }
    return true;
  });
}

function rptCountBy(tickets, keyFn) {
  const counts = {};
  tickets.forEach(t => { const k = keyFn(t); if (k && k !== "—") counts[k] = (counts[k] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function rptTopKey(tickets, keyFn) {
  const sorted = rptCountBy(tickets, keyFn);
  return sorted[0] ? `${sorted[0][0]} (${sorted[0][1]})` : "—";
}

function rptPeriodTickets(tickets, daysAgo, windowDays) {
  const now = Date.now();
  const end   = now - daysAgo * 86400000;
  const start = end  - windowDays * 86400000;
  return tickets.filter(t => t.createdAt >= start && t.createdAt < end);
}

function rptBreakdownRowsHTML(entries, total, colorClass = "") {
  if (!entries.length) return `<div class="rptEmpty">No data for selected filters</div>`;
  const max = entries[0][1];
  return entries.map(([label, count], i) => {
    const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
    const barW = max > 0 ? ((count / max) * 100).toFixed(1) : 0;
    const rankClass = i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : "";
    return `<div class="rptBarRow">
      <div class="rptBarLabel" title="${label}">${label}</div>
      <div class="rptBarTrack"><div class="rptBar ${colorClass}" style="width:${barW}%"></div></div>
      <div class="rptBarCount">${count}</div>
      <div class="rptBarPct">${pct}%</div>
    </div>`;
  }).join("");
}

function rptTableHTML(headers, rows, colClasses = []) {
  if (!rows.length) return `<div class="rptEmpty">No data for selected filters</div>`;
  const ths = headers.map(h => `<th>${h}</th>`).join("");
  const trs = rows.map((r, ri) => {
    const tds = r.map((cell, ci) => {
      const cls = colClasses[ci] || "";
      const rankBadge = (ci === 0 && ri < 3) ? `<span class="rptRank ${ri === 0 ? "top1" : ri === 1 ? "top2" : "top3"}">${ri + 1}</span> ` : "";
      return `<td class="${cls}">${rankBadge}${cell}</td>`;
    }).join("");
    return `<tr>${tds}</tr>`;
  }).join("");
  return `<table class="rptTable"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
}

function rptDeltaHTML(current, prev, higherIsBad = true) {
  if (prev === 0 && current === 0) return `<span class="rptDelta neutral">—</span>`;
  const diff = current - prev;
  const pct  = prev > 0 ? Math.abs(Math.round((diff / prev) * 100)) : "∞";
  if (diff === 0) return `<span class="rptDelta neutral">= 0%</span>`;
  const isUp = diff > 0;
  const isBad = higherIsBad ? isUp : !isUp;
  const cls = isUp ? (isBad ? "up-bad" : "up-good") : (isBad ? "down-bad" : "down-good");
  const arrow = isUp ? "▲" : "▼";
  return `<span class="rptDelta ${cls}">${arrow} ${pct}%</span>`;
}

function rptSLAColor(status) {
  if (status === "breached")   return "#ef4444";
  if (status === "at_risk")    return "#f59e0b";
  if (status === "on_track")   return "#22c55e";
  return "#38bdf8";
}

function rptDownloadCSV(rows, filename) {
  if (!rows || !rows.length) { alert("No data to export."); return; }
  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.join(","),
    ...rows.map(r => headers.map(h => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","))
  ];
  const blob = new Blob(["\uFEFF" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function rptTicketToRow(t) {
  return {
    "Ticket No":        t.ticketNo ?? "",
    "Status":           t.status ?? "",
    "Priority":         t.priority ?? "",
    "Branch":           t.branch ?? "",
    "Brand":            t.brand ?? "",
    "Category":         t.category ?? "",
    "Sub Category":     t.subCategory ?? "",
    "Source":           t.source ?? "",
    "Customer":         t.customerName ?? "",
    "Phone":            t.customerPhone ?? "",
    "SLA Status":       t.slaComputedStatus ?? "",
    "Created":          fmtDate(t.createdAt),
    "Description":      (t.description || "").replace(/\n/g, " "),
    "Branch Reply":     (t.branchReply || "").replace(/\n/g, " ")
  };
}

// ── Section Renderers ─────────────────

function rptExecutiveHTML(tickets) {
  const total    = tickets.length;
  const open     = tickets.filter(t => t.status === "Open").length;
  const inProg   = tickets.filter(t => t.status === "In Progress").length;
  const replied  = tickets.filter(t => t.status === "Replied").length;
  const closed   = tickets.filter(t => t.status === "Closed").length;
  const high     = tickets.filter(t => t.priority === "High").length;
  const breached = tickets.filter(t => t.slaComputedStatus === "breached").length;
  const atRisk   = tickets.filter(t => t.slaComputedStatus === "at_risk").length;
  const slaOK    = tickets.filter(t => ["pending","on_track"].includes(t.slaComputedStatus)).length;
  const slaComp  = total > 0 ? Math.round((slaOK / total) * 100) : 0;
  const topCat   = rptTopKey(tickets, t => t.category && t.category !== "—" ? t.category : null);
  const topBranch= rptTopKey(tickets, t => t.branch && t.branch !== "—" ? t.branch : null);
  const topBrand = rptTopKey(tickets, t => t.brand && t.brand !== "—" ? t.brand : null);
  const topSrc   = rptTopKey(tickets, t => t.source && t.source !== "—" ? t.source : null);

  return `
  <div class="rptSection">
    <div class="rptSectionTitle">Executive Summary</div>
    <div class="rptMetricGrid">
      <div class="rptMetric"><div class="rptMetricLabel">Total Tickets</div><div class="rptMetricValue">${total}</div><div class="rptMetricSub">All tickets in scope</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">Open Tickets</div><div class="rptMetricValue accent-warn" style="color:var(--warn)">${open}</div><div class="rptMetricSub">${inProg} in progress</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">Closed Tickets</div><div class="rptMetricValue accent-good" style="color:var(--good)">${closed}</div><div class="rptMetricSub">${replied} replied</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">SLA Compliance</div><div class="rptMetricValue" style="color:${slaComp >= 80 ? "var(--good)" : slaComp >= 60 ? "var(--warn)" : "var(--bad)"}">${slaComp}%</div><div class="rptMetricSub">${slaOK} within SLA</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">High Priority</div><div class="rptMetricValue" style="color:${high > 0 ? "var(--bad)" : "var(--good)"}">${high}</div><div class="rptMetricSub">Requires urgent attention</div></div>
    </div>
    <div class="rptMetricGrid">
      <div class="rptMetric"><div class="rptMetricLabel">Near SLA Breach</div><div class="rptMetricValue" style="color:${atRisk > 0 ? "var(--warn)" : "var(--good)"}">${atRisk}</div><div class="rptMetricSub">At-risk tickets</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">SLA Breached</div><div class="rptMetricValue" style="color:${breached > 0 ? "var(--bad)" : "var(--good)"}">${breached}</div><div class="rptMetricSub">Exceeded SLA deadline</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">Top Category</div><div class="rptMetricValue" style="font-size:13px;padding-top:4px">${topCat}</div><div class="rptMetricSub">Highest complaint volume</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">Top Branch</div><div class="rptMetricValue" style="font-size:13px;padding-top:4px">${topBranch}</div><div class="rptMetricSub">Most affected branch</div></div>
      <div class="rptMetric"><div class="rptMetricLabel">Top Source</div><div class="rptMetricValue" style="font-size:13px;padding-top:4px">${topSrc}</div><div class="rptMetricSub">Highest inbound channel</div></div>
    </div>
  </div>
  <div class="rptGrid2">
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Ticket Status Distribution</div><div class="rptCardMeta">${total} total</div></div>
      <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML([["Open",open],["In Progress",inProg],["Replied",replied],["Closed",closed]].filter(x=>x[1]>0),total)}</div>
    </div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Priority Breakdown</div><div class="rptCardMeta">${total} total</div></div>
      <div class="rptCardBody rptBarRows">
        ${rptBreakdownRowsHTML(rptCountBy(tickets, t => t.priority).filter(([k])=>k&&k!=="—"), total, "bar-warn")}
      </div>
    </div>
  </div>`;
}

function rptPeriodHTML(allTickets) {
  const thisWeek = rptPeriodTickets(allTickets, 0, 7);
  const lastWeek = rptPeriodTickets(allTickets, 7, 7);
  const thisMonth = rptPeriodTickets(allTickets, 0, 30);
  const lastMonth = rptPeriodTickets(allTickets, 30, 30);

  function periodRow(label, tw, lw, higherIsBad = true) {
    return `<tr>
      <td class="metric-label">${label}</td>
      <td class="val-current">${tw}</td>
      <td class="val-prev">${lw}</td>
      <td>${rptDeltaHTML(tw, lw, higherIsBad)}</td>
    </tr>`;
  }
  function periodStats(curr, prev) {
    const open  = arr => arr.filter(t => t.status==="Open"||t.status==="In Progress").length;
    const closed= arr => arr.filter(t => t.status==="Closed").length;
    const breach= arr => arr.filter(t => t.slaComputedStatus==="breached").length;
    const high  = arr => arr.filter(t => t.priority==="High").length;
    return `
      ${periodRow("Total Complaints", curr.length, prev.length)}
      ${periodRow("Open / Active", open(curr), open(prev))}
      ${periodRow("Closed", closed(curr), closed(prev), false)}
      ${periodRow("SLA Breached", breach(curr), breach(prev))}
      ${periodRow("High Priority", high(curr), high(prev))}
    `;
  }

  return `<div class="rptSection">
    <div class="rptSectionTitle">Period Comparison</div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">This Week vs Last Week</div><div class="rptCardMeta">7-day windows</div></div>
        <div class="rptCardBody">
          <table class="rptCompareTable">
            <thead><tr><th>Metric</th><th>This Week</th><th>Last Week</th><th>Change</th></tr></thead>
            <tbody>${periodStats(thisWeek, lastWeek)}</tbody>
          </table>
        </div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">This Month vs Last Month</div><div class="rptCardMeta">30-day windows</div></div>
        <div class="rptCardBody">
          <table class="rptCompareTable">
            <thead><tr><th>Metric</th><th>This Month</th><th>Last Month</th><th>Change</th></tr></thead>
            <tbody>${periodStats(thisMonth, lastMonth)}</tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Top Categories — This Week</div><div class="rptCardMeta">${thisWeek.length} tickets</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(thisWeek, t=>t.category&&t.category!=="—"?t.category:null).slice(0,6), thisWeek.length)}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Top Categories — Last Week</div><div class="rptCardMeta">${lastWeek.length} tickets</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(lastWeek, t=>t.category&&t.category!=="—"?t.category:null).slice(0,6), lastWeek.length)}</div>
      </div>
    </div>
  </div>`;
}

function rptSLAHTML(tickets) {
  const total    = tickets.length;
  const pending  = tickets.filter(t => t.slaComputedStatus==="pending").length;
  const onTrack  = tickets.filter(t => t.slaComputedStatus==="on_track").length;
  const atRisk   = tickets.filter(t => t.slaComputedStatus==="at_risk").length;
  const breached = tickets.filter(t => t.slaComputedStatus==="breached").length;
  const compliance = total > 0 ? Math.round(((pending+onTrack)/total)*100) : 0;

  function slaRow(label, count, color) {
    const pct = total > 0 ? ((count/total)*100).toFixed(1) : 0;
    const barW = total > 0 ? ((count/total)*100).toFixed(1) : 0;
    return `<div class="rptSlaRow">
      <div class="rptSlaDot" style="background:${color}"></div>
      <div class="rptSlaLabel">${label}</div>
      <div class="rptSlaBar"><div class="rptSlaBarFill" style="width:${barW}%;background:${color}"></div></div>
      <div class="rptSlaCount">${count}</div>
      <div class="rptSlaPct">${pct}%</div>
    </div>`;
  }

  // SLA by branch
  const branchSLA = {};
  tickets.forEach(t => {
    const b = t.branch && t.branch!=="—" ? t.branch : null;
    if (!b) return;
    if (!branchSLA[b]) branchSLA[b] = { total:0, breached:0, atRisk:0 };
    branchSLA[b].total++;
    if (t.slaComputedStatus==="breached") branchSLA[b].breached++;
    if (t.slaComputedStatus==="at_risk")  branchSLA[b].atRisk++;
  });
  const branchRows = Object.entries(branchSLA)
    .sort((a,b)=>b[1].breached-a[1].breached).slice(0,10)
    .map(([branch,s])=>{
      const comp = s.total>0 ? Math.round(((s.total-s.breached)/s.total)*100) : 100;
      const compColor = comp>=80?"var(--good)":comp>=60?"var(--warn)":"var(--bad)";
      return [branch, s.total, `<span style="color:var(--bad)">${s.breached}</span>`, `<span style="color:var(--warn)">${s.atRisk}</span>`, `<span style="color:${compColor};font-weight:700">${comp}%</span>`];
    });

  // SLA by brand
  const brandSLA = {};
  tickets.forEach(t => {
    const b = t.brand && t.brand!=="—" ? t.brand : null;
    if (!b) return;
    if (!brandSLA[b]) brandSLA[b] = { total:0, breached:0 };
    brandSLA[b].total++;
    if (t.slaComputedStatus==="breached") brandSLA[b].breached++;
  });
  const brandRows = Object.entries(brandSLA)
    .sort((a,b)=>b[1].total-a[1].total).slice(0,8)
    .map(([brand,s])=>{
      const comp = s.total>0 ? Math.round(((s.total-s.breached)/s.total)*100) : 100;
      const compColor = comp>=80?"var(--good)":comp>=60?"var(--warn)":"var(--bad)";
      return [brand, s.total, `<span style="color:var(--bad)">${s.breached}</span>`, `<span style="color:${compColor};font-weight:700">${comp}%</span>`];
    });

  return `<div class="rptSection">
    <div class="rptSectionTitle">SLA Performance Report</div>
    <div class="rptGrid3">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">SLA Status Overview</div><div class="rptCardMeta">${total} tickets</div></div>
        <div class="rptCardBody">
          ${slaRow("Within SLA / Pending", pending+onTrack, "#22c55e")}
          ${slaRow("At Risk (approaching)", atRisk, "#f59e0b")}
          ${slaRow("Breached", breached, "#ef4444")}
        </div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">SLA Compliance Rate</div></div>
        <div class="rptCardBody" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px">
          <div style="font-size:52px;font-weight:900;color:${compliance>=80?"var(--good)":compliance>=60?"var(--warn)":"var(--bad)"};line-height:1">${compliance}%</div>
          <div style="font-size:12.5px;color:var(--muted);text-align:center">SLA compliance based on ${total} tickets<br>${pending+onTrack} within SLA · ${breached} breached</div>
        </div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">SLA by Brand</div></div>
        <div class="rptCardBody">${rptTableHTML(["Brand","Total","Breach","Comp."],brandRows,["","num","num","num"])}</div>
      </div>
    </div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">SLA Performance by Branch</div><div class="rptCardMeta">Sorted by breach count</div></div>
      <div class="rptCardBody">${rptTableHTML(["Branch","Total","Breached","At Risk","Compliance"],branchRows,["","num","num","num","num"])}</div>
    </div>
  </div>`;
}

function rptBranchHTML(tickets) {
  const branchMap = {};
  tickets.forEach(t => {
    const b = t.branch && t.branch!=="—" ? t.branch : null;
    if (!b) return;
    if (!branchMap[b]) branchMap[b]={total:0,open:0,inProg:0,replied:0,closed:0,breached:0,cats:{}};
    const m = branchMap[b];
    m.total++;
    if (t.status==="Open")        m.open++;
    if (t.status==="In Progress") m.inProg++;
    if (t.status==="Replied")     m.replied++;
    if (t.status==="Closed")      m.closed++;
    if (t.slaComputedStatus==="breached") m.breached++;
    if (t.category&&t.category!=="—") m.cats[t.category]=(m.cats[t.category]||0)+1;
  });

  const rows = Object.entries(branchMap)
    .sort((a,b)=>b[1].total-a[1].total).slice(0,15)
    .map(([branch,m])=>{
      const topCat = Object.entries(m.cats).sort((a,b)=>b[1]-a[1])[0];
      const brColor = m.breached>0 ? `<span style="color:var(--bad)">${m.breached}</span>` : `<span style="color:var(--muted)">0</span>`;
      return [branch, m.total, m.open+m.inProg, m.closed, brColor, topCat?`${topCat[0]}`:"—"];
    });

  const sourceBreakdown = rptBreakdownRowsHTML(rptCountBy(tickets,t=>t.branch&&t.branch!=="—"?t.branch:null).slice(0,10), tickets.length, "bar-blue");

  return `<div class="rptSection">
    <div class="rptSectionTitle">Branch Performance Report</div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Complaint Volume by Branch</div><div class="rptCardMeta">Top 10</div></div>
        <div class="rptCardBody rptBarRows">${sourceBreakdown}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Branch Performance Summary</div><div class="rptCardMeta">Top 15 branches by volume</div></div>
        <div class="rptCardBody">${rptTableHTML(["Branch","Total","Active","Closed","SLA Breach","Top Category"],rows,["","num","num","num","num","muted"])}</div>
      </div>
    </div>
  </div>`;
}

function rptBrandHTML(tickets) {
  const brandMap = {};
  tickets.forEach(t => {
    const b = t.brand && t.brand!=="—" ? t.brand : null;
    if (!b) return;
    if (!brandMap[b]) brandMap[b]={total:0,open:0,closed:0,breached:0,cats:{}};
    const m = brandMap[b];
    m.total++;
    if (t.status==="Open"||t.status==="In Progress") m.open++;
    if (t.status==="Closed") m.closed++;
    if (t.slaComputedStatus==="breached") m.breached++;
    if (t.category&&t.category!=="—") m.cats[t.category]=(m.cats[t.category]||0)+1;
  });

  const rows = Object.entries(brandMap)
    .sort((a,b)=>b[1].total-a[1].total)
    .map(([brand,m])=>{
      const topCat = Object.entries(m.cats).sort((a,b)=>b[1]-a[1])[0];
      const comp = m.total>0?Math.round(((m.total-m.breached)/m.total)*100):100;
      const compColor=comp>=80?"var(--good)":comp>=60?"var(--warn)":"var(--bad)";
      return [brand, m.total, `<span style="color:var(--warn)">${m.open}</span>`, `<span style="color:var(--good)">${m.closed}</span>`, `<span style="color:var(--bad)">${m.breached}</span>`, `<span style="color:${compColor};font-weight:700">${comp}%</span>`, topCat?topCat[0]:"—"];
    });

  return `<div class="rptSection">
    <div class="rptSectionTitle">Brand Performance Report</div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Complaint Volume by Brand</div><div class="rptCardMeta">${tickets.length} total</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(tickets,t=>t.brand&&t.brand!=="—"?t.brand:null),tickets.length,"bar-blue")}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Brand Performance Summary</div><div class="rptCardMeta">All brands</div></div>
        <div class="rptCardBody">${rptTableHTML(["Brand","Total","Active","Closed","Breached","SLA Comp.","Top Issue"],rows,["","num","num","num","num","num","muted"])}</div>
      </div>
    </div>
  </div>`;
}

function rptSourceHTML(tickets) {
  const srcEntries = rptCountBy(tickets, t=>t.source&&t.source!=="—"?t.source:null);
  const total = tickets.length;

  // Top 3 sources with category breakdown
  const top3 = srcEntries.slice(0,3);
  const top3Cards = top3.map(([src, count])=>{
    const srcTickets = tickets.filter(t=>t.source===src);
    const cats = rptCountBy(srcTickets, t=>t.category&&t.category!=="—"?t.category:null).slice(0,5);
    return `<div class="rptCard">
      <div class="rptCardHead">
        <div class="rptCardTitle">${src}</div>
        <div class="rptCardMeta">${count} tickets · ${total>0?((count/total)*100).toFixed(1):0}%</div>
      </div>
      <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(cats, count, "bar-good")}</div>
    </div>`;
  }).join("");

  return `<div class="rptSection">
    <div class="rptSectionTitle">Source Analysis Report</div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Complaint Volume by Source</div><div class="rptCardMeta">${total} total</div></div>
      <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(srcEntries, total)}</div>
    </div>
    <div class="rptSectionTitle" style="margin-top:8px">Category Breakdown by Top Sources</div>
    <div class="rptGrid3">${top3Cards || '<div class="rptEmpty">No source data yet</div>'}</div>
  </div>`;
}

function rptCategoryHTML(tickets) {
  const total = tickets.length;
  const mainCats  = rptCountBy(tickets, t=>t.category&&t.category!=="—"?t.category:null);
  const subCats   = rptCountBy(tickets, t=>t.subCategory&&t.subCategory!=="—"?t.subCategory:null).slice(0,10);

  // Priority by top category
  const top5cats = mainCats.slice(0,5);
  const catPrioRows = top5cats.map(([cat,count])=>{
    const catT = tickets.filter(t=>t.category===cat);
    const high = catT.filter(t=>t.priority==="High").length;
    const med  = catT.filter(t=>t.priority==="Medium").length;
    const low  = catT.filter(t=>t.priority==="Low").length;
    return [cat, count, `<span style="color:var(--bad)">${high}</span>`, `<span style="color:var(--warn)">${med}</span>`, `<span style="color:var(--good)">${low}</span>`];
  });

  return `<div class="rptSection">
    <div class="rptSectionTitle">Complaint Categories Report</div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Main Complaint Categories</div><div class="rptCardMeta">${total} total</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(mainCats, total, "bar-warn")}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Top Sub-Categories</div><div class="rptCardMeta">Top 10</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(subCats, total, "bar-good")}</div>
      </div>
    </div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Priority Breakdown by Category</div><div class="rptCardMeta">Top 5 categories</div></div>
      <div class="rptCardBody">${rptTableHTML(["Category","Total","High","Medium","Low"],catPrioRows,["","num","num","num","num"])}</div>
    </div>
  </div>`;
}

function rptAgingHTML(tickets) {
  const now = Date.now();
  const activeTickets = tickets.filter(t => t.status==="Open"||t.status==="In Progress");
  const ageMs = t => now - t.createdAt;
  const bucket = (t, minH, maxH) => {
    const h = ageMs(t) / 3600000;
    return h >= minH && (maxH===Infinity || h < maxH);
  };
  const b1 = activeTickets.filter(t=>bucket(t,0,24));
  const b2 = activeTickets.filter(t=>bucket(t,24,72));
  const b3 = activeTickets.filter(t=>bucket(t,72,168));
  const b4 = activeTickets.filter(t=>bucket(t,168,Infinity));

  const oldest = [...activeTickets].sort((a,b)=>a.createdAt-b.createdAt).slice(0,10);
  const oldestRows = oldest.map(t => {
    const hAgo = Math.floor(ageMs(t)/3600000);
    const dAgo = Math.floor(hAgo/24);
    const age = dAgo>0 ? `${dAgo}d ${hAgo%24}h` : `${hAgo}h`;
    const ageColor = dAgo>=7?"var(--bad)":dAgo>=3?"var(--warn)":"var(--muted)";
    return [t.id, t.branch, t.priority, `<span style="color:${ageColor};font-weight:700">${age}</span>`, t.category&&t.category!=="—"?t.category:"—"];
  });

  return `<div class="rptSection">
    <div class="rptSectionTitle">Ticket Aging Report — Active Tickets Only (${activeTickets.length} open)</div>
    <div class="rptAgingGrid">
      <div class="rptAgingBucket age-ok">
        <div class="rptAgingBucketCount">${b1.length}</div>
        <div class="rptAgingBucketLabel">Under 24 hours</div>
      </div>
      <div class="rptAgingBucket age-mild">
        <div class="rptAgingBucketCount">${b2.length}</div>
        <div class="rptAgingBucketLabel">1 – 3 days</div>
      </div>
      <div class="rptAgingBucket age-warn">
        <div class="rptAgingBucketCount">${b3.length}</div>
        <div class="rptAgingBucketLabel">3 – 7 days</div>
      </div>
      <div class="rptAgingBucket age-bad">
        <div class="rptAgingBucketCount">${b4.length}</div>
        <div class="rptAgingBucketLabel">Over 7 days</div>
      </div>
    </div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Oldest Open Tickets</div><div class="rptCardMeta">Top 10 by age — requires immediate attention</div></div>
      <div class="rptCardBody">${rptTableHTML(["Ticket","Branch","Priority","Age","Category"],oldestRows,["","","","num","muted"])}</div>
    </div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Aging by Branch</div><div class="rptCardMeta">Branches with aging backlog</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(activeTickets,t=>t.branch&&t.branch!=="—"?t.branch:null).slice(0,8), activeTickets.length, "bar-warn")}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Aging by Category</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(activeTickets,t=>t.category&&t.category!=="—"?t.category:null).slice(0,8), activeTickets.length, "bar-bad")}</div>
      </div>
    </div>
  </div>`;
}

function rptTrendHTML(tickets) {
  const now = Date.now();
  const days = 21;
  const dailyCounts = [];
  const dailyLabels = [];
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = now - (i + 1) * 86400000;
    const dayEnd   = now - i * 86400000;
    const count = tickets.filter(t => t.createdAt >= dayStart && t.createdAt < dayEnd).length;
    dailyCounts.push(count);
    const d = new Date(dayStart);
    dailyLabels.push(`${pad(d.getMonth()+1)}/${pad(d.getDate())}`);
  }
  const maxCount = Math.max(...dailyCounts, 1);
  const bars = dailyCounts.map((c, i) => {
    const h = Math.max(4, Math.round((c / maxCount) * 100));
    return `<div class="rptTrendBar" style="height:${h}%" title="${dailyLabels[i]}: ${c} tickets"></div>`;
  }).join("");

  // Weekly totals
  const weeklyData = [];
  for (let w = 0; w < 4; w++) {
    const start = now - (w + 1) * 7 * 86400000;
    const end   = now - w * 7 * 86400000;
    const wTickets = tickets.filter(t => t.createdAt >= start && t.createdAt < end);
    const wDate = new Date(start);
    weeklyData.unshift({ label: `Week of ${pad(wDate.getMonth()+1)}/${pad(wDate.getDate())}`, count: wTickets.length, breached: wTickets.filter(t=>t.slaComputedStatus==="breached").length });
  }
  const weekRows = weeklyData.map(w => [w.label, w.count, `<span style="color:var(--bad)">${w.breached}</span>`]);

  // Rising categories (last 7 days vs prev 7)
  const thisWeekTickets = tickets.filter(t=>t.createdAt>=(now-7*86400000));
  const lastWeekTickets = tickets.filter(t=>t.createdAt>=(now-14*86400000)&&t.createdAt<(now-7*86400000));
  const risersHTML = (() => {
    const thisW = {};
    const lastW = {};
    thisWeekTickets.forEach(t=>{if(t.category&&t.category!=="—")thisW[t.category]=(thisW[t.category]||0)+1;});
    lastWeekTickets.forEach(t=>{if(t.category&&t.category!=="—")lastW[t.category]=(lastW[t.category]||0)+1;});
    const risers = Object.entries(thisW)
      .map(([cat,cur])=>({ cat, cur, prev: lastW[cat]||0, delta: cur - (lastW[cat]||0) }))
      .filter(r=>r.delta>0).sort((a,b)=>b.delta-a.delta).slice(0,5);
    if (!risers.length) return `<div class="rptEmpty">No rising categories detected</div>`;
    return rptTableHTML(["Category","This Week","Last Week","Change"],
      risers.map(r=>[r.cat, r.cur, r.prev, rptDeltaHTML(r.cur, r.prev)]),["","num","num",""]);
  })();

  return `<div class="rptSection">
    <div class="rptSectionTitle">Trend Analysis — Last ${days} Days</div>
    <div class="rptCard">
      <div class="rptCardHead"><div class="rptCardTitle">Daily Complaint Volume</div><div class="rptCardMeta">${days} days</div></div>
      <div class="rptCardBody">
        <div class="rptTrendChart">${bars}</div>
        <div class="rptTrendLabels"><span>${dailyLabels[0]}</span><span>${dailyLabels[Math.floor(days/2)]}</span><span>${dailyLabels[days-1]}</span></div>
      </div>
    </div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Weekly Summary</div><div class="rptCardMeta">Last 4 weeks</div></div>
        <div class="rptCardBody">${rptTableHTML(["Week","Complaints","SLA Breach"],weekRows,["","num","num"])}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Rising Complaint Categories</div><div class="rptCardMeta">This week vs last week</div></div>
        <div class="rptCardBody">${risersHTML}</div>
      </div>
    </div>
    <div class="rptGrid2">
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Top Sources — Last 7 Days</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(thisWeekTickets,t=>t.source&&t.source!=="—"?t.source:null).slice(0,6), thisWeekTickets.length, "bar-blue")}</div>
      </div>
      <div class="rptCard">
        <div class="rptCardHead"><div class="rptCardTitle">Top Branches — Last 7 Days</div></div>
        <div class="rptCardBody rptBarRows">${rptBreakdownRowsHTML(rptCountBy(thisWeekTickets,t=>t.branch&&t.branch!=="—"?t.branch:null).slice(0,6), thisWeekTickets.length, "bar-warn")}</div>
      </div>
    </div>
  </div>`;
}

function rptExportHTML(tickets) {
  const allTickets   = state.tickets || [];
  const openTickets  = allTickets.filter(t=>t.status==="Open"||t.status==="In Progress");
  const breachedSLA  = allTickets.filter(t=>t.slaComputedStatus==="breached");
  const highPrio     = allTickets.filter(t=>t.priority==="High");

  const exportBtns = [
    { icon:"📋", title:"All Tickets",        sub:`Export all ${allTickets.length} tickets — complete dataset`,    action:`rptExportAll()` },
    { icon:"🔴", title:"Open Tickets",       sub:`Export ${openTickets.length} open/in-progress tickets`,         action:`rptExportOpen()` },
    { icon:"⚠️", title:"SLA Breach Report",  sub:`Export ${breachedSLA.length} tickets that breached SLA`,        action:`rptExportBreached()` },
    { icon:"🚨", title:"High Priority",      sub:`Export ${highPrio.length} high priority tickets`,               action:`rptExportHigh()` },
    { icon:"🔍", title:"Filtered Report",    sub:`Export ${tickets.length} tickets matching current filters`,      action:`rptExportFiltered()` },
    { icon:"📊", title:"SLA Summary (CSV)",  sub:"Export SLA performance summary by branch",                      action:`rptExportSLASummary()` },
    { icon:"🏢", title:"Branch Report",      sub:"Export complaint volume and SLA breakdown by branch",           action:`rptExportBranchReport()` },
    { icon:"🏷️", title:"Brand Report",       sub:"Export performance metrics by brand",                           action:`rptExportBrandReport()` },
    { icon:"📈", title:"Category Report",    sub:"Export complaint categories breakdown",                          action:`rptExportCategoryReport()` },
  ].map(btn=>`
    <button class="rptExportBtn" onclick="${btn.action}">
      <div class="rptExportBtnIcon">${btn.icon}</div>
      <div class="rptExportBtnTitle">${btn.title}</div>
      <div class="rptExportBtnSub">${btn.sub}</div>
    </button>
  `).join("");

  return `<div class="rptSection">
    <div class="rptSectionTitle">Export Center</div>
    <div class="rptCard">
      <div class="rptCardHead">
        <div class="rptCardTitle">Export Options</div>
        <div class="rptCardMeta">CSV format — UTF-8 with BOM for Excel compatibility</div>
      </div>
      <div class="rptCardBody">
        <div class="rptExportGrid">${exportBtns}</div>
      </div>
    </div>
    <div class="rptCard" style="margin-top:4px">
      <div class="rptCardHead"><div class="rptCardTitle">Data Preview — Current Filter Scope</div><div class="rptCardMeta">${tickets.length} tickets</div></div>
      <div class="rptCardBody">
        ${rptTableHTML(
          ["Ticket","Status","Priority","Branch","Brand","Category","Source","Created"],
          tickets.slice(0,15).map(t=>[t.id,t.status,t.priority,t.branch,t.brand&&t.brand!=="—"?t.brand:"—",t.category&&t.category!=="—"?t.category:"—",t.source&&t.source!=="—"?t.source:"—",fmtDate(t.createdAt)]),
          ["","","","","","muted","muted","muted"]
        )}
        ${tickets.length>15?`<div style="padding:10px 0;color:var(--muted2);font-size:12px">... and ${tickets.length-15} more rows. Export to see full dataset.</div>`:""}
      </div>
    </div>
  </div>`;
}

// ── Export Action Functions ───────────────

function rptExportAll()            { rptDownloadCSV((state.tickets||[]).map(rptTicketToRow), "cx-all-tickets.csv"); }
function rptExportOpen()           { rptDownloadCSV((state.tickets||[]).filter(t=>t.status==="Open"||t.status==="In Progress").map(rptTicketToRow), "cx-open-tickets.csv"); }
function rptExportBreached()       { rptDownloadCSV((state.tickets||[]).filter(t=>t.slaComputedStatus==="breached").map(rptTicketToRow), "cx-sla-breached.csv"); }
function rptExportHigh()           { rptDownloadCSV((state.tickets||[]).filter(t=>t.priority==="High").map(rptTicketToRow), "cx-high-priority.csv"); }
function rptExportFiltered()       { rptDownloadCSV(getReportTickets().map(rptTicketToRow), "cx-filtered-report.csv"); }

function rptExportSLASummary() {
  const branchSLA = {};
  (state.tickets||[]).forEach(t=>{
    const b=t.branch&&t.branch!=="—"?t.branch:null; if(!b)return;
    if(!branchSLA[b])branchSLA[b]={Branch:b,Total:0,Breached:0,AtRisk:0,"SLA Compliance %":0};
    branchSLA[b].Total++;
    if(t.slaComputedStatus==="breached")branchSLA[b].Breached++;
    if(t.slaComputedStatus==="at_risk")branchSLA[b].AtRisk++;
  });
  const rows = Object.values(branchSLA).map(r=>({ ...r, "SLA Compliance %": r.Total>0?Math.round(((r.Total-r.Breached)/r.Total)*100)+"%" : "100%" }));
  rptDownloadCSV(rows.sort((a,b)=>b.Total-a.Total), "cx-sla-summary.csv");
}

function rptExportBranchReport() {
  const m = {};
  (state.tickets||[]).forEach(t=>{
    const b=t.branch&&t.branch!=="—"?t.branch:null; if(!b)return;
    if(!m[b])m[b]={Branch:b,Total:0,Open:0,Closed:0,Breached:0};
    m[b].Total++;
    if(t.status==="Open"||t.status==="In Progress")m[b].Open++;
    if(t.status==="Closed")m[b].Closed++;
    if(t.slaComputedStatus==="breached")m[b].Breached++;
  });
  rptDownloadCSV(Object.values(m).sort((a,b)=>b.Total-a.Total), "cx-branch-report.csv");
}

function rptExportBrandReport() {
  const m = {};
  (state.tickets||[]).forEach(t=>{
    const b=t.brand&&t.brand!=="—"?t.brand:null; if(!b)return;
    if(!m[b])m[b]={Brand:b,Total:0,Open:0,Closed:0,Breached:0};
    m[b].Total++;
    if(t.status==="Open"||t.status==="In Progress")m[b].Open++;
    if(t.status==="Closed")m[b].Closed++;
    if(t.slaComputedStatus==="breached")m[b].Breached++;
  });
  rptDownloadCSV(Object.values(m).sort((a,b)=>b.Total-a.Total), "cx-brand-report.csv");
}

function rptExportCategoryReport() {
  const m = {};
  (state.tickets||[]).forEach(t=>{
    const c=t.category&&t.category!=="—"?t.category:null; if(!c)return;
    if(!m[c])m[c]={Category:c,Total:0,High:0,Medium:0,Low:0};
    m[c].Total++;
    if(t.priority==="High")m[c].High++;
    if(t.priority==="Medium")m[c].Medium++;
    if(t.priority==="Low")m[c].Low++;
  });
  rptDownloadCSV(Object.values(m).sort((a,b)=>b.Total-a.Total), "cx-category-report.csv");
}

// ── Main Render ───────────────────────────

function renderReports(tab) {
  tab = tab || state.currentReportTab || "executive";
  state.currentReportTab = tab;

  // Update active tab
  document.querySelectorAll(".rptTab").forEach(b => b.classList.toggle("active", b.dataset.section === tab));

  const tickets = getReportTickets();
  const countEl = $("rptDataCount");
  if (countEl) countEl.textContent = `${tickets.length} ticket${tickets.length!==1?"s":""}`;

  const content = $("rptContent");
  if (!content) return;

  const sectionMap = {
    executive: () => rptExecutiveHTML(tickets),
    period:    () => rptPeriodHTML(state.tickets || []),
    sla:       () => rptSLAHTML(tickets),
    branch:    () => rptBranchHTML(tickets),
    brand:     () => rptBrandHTML(tickets),
    source:    () => rptSourceHTML(tickets),
    category:  () => rptCategoryHTML(tickets),
    aging:     () => rptAgingHTML(tickets),
    trend:     () => rptTrendHTML(tickets),
    export:    () => rptExportHTML(tickets)
  };

  content.innerHTML = (sectionMap[tab] || sectionMap.executive)();
}

function initReports() {
  // Tab navigation
  document.querySelectorAll(".rptTab").forEach(btn => {
    btn.addEventListener("click", () => renderReports(btn.dataset.section));
  });

  // Filter controls — re-render on change
  ["rptDateFrom","rptDateTo","rptFBrand","rptFStatus","rptFSource","rptFPriority","rptFSLA","rptFCategory"].forEach(id => {
    const el = $(id);
    if (!el) return;
    el.addEventListener("change", () => {
      state.reportFilters.dateFrom  = $("rptDateFrom")?.value || "";
      state.reportFilters.dateTo    = $("rptDateTo")?.value || "";
      state.reportFilters.brand     = $("rptFBrand")?.value || "all";
      state.reportFilters.status    = $("rptFStatus")?.value || "all";
      state.reportFilters.source    = $("rptFSource")?.value || "all";
      state.reportFilters.priority  = $("rptFPriority")?.value || "all";
      state.reportFilters.slaStatus = $("rptFSLA")?.value || "all";
      state.reportFilters.category  = $("rptFCategory")?.value || "all";
      renderReports(state.currentReportTab);
    });
  });

  // Reset
  const resetBtn = $("btnRptReset");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    ["rptDateFrom","rptDateTo"].forEach(id=>{const el=$(id);if(el)el.value="";});
    ["rptFBrand","rptFStatus","rptFSource","rptFPriority","rptFSLA","rptFCategory"].forEach(id=>{const el=$(id);if(el)el.value="all";});
    state.reportFilters = { dateFrom:"",dateTo:"",brand:"all",status:"all",source:"all",priority:"all",slaStatus:"all",category:"all" };
    renderReports(state.currentReportTab);
  });

  // Quick export button
  const qExport = $("btnQuickExport");
  if (qExport) qExport.addEventListener("click", rptExportFiltered);
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

$("dashRange")?.addEventListener("change", computeKPIs);
$("dashStatus")?.addEventListener("change", computeKPIs);
$("dashPriority")?.addEventListener("change", computeKPIs);
$("dashBranch")?.addEventListener("input", computeKPIs);
$("dashResetFilters")?.addEventListener("click", () => {
  if ($("dashRange")) $("dashRange").value = "7d";
  if ($("dashStatus")) $("dashStatus").value = "all";
  if ($("dashPriority")) $("dashPriority").value = "all";
  if ($("dashBranch")) $("dashBranch").value = "";
  computeKPIs();
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
  initReports();
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

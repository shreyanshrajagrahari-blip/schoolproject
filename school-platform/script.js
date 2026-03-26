const QUIZ_BANK = {
  Mathematics: [
    {
      question: "If f(x)=x^2+2x, what is f'(x)?",
      options: ["2x+2", "x+2", "2x", "x^2"],
      answer: 0
    },
    {
      question: "If sin(theta)=1, then theta equals:",
      options: ["0", "pi/2", "pi", "3pi/2"],
      answer: 1
    },
    {
      question: "The sum of interior angles of a triangle is:",
      options: ["90", "180", "270", "360"],
      answer: 1
    }
  ],
  Physics: [
    {
      question: "SI unit of force is:",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      answer: 1
    },
    {
      question: "Speed of light in vacuum is closest to:",
      options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^5 km/s", "3 x 10^2 m/s"],
      answer: 0
    },
    {
      question: "Instrument used to measure current is:",
      options: ["Voltmeter", "Ammeter", "Barometer", "Thermometer"],
      answer: 1
    }
  ],
  Chemistry: [
    {
      question: "pH value less than 7 indicates:",
      options: ["Base", "Neutral", "Acid", "Salt"],
      answer: 2
    },
    {
      question: "H2O is commonly known as:",
      options: ["Hydrogen peroxide", "Hydroxide", "Water", "Ozone"],
      answer: 2
    },
    {
      question: "Atomic number represents number of:",
      options: ["Neutrons", "Electrons + neutrons", "Protons", "Nucleons"],
      answer: 2
    }
  ],
  English: [
    {
      question: "Choose the correct synonym of 'Rapid':",
      options: ["Slow", "Fast", "Weak", "Late"],
      answer: 1
    },
    {
      question: "Identify the adjective:",
      options: ["Run", "Beautiful", "Quickly", "Think"],
      answer: 1
    },
    {
      question: "Choose the correct article: ___ honest student.",
      options: ["A", "An", "The", "No article"],
      answer: 1
    }
  ],
  Computer: [
    {
      question: "Which data structure works on LIFO principle?",
      options: ["Queue", "Array", "Stack", "Tree"],
      answer: 2
    },
    {
      question: "HTML stands for:",
      options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlink Tool Markup Language", "Home Tool Markup Language"],
      answer: 0
    },
    {
      question: "Which symbol starts a single-line comment in JavaScript?",
      options: ["<!--", "#", "//", "/*"],
      answer: 2
    }
  ]
}

const BASE_STUDENT_RECORDS = [
  { id: "STU101", name: "Aarav Thapa", classSec: "12-A", feesDue: 12000, libraryBooksDue: 0, libraryFine: 0 },
  { id: "STU102", name: "Suman Bhandari", classSec: "12-A", feesDue: 3500, libraryBooksDue: 1, libraryFine: 120 },
  { id: "STU103", name: "Niraj Karki", classSec: "12-B", feesDue: 8000, libraryBooksDue: 2, libraryFine: 300 },
  { id: "STU104", name: "Bikram Rana", classSec: "12-B", feesDue: 5200, libraryBooksDue: 0, libraryFine: 0 },
  { id: "STU105", name: "Ritika Gautam", classSec: "11-A", feesDue: 0, libraryBooksDue: 0, libraryFine: 0 },
  { id: "STU106", name: "Pratistha Shah", classSec: "11-B", feesDue: 4600, libraryBooksDue: 1, libraryFine: 80 }
]

const PAPER_ARCHIVE = [
  { subject: "Mathematics", year: "2080", title: "NEB Model Set A", link: "#" },
  { subject: "Physics", year: "2079", title: "Board Practice Set", link: "#" },
  { subject: "Chemistry", year: "2080", title: "Solved Past Paper", link: "#" },
  { subject: "English", year: "2078", title: "Language Exam Pack", link: "#" },
  { subject: "Computer", year: "2080", title: "Programming Past Set", link: "#" }
]

const BASE_TIMETABLE = [
  { classSec: "12-A", day: "Monday", period: "P1", subject: "Physics", teacher: "Mr. Karki", room: "R-204" },
  { classSec: "12-A", day: "Monday", period: "P2", subject: "Mathematics", teacher: "Ms. KC", room: "R-102" },
  { classSec: "12-B", day: "Tuesday", period: "P1", subject: "Chemistry", teacher: "Mr. Shrestha", room: "Lab-2" },
  { classSec: "11-A", day: "Wednesday", period: "P3", subject: "English", teacher: "Ms. Gurung", room: "R-305" },
  { classSec: "11-B", day: "Thursday", period: "P2", subject: "Computer", teacher: "Mr. Rana", room: "Lab-1" }
]

const CLASSROOMS = ["12-A", "12-B", "11-A", "11-B", "10-A"]
const ROLE_LIST = ["Admin", "Teacher", "Student", "Parent"]

const DB_KEY = "school_suite_backend_db_v2"
const AUTH_SESSION_KEY = "school_suite_auth_session_v1"
const LEADERBOARD_KEY = "school_suite_leaderboard_v3"
const QUIZ_SESSION_KEY = "school_suite_daily_sessions_v2"
const DEFAULT_LOGO_URL = "icons/gbs-logo.png"

let idPhotoDataUrl = ""
let appDb = loadDb()
let authSession = loadAuthSession()
let currentScreen = "access"
let deferredInstallPrompt = null

function getDefaultSchoolProfile() {
  return {
    name: "School Smart Platform",
    code: "SCH-001",
    affiliation: "National Education Board",
    established: "2001",
    session: "2082-2083",
    principal: "Dr. A. Sharma",
    phone: "+977-1-4000000",
    email: "info@schoolsmart.edu.np",
    website: "https://schoolsmart.edu.np",
    emergency: "+977-98XXXXXXXX",
    motto: "Learn, Lead, Serve",
    address: "Kathmandu, Nepal",
    about: "School Smart Platform is an integrated academic and student-service environment for modern schools.",
    logoUrl: DEFAULT_LOGO_URL
  }
}

const actionPermissions = {
  submitQuizBtn: ["Admin", "Teacher", "Student"],
  sendNoticeBtn: ["Admin", "Teacher"],
  postForumBtn: ["Admin", "Teacher", "Student"],
  generateIdBtn: ["Admin", "Teacher"],
  addMcqBtn: ["Admin", "Teacher"],
  exportMcqBtn: ["Admin", "Teacher"],
  evalOmrBtn: ["Admin", "Teacher"],
  convertLatexBtn: ["Admin", "Teacher"],
  markAttendanceBtn: ["Admin", "Teacher"],
  addTimetableBtn: ["Admin", "Teacher"],
  createAssignmentBtn: ["Admin", "Teacher"],
  submitAssignmentBtn: ["Admin", "Teacher", "Student"],
  gradeAssignmentBtn: ["Admin", "Teacher"],
  payFeeBtn: ["Admin", "Teacher", "Student", "Parent"],
  linkParentBtn: ["Admin", "Teacher", "Parent"],
  saveSchoolProfileBtn: ["Admin", "Teacher"],
  resetSchoolProfileBtn: ["Admin", "Teacher"],
  exportDbBtn: ["Admin", "Teacher"],
  resetDbBtn: ["Admin", "Teacher"],
  refreshAnalyticsBtn: ["Admin", "Teacher", "Student", "Parent"],
  exportAnalyticsBtn: ["Admin", "Teacher", "Student", "Parent"]
}

function getEl(id) {
  return document.getElementById(id)
}

function safeJsonParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch (err) {
    return fallback
  }
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function setStatus(id, text, error = false) {
  const el = getEl(id)
  if (!el) {
    return
  }
  el.textContent = text
  el.className = error ? "status error" : "status"
}

function getTodayKey() {
  const now = new Date()
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toDateInputValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function isNextDay(previousDay, currentDay) {
  const prev = parseDateKey(previousDay)
  const curr = parseDateKey(currentDay)
  const diff = Math.round((curr - prev) / 86400000)
  return diff === 1
}

function downloadTextFile(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function defaultForumMap() {
  const map = {}
  CLASSROOMS.forEach((cls) => {
    map[cls] = []
  })
  return map
}

function getDefaultDb() {
  return {
    version: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schoolProfile: getDefaultSchoolProfile(),
    studentRecords: deepClone(BASE_STUDENT_RECORDS),
    notices: [],
    forumPostsByClass: defaultForumMap(),
    moderationQueue: [],
    mcqBank: [],
    attendance: [],
    timetable: deepClone(BASE_TIMETABLE).map((row) => ({ ...row, id: uid("tt") })),
    assignments: [],
    submissions: [],
    payments: [],
    receipts: [],
    parentAlerts: [],
    parentLinks: []
  }
}

function normalizeDb(source) {
  const base = getDefaultDb()
  const db = source && typeof source === "object" ? source : {}

  const normalized = {
    ...base,
    ...db,
    schoolProfile: {
      ...getDefaultSchoolProfile(),
      ...(db.schoolProfile && typeof db.schoolProfile === "object" ? db.schoolProfile : {})
    },
    studentRecords: Array.isArray(db.studentRecords) && db.studentRecords.length ? db.studentRecords : base.studentRecords,
    notices: Array.isArray(db.notices) ? db.notices : [],
    moderationQueue: Array.isArray(db.moderationQueue) ? db.moderationQueue : [],
    mcqBank: Array.isArray(db.mcqBank) ? db.mcqBank : [],
    attendance: Array.isArray(db.attendance) ? db.attendance : [],
    timetable: Array.isArray(db.timetable) && db.timetable.length ? db.timetable : base.timetable,
    assignments: Array.isArray(db.assignments) ? db.assignments : [],
    submissions: Array.isArray(db.submissions) ? db.submissions : [],
    payments: Array.isArray(db.payments) ? db.payments : [],
    receipts: Array.isArray(db.receipts) ? db.receipts : [],
    parentAlerts: Array.isArray(db.parentAlerts) ? db.parentAlerts : [],
    parentLinks: Array.isArray(db.parentLinks) ? db.parentLinks : []
  }

  normalized.forumPostsByClass = defaultForumMap()
  if (db.forumPostsByClass && typeof db.forumPostsByClass === "object") {
    CLASSROOMS.forEach((cls) => {
      const posts = db.forumPostsByClass[cls]
      normalized.forumPostsByClass[cls] = Array.isArray(posts) ? posts : []
    })
  }

  const currentLogo = String(normalized.schoolProfile.logoUrl || "").trim()
  if (!currentLogo || currentLogo === "icons/icon.svg") {
    normalized.schoolProfile.logoUrl = DEFAULT_LOGO_URL
  }

  normalized.timetable = normalized.timetable.map((row) => ({
    id: row.id || uid("tt"),
    classSec: row.classSec || "",
    day: row.day || "Monday",
    period: row.period || "",
    subject: row.subject || "",
    teacher: row.teacher || "",
    room: row.room || ""
  }))

  return normalized
}

function loadDb() {
  const parsed = safeJsonParse(localStorage.getItem(DB_KEY), null)
  const normalized = normalizeDb(parsed)
  localStorage.setItem(DB_KEY, JSON.stringify(normalized))
  return normalized
}

function saveDb() {
  appDb.updatedAt = new Date().toISOString()
  localStorage.setItem(DB_KEY, JSON.stringify(appDb))
  renderDbStats()
}

function getLeaderboard() {
  return safeJsonParse(localStorage.getItem(LEADERBOARD_KEY), [])
}

function saveLeaderboard(board) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(board))
}

function getQuizSessions() {
  return safeJsonParse(localStorage.getItem(QUIZ_SESSION_KEY), {})
}

function saveQuizSessions(sessions) {
  localStorage.setItem(QUIZ_SESSION_KEY, JSON.stringify(sessions))
}

function loadAuthSession() {
  return safeJsonParse(localStorage.getItem(AUTH_SESSION_KEY), null)
}

function saveAuthSession() {
  if (authSession) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authSession))
  } else {
    localStorage.removeItem(AUTH_SESSION_KEY)
  }
}

function hasRole(roles) {
  return !!(authSession && roles.includes(authSession.role))
}

function requireRole(roles, statusId, message) {
  if (hasRole(roles)) {
    return true
  }

  if (statusId) {
    setStatus(statusId, message || `Action allowed only for ${roles.join(", ")}.`, true)
  }
  return false
}

function getStudentById(studentId) {
  if (!studentId) {
    return null
  }
  const key = studentId.trim().toUpperCase()
  return appDb.studentRecords.find((s) => s.id.toUpperCase() === key) || null
}

function getClassList() {
  const fromRecords = appDb.studentRecords.map((s) => s.classSec)
  const merged = [...new Set([...CLASSROOMS, ...fromRecords])]
  return merged.filter(Boolean).sort()
}

function setSelectOptions(id, options) {
  const select = getEl(id)
  if (!select) {
    return
  }

  const current = select.value
  select.innerHTML = options
    .map((item) => `<option value="${escapeHtml(item.value)}">${escapeHtml(item.label)}</option>`)
    .join("")

  const hasCurrent = options.some((item) => item.value === current)
  if (hasCurrent) {
    select.value = current
  }
}

function getVisibleScreenNames() {
  const sections = Array.from(document.querySelectorAll(".app-screen"))
  const names = sections
    .filter((section) => !section.classList.contains("hidden"))
    .map((section) => section.dataset.screen)
    .filter(Boolean)
  return [...new Set(names)]
}

function ensureCurrentScreen() {
  const visible = getVisibleScreenNames()
  if (!visible.length) {
    return
  }

  if (!visible.includes(currentScreen)) {
    currentScreen = visible.includes("access") ? "access" : visible[0]
  }
}

function renderScreenView() {
  ensureCurrentScreen()

  const visible = new Set(getVisibleScreenNames())
  const sections = document.querySelectorAll(".app-screen")
  sections.forEach((section) => {
    const isAllowed = !section.classList.contains("hidden")
    const isActiveScreen = section.dataset.screen === currentScreen
    const shouldShow = isAllowed && isActiveScreen

    section.classList.toggle("screen-active", shouldShow)
    section.classList.toggle("screen-hidden", !shouldShow)
  })

  const navButtons = document.querySelectorAll("[data-screen-target]")
  navButtons.forEach((button) => {
    const target = button.dataset.screenTarget
    const available = visible.has(target)

    if (target !== "access") {
      button.classList.toggle("hidden", !available)
    }
    button.classList.toggle("active", target === currentScreen)
  })
}

function changeScreen(screenName, smooth = false) {
  if (!screenName) {
    return
  }

  currentScreen = screenName
  renderScreenView()

  const appMain = document.querySelector(".app-main")
  if (appMain) {
    appMain.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" })
  }

  if (smooth) {
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    window.scrollTo({ top: 0 })
  }
}

function handleScreenNavClick(event) {
  const button = event.target.closest("[data-screen-target]")
  if (!button) {
    return
  }

  changeScreen(button.dataset.screenTarget, true)
}

function applyRoleVisibility() {
  const cards = document.querySelectorAll(".feature-card")
  cards.forEach((card) => {
    const roles = (card.dataset.roles || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)

    const allowed = authSession ? roles.includes(authSession.role) : false
    card.classList.toggle("hidden", !allowed)
  })

  renderScreenView()
}

function applyActionPermissions() {
  Object.entries(actionPermissions).forEach(([id, roles]) => {
    const button = getEl(id)
    if (!button) {
      return
    }

    const allowed = hasRole(roles)
    button.disabled = !allowed
    button.title = allowed ? "" : `Allowed roles: ${roles.join(", ")}`
  })

  const importFileInput = getEl("importDbFile")
  if (importFileInput) {
    importFileInput.disabled = !hasRole(["Admin", "Teacher"])
  }

  setSchoolProfileFormAccess()
}

function renderRoleHint() {
  const wrap = getEl("roleHint")
  if (!wrap) {
    return
  }

  if (!authSession) {
    wrap.innerHTML = '<span class="chip">Please login to unlock modules by role.</span>'
    return
  }

  const roleFeatures = {
    Admin: ["Full access", "DB controls", "Moderation", "Analytics"],
    Teacher: ["Notice/invoice", "Attendance", "Assignments", "Teacher tools"],
    Student: ["Quiz", "Forum", "Assignment submit", "Fees payment"],
    Parent: ["Fees payment", "Child notifications", "Analytics view"]
  }

  wrap.innerHTML = roleFeatures[authSession.role]
    .map((item) => `<span class="chip">${escapeHtml(item)}</span>`)
    .join("")
}

function renderSchoolBranding() {
  const profile = appDb.schoolProfile || getDefaultSchoolProfile()
  const name = profile.name || "School Smart Platform"
  const tagline = profile.motto || "Smart school management app"
  const logoUrl = profile.logoUrl || DEFAULT_LOGO_URL

  const titleEl = getEl("schoolBrandName")
  if (titleEl) {
    titleEl.textContent = name
  }

  const taglineEl = getEl("schoolBrandTagline")
  if (taglineEl) {
    taglineEl.textContent = `${tagline} | Session ${profile.session || "-"}`
  }

  const logoEl = getEl("schoolBrandLogo")
  if (logoEl) {
    logoEl.src = logoUrl
  }

  const faviconEl = getEl("appFavicon")
  if (faviconEl) {
    faviconEl.href = logoUrl
  }

  const appleIconEl = getEl("appAppleTouchIcon")
  if (appleIconEl) {
    appleIconEl.href = logoUrl
  }

  const navTitle = getEl("appNavTitle")
  if (navTitle) {
    navTitle.textContent = name
  }

  document.title = `${name} - Smart Platform`
}

function renderSchoolProfileForm() {
  const profile = appDb.schoolProfile || getDefaultSchoolProfile()

  getEl("schoolNameInput").value = profile.name || ""
  getEl("schoolCodeInput").value = profile.code || ""
  getEl("schoolAffiliationInput").value = profile.affiliation || ""
  getEl("schoolEstablishedInput").value = profile.established || ""
  getEl("schoolSessionInput").value = profile.session || ""
  getEl("schoolPrincipalInput").value = profile.principal || ""
  getEl("schoolPhoneInput").value = profile.phone || ""
  getEl("schoolEmailInput").value = profile.email || ""
  getEl("schoolWebsiteInput").value = profile.website || ""
  getEl("schoolEmergencyInput").value = profile.emergency || ""
  getEl("schoolMottoInput").value = profile.motto || ""
  getEl("schoolAddressInput").value = profile.address || ""
  getEl("schoolAboutInput").value = profile.about || ""
}

function setSchoolProfileFormAccess() {
  const editable = hasRole(["Admin", "Teacher"])
  const fieldIds = [
    "schoolNameInput",
    "schoolCodeInput",
    "schoolAffiliationInput",
    "schoolEstablishedInput",
    "schoolSessionInput",
    "schoolPrincipalInput",
    "schoolPhoneInput",
    "schoolEmailInput",
    "schoolWebsiteInput",
    "schoolEmergencyInput",
    "schoolMottoInput",
    "schoolAddressInput",
    "schoolAboutInput",
    "schoolLogoInput"
  ]

  fieldIds.forEach((id) => {
    const el = getEl(id)
    if (el) {
      el.disabled = !editable
    }
  })
}

function renderSchoolProfileDisplay() {
  const profile = appDb.schoolProfile || getDefaultSchoolProfile()
  const website = (profile.website || "").trim()
  const websiteLink = website
    ? `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(website)}</a>`
    : "-"

  getEl("schoolProfileDisplay").innerHTML = `
    <div class="school-profile-head">
      <img class="school-profile-logo" src="${escapeHtml(profile.logoUrl || DEFAULT_LOGO_URL)}" alt="School logo">
      <div>
        <h3>${escapeHtml(profile.name || "-")}</h3>
        <p>${escapeHtml(profile.motto || "-")}</p>
        <small>${escapeHtml(profile.address || "-")}</small>
      </div>
    </div>
    <div class="school-profile-grid">
      <div class="school-info-item"><strong>School Code</strong><span>${escapeHtml(profile.code || "-")}</span></div>
      <div class="school-info-item"><strong>Affiliation</strong><span>${escapeHtml(profile.affiliation || "-")}</span></div>
      <div class="school-info-item"><strong>Established</strong><span>${escapeHtml(profile.established || "-")}</span></div>
      <div class="school-info-item"><strong>Academic Session</strong><span>${escapeHtml(profile.session || "-")}</span></div>
      <div class="school-info-item"><strong>Principal</strong><span>${escapeHtml(profile.principal || "-")}</span></div>
      <div class="school-info-item"><strong>Phone</strong><span>${escapeHtml(profile.phone || "-")}</span></div>
      <div class="school-info-item"><strong>Email</strong><span>${escapeHtml(profile.email || "-")}</span></div>
      <div class="school-info-item"><strong>Website</strong><span>${websiteLink}</span></div>
      <div class="school-info-item"><strong>Emergency</strong><span>${escapeHtml(profile.emergency || "-")}</span></div>
    </div>
    <div class="school-info-item">
      <strong>About School</strong>
      <p>${escapeHtml(profile.about || "-")}</p>
    </div>
  `
}

function saveSchoolProfile() {
  if (!requireRole(["Admin", "Teacher"], "schoolProfileStatus")) {
    return
  }

  const name = getEl("schoolNameInput").value.trim()
  const email = getEl("schoolEmailInput").value.trim()
  const website = getEl("schoolWebsiteInput").value.trim()

  if (!name) {
    setStatus("schoolProfileStatus", "School name is required.", true)
    return
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus("schoolProfileStatus", "Enter a valid school email address.", true)
    return
  }

  if (website && !/^https?:\/\//i.test(website)) {
    setStatus("schoolProfileStatus", "Website must start with http:// or https://", true)
    return
  }

  appDb.schoolProfile = {
    ...(appDb.schoolProfile || getDefaultSchoolProfile()),
    name,
    code: getEl("schoolCodeInput").value.trim(),
    affiliation: getEl("schoolAffiliationInput").value.trim(),
    established: getEl("schoolEstablishedInput").value.trim(),
    session: getEl("schoolSessionInput").value.trim(),
    principal: getEl("schoolPrincipalInput").value.trim(),
    phone: getEl("schoolPhoneInput").value.trim(),
    email,
    website,
    emergency: getEl("schoolEmergencyInput").value.trim(),
    motto: getEl("schoolMottoInput").value.trim(),
    address: getEl("schoolAddressInput").value.trim(),
    about: getEl("schoolAboutInput").value.trim()
  }

  saveDb()
  renderSchoolBranding()
  renderSchoolProfileDisplay()
  setStatus("schoolProfileStatus", "School profile saved.")
}

function resetSchoolProfile() {
  if (!requireRole(["Admin", "Teacher"], "schoolProfileStatus")) {
    return
  }

  appDb.schoolProfile = getDefaultSchoolProfile()
  saveDb()
  renderSchoolBranding()
  renderSchoolProfileForm()
  renderSchoolProfileDisplay()
  setStatus("schoolProfileStatus", "School profile reset to default.")
}

function handleSchoolLogoSelection(event) {
  if (!requireRole(["Admin", "Teacher"], "schoolProfileStatus")) {
    event.target.value = ""
    return
  }

  const file = event.target.files && event.target.files[0]
  if (!file) {
    return
  }

  if (!file.type.startsWith("image/")) {
    setStatus("schoolProfileStatus", "Please upload a valid image file for logo.", true)
    event.target.value = ""
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    setStatus("schoolProfileStatus", "Logo image must be below 2MB.", true)
    event.target.value = ""
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    appDb.schoolProfile.logoUrl = String(reader.result || "")
    saveDb()
    renderSchoolBranding()
    renderSchoolProfileDisplay()
    setStatus("schoolProfileStatus", "School logo updated.")
    event.target.value = ""
  }
  reader.readAsDataURL(file)
}

function autofillSessionFields() {
  if (!authSession) {
    return
  }

  getEl("authName").value = authSession.name || ""
  getEl("authRole").value = authSession.role || ""
  getEl("authStudentId").value = authSession.studentId || ""
  getEl("authClass").value = authSession.classSec || ""

  if (authSession.role === "Student") {
    getEl("quizStudent").value = authSession.name || getEl("quizStudent").value
    getEl("forumName").value = authSession.name || getEl("forumName").value
    if (authSession.studentId) {
      getEl("asgStudentId").value = authSession.studentId
      getEl("paymentStudentId").value = authSession.studentId
    }
  }

  if (authSession.role === "Parent" && authSession.studentId) {
    getEl("paymentStudentId").value = authSession.studentId
    getEl("parentStudentId").value = authSession.studentId
    getEl("parentName").value = authSession.name || getEl("parentName").value
  }
}

function renderAuthStatus() {
  if (!authSession) {
    setStatus("authStatus", "No active session. Login to access platform modules.", false)
    return
  }

  const linked = authSession.studentId ? ` | Linked student: ${authSession.studentId}` : ""
  setStatus("authStatus", `Logged in as ${authSession.name} (${authSession.role})${linked}`)
}

function handleLogin() {
  const name = getEl("authName").value.trim()
  const role = getEl("authRole").value
  const studentId = getEl("authStudentId").value.trim().toUpperCase()
  let classSec = getEl("authClass").value.trim().toUpperCase()

  if (!name || !role) {
    setStatus("authStatus", "Name and role are required for login.", true)
    return
  }

  if (!ROLE_LIST.includes(role)) {
    setStatus("authStatus", "Invalid role selected.", true)
    return
  }

  let linkedStudent = null
  if (studentId) {
    linkedStudent = getStudentById(studentId)
    if (!linkedStudent) {
      setStatus("authStatus", `Student ID ${studentId} not found.`, true)
      return
    }
    if (!classSec) {
      classSec = linkedStudent.classSec
    }
  }

  if ((role === "Student" || role === "Parent") && !studentId) {
    setStatus("authStatus", `${role} login requires a linked student ID.`, true)
    return
  }

  authSession = {
    name,
    role,
    studentId: studentId || "",
    classSec: classSec || "",
    loginAt: new Date().toISOString()
  }

  saveAuthSession()

  if (role === "Parent" && studentId) {
    upsertParentLink(name, studentId, "App Inbox")
    saveDb()
  }

  renderAuthStatus()
  renderRoleHint()
  autofillSessionFields()
  applyRoleVisibility()
  applyActionPermissions()
  renderAll()
}

function handleLogout() {
  authSession = null
  saveAuthSession()
  renderAuthStatus()
  renderRoleHint()
  applyRoleVisibility()
  applyActionPermissions()
  renderAll()
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return
  }

  navigator.serviceWorker.register("./service-worker.js")
    .catch(() => {
      setStatus("installStatus", "Offline mode is unavailable in this browser.", true)
    })
}

function setupInstallPrompt() {
  const installBtn = getEl("installAppBtn")
  if (!installBtn) {
    return
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault()
    deferredInstallPrompt = event
    installBtn.hidden = false
    setStatus("installStatus", "Install is ready. Tap 'Install App' for app mode.")
  })

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null
    installBtn.hidden = true
    setStatus("installStatus", "School app installed successfully.")
  })

  const inStandalone = window.matchMedia("(display-mode: standalone)").matches
  if (inStandalone) {
    installBtn.hidden = true
    setStatus("installStatus", "Running in installed app mode.")
  } else {
    setStatus("installStatus", "Tip: install this site to use it like a mobile app.")
  }

  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      setStatus("installStatus", "Install prompt is not available yet in this browser.", true)
      return
    }

    deferredInstallPrompt.prompt()
    const choiceResult = await deferredInstallPrompt.userChoice
    if (choiceResult.outcome === "accepted") {
      setStatus("installStatus", "Install accepted. Finishing setup...")
    } else {
      setStatus("installStatus", "Install dismissed. You can install later anytime.", true)
    }

    deferredInstallPrompt = null
    installBtn.hidden = true
  })
}

function subjectDailyIndex(subject, dateKey) {
  const seedText = `${subject}:${dateKey}`
  const seed = seedText.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return seed % QUIZ_BANK[subject].length
}

function getDailyQuiz(subject) {
  const index = subjectDailyIndex(subject, getTodayKey())
  return QUIZ_BANK[subject][index]
}

function renderQuiz() {
  const subject = getEl("quizSubject").value
  if (!subject || !QUIZ_BANK[subject]) {
    return
  }

  const quiz = getDailyQuiz(subject)
  const dateText = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  getEl("quizToday").textContent = `Daily session for ${dateText}. One attempt per student per subject per day.`

  const options = quiz.options
    .map((opt, idx) => `<label class="box"><input type="radio" name="quizOption" value="${idx}"> ${escapeHtml(opt)}</label>`)
    .join("")

  getEl("quizBox").innerHTML = `
    <div class="box"><strong>${escapeHtml(subject)}:</strong> ${escapeHtml(quiz.question)}</div>
    <div class="grid-2">${options}</div>
  `
}

function updateLeaderboard(studentName, subject, correct, dateKey) {
  const board = getLeaderboard()
  const keyName = studentName.trim().toLowerCase()
  let row = board.find((item) => item.keyName === keyName)

  if (!row) {
    row = {
      keyName,
      name: studentName.trim(),
      score: 0,
      attempts: 0,
      streak: 0,
      maxStreak: 0,
      lastCorrectDate: "",
      subjectStats: {}
    }
    board.push(row)
  }

  row.name = studentName.trim()
  row.attempts += 1

  if (!row.subjectStats[subject]) {
    row.subjectStats[subject] = { attempts: 0, correct: 0 }
  }

  row.subjectStats[subject].attempts += 1

  if (correct) {
    row.score += 10
    row.subjectStats[subject].correct += 1

    if (row.lastCorrectDate === dateKey) {
      row.streak = Math.max(1, row.streak)
    } else if (row.lastCorrectDate && isNextDay(row.lastCorrectDate, dateKey)) {
      row.streak += 1
    } else {
      row.streak = 1
    }

    row.lastCorrectDate = dateKey
    row.maxStreak = Math.max(row.maxStreak, row.streak)
  } else {
    row.streak = 0
  }

  saveLeaderboard(board)
}

function renderLeaderboard() {
  const board = getLeaderboard().sort((a, b) => b.score - a.score || b.maxStreak - a.maxStreak || a.name.localeCompare(b.name))

  if (!board.length) {
    getEl("leaderboardWrap").innerHTML = '<div class="box">No quiz attempts yet.</div>'
    return
  }

  const rows = board
    .map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${escapeHtml(item.name)}</td>
        <td>${item.score}</td>
        <td>${item.streak}</td>
        <td>${item.maxStreak}</td>
        <td>${item.attempts}</td>
      </tr>
    `)
    .join("")

  getEl("leaderboardWrap").innerHTML = `
    <table>
      <thead>
        <tr><th>Rank</th><th>Student</th><th>Score</th><th>Current Streak</th><th>Best Streak</th><th>Attempts</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

function renderDailySessionTracker() {
  let studentName = getEl("quizStudent").value.trim()
  if (authSession && authSession.role === "Student") {
    studentName = authSession.name
    getEl("quizStudent").value = studentName
  }

  if (!studentName) {
    getEl("dailySessionWrap").innerHTML = '<div class="session-item">Enter student name to see today\'s session status.</div>'
    return
  }

  const sessions = getQuizSessions()
  const todayKey = getTodayKey()

  const cards = Object.keys(QUIZ_BANK)
    .map((subject) => {
      const key = `${studentName.trim().toLowerCase()}::${subject}::${todayKey}`
      const session = sessions[key]
      if (!session) {
        return `
          <div class="session-item">
            <strong>${escapeHtml(subject)}</strong>
            <p class="session-pending">Pending</p>
            <small>Not attempted today</small>
          </div>
        `
      }

      return `
        <div class="session-item">
          <strong>${escapeHtml(subject)}</strong>
          <p class="session-ok">${session.correct ? "Correct" : "Incorrect"}</p>
          <small>Submitted at ${escapeHtml(session.time)}</small>
        </div>
      `
    })
    .join("")

  getEl("dailySessionWrap").innerHTML = cards
}

function renderMonthlyNews() {
  const monthLabel = new Date().toLocaleString(undefined, { month: "long", year: "numeric" })
  const top = getLeaderboard()
    .sort((a, b) => b.maxStreak - a.maxStreak || b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 3)

  if (!top.length) {
    getEl("monthlyNews").innerHTML = '<div class="news-item">Top 3 streak news will appear after quiz activity.</div>'
    return
  }

  getEl("monthlyNews").innerHTML = top
    .map((item, idx) => `
      <div class="news-item">
        <strong>#${idx + 1} ${escapeHtml(item.name)}</strong>
        <span class="top-badge">Best Streak: ${item.maxStreak}</span>
        <p>Featured in ${escapeHtml(monthLabel)} monthly leaderboard news.</p>
      </div>
    `)
    .join("")
}

function submitDailyQuiz() {
  if (!requireRole(["Admin", "Teacher", "Student"], "quizStatus")) {
    return
  }

  const subject = getEl("quizSubject").value
  const selected = document.querySelector('input[name="quizOption"]:checked')
  let student = getEl("quizStudent").value.trim()

  if (authSession && authSession.role === "Student") {
    student = authSession.name
    getEl("quizStudent").value = student
  }

  if (!subject || !selected || !student) {
    setStatus("quizStatus", "Student name, subject, and one answer option are required.", true)
    return
  }

  const todayKey = getTodayKey()
  const sessions = getQuizSessions()
  const sessionKey = `${student.toLowerCase()}::${subject}::${todayKey}`

  if (sessions[sessionKey]) {
    setStatus("quizStatus", `${student} already attempted today's ${subject} session.`, true)
    renderDailySessionTracker()
    return
  }

  const quiz = getDailyQuiz(subject)
  const isCorrect = Number(selected.value) === quiz.answer

  sessions[sessionKey] = {
    correct: isCorrect,
    time: new Date().toLocaleTimeString()
  }

  saveQuizSessions(sessions)
  updateLeaderboard(student, subject, isCorrect, todayKey)
  renderLeaderboard()
  renderMonthlyNews()
  renderDailySessionTracker()

  setStatus("quizStatus", isCorrect ? "Correct answer. +10 score updated." : "Incorrect answer. Streak reset.", !isCorrect)
  renderQuiz()
}

function parseCustomPattern(patternText) {
  return patternText
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((freq) => Number.isFinite(freq) && freq >= 120 && freq <= 1800)
}

function playNotification(soundType, customNotes = []) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) {
    return
  }

  const ctx = new AudioCtx()
  const tunes = {
    chime: [523.25, 659.25],
    alert: [392.0, 392.0, 392.0],
    bell: [440.0, 554.37]
  }

  const notes = soundType === "custom" ? customNotes : (tunes[soundType] || tunes.chime)

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.21)
    gain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + index * 0.21 + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.21 + 0.18)
    osc.start(ctx.currentTime + index * 0.21)
    osc.stop(ctx.currentTime + index * 0.21 + 0.2)
  })
}

function resolveStudentTargets(toField) {
  const to = toField.trim()
  if (!to || to.toLowerCase() === "all") {
    return appDb.studentRecords.map((s) => s.id)
  }

  const exactStudent = getStudentById(to)
  if (exactStudent) {
    return [exactStudent.id]
  }

  const classMatch = appDb.studentRecords.filter((s) => s.classSec.toLowerCase() === to.toLowerCase())
  if (classMatch.length) {
    return classMatch.map((s) => s.id)
  }

  const fuzzy = appDb.studentRecords.filter((s) => (`${s.id} ${s.name} ${s.classSec}`).toLowerCase().includes(to.toLowerCase()))
  return fuzzy.map((s) => s.id)
}

function sendNotice() {
  if (!requireRole(["Admin", "Teacher"], "noticeStatus")) {
    return
  }

  const type = getEl("noticeType").value
  const title = getEl("noticeTitle").value.trim()
  const to = getEl("noticeTo").value.trim()
  const body = getEl("noticeBody").value.trim()
  const soundType = getEl("soundType").value
  const customPatternText = getEl("customSound").value.trim()

  if (!title || !to || !body) {
    setStatus("noticeStatus", "Please fill type, title, target, and message.", true)
    return
  }

  let customNotes = []
  if (soundType === "custom") {
    customNotes = parseCustomPattern(customPatternText)
    if (customNotes.length < 2) {
      setStatus("noticeStatus", "Custom sound requires at least two comma-separated frequencies between 120 and 1800 Hz.", true)
      return
    }
  }

  const targets = resolveStudentTargets(to)

  appDb.notices.unshift({
    id: uid("notice"),
    type,
    title,
    to,
    body,
    sound: soundType === "custom" ? `custom (${customNotes.join("-")})` : soundType,
    sentBy: authSession ? authSession.name : "System",
    time: new Date().toLocaleString()
  })

  targets.forEach((studentId) => {
    pushParentAlert(studentId, `${type}: ${title}`, "notice")
  })

  saveDb()
  playNotification(soundType, customNotes)
  renderNoticeFeed()
  renderParentAlerts()
  setStatus("noticeStatus", `${type} sent instantly to ${targets.length || 0} target student(s).`)

  getEl("noticeTitle").value = ""
  getEl("noticeTo").value = ""
  getEl("noticeBody").value = ""
}

function renderNoticeFeed() {
  if (!appDb.notices.length) {
    getEl("noticeFeed").innerHTML = '<div class="feed-item">No notices sent yet.</div>'
    return
  }

  getEl("noticeFeed").innerHTML = appDb.notices
    .slice(0, 10)
    .map((notice) => `
      <div class="feed-item">
        <strong>${escapeHtml(notice.type)}: ${escapeHtml(notice.title)}</strong>
        <p>To: ${escapeHtml(notice.to)}</p>
        <p>${escapeHtml(notice.body)}</p>
        <small>${escapeHtml(notice.time)} | Sound: ${escapeHtml(notice.sound)} | By: ${escapeHtml(notice.sentBy)}</small>
      </div>
    `)
    .join("")
}

function containsWholeWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const pattern = new RegExp(`\\b${escaped}\\b`, "i")
  return pattern.test(text)
}

function validateForumPost(text) {
  const lowered = text.toLowerCase()

  const bannedWords = [
    "idiot", "stupid", "hate", "fool", "nonsense", "useless", "damn", "trash", "loser", "shut"
  ]

  const casualWords = ["hi", "hello", "lol", "bro", "bye", "gm", "gn", "sup", "hey"]

  const academicWords = [
    "question", "doubt", "assignment", "homework", "exam", "chapter", "formula", "topic", "solve", "theorem",
    "concept", "classwork", "revision", "numerical", "grammar", "derivation", "definition"
  ]

  const bad = bannedWords.find((word) => containsWholeWord(lowered, word))
  if (bad) {
    return `Restricted word detected: ${bad}`
  }

  if (/https?:\/\//.test(lowered) || /www\./.test(lowered)) {
    return "Links are not allowed in classroom forums"
  }

  if (/(.)\1{4,}/.test(lowered)) {
    return "Spam-like repeated characters detected"
  }

  const words = lowered.match(/[a-z]+/g) || []
  if (words.length < 5 || text.trim().length < 20) {
    return "Message too short for meaningful academic discussion"
  }

  const academicHits = academicWords.filter((word) => containsWholeWord(lowered, word)).length
  const casualHits = casualWords.filter((word) => containsWholeWord(lowered, word)).length

  if (academicHits < 1 || casualHits > 0) {
    return "Forum allows only classroom-related academic discussion"
  }

  return ""
}

function queueModerationEntry(classroom, name, text, reason) {
  appDb.moderationQueue.unshift({
    id: uid("mod"),
    classroom,
    name,
    text,
    reason,
    status: "Pending",
    createdAt: new Date().toLocaleString(),
    reviewedAt: "",
    reviewedBy: ""
  })
}

function postForum() {
  if (!requireRole(["Admin", "Teacher", "Student"], "forumStatus")) {
    return
  }

  const classroom = getEl("forumClass").value
  const name = (authSession && authSession.role === "Student")
    ? authSession.name
    : getEl("forumName").value.trim()
  const text = getEl("forumText").value.trim()

  if (authSession && authSession.role === "Student") {
    getEl("forumName").value = authSession.name
  }

  if (!classroom || !name || !text) {
    setStatus("forumStatus", "Classroom, name, and message are required.", true)
    return
  }

  const reason = validateForumPost(text)
  if (reason) {
    queueModerationEntry(classroom, name, text, reason)
    saveDb()
    renderModerationDashboard()
    setStatus("forumStatus", `Post blocked and queued for moderation: ${reason}`, true)
    return
  }

  if (!appDb.forumPostsByClass[classroom]) {
    appDb.forumPostsByClass[classroom] = []
  }

  appDb.forumPostsByClass[classroom].unshift({
    id: uid("post"),
    classroom,
    name,
    text,
    time: new Date().toLocaleString(),
    approvedByModeration: false
  })

  saveDb()
  renderForum()
  setStatus("forumStatus", `Post published in ${classroom}.`)
  getEl("forumText").value = ""
}

function renderForum() {
  const classroom = getEl("forumClass").value
  const posts = appDb.forumPostsByClass[classroom] || []

  if (!posts.length) {
    getEl("forumFeed").innerHTML = `<div class="feed-item">No approved posts yet for ${escapeHtml(classroom)}.</div>`
    return
  }

  getEl("forumFeed").innerHTML = posts
    .slice(0, 20)
    .map((post) => `
      <div class="feed-item">
        <strong>${escapeHtml(post.name)} - ${escapeHtml(post.classroom)}</strong>
        <p>${escapeHtml(post.text)}</p>
        <small>${escapeHtml(post.time)}${post.approvedByModeration ? " | Approved by moderator" : ""}</small>
      </div>
    `)
    .join("")
}

function renderModerationDashboard() {
  if (!appDb.moderationQueue.length) {
    getEl("moderationWrap").innerHTML = '<div class="moderation-item">No moderation items yet.</div>'
    return
  }

  getEl("moderationWrap").innerHTML = appDb.moderationQueue
    .map((item) => {
      const actions = item.status === "Pending"
        ? `
          <div class="inline-actions">
            <button class="action-approve" type="button" data-mod-action="approve" data-mod-id="${item.id}">Approve</button>
            <button class="action-reject" type="button" data-mod-action="reject" data-mod-id="${item.id}">Reject</button>
          </div>
        `
        : `<small>Status: ${escapeHtml(item.status)}${item.reviewedBy ? ` by ${escapeHtml(item.reviewedBy)}` : ""}</small>`

      return `
        <div class="moderation-item">
          <strong>${escapeHtml(item.name)} - ${escapeHtml(item.classroom)}</strong>
          <p>${escapeHtml(item.text)}</p>
          <small>Reason: ${escapeHtml(item.reason)} | Created: ${escapeHtml(item.createdAt)}</small>
          ${actions}
        </div>
      `
    })
    .join("")
}

function handleModerationAction(event) {
  const button = event.target.closest("button[data-mod-action]")
  if (!button) {
    return
  }

  if (!requireRole(["Admin", "Teacher"], "moderationStatus")) {
    return
  }

  const action = button.dataset.modAction
  const itemId = button.dataset.modId
  const item = appDb.moderationQueue.find((entry) => entry.id === itemId)

  if (!item || item.status !== "Pending") {
    setStatus("moderationStatus", "Moderation item no longer pending.", true)
    return
  }

  if (action === "approve") {
    item.status = "Approved"
    item.reviewedAt = new Date().toLocaleString()
    item.reviewedBy = authSession ? authSession.name : "Moderator"

    if (!appDb.forumPostsByClass[item.classroom]) {
      appDb.forumPostsByClass[item.classroom] = []
    }

    appDb.forumPostsByClass[item.classroom].unshift({
      id: uid("post"),
      classroom: item.classroom,
      name: item.name,
      text: item.text,
      time: new Date().toLocaleString(),
      approvedByModeration: true
    })

    setStatus("moderationStatus", "Post approved and moved to classroom forum.")
  } else {
    item.status = "Rejected"
    item.reviewedAt = new Date().toLocaleString()
    item.reviewedBy = authSession ? authSession.name : "Moderator"
    setStatus("moderationStatus", "Post rejected from moderation queue.", true)
  }

  saveDb()
  renderModerationDashboard()
  renderForum()
}

function renderStudentStatus() {
  const query = getEl("studentSearch").value.trim().toLowerCase()

  let filtered = appDb.studentRecords.filter((student) => {
    const key = `${student.id} ${student.name} ${student.classSec}`.toLowerCase()
    return key.includes(query)
  })

  if (authSession && (authSession.role === "Student" || authSession.role === "Parent") && authSession.studentId) {
    filtered = filtered.filter((student) => student.id.toUpperCase() === authSession.studentId.toUpperCase())
  }

  if (!filtered.length) {
    getEl("studentStatusWrap").innerHTML = '<div class="student-item">No matching student found.</div>'
    return
  }

  const totalFeeDue = filtered.reduce((sum, student) => sum + Number(student.feesDue || 0), 0)
  const totalBooksDue = filtered.reduce((sum, student) => sum + Number(student.libraryBooksDue || 0), 0)

  const summary = `
    <div class="student-item">
      <strong>Filtered Summary</strong>
      <p>Total fee due: NPR ${totalFeeDue}</p>
      <p>Total library books pending: ${totalBooksDue}</p>
    </div>
  `

  const cards = filtered
    .map((student) => {
      const feeTag = student.feesDue > 0 ? `Due NPR ${student.feesDue}` : "No fee due"
      const libraryTag = student.libraryBooksDue > 0
        ? `${student.libraryBooksDue} book(s) pending, fine NPR ${student.libraryFine}`
        : "Library clear"

      return `
        <div class="student-item">
          <strong>${escapeHtml(student.name)} (${escapeHtml(student.id)})</strong>
          <p>Class: ${escapeHtml(student.classSec)}</p>
          <p>Fees and dues: ${feeTag}</p>
          <p>Library status: ${libraryTag}</p>
        </div>
      `
    })
    .join("")

  getEl("studentStatusWrap").innerHTML = summary + cards
}

function renderPaperArchive() {
  const query = getEl("paperFilter").value.trim().toLowerCase()
  const filtered = PAPER_ARCHIVE.filter((paper) => {
    const key = `${paper.subject} ${paper.year} ${paper.title}`.toLowerCase()
    return key.includes(query)
  })

  if (!filtered.length) {
    getEl("paperArchive").innerHTML = '<div class="paper-item">No past paper found for this filter.</div>'
    return
  }

  getEl("paperArchive").innerHTML = filtered
    .map((paper) => `
      <div class="paper-item">
        <strong>${escapeHtml(paper.subject)} - ${escapeHtml(paper.year)}</strong>
        <p>${escapeHtml(paper.title)}</p>
        <a href="${escapeHtml(paper.link)}">Open archive item</a>
      </div>
    `)
    .join("")
}

function handleIdPhotoSelection(event) {
  const file = event.target.files && event.target.files[0]
  if (!file) {
    idPhotoDataUrl = ""
    return
  }

  if (!file.type.startsWith("image/")) {
    idPhotoDataUrl = ""
    getEl("idCardPreview").innerHTML = '<div class="box">Please upload a valid image file.</div>'
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    idPhotoDataUrl = ""
    getEl("idCardPreview").innerHTML = '<div class="box">Photo must be below 2MB.</div>'
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    idPhotoDataUrl = String(reader.result || "")
    getEl("idCardPreview").innerHTML = '<div class="box">Photo uploaded. Click "Generate ID Card" to preview the ID.</div>'
  }
  reader.readAsDataURL(file)
}

function generateIdCard() {
  if (!requireRole(["Admin", "Teacher"], "authStatus", "Only Admin/Teacher can generate digital ID cards.")) {
    return
  }

  const name = getEl("idName").value.trim()
  const cls = getEl("idClass").value.trim()
  const roll = getEl("idRoll").value.trim()
  const blood = getEl("idBlood").value.trim()
  const contact = getEl("idContact").value.trim()

  if (!name || !cls || !roll || !blood || !contact) {
    getEl("idCardPreview").innerHTML = '<div class="box">Please fill all ID fields.</div>'
    return
  }

  if (!idPhotoDataUrl) {
    getEl("idCardPreview").innerHTML = '<div class="box">Please upload a photo before generating ID card.</div>'
    return
  }

  const idCode = `SID-${cls.replace(/\s+/g, "").toUpperCase()}-${roll.toUpperCase()}`

  getEl("idCardPreview").innerHTML = `
    <div class="id-card">
      <div class="id-head">Digital Student ID Card</div>
      <div class="id-body">
        <div class="id-photo-wrap"><img class="id-photo" src="${idPhotoDataUrl}" alt="Student photo"></div>
        <div class="id-row"><strong>ID No.</strong><span>${escapeHtml(idCode)}</span></div>
        <div class="id-row"><strong>Name</strong><span>${escapeHtml(name)}</span></div>
        <div class="id-row"><strong>Class</strong><span>${escapeHtml(cls)}</span></div>
        <div class="id-row"><strong>Roll</strong><span>${escapeHtml(roll)}</span></div>
        <div class="id-row"><strong>Blood</strong><span>${escapeHtml(blood)}</span></div>
        <div class="id-row"><strong>Emergency</strong><span>${escapeHtml(contact)}</span></div>
      </div>
    </div>
  `
}

function addMcq() {
  if (!requireRole(["Admin", "Teacher"], "mcqStatus")) {
    return
  }

  const question = getEl("mcqQuestion").value.trim()
  const optionA = getEl("mcqA").value.trim()
  const optionB = getEl("mcqB").value.trim()
  const optionC = getEl("mcqC").value.trim()
  const optionD = getEl("mcqD").value.trim()
  const correct = getEl("mcqCorrect").value.trim().toUpperCase()

  if (!question || !optionA || !optionB || !optionC || !optionD) {
    setStatus("mcqStatus", "Question and all four options are required.", true)
    return
  }

  if (!["A", "B", "C", "D"].includes(correct)) {
    setStatus("mcqStatus", "Correct option must be one of A/B/C/D.", true)
    return
  }

  appDb.mcqBank.unshift({
    id: uid("mcq"),
    question,
    options: { A: optionA, B: optionB, C: optionC, D: optionD },
    correct,
    createdBy: authSession ? authSession.name : "Teacher",
    createdAt: new Date().toLocaleString()
  })

  saveDb()
  renderMcqBank()
  setStatus("mcqStatus", "MCQ added to bank.")

  getEl("mcqQuestion").value = ""
  getEl("mcqA").value = ""
  getEl("mcqB").value = ""
  getEl("mcqC").value = ""
  getEl("mcqD").value = ""
  getEl("mcqCorrect").value = ""
}

function exportMcqBank() {
  if (!requireRole(["Admin", "Teacher"], "mcqStatus")) {
    return
  }

  if (!appDb.mcqBank.length) {
    setStatus("mcqStatus", "No MCQ to export.", true)
    return
  }

  const payload = JSON.stringify(appDb.mcqBank, null, 2)
  downloadTextFile("mcq-bank.json", payload, "application/json")

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(payload)
      .then(() => {
        setStatus("mcqStatus", "MCQ bank copied to clipboard and downloaded.")
      })
      .catch(() => {
        setStatus("mcqStatus", "MCQ bank downloaded as JSON.")
      })
    return
  }

  setStatus("mcqStatus", "MCQ bank downloaded as JSON.")
}

function renderMcqBank() {
  if (!appDb.mcqBank.length) {
    getEl("mcqBank").innerHTML = '<div class="mcq-item">No MCQ added yet.</div>'
    return
  }

  getEl("mcqBank").innerHTML = appDb.mcqBank
    .slice(0, 12)
    .map((mcq, index) => `
      <div class="mcq-item">
        <strong>Q${index + 1}. ${escapeHtml(mcq.question)}</strong>
        <p>A) ${escapeHtml(mcq.options.A)}</p>
        <p>B) ${escapeHtml(mcq.options.B)}</p>
        <p>C) ${escapeHtml(mcq.options.C)}</p>
        <p>D) ${escapeHtml(mcq.options.D)}</p>
        <p class="code">Correct: ${escapeHtml(mcq.correct)} | By: ${escapeHtml(mcq.createdBy || "-")}</p>
      </div>
    `)
    .join("")
}

function evaluateOmr() {
  if (!requireRole(["Admin", "Teacher"], "omrResult")) {
    return
  }

  const key = getEl("omrKey").value.trim().toUpperCase().replace(/[^ABCD]/g, "")
  const student = getEl("omrStudent").value.trim().toUpperCase().replace(/[^ABCD]/g, "")

  if (!key || !student) {
    setStatus("omrResult", "Enter both answer key and student response.", true)
    return
  }

  if (key.length !== student.length) {
    setStatus("omrResult", "Length mismatch between key and response.", true)
    return
  }

  let score = 0
  for (let i = 0; i < key.length; i += 1) {
    if (key[i] === student[i]) {
      score += 1
    }
  }

  setStatus("omrResult", `Score: ${score}/${key.length}`)
}

function wordToLatex(text) {
  let out = text
  out = out.replace(/sqrt\(([^)]+)\)/g, "\\\\sqrt{$1}")
  out = out.replace(/([A-Za-z0-9]+)\^([A-Za-z0-9]+)/g, "$1^{$2}")
  out = out.replace(/([A-Za-z0-9]+)\/([A-Za-z0-9]+)/g, "\\\\frac{$1}{$2}")
  out = out.replace(/<=/g, "\\\\leq")
  out = out.replace(/>=/g, "\\\\geq")
  out = out.replace(/!=/g, "\\\\neq")
  out = out.replace(/(\d+)\s*\*\s*(\d+)/g, "$1 \\times $2")
  out = out.replace(/\n/g, " \\\\ \n")
  return out
}

function populateClassSelects() {
  const classOptions = getClassList().map((cls) => ({ value: cls, label: cls }))

  setSelectOptions("attClass", classOptions)
  setSelectOptions("ttClass", classOptions)
  setSelectOptions("asgClass", classOptions)

  setSelectOptions("attFilterClass", [{ value: "", label: "All Classes" }, ...classOptions])
  setSelectOptions("ttFilterClass", [{ value: "", label: "All Classes" }, ...classOptions])
}

function renderAttendanceStudentOptions() {
  const selectedClass = getEl("attClass").value
  const students = appDb.studentRecords.filter((student) => student.classSec === selectedClass)

  if (!students.length) {
    setSelectOptions("attStudentId", [])
    return
  }

  setSelectOptions("attStudentId", students.map((student) => ({
    value: student.id,
    label: `${student.id} - ${student.name}`
  })))
}

function markAttendance() {
  if (!requireRole(["Admin", "Teacher"], "attendanceStatus")) {
    return
  }

  const date = getEl("attDate").value
  const classSec = getEl("attClass").value
  const studentId = getEl("attStudentId").value
  const status = getEl("attStatus").value

  if (!date || !classSec || !studentId || !status) {
    setStatus("attendanceStatus", "Date, class, student, and status are required.", true)
    return
  }

  const existing = appDb.attendance.find((item) => item.date === date && item.studentId === studentId)
  if (existing) {
    existing.status = status
    existing.markedBy = authSession ? authSession.name : "Teacher"
    existing.time = new Date().toLocaleTimeString()
  } else {
    appDb.attendance.unshift({
      id: uid("att"),
      date,
      classSec,
      studentId,
      status,
      markedBy: authSession ? authSession.name : "Teacher",
      time: new Date().toLocaleTimeString()
    })
  }

  saveDb()
  renderAttendance()
  renderAnalytics()
  setStatus("attendanceStatus", `Attendance marked for ${studentId}.`)
}

function renderAttendance() {
  const filterClass = getEl("attFilterClass").value
  let rows = appDb.attendance

  if (filterClass) {
    rows = rows.filter((row) => row.classSec === filterClass)
  }

  if (!rows.length) {
    getEl("attendanceWrap").innerHTML = '<div class="box">No attendance entries yet.</div>'
    return
  }

  const sorted = [...rows].sort((a, b) => {
    const dateSort = b.date.localeCompare(a.date)
    if (dateSort !== 0) {
      return dateSort
    }
    return a.studentId.localeCompare(b.studentId)
  })

  const htmlRows = sorted
    .slice(0, 30)
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.date)}</td>
        <td>${escapeHtml(row.classSec)}</td>
        <td>${escapeHtml(row.studentId)}</td>
        <td>${escapeHtml(row.status)}</td>
        <td>${escapeHtml(row.markedBy || "-")}</td>
      </tr>
    `)
    .join("")

  getEl("attendanceWrap").innerHTML = `
    <table>
      <thead><tr><th>Date</th><th>Class</th><th>Student</th><th>Status</th><th>Marked By</th></tr></thead>
      <tbody>${htmlRows}</tbody>
    </table>
  `
}

function addTimetableEntry() {
  if (!requireRole(["Admin", "Teacher"], "ttStatus")) {
    return
  }

  const classSec = getEl("ttClass").value
  const day = getEl("ttDay").value
  const period = getEl("ttPeriod").value.trim()
  const subject = getEl("ttSubject").value.trim()
  const teacher = getEl("ttTeacher").value.trim()
  const room = getEl("ttRoom").value.trim()

  if (!classSec || !day || !period || !subject || !teacher || !room) {
    setStatus("ttStatus", "All timetable fields are required.", true)
    return
  }

  appDb.timetable.push({
    id: uid("tt"),
    classSec,
    day,
    period,
    subject,
    teacher,
    room
  })

  saveDb()
  renderTimetable()
  setStatus("ttStatus", `Timetable entry added for ${classSec} (${day} ${period}).`)

  getEl("ttPeriod").value = ""
  getEl("ttSubject").value = ""
  getEl("ttTeacher").value = ""
  getEl("ttRoom").value = ""
}

function renderTimetable() {
  const filterClass = getEl("ttFilterClass").value
  const filterDay = getEl("ttFilterDay").value

  let rows = appDb.timetable
  if (filterClass) {
    rows = rows.filter((row) => row.classSec === filterClass)
  }
  if (filterDay) {
    rows = rows.filter((row) => row.day === filterDay)
  }

  if (!rows.length) {
    getEl("timetableWrap").innerHTML = '<div class="box">No timetable entries for selected filters.</div>'
    return
  }

  const dayOrder = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Sunday: 6 }

  const sorted = [...rows].sort((a, b) => {
    const clsSort = a.classSec.localeCompare(b.classSec)
    if (clsSort !== 0) {
      return clsSort
    }
    const daySort = (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99)
    if (daySort !== 0) {
      return daySort
    }
    return a.period.localeCompare(b.period)
  })

  const htmlRows = sorted
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.classSec)}</td>
        <td>${escapeHtml(row.day)}</td>
        <td>${escapeHtml(row.period)}</td>
        <td>${escapeHtml(row.subject)}</td>
        <td>${escapeHtml(row.teacher)}</td>
        <td>${escapeHtml(row.room)}</td>
      </tr>
    `)
    .join("")

  getEl("timetableWrap").innerHTML = `
    <table>
      <thead><tr><th>Class</th><th>Day</th><th>Period</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead>
      <tbody>${htmlRows}</tbody>
    </table>
  `
}

function createAssignment() {
  if (!requireRole(["Admin", "Teacher"], "asgCreateStatus")) {
    return
  }

  const title = getEl("asgTitle").value.trim()
  const subject = getEl("asgSubject").value.trim()
  const classSec = getEl("asgClass").value
  const dueDate = getEl("asgDue").value
  const maxScore = Number(getEl("asgMaxScore").value)
  const body = getEl("asgBody").value.trim()

  if (!title || !subject || !classSec || !dueDate || !body || !Number.isFinite(maxScore) || maxScore <= 0) {
    setStatus("asgCreateStatus", "All assignment fields are required with valid max score.", true)
    return
  }

  const assignment = {
    id: uid("asg"),
    title,
    subject,
    classSec,
    dueDate,
    maxScore,
    body,
    createdBy: authSession ? authSession.name : "Teacher",
    createdAt: new Date().toLocaleString()
  }

  appDb.assignments.unshift(assignment)

  appDb.studentRecords
    .filter((student) => student.classSec === classSec)
    .forEach((student) => {
      pushParentAlert(student.id, `New assignment for ${classSec}: ${title}`, "assignment")
    })

  saveDb()
  renderAssignments()
  renderParentAlerts()
  renderAnalytics()
  setStatus("asgCreateStatus", `Assignment created for ${classSec}.`)

  getEl("asgTitle").value = ""
  getEl("asgSubject").value = ""
  getEl("asgBody").value = ""
}

function getVisibleAssignmentsForCurrentSession() {
  let assignments = appDb.assignments

  if (authSession && authSession.role === "Student" && authSession.studentId) {
    const student = getStudentById(authSession.studentId)
    if (student) {
      assignments = assignments.filter((item) => item.classSec === student.classSec)
    }
  }

  if (authSession && authSession.role === "Parent" && authSession.studentId) {
    const student = getStudentById(authSession.studentId)
    if (student) {
      assignments = assignments.filter((item) => item.classSec === student.classSec)
    }
  }

  return assignments
}

function populateAssignmentSelects() {
  let studentId = getEl("asgStudentId").value.trim().toUpperCase()

  if (authSession && authSession.role === "Student" && authSession.studentId) {
    studentId = authSession.studentId
    getEl("asgStudentId").value = studentId
  }

  const student = getStudentById(studentId)
  let assignments = appDb.assignments

  if (student) {
    assignments = assignments.filter((item) => item.classSec === student.classSec)
  }

  if (!assignments.length) {
    setSelectOptions("asgSelect", [{ value: "", label: "No assignments available" }])
  } else {
    setSelectOptions("asgSelect", assignments.map((item) => ({
      value: item.id,
      label: `${item.title} (${item.classSec} | Due ${item.dueDate})`
    })))
  }

  const pending = appDb.submissions
    .filter((submission) => submission.status !== "graded")
    .map((submission) => {
      const assignment = appDb.assignments.find((item) => item.id === submission.assignmentId)
      const assignmentTitle = assignment ? assignment.title : "Unknown"
      return {
        value: submission.id,
        label: `${submission.studentId} | ${assignmentTitle}`
      }
    })

  if (!pending.length) {
    setSelectOptions("gradeSubmissionSelect", [{ value: "", label: "No pending submissions" }])
  } else {
    setSelectOptions("gradeSubmissionSelect", pending)
  }
}

function submitAssignment() {
  if (!requireRole(["Admin", "Teacher", "Student"], "asgSubmitStatus")) {
    return
  }

  let studentId = getEl("asgStudentId").value.trim().toUpperCase()
  if (authSession && authSession.role === "Student" && authSession.studentId) {
    studentId = authSession.studentId
    getEl("asgStudentId").value = studentId
  }

  const assignmentId = getEl("asgSelect").value
  const text = getEl("asgSubmissionText").value.trim()

  if (!studentId || !assignmentId || !text) {
    setStatus("asgSubmitStatus", "Student ID, assignment, and submission text are required.", true)
    return
  }

  const student = getStudentById(studentId)
  if (!student) {
    setStatus("asgSubmitStatus", `Student ${studentId} not found.`, true)
    return
  }

  const assignment = appDb.assignments.find((item) => item.id === assignmentId)
  if (!assignment) {
    setStatus("asgSubmitStatus", "Selected assignment not found.", true)
    return
  }

  if (student.classSec !== assignment.classSec) {
    setStatus("asgSubmitStatus", `Assignment belongs to ${assignment.classSec}. Student is in ${student.classSec}.`, true)
    return
  }

  const existing = appDb.submissions.find((item) => item.assignmentId === assignmentId && item.studentId === studentId)

  if (existing && existing.status === "graded") {
    setStatus("asgSubmitStatus", "Submission is already graded and locked.", true)
    return
  }

  if (existing) {
    existing.text = text
    existing.submittedAt = new Date().toLocaleString()
    existing.status = "submitted"
  } else {
    appDb.submissions.unshift({
      id: uid("sub"),
      assignmentId,
      studentId,
      text,
      submittedAt: new Date().toLocaleString(),
      status: "submitted",
      score: null,
      feedback: "",
      gradedBy: "",
      gradedAt: ""
    })
  }

  saveDb()
  renderAssignments()
  renderAnalytics()
  setStatus("asgSubmitStatus", `Submission saved for ${studentId}.`)
  getEl("asgSubmissionText").value = ""
}

function gradeAssignment() {
  if (!requireRole(["Admin", "Teacher"], "asgGradeStatus")) {
    return
  }

  const submissionId = getEl("gradeSubmissionSelect").value
  const score = Number(getEl("gradeScore").value)
  const feedback = getEl("gradeFeedback").value.trim()

  if (!submissionId || !Number.isFinite(score)) {
    setStatus("asgGradeStatus", "Select submission and enter valid score.", true)
    return
  }

  const submission = appDb.submissions.find((item) => item.id === submissionId)
  if (!submission) {
    setStatus("asgGradeStatus", "Submission not found.", true)
    return
  }

  const assignment = appDb.assignments.find((item) => item.id === submission.assignmentId)
  if (!assignment) {
    setStatus("asgGradeStatus", "Associated assignment not found.", true)
    return
  }

  if (score < 0 || score > assignment.maxScore) {
    setStatus("asgGradeStatus", `Score must be between 0 and ${assignment.maxScore}.`, true)
    return
  }

  submission.score = score
  submission.feedback = feedback
  submission.status = "graded"
  submission.gradedBy = authSession ? authSession.name : "Teacher"
  submission.gradedAt = new Date().toLocaleString()

  pushParentAlert(submission.studentId, `Assignment graded: ${assignment.title} (${score}/${assignment.maxScore})`, "grading")
  saveDb()
  renderAssignments()
  renderParentAlerts()
  renderAnalytics()
  setStatus("asgGradeStatus", `Submission graded (${score}/${assignment.maxScore}).`)

  getEl("gradeScore").value = ""
  getEl("gradeFeedback").value = ""
}

function renderAssignments() {
  const visibleAssignments = getVisibleAssignmentsForCurrentSession()

  if (!visibleAssignments.length) {
    getEl("assignmentBoard").innerHTML = '<div class="assignment-item">No assignments available.</div>'
  } else {
    getEl("assignmentBoard").innerHTML = visibleAssignments
      .map((assignment) => {
        const overdue = new Date(assignment.dueDate) < new Date(getTodayKey())
        return `
          <div class="assignment-item">
            <strong>${escapeHtml(assignment.title)}</strong>
            <p>${escapeHtml(assignment.subject)} | Class ${escapeHtml(assignment.classSec)} | Max ${assignment.maxScore}</p>
            <p>${escapeHtml(assignment.body)}</p>
            <small>Due ${escapeHtml(assignment.dueDate)} | ${overdue ? "Overdue" : "Open"} | By ${escapeHtml(assignment.createdBy)}</small>
          </div>
        `
      })
      .join("")
  }

  let visibleSubmissions = appDb.submissions

  if (authSession && authSession.role === "Student" && authSession.studentId) {
    visibleSubmissions = visibleSubmissions.filter((submission) => submission.studentId === authSession.studentId)
  }

  if (authSession && authSession.role === "Parent" && authSession.studentId) {
    visibleSubmissions = visibleSubmissions.filter((submission) => submission.studentId === authSession.studentId)
  }

  if (!visibleSubmissions.length) {
    getEl("submissionBoard").innerHTML = '<div class="submission-item">No submissions yet.</div>'
  } else {
    getEl("submissionBoard").innerHTML = visibleSubmissions
      .slice(0, 20)
      .map((submission) => {
        const assignment = appDb.assignments.find((item) => item.id === submission.assignmentId)
        const title = assignment ? assignment.title : "Unknown Assignment"

        return `
          <div class="submission-item">
            <strong>${escapeHtml(submission.studentId)} - ${escapeHtml(title)}</strong>
            <p>${escapeHtml(submission.text)}</p>
            <small>Submitted: ${escapeHtml(submission.submittedAt)} | Status: ${escapeHtml(submission.status)}</small>
            ${submission.status === "graded" ? `<p><strong>Score:</strong> ${submission.score} | Feedback: ${escapeHtml(submission.feedback || "-")}</p>` : ""}
          </div>
        `
      })
      .join("")
  }

  populateAssignmentSelects()
}

function processPayment() {
  if (!requireRole(["Admin", "Teacher", "Student", "Parent"], "paymentStatus")) {
    return
  }

  let studentId = getEl("paymentStudentId").value.trim().toUpperCase()
  const amount = Number(getEl("paymentAmount").value)
  const method = getEl("paymentMethod").value
  const ref = getEl("paymentRef").value.trim()

  if (authSession && (authSession.role === "Student" || authSession.role === "Parent") && authSession.studentId) {
    studentId = authSession.studentId
    getEl("paymentStudentId").value = studentId
  }

  if (!studentId || !Number.isFinite(amount) || amount <= 0 || !method) {
    setStatus("paymentStatus", "Student ID, valid amount, and method are required.", true)
    return
  }

  const student = getStudentById(studentId)
  if (!student) {
    setStatus("paymentStatus", `Student ${studentId} not found.`, true)
    return
  }

  if (amount > student.feesDue) {
    setStatus("paymentStatus", `Amount exceeds outstanding due (NPR ${student.feesDue}).`, true)
    return
  }

  student.feesDue = Math.max(0, student.feesDue - amount)

  const paymentId = uid("pay")
  const receiptNo = `RCP-${Date.now().toString().slice(-6)}`

  appDb.payments.unshift({
    id: paymentId,
    studentId,
    amount,
    method,
    ref: ref || `AUTO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    paidBy: authSession ? `${authSession.name} (${authSession.role})` : "Unknown",
    time: new Date().toLocaleString()
  })

  appDb.receipts.unshift({
    id: uid("rcp"),
    receiptNo,
    paymentId,
    studentId,
    amount,
    method,
    time: new Date().toLocaleString(),
    dueLeft: student.feesDue
  })

  pushParentAlert(studentId, `Fee payment received: NPR ${amount}. Remaining due: NPR ${student.feesDue}`, "payment")
  saveDb()

  renderReceipts()
  renderStudentStatus()
  renderParentAlerts()
  renderAnalytics()

  setStatus("paymentStatus", `Payment successful. Receipt ${receiptNo} generated.`)
  getEl("paymentAmount").value = ""
  getEl("paymentRef").value = ""
}

function getVisibleReceipts() {
  if (!authSession) {
    return []
  }

  if ((authSession.role === "Student" || authSession.role === "Parent") && authSession.studentId) {
    return appDb.receipts.filter((receipt) => receipt.studentId === authSession.studentId)
  }

  return appDb.receipts
}

function renderReceipts() {
  const receipts = getVisibleReceipts()

  if (!receipts.length) {
    getEl("receiptWrap").innerHTML = '<div class="receipt-item">No receipts available.</div>'
    return
  }

  getEl("receiptWrap").innerHTML = receipts
    .slice(0, 20)
    .map((receipt) => `
      <div class="receipt-item">
        <strong>${escapeHtml(receipt.receiptNo)}</strong>
        <p>Student: ${escapeHtml(receipt.studentId)} | Amount: NPR ${receipt.amount}</p>
        <p>Method: ${escapeHtml(receipt.method)} | Due Left: NPR ${receipt.dueLeft}</p>
        <small>${escapeHtml(receipt.time)}</small>
      </div>
    `)
    .join("")
}

function upsertParentLink(parentName, studentId, channel) {
  const normalizedName = parentName.trim()
  const normalizedStudentId = studentId.trim().toUpperCase()
  const existing = appDb.parentLinks.find((link) => link.parentName.toLowerCase() === normalizedName.toLowerCase() && link.studentId === normalizedStudentId)

  if (existing) {
    existing.channel = channel
    existing.updatedAt = new Date().toLocaleString()
    return
  }

  appDb.parentLinks.unshift({
    id: uid("plink"),
    parentName: normalizedName,
    studentId: normalizedStudentId,
    channel,
    createdAt: new Date().toLocaleString(),
    updatedAt: ""
  })
}

function linkParent() {
  if (!requireRole(["Admin", "Teacher", "Parent"], "parentLinkStatus")) {
    return
  }

  let parentName = getEl("parentName").value.trim()
  const studentId = getEl("parentStudentId").value.trim().toUpperCase()
  const channel = getEl("parentChannel").value

  if (authSession && authSession.role === "Parent") {
    parentName = authSession.name
    getEl("parentName").value = parentName
  }

  if (!parentName || !studentId || !channel) {
    setStatus("parentLinkStatus", "Parent name, student ID, and channel are required.", true)
    return
  }

  if (!getStudentById(studentId)) {
    setStatus("parentLinkStatus", `Student ${studentId} not found.`, true)
    return
  }

  upsertParentLink(parentName, studentId, channel)
  saveDb()

  setStatus("parentLinkStatus", `Parent linked to ${studentId} via ${channel}.`)
  renderParentLinks()
}

function pushParentAlert(studentId, message, category) {
  const links = appDb.parentLinks.filter((link) => link.studentId === studentId)

  if (!links.length) {
    appDb.parentAlerts.unshift({
      id: uid("alert"),
      studentId,
      parentName: "Unlinked Parent",
      channel: "App Inbox",
      message,
      category,
      time: new Date().toLocaleString(),
      read: false
    })
    return
  }

  links.forEach((link) => {
    appDb.parentAlerts.unshift({
      id: uid("alert"),
      studentId,
      parentName: link.parentName,
      channel: link.channel,
      message,
      category,
      time: new Date().toLocaleString(),
      read: false
    })
  })
}

function renderParentLinks() {
  let links = appDb.parentLinks

  if (authSession && authSession.role === "Parent") {
    links = links.filter((link) => link.parentName.toLowerCase() === authSession.name.toLowerCase())
  }

  if (!links.length) {
    getEl("parentLinkWrap").innerHTML = '<div class="link-item">No parent links registered.</div>'
    return
  }

  getEl("parentLinkWrap").innerHTML = links
    .map((link) => `
      <div class="link-item">
        <strong>${escapeHtml(link.parentName)}</strong>
        <p>Student: ${escapeHtml(link.studentId)} | Channel: ${escapeHtml(link.channel)}</p>
        <small>Created: ${escapeHtml(link.createdAt)}${link.updatedAt ? ` | Updated: ${escapeHtml(link.updatedAt)}` : ""}</small>
      </div>
    `)
    .join("")
}

function renderParentAlerts() {
  const filterStudentId = getEl("parentAlertStudentFilter").value.trim().toUpperCase()

  let alerts = appDb.parentAlerts

  if (authSession && authSession.role === "Parent") {
    alerts = alerts.filter((alert) => {
      const sameParent = alert.parentName.toLowerCase() === authSession.name.toLowerCase()
      const sameStudent = authSession.studentId && alert.studentId === authSession.studentId
      return sameParent || sameStudent
    })
  }

  if (filterStudentId) {
    alerts = alerts.filter((alert) => alert.studentId === filterStudentId)
  }

  if (!alerts.length) {
    getEl("parentAlertWrap").innerHTML = '<div class="alert-item">No notifications available.</div>'
    return
  }

  getEl("parentAlertWrap").innerHTML = alerts
    .slice(0, 30)
    .map((alert) => `
      <div class="alert-item">
        <strong>${escapeHtml(alert.parentName)} - ${escapeHtml(alert.studentId)}</strong>
        <p>${escapeHtml(alert.message)}</p>
        <small>${escapeHtml(alert.time)} | ${escapeHtml(alert.category)} | ${escapeHtml(alert.channel)}</small>
        ${alert.read ? '<p class="ok">Read</p>' : `<div class="inline-actions"><button type="button" data-alert-id="${alert.id}" class="action-approve">Mark as Read</button></div>`}
      </div>
    `)
    .join("")
}

function handleParentAlertAction(event) {
  const button = event.target.closest("button[data-alert-id]")
  if (!button) {
    return
  }

  const alertId = button.dataset.alertId
  const alert = appDb.parentAlerts.find((item) => item.id === alertId)
  if (!alert) {
    return
  }

  alert.read = true
  saveDb()
  renderParentAlerts()
}

function attendanceRate(studentId) {
  const rows = appDb.attendance.filter((item) => item.studentId === studentId)
  if (!rows.length) {
    return 0
  }

  const present = rows.filter((item) => item.status === "Present" || item.status === "Late").length
  return Math.round((present / rows.length) * 100)
}

function assignmentProgress(studentId) {
  const student = getStudentById(studentId)
  if (!student) {
    return { submitted: 0, expected: 0 }
  }

  const expected = appDb.assignments.filter((item) => item.classSec === student.classSec).length
  const submitted = appDb.submissions.filter((item) => item.studentId === studentId).length

  return { submitted, expected }
}

function computeAnalytics() {
  const leaderboard = getLeaderboard()
    .sort((a, b) => b.score - a.score || b.maxStreak - a.maxStreak)

  const students = appDb.studentRecords
  const totalCollected = appDb.payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  const outstandingFees = students.reduce((sum, student) => sum + Number(student.feesDue || 0), 0)
  const avgAttendance = students.length
    ? Math.round(students.reduce((sum, student) => sum + attendanceRate(student.id), 0) / students.length)
    : 0

  const rows = students.map((student) => {
    const progress = assignmentProgress(student.id)
    return {
      student,
      attendance: attendanceRate(student.id),
      submitted: progress.submitted,
      expected: progress.expected
    }
  })

  return {
    topThree: leaderboard.slice(0, 3),
    totalStudents: students.length,
    totalAssignments: appDb.assignments.length,
    totalSubmissions: appDb.submissions.length,
    gradedSubmissions: appDb.submissions.filter((item) => item.status === "graded").length,
    totalCollected,
    outstandingFees,
    avgAttendance,
    pendingModeration: appDb.moderationQueue.filter((item) => item.status === "Pending").length,
    rows
  }
}

function renderAnalytics() {
  const data = computeAnalytics()

  const summaryCards = [
    { label: "Students", value: data.totalStudents },
    { label: "Assignments", value: data.totalAssignments },
    { label: "Submissions", value: data.totalSubmissions },
    { label: "Graded", value: data.gradedSubmissions },
    { label: "Avg Attendance", value: `${data.avgAttendance}%` },
    { label: "Collected Fees", value: `NPR ${data.totalCollected}` },
    { label: "Outstanding Fees", value: `NPR ${data.outstandingFees}` },
    { label: "Pending Moderation", value: data.pendingModeration }
  ]

  getEl("analyticsSummary").innerHTML = summaryCards
    .map((card) => `
      <div class="analytics-item">
        <strong>${escapeHtml(card.label)}</strong>
        <p>${escapeHtml(card.value)}</p>
      </div>
    `)
    .join("")

  let rows = data.rows

  if (authSession && authSession.role === "Student" && authSession.studentId) {
    rows = rows.filter((row) => row.student.id === authSession.studentId)
  }

  if (authSession && authSession.role === "Parent" && authSession.studentId) {
    rows = rows.filter((row) => row.student.id === authSession.studentId)
  }

  const rowHtml = rows
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.student.id)}</td>
        <td>${escapeHtml(row.student.name)}</td>
        <td>${escapeHtml(row.student.classSec)}</td>
        <td>${row.attendance}%</td>
        <td>${row.submitted}/${row.expected}</td>
        <td>NPR ${row.student.feesDue}</td>
      </tr>
    `)
    .join("")

  const topThree = data.topThree.length
    ? data.topThree.map((item, index) => `${index + 1}. ${item.name} (Score ${item.score}, Streak ${item.maxStreak})`).join(" | ")
    : "No leaderboard data"

  getEl("analyticsTable").innerHTML = `
    <div class="analytics-item"><strong>Top Performers:</strong> ${escapeHtml(topThree)}</div>
    <table>
      <thead><tr><th>ID</th><th>Name</th><th>Class</th><th>Attendance</th><th>Assignments</th><th>Fee Due</th></tr></thead>
      <tbody>${rowHtml || '<tr><td colspan="6">No rows available</td></tr>'}</tbody>
    </table>
  `
}

function exportAnalyticsReport() {
  if (!requireRole(["Admin", "Teacher", "Student", "Parent"], "authStatus")) {
    return
  }

  const data = computeAnalytics()
  const generatedAt = new Date().toLocaleString()

  const rowsHtml = data.rows
    .map((row) => `
      <tr>
        <td>${escapeHtml(row.student.id)}</td>
        <td>${escapeHtml(row.student.name)}</td>
        <td>${escapeHtml(row.student.classSec)}</td>
        <td>${row.attendance}%</td>
        <td>${row.submitted}/${row.expected}</td>
        <td>NPR ${row.student.feesDue}</td>
      </tr>
    `)
    .join("")

  const topThree = data.topThree.length
    ? data.topThree.map((item, index) => `${index + 1}. ${item.name} (Score ${item.score})`).join("<br>")
    : "No data"

  const reportHtml = `
    <html>
      <head>
        <title>School Analytics Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { margin-bottom: 6px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f2f6ff; }
          .meta { color: #444; margin-bottom: 14px; }
          .stats p { margin: 4px 0; }
        </style>
      </head>
      <body>
        <h1>School Analytics Report</h1>
        <p class="meta">Generated at: ${escapeHtml(generatedAt)}</p>
        <div class="stats">
          <p>Total Students: ${data.totalStudents}</p>
          <p>Total Assignments: ${data.totalAssignments}</p>
          <p>Total Submissions: ${data.totalSubmissions}</p>
          <p>Graded Submissions: ${data.gradedSubmissions}</p>
          <p>Average Attendance: ${data.avgAttendance}%</p>
          <p>Total Collected Fees: NPR ${data.totalCollected}</p>
          <p>Outstanding Fees: NPR ${data.outstandingFees}</p>
          <p>Pending Moderation: ${data.pendingModeration}</p>
        </div>
        <h3>Top Performers</h3>
        <p>${topThree}</p>
        <h3>Student Analytics Table</h3>
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Class</th><th>Attendance</th><th>Assignments</th><th>Fee Due</th></tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body>
    </html>
  `

  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(reportHtml)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    return
  }

  downloadTextFile("school-analytics-report.html", reportHtml, "text/html")
}

function renderDbStats() {
  const statsEl = getEl("dbStats")
  if (!statsEl) {
    return
  }

  const lines = [
    `Version: ${appDb.version}`,
    `School: ${appDb.schoolProfile?.name || "-"}`,
    `Updated: ${appDb.updatedAt}`,
    `Students: ${appDb.studentRecords.length}`,
    `Notices: ${appDb.notices.length}`,
    `Forum Posts: ${Object.values(appDb.forumPostsByClass).reduce((sum, list) => sum + list.length, 0)}`,
    `Moderation Queue: ${appDb.moderationQueue.length}`,
    `Attendance Entries: ${appDb.attendance.length}`,
    `Timetable Entries: ${appDb.timetable.length}`,
    `Assignments: ${appDb.assignments.length}`,
    `Submissions: ${appDb.submissions.length}`,
    `Payments: ${appDb.payments.length}`,
    `Receipts: ${appDb.receipts.length}`,
    `Parent Links: ${appDb.parentLinks.length}`,
    `Parent Alerts: ${appDb.parentAlerts.length}`
  ]

  statsEl.textContent = lines.join("\n")
}

function exportDbBackup() {
  if (!requireRole(["Admin", "Teacher"], "dbStatus")) {
    return
  }

  const snapshot = {
    exportedAt: new Date().toISOString(),
    appDb,
    leaderboard: getLeaderboard(),
    quizSessions: getQuizSessions(),
    authSession
  }

  downloadTextFile("school-platform-backup.json", JSON.stringify(snapshot, null, 2), "application/json")
  setStatus("dbStatus", "Database backup exported.")
}

function importDbBackup(event) {
  if (!requireRole(["Admin", "Teacher"], "dbStatus")) {
    event.target.value = ""
    return
  }

  const file = event.target.files && event.target.files[0]
  if (!file) {
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"))
      const nextDb = normalizeDb(parsed.appDb || parsed)

      appDb = nextDb
      saveDb()

      if (Array.isArray(parsed.leaderboard)) {
        saveLeaderboard(parsed.leaderboard)
      }

      if (parsed.quizSessions && typeof parsed.quizSessions === "object") {
        saveQuizSessions(parsed.quizSessions)
      }

      setStatus("dbStatus", "Database backup imported successfully.")
      populateClassSelects()
      renderAll()
    } catch (err) {
      setStatus("dbStatus", "Invalid backup file. Please import valid JSON.", true)
    }
  }

  reader.readAsText(file)
  event.target.value = ""
}

function resetDb() {
  if (!requireRole(["Admin", "Teacher"], "dbStatus")) {
    return
  }

  const confirmed = window.confirm("Reset the entire platform database and local module data?")
  if (!confirmed) {
    return
  }

  localStorage.removeItem(DB_KEY)
  localStorage.removeItem(LEADERBOARD_KEY)
  localStorage.removeItem(QUIZ_SESSION_KEY)

  appDb = loadDb()
  idPhotoDataUrl = ""

  setStatus("dbStatus", "Database reset completed.")

  populateClassSelects()
  renderAll()
}

function renderAll() {
  renderSchoolBranding()
  renderSchoolProfileForm()
  renderSchoolProfileDisplay()
  renderAuthStatus()
  renderRoleHint()
  autofillSessionFields()

  renderQuiz()
  renderDailySessionTracker()
  renderLeaderboard()
  renderMonthlyNews()

  renderNoticeFeed()
  renderForum()
  renderModerationDashboard()

  renderStudentStatus()
  renderReceipts()
  renderPaperArchive()
  renderMcqBank()

  renderAttendanceStudentOptions()
  renderAttendance()
  renderTimetable()

  renderAssignments()
  renderParentLinks()
  renderParentAlerts()

  renderAnalytics()
  renderDbStats()
  renderScreenView()
}

function init() {
  const subjectSelect = getEl("quizSubject")
  Object.keys(QUIZ_BANK).forEach((subject) => {
    const option = document.createElement("option")
    option.value = subject
    option.textContent = subject
    subjectSelect.appendChild(option)
  })

  getEl("attDate").value = toDateInputValue(new Date())
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  getEl("asgDue").value = toDateInputValue(tomorrow)

  populateClassSelects()
  renderAttendanceStudentOptions()
  setupInstallPrompt()
  registerServiceWorker()

  const appNav = document.querySelector(".app-nav")
  if (appNav) {
    appNav.addEventListener("click", handleScreenNavClick)
  }

  const mobileNav = document.querySelector(".mobile-nav")
  if (mobileNav) {
    mobileNav.addEventListener("click", handleScreenNavClick)
  }

  getEl("loginBtn").addEventListener("click", handleLogin)
  getEl("logoutBtn").addEventListener("click", handleLogout)
  getEl("saveSchoolProfileBtn").addEventListener("click", saveSchoolProfile)
  getEl("resetSchoolProfileBtn").addEventListener("click", resetSchoolProfile)
  getEl("schoolLogoInput").addEventListener("change", handleSchoolLogoSelection)

  getEl("quizSubject").addEventListener("change", () => {
    renderQuiz()
    renderDailySessionTracker()
  })
  getEl("quizStudent").addEventListener("input", renderDailySessionTracker)
  getEl("submitQuizBtn").addEventListener("click", submitDailyQuiz)

  getEl("sendNoticeBtn").addEventListener("click", sendNotice)

  getEl("forumClass").addEventListener("change", renderForum)
  getEl("postForumBtn").addEventListener("click", postForum)
  getEl("moderationWrap").addEventListener("click", handleModerationAction)

  getEl("studentSearch").addEventListener("input", renderStudentStatus)
  getEl("payFeeBtn").addEventListener("click", processPayment)

  getEl("paperFilter").addEventListener("input", renderPaperArchive)

  getEl("idPhoto").addEventListener("change", handleIdPhotoSelection)
  getEl("generateIdBtn").addEventListener("click", generateIdCard)

  getEl("addMcqBtn").addEventListener("click", addMcq)
  getEl("exportMcqBtn").addEventListener("click", exportMcqBank)
  getEl("evalOmrBtn").addEventListener("click", evaluateOmr)
  getEl("convertLatexBtn").addEventListener("click", () => {
    const text = getEl("plainText").value
    getEl("latexOut").value = wordToLatex(text)
  })

  getEl("attClass").addEventListener("change", renderAttendanceStudentOptions)
  getEl("markAttendanceBtn").addEventListener("click", markAttendance)
  getEl("attFilterClass").addEventListener("change", renderAttendance)

  getEl("addTimetableBtn").addEventListener("click", addTimetableEntry)
  getEl("ttFilterClass").addEventListener("change", renderTimetable)
  getEl("ttFilterDay").addEventListener("change", renderTimetable)

  getEl("createAssignmentBtn").addEventListener("click", createAssignment)
  getEl("asgStudentId").addEventListener("input", populateAssignmentSelects)
  getEl("submitAssignmentBtn").addEventListener("click", submitAssignment)
  getEl("gradeAssignmentBtn").addEventListener("click", gradeAssignment)

  getEl("linkParentBtn").addEventListener("click", linkParent)
  getEl("parentAlertStudentFilter").addEventListener("input", renderParentAlerts)
  getEl("parentAlertWrap").addEventListener("click", handleParentAlertAction)

  getEl("refreshAnalyticsBtn").addEventListener("click", renderAnalytics)
  getEl("exportAnalyticsBtn").addEventListener("click", exportAnalyticsReport)

  getEl("exportDbBtn").addEventListener("click", exportDbBackup)
  getEl("importDbFile").addEventListener("change", importDbBackup)
  getEl("resetDbBtn").addEventListener("click", resetDb)

  applyRoleVisibility()
  applyActionPermissions()
  renderAll()
}

init()

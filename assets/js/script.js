/**
 * Smart-Sahaya - Government Services Web App
 * Main JavaScript file with modular functions
 */

// ============================================
// Global State & Constants
// ============================================
let appData = null
let storedDocuments = []
let appointments = []
let signatureDataUrl = null

// ============================================
// Initialization
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
  await loadAppData() // This is the most critical part
  initializeMobileMenu()
  initializeServiceSelector()
  initializeDigiLocker()
  initializeStatusTracker()
  initializeAppointmentScheduler()
  initializeSignatureUpload()
  initializeFormExport()
  updateDashboardCounts()
  setMinDate()
})

/**
 * Load application data from data.json
 * FIXED: Auto-detects if running from "pages/" folder or root
 */
async function loadAppData() {
  try {
    // Check if the URL contains "/pages/". If so, we need to go UP one level (../)
    const isPagesFolder = window.location.pathname.includes("/pages/");
    const path = isPagesFolder ? "../assets/data/data.json" : "assets/data/data.json";

    console.log("Fetching data from:", path); // Debug message

    const response = await fetch(path)
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    appData = await response.json()
    console.log("App data loaded successfully")
  } catch (error) {
    console.error("Error loading app data:", error)
    showToast("error", "Error", "Failed to load data. Check console (F12) for details.")
  }
}

// ... (Keep the rest of your file exactly as it was) ...

// Mobile Menu
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  
  // Safety check
  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
  })

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
    })
  })
}

// Document Requirements Finder
function initializeServiceSelector() {
  const serviceSelect = document.getElementById("serviceSelect")
  if (!serviceSelect) return 

  const appointmentService = document.getElementById("appointmentService") 
  
  if (!appData) return

  appData.services.forEach((service) => {
    const option = document.createElement("option")
    option.value = service.id
    option.textContent = service.name
    serviceSelect.appendChild(option)

    if (appointmentService) {
        appointmentService.appendChild(option.cloneNode(true))
    }
  })

  serviceSelect.addEventListener("change", (e) => {
    const serviceId = e.target.value
    displayRequiredDocuments(serviceId)
  })
}

function displayRequiredDocuments(serviceId) {
  const container = document.getElementById("documentsRequired")
  const list = document.getElementById("documentsList")

  if (!serviceId) {
    container.classList.add("hidden")
    return
  }

  const service = appData.services.find((s) => s.id === serviceId)
  if (!service) return

  list.innerHTML = ""
  service.requiredDocuments.forEach((doc, index) => {
    const li = document.createElement("li")
    li.className = "flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-slide-up"
    li.style.animationDelay = `${index * 0.1}s`
    li.innerHTML = `
      <div class="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
        </svg>
      </div>
      <span class="text-gray-700">${doc}</span>
    `
    list.appendChild(li)
  })

  container.classList.remove("hidden")
}

// DigiLocker
function initializeDigiLocker() {
  const dropZone = document.getElementById("dropZone")
  if (!dropZone) return
  const fileInput = document.getElementById("fileInput")

  loadStoredDocuments()

  dropZone.addEventListener("click", () => fileInput.click())

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault()
    dropZone.classList.add("drop-zone-active")
  })

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drop-zone-active")
  })

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault()
    dropZone.classList.remove("drop-zone-active")
    handleFileUpload(e.dataTransfer.files)
  })

  fileInput.addEventListener("change", (e) => {
    handleFileUpload(e.target.files)
  })
}

function loadStoredDocuments() {
  const stored = localStorage.getItem("smartSahaya_documents")
  if (stored) {
    storedDocuments = JSON.parse(stored)
    renderStoredDocuments()
  }
}

function handleFileUpload(files) {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]

  Array.from(files).forEach((file) => {
    if (!allowedTypes.includes(file.type)) {
      showToast("error", "Invalid File", `${file.name} is not a supported file type.`)
      return
    }

    if (file.size > maxSize) {
      showToast("error", "File Too Large", `${file.name} exceeds 5MB limit.`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const doc = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
        uploadedAt: new Date().toISOString(),
      }

      storedDocuments.push(doc)
      saveDocuments()
      renderStoredDocuments()
      updateDashboardCounts()
      showToast("success", "Uploaded!", `${file.name} has been stored securely.`)
    }
    reader.readAsDataURL(file)
  })
}

function saveDocuments() {
  localStorage.setItem("smartSahaya_documents", JSON.stringify(storedDocuments))
}

function renderStoredDocuments() {
  const container = document.getElementById("storedDocuments")
  if (!container) return; // Safety check

  if (storedDocuments.length === 0) {
    container.innerHTML = '<p class="text-gray-400 col-span-full text-center py-8">No documents uploaded yet</p>'
    return
  }

  container.innerHTML = storedDocuments
    .map(
      (doc) => `
    <div class="doc-card bg-gray-50 rounded-xl p-4 border border-gray-200">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 ${doc.type === "application/pdf" ? "bg-red-100" : "bg-blue-100"} rounded-lg flex items-center justify-center flex-shrink-0">
          ${
            doc.type === "application/pdf"
              ? '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>'
              : '<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/></svg>'
          }
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm truncate" title="${doc.name}">${doc.name}</p>
          <p class="text-xs text-gray-500">${formatFileSize(doc.size)}</p>
        </div>
      </div>
      <div class="flex gap-2 mt-3">
        <button onclick="previewDocument('${doc.id}')" class="flex-1 text-xs bg-teal/10 text-teal py-2 rounded-lg hover:bg-teal/20 transition-colors">
          Preview
        </button>
        <button onclick="downloadDocument('${doc.id}')" class="flex-1 text-xs bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary/20 transition-colors">
          Download
        </button>
        <button onclick="deleteDocument('${doc.id}')" class="text-xs bg-red-100 text-red-600 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  `,
    )
    .join("")
}

function previewDocument(docId) {
  const doc = storedDocuments.find((d) => d.id === docId)
  if (!doc) return

  const modal = document.getElementById("previewModal")
  const title = document.getElementById("previewTitle")
  const content = document.getElementById("previewContent")

  title.textContent = doc.name

  if (doc.type === "application/pdf") {
    content.innerHTML = `
      <iframe src="${doc.data}" class="w-full h-96 rounded-lg"></iframe>
    `
  } else {
    content.innerHTML = `
      <img src="${doc.data}" alt="${doc.name}" class="max-w-full rounded-lg mx-auto">
    `
  }

  modal.classList.remove("hidden")
  modal.classList.add("flex")
}

function downloadDocument(docId) {
  const doc = storedDocuments.find((d) => d.id === docId)
  if (!doc) return

  const link = document.createElement("a")
  link.href = doc.data
  link.download = doc.name
  link.click()

  showToast("success", "Downloaded!", `${doc.name} has been downloaded.`)
}

function deleteDocument(docId) {
  if (!confirm("Are you sure you want to delete this document?")) return

  storedDocuments = storedDocuments.filter((d) => d.id !== docId)
  saveDocuments()
  renderStoredDocuments()
  updateDashboardCounts()
  showToast("success", "Deleted", "Document has been removed.")
}

document.getElementById("closePreviewBtn")?.addEventListener("click", () => {
  const modal = document.getElementById("previewModal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
})

// Status Tracker
function initializeStatusTracker() {
  const trackBtn = document.getElementById("trackBtn")
  if (!trackBtn) return
  const input = document.getElementById("applicationIdInput")

  trackBtn.addEventListener("click", () => trackApplication(input.value))
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") trackApplication(input.value)
  })
}

function trackApplication(appId) {
  const timelineContainer = document.getElementById("timelineContainer")
  const noFound = document.getElementById("noApplicationFound")
  const timeline = document.getElementById("timeline")
  const title = document.getElementById("applicationTitle")
  const badge = document.getElementById("applicationBadge")

  // Safety check
  if (!timelineContainer || !noFound) return;

  if (!appId.trim()) {
    showToast("error", "Required", "Please enter an Application ID.")
    return
  }

  // Debug: Check if data is loaded
  if (!appData || !appData.applications) {
    showToast("error", "Error", "Application data not loaded. Please refresh.");
    console.error("AppData is null:", appData);
    return;
  }

  const application = appData.applications.find((a) => a.id.toLowerCase() === appId.trim().toLowerCase())

  if (!application) {
    timelineContainer.classList.add("hidden")
    noFound.classList.remove("hidden")
    return
  }

  noFound.classList.add("hidden")
  timelineContainer.classList.remove("hidden")

  title.textContent = `${application.service} - ${application.id}`
  badge.textContent = application.status.charAt(0).toUpperCase() + application.status.slice(1)
  badge.className = `px-3 py-1 rounded-full text-sm font-medium status-badge ${getStatusBadgeClass(application.status)}`

  timeline.innerHTML = application.stages
    .map((stage, index) => {
      const dotClass = stage.completed ? "completed" : stage.current ? "current" : "pending"
      return `
      <div class="timeline-item">
        <div class="timeline-dot ${dotClass}"></div>
        <div class="ml-2">
          <h4 class="font-medium text-gray-800">${stage.name}</h4>
          <p class="text-sm text-gray-500">${stage.date || "Pending"}</p>
          ${stage.remarks ? `<p class="text-xs text-gray-400 mt-1">${stage.remarks}</p>` : ""}
        </div>
      </div>
    `
    })
    .join("")

  showToast("success", "Found!", `Application ${application.id} loaded successfully.`)
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700"
    case "rejected":
      return "bg-red-100 text-red-700"
    case "pending":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

// Appointment Scheduler
function initializeAppointmentScheduler() {
  const form = document.getElementById("appointmentForm")
  if (!form) return
  const timeSlots = document.querySelectorAll(".time-slot")

  loadAppointments()

  timeSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
      timeSlots.forEach((s) => s.classList.remove("selected"))
      slot.classList.add("selected")
      document.getElementById("selectedTime").value = slot.dataset.time
    })
  })

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    bookAppointment()
  })
}

function setMinDate() {
  const dateInput = document.getElementById("appointmentDate")
  if (!dateInput) return; // Safety check
  const today = new Date().toISOString().split("T")[0]
  dateInput.min = today

  // Also set form date
  const formDate = document.getElementById("formDate");
  if (formDate) {
    formDate.textContent = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
  }
}

function loadAppointments() {
  const stored = localStorage.getItem("smartSahaya_appointments")
  if (stored) {
    appointments = JSON.parse(stored)
    renderAppointments()
  }
}

function bookAppointment() {
  const service = document.getElementById("appointmentService").value
  const date = document.getElementById("appointmentDate").value
  const time = document.getElementById("selectedTime").value

  if (!service || !date || !time) {
    showToast("error", "Missing Info", "Please fill all fields and select a time slot.")
    return
  }

  const statuses = ["accepted", "pending", "pending", "accepted"]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  // Safety check for appData
  let serviceName = service;
  if (appData && appData.services) {
    const foundService = appData.services.find((s) => s.id === service);
    if (foundService) serviceName = foundService.name;
  }

  const appointment = {
    id: "APT" + Date.now().toString().slice(-6),
    service: serviceName,
    date,
    time,
    status,
    createdAt: new Date().toISOString(),
  }

  appointments.unshift(appointment)
  localStorage.setItem("smartSahaya_appointments", JSON.stringify(appointments))
  renderAppointments()
  updateDashboardCounts()

  document.getElementById("appointmentForm").reset()
  document.querySelectorAll(".time-slot").forEach((s) => s.classList.remove("selected"))

  const statusMessage =
    status === "accepted" ? "Your appointment has been confirmed!" : "Your appointment is pending approval."

  showToast(status === "accepted" ? "success" : "warning", "Appointment Requested", statusMessage)
}

function renderAppointments() {
  const container = document.getElementById("appointmentsList")
  if (!container) return;

  if (appointments.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No appointments scheduled</p>'
    return
  }

  container.innerHTML = appointments
    .slice(0, 5)
    .map(
      (apt) => `
    <div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div class="flex items-center justify-between mb-2">
        <span class="font-medium text-sm">${apt.service}</span>
        <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(apt.status)}">
          ${apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
        </span>
      </div>
      <div class="flex items-center gap-4 text-xs text-gray-500">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          ${formatDate(apt.date)}
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          ${formatTime(apt.time)}
        </span>
      </div>
    </div>
  `,
    )
    .join("")
}

// Digital Signature
function initializeSignatureUpload() {
  const dropZone = document.getElementById("signatureDropZone")
  if (!dropZone) return
  const input = document.getElementById("signatureInput")

  const savedSignature = localStorage.getItem("smartSahaya_signature")
  if (savedSignature) {
    signatureDataUrl = savedSignature
    displaySignature(savedSignature)
  }

  dropZone.addEventListener("click", () => input.click())

  input.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      showToast("error", "Invalid File", "Please upload an image file.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      signatureDataUrl = e.target.result
      localStorage.setItem("smartSahaya_signature", signatureDataUrl)
      displaySignature(signatureDataUrl)
      showToast("success", "Uploaded!", "Your digital signature has been saved.")
    }
    reader.readAsDataURL(file)
  })
}

function displaySignature(dataUrl) {
  const preview = document.getElementById("signaturePreview")
  const image = document.getElementById("signatureImage")
  const formSignature = document.getElementById("formSignature")

  if (image) image.src = dataUrl
  if (preview) preview.classList.remove("hidden")
  if (formSignature) formSignature.innerHTML = `<img src="${dataUrl}" alt="Digital signature" class="max-h-10">`
}

// PDF Export
function initializeFormExport() {
  const exportBtn = document.getElementById("exportPdfBtn")
  if (!exportBtn) return

  exportBtn.addEventListener("click", exportFormAsPdf)
}

function exportFormAsPdf() {
  const formContent = document.getElementById("sampleForm")
  
  // HTML Content generation (kept same as before)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Smart-Sahaya Application Form</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0f4c81; padding-bottom: 20px; }
        .header h1 { color: #0f4c81; margin: 0; }
        .header p { color: #666; margin-top: 5px; }
        .field { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .label { color: #666; }
        .value { font-weight: bold; }
        .signature-section { margin-top: 30px; padding-top: 20px; border-top: 2px solid #0f4c81; }
        .signature-section h3 { color: #0f4c81; }
        .signature-box { border: 1px dashed #ccc; padding: 20px; min-height: 60px; margin-top: 10px; }
        .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Smart-Sahaya</h1>
        <p>Government Services Application Form</p>
      </div>
      <div class="field">
        <span class="label">Applicant Name:</span>
        <span class="value">John Doe</span>
      </div>
      <div class="field">
        <span class="label">Service:</span>
        <span class="value">Birth Certificate</span>
      </div>
      <div class="field">
        <span class="label">Application ID:</span>
        <span class="value">APP001</span>
      </div>
      <div class="field">
        <span class="label">Date:</span>
        <span class="value">${new Date().toLocaleDateString("en-IN")}</span>
      </div>
      <div class="signature-section">
        <h3>Digital Signature</h3>
        <div class="signature-box">
          ${signatureDataUrl ? `<img src="${signatureDataUrl}" style="max-height: 50px;" alt="Signature">` : '<p style="color: #999;">No signature uploaded</p>'}
        </div>
      </div>
      <div class="footer">
        <p>Generated by Smart-Sahaya | ${new Date().toLocaleString("en-IN")}</p>
        <p>This is a computer-generated document.</p>
      </div>
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `SmartSahaya_Application_${Date.now()}.html`
  link.click()
  URL.revokeObjectURL(url)

  showToast("success", "Exported!", "Your form has been downloaded. Open in browser and print as PDF.")
}

// Dashboard
function updateDashboardCounts() {
  const docCount = document.getElementById("docCount")
  if (docCount) docCount.textContent = storedDocuments.length
  
  const apptCount = document.getElementById("appointmentCount")
  if (apptCount) apptCount.textContent = appointments.length

  if (appData && appData.applications) {
    const pending = appData.applications.filter((a) => a.status === "pending").length
    const approved = appData.applications.filter((a) => a.status === "approved").length
    
    const pendingEl = document.getElementById("pendingCount")
    if (pendingEl) pendingEl.textContent = pending
    
    const approvedEl = document.getElementById("approvedCount")
    if (approvedEl) approvedEl.textContent = approved
  }
}

// Toast
function showToast(type, title, message) {
  const toast = document.getElementById("toast")
  if (!toast) return;

  const icon = document.getElementById("toastIcon")
  const titleEl = document.getElementById("toastTitle")
  const messageEl = document.getElementById("toastMessage")

  const icons = {
    success: {
      bg: "bg-green-100",
      color: "text-green-600",
      svg: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    },
    error: {
      bg: "bg-red-100",
      color: "text-red-600",
      svg: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
    },
    warning: {
      bg: "bg-amber-100",
      color: "text-amber-600",
      svg: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
    },
  }

  const config = icons[type] || icons.success
  icon.className = `w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`
  icon.innerHTML = config.svg
  titleEl.textContent = title
  messageEl.textContent = message

  toast.classList.add("toast-visible")

  setTimeout(() => {
    toast.classList.remove("toast-visible")
  }, 3000)
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":")
  const h = Number.parseInt(hours)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}
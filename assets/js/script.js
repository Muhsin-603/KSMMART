/**
 * Smart-Sahaya - Government Services Web App
 * Main JavaScript file with modular functions
 * UPDATED: Added Profile Management & Linked Common Docs
 */

// ============================================
// Global State & Constants
// ============================================

const appData = {
  "services": [
    {
      "id": "birth-cert",
      "name": "Birth Certificate",
      "mode": "Online",
      "duration": "7-14 Days",
      "requiredDocuments": [
        "Hospital Birth Record / Discharge Summary",
        "Parent's Identity Proof (Aadhaar/Passport)",
        "Parent's Marriage Certificate",
        "Address Proof (Utility Bill/Ration Card)",
        "Affidavit (if birth not registered within 21 days)"
      ]
    },
    {
      "id": "death-cert",
      "name": "Death Certificate",
      "mode": "Offline",
      "duration": "10-15 Days",
      "requiredDocuments": [
        "Hospital Death Certificate / Medical Certificate",
        "Deceased's Identity Proof",
        "Applicant's Identity Proof",
        "Cremation/Burial Certificate",
        "Address Proof of Deceased"
      ]
    },
    {
      "id": "income-cert",
      "name": "Income Certificate",
      "mode": "Online",
      "duration": "3-5 Days",
      "requiredDocuments": [
        "Identity Proof (Aadhaar/Voter ID)",
        "Address Proof",
        "Salary Slip / Income Tax Return",
        "Self-Declaration of Income",
        "Ration Card (if applicable)"
      ]
    },
    {
      "id": "caste-cert",
      "name": "Caste Certificate",
      "mode": "Online",
      "duration": "14-21 Days",
      "requiredDocuments": [
        "Identity Proof (Aadhaar/Voter ID)",
        "Address Proof",
        "Parent's Caste Certificate",
        "School Leaving Certificate",
        "Affidavit declaring caste"
      ]
    },
    {
      "id": "domicile-cert",
      "name": "Domicile Certificate",
      "mode": "Offline",
      "duration": "15-30 Days",
      "requiredDocuments": [
        "Identity Proof (Aadhaar/Passport)",
        "Address Proof (15+ years residence)",
        "Birth Certificate",
        "School/College Certificates",
        "Affidavit of Residence"
      ]
    },
    {
      "id": "driving-license",
      "name": "Driving License",
      "mode": "Offline",
      "duration": "30 Days",
      "requiredDocuments": [
        "Age Proof (Birth Certificate/Aadhaar)",
        "Address Proof",
        "Passport Size Photos",
        "Medical Certificate (Form 1A)",
        "Learner's License (for permanent DL)"
      ]
    },
    {
      "id": "passport",
      "name": "Passport Application",
      "mode": "Offline",
      "duration": "30-45 Days",
      "requiredDocuments": [
        "Identity Proof (Aadhaar/Voter ID/PAN)",
        "Address Proof",
        "Birth Certificate / DOB Proof",
        "Passport Size Photos (as per specs)",
        "Old Passport (for renewal)"
      ]
    },
    {
      "id": "ration-card",
      "name": "Ration Card",
      "mode": "Online",
      "duration": "15-20 Days",
      "requiredDocuments": [
        "Identity Proof of Family Head",
        "Address Proof",
        "Family Member Details with Photos",
        "Income Certificate",
        "LPG Connection Details (if any)"
      ]
    }
  ],
  "applications": [
    {
      "id": "APP001",
      "service": "Birth Certificate",
      "status": "approved",
      "stages": [
        { "name": "Application Submitted", "date": "Dec 1, 2024", "completed": true, "remarks": "All documents verified" },
        { "name": "Document Verification", "date": "Dec 3, 2024", "completed": true, "remarks": "Verified by Officer ID: OFF234" },
        { "name": "Field Verification", "date": "Dec 5, 2024", "completed": true, "remarks": "Address confirmed" },
        { "name": "Certificate Generated", "date": "Dec 8, 2024", "completed": true },
        { "name": "Ready for Collection", "date": "Dec 9, 2024", "completed": true, "remarks": "Collect from Taluk Office, Counter 3" }
      ]
    },
    {
      "id": "APP002",
      "service": "Income Certificate",
      "status": "pending",
      "stages": [
        { "name": "Application Submitted", "date": "Dec 8, 2024", "completed": true },
        { "name": "Document Verification", "date": "Dec 10, 2024", "completed": true, "remarks": "Additional document requested" },
        { "name": "Income Assessment", "current": true, "remarks": "Under review by Tahsildar" },
        { "name": "Certificate Generation", "completed": false },
        { "name": "Ready for Collection", "completed": false }
      ]
    },
    {
      "id": "APP003",
      "service": "Caste Certificate",
      "status": "rejected",
      "stages": [
        { "name": "Application Submitted", "date": "Nov 25, 2024", "completed": true },
        { "name": "Document Verification", "date": "Nov 28, 2024", "completed": true, "remarks": "Parent's certificate missing" },
        { "name": "Rejected", "date": "Dec 1, 2024", "completed": true, "remarks": "Please reapply with parent's caste certificate" }
      ]
    },
    {
      "id": "APP004",
      "service": "Driving License",
      "status": "pending",
      "stages": [
        { "name": "Application Submitted", "date": "Dec 10, 2024", "completed": true },
        { "name": "Document Verification", "current": true, "remarks": "Medical certificate being verified" },
        { "name": "Driving Test Scheduled", "completed": false },
        { "name": "License Processing", "completed": false },
        { "name": "Ready for Dispatch", "completed": false }
      ]
    },
    {
      "id": "APP005",
      "service": "Domicile Certificate",
      "status": "approved",
      "stages": [
        { "name": "Application Submitted", "date": "Nov 15, 2024", "completed": true },
        { "name": "Document Verification", "date": "Nov 18, 2024", "completed": true },
        { "name": "Residence Verification", "date": "Nov 22, 2024", "completed": true, "remarks": "15+ years residence confirmed" },
        { "name": "Certificate Generated", "date": "Nov 25, 2024", "completed": true },
        { "name": "Dispatched", "date": "Nov 26, 2024", "completed": true, "remarks": "Sent via Speed Post" }
      ]
    }
  ],
  "officers": [
    { "id": "OFF001", "name": "Rajesh Kumar", "designation": "Tahsildar", "department": "Revenue" },
    { "id": "OFF002", "name": "Priya Sharma", "designation": "Village Officer", "department": "Local Administration" },
    { "id": "OFF003", "name": "Anil Verma", "designation": "RTO Inspector", "department": "Transport" }
  ],
  "announcements": [
    { "title": "New Online Services", "message": "Passport and Driving License services now available online!", "date": "Dec 1, 2024" },
    { "title": "Holiday Notice", "message": "Office closed on Dec 25 for Christmas.", "date": "Dec 15, 2024" }
  ]
};

// State Variables
let storedDocuments = []
let appointments = []
let signatureDataUrl = null
// Common Docs List for Profile
const commonDocTypes = [
    { id: "aadhar", name: "Aadhaar Card" },
    { id: "pan", name: "PAN Card" },
    { id: "voter", name: "Voter ID" },
    { id: "photo", name: "Passport Size Photo" }
];

// ============================================
// Initialization
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("App data loaded from embedded source")
  
  // Load State
  loadStoredDocuments()
  
  // Initialize Modules
  initializeMobileMenu()
  initializeServiceSelector()
  initializeDigiLocker()
  initializeStatusTracker()
  initializeAppointmentScheduler()
  initializeSignatureUpload()
  initializeFormExport()
  
  // New Profile Module
  initializeProfile()
  
  updateDashboardCounts()
  setMinDate()
})

// ============================================
// 👤 PROFILE MANAGEMENT (NEW)
// ============================================

function initializeProfile() {
    const profileForm = document.getElementById("profileForm");
    if (!profileForm) return;

    // Load saved profile data
    loadUserProfile();
    
    // Render the Identity Vault list
    renderCommonDocs();

    // Handle Form Save
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveUserProfile();
    });
}

function loadUserProfile() {
    const profile = JSON.parse(localStorage.getItem("smartSahaya_profile") || "{}");
    
    if (profile.name) document.getElementById("profName").value = profile.name;
    if (profile.phone) document.getElementById("profPhone").value = profile.phone;
    if (profile.email) document.getElementById("profEmail").value = profile.email;
    if (profile.aadhaar) document.getElementById("profAadhaar").value = profile.aadhaar;
    if (profile.address) document.getElementById("profAddress").value = profile.address;
}

function saveUserProfile() {
    const profile = {
        name: document.getElementById("profName").value,
        phone: document.getElementById("profPhone").value,
        email: document.getElementById("profEmail").value,
        aadhaar: document.getElementById("profAadhaar").value,
        address: document.getElementById("profAddress").value,
    };

    localStorage.setItem("smartSahaya_profile", JSON.stringify(profile));
    showToast("success", "Profile Saved", "Your details have been updated successfully.");
}

function renderCommonDocs() {
    const list = document.getElementById("commonDocsList");
    if (!list) return;

    list.innerHTML = commonDocTypes.map(docType => {
        // Check if this doc type is already uploaded in storedDocuments
        // We check if any stored document name includes the docType name (Simple match)
        const isUploaded = storedDocuments.some(d => d.name.toLowerCase().includes(docType.name.toLowerCase()));
        
        const statusColor = isUploaded ? "text-green-600 bg-green-50 border-green-200" : "text-gray-500 bg-white border-gray-100";
        const iconColor = isUploaded ? "text-green-600 bg-green-100" : "text-gray-400 bg-gray-100";
        const buttonText = isUploaded ? "Update" : "Upload";
        const buttonClass = isUploaded 
            ? "text-teal bg-teal/10 border-teal/20" 
            : "text-gray-600 bg-white border-gray-300 hover:border-teal hover:text-teal";

        return `
        <li class="flex items-center justify-between p-3 rounded-xl border ${statusColor} transition-all">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center ${iconColor}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${isUploaded 
                            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' 
                            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>'
                        }
                    </svg>
                </div>
                <div>
                    <p class="font-medium text-sm">${docType.name}</p>
                    <p class="text-[10px] ${isUploaded ? 'text-green-600' : 'text-gray-400'}">
                        ${isUploaded ? 'Verified & Stored' : 'Missing'}
                    </p>
                </div>
            </div>
            
            <button onclick="triggerProfileUpload('${docType.id}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg border ${buttonClass} transition-colors">
                ${buttonText}
            </button>
            <input type="file" id="upload_${docType.id}" class="hidden" accept=".pdf,.jpg,.png" onchange="handleProfileUpload('${docType.name}', this)">
        </li>
        `;
    }).join("");
}

// Trigger hidden input
window.triggerProfileUpload = function(id) {
    document.getElementById(`upload_${id}`).click();
}

// Handle Profile File Upload
window.handleProfileUpload = function(docName, input) {
    const file = input.files[0];
    if (!file) return;

    // Simulate AI Scan
    showToast("warning", "Scanning...", "Verifying document authenticity.");

    setTimeout(() => {
        // Create document object
        const doc = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            name: `${docName}_${new Date().getFullYear()}.pdf`, // Standardize name
            type: file.type,
            size: file.size,
            data: URL.createObjectURL(file), // For demo, we use object URL
            uploadedAt: new Date().toISOString(),
            tag: "profile_verified" // Special tag
        };

        // Add to main storage
        storedDocuments.push(doc);
        saveDocuments();
        
        // Refresh UI
        renderCommonDocs();
        updateDashboardCounts(); // Updates dashboard if open
        showToast("success", "Verified!", `${docName} has been verified and added to your Vault.`);
    }, 1500);
}


// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  
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

// ============================================
// Document Requirements Finder (UPDATED)
// ============================================

function initializeServiceSelector() {
  const serviceSelect = document.getElementById("serviceSelect")
  const appointmentService = document.getElementById("appointmentService") 
  
  if (appData && appData.services) {
    if (serviceSelect) {
      appData.services.forEach((service) => {
        const option = document.createElement("option")
        option.value = service.id
        // Update: Show status in dropdown
        option.textContent = `${service.name} (${service.mode})`
        serviceSelect.appendChild(option)
      })

      serviceSelect.addEventListener("change", (e) => {
        const serviceId = e.target.value
        displayRequiredDocuments(serviceId)
      })
    }

    if (appointmentService) {
      appData.services.forEach((service) => {
        const option = document.createElement("option")
        option.value = service.id
        option.textContent = service.name
        appointmentService.appendChild(option)
      })
    }
  }
}

/**
 * Display required documents with Upload Options & Mode/Duration Tags
 */
function displayRequiredDocuments(serviceId) {
  const container = document.getElementById("documentsRequired")
  const list = document.getElementById("documentsList")

  if (!container || !list) return;

  if (!serviceId) {
    container.classList.add("hidden")
    return
  }

  const service = appData.services.find((s) => s.id === serviceId)
  if (!service) return

  // Update Header with Service Mode AND Duration Tags
  const header = container.querySelector('h3');
  if (header) {
      // Choose color based on mode
      const modeColor = service.mode === 'Online' 
        ? 'bg-green-100 text-green-700 border-green-200' 
        : 'bg-orange-100 text-orange-700 border-orange-200';
      
      const modeIcon = service.mode === 'Online' ? '⚡' : '🏢';

      header.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <span>Required Documents</span>
            <div class="flex gap-2">
                <span class="text-xs px-2 py-1 rounded-full border ${modeColor}">
                    ${modeIcon} ${service.mode}
                </span>
                <span class="text-xs px-2 py-1 rounded-full border bg-blue-100 text-blue-700 border-blue-200">
                    ⏳ ${service.duration}
                </span>
            </div>
        </div>
      `;
  }

  list.innerHTML = ""
  service.requiredDocuments.forEach((doc, index) => {
    const docId = `doc_${index}`; 
    const li = document.createElement("li")
    
    li.className = "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg animate-slide-up border border-gray-100 hover:border-teal/30 transition-all"
    li.style.animationDelay = `${index * 0.1}s`
    
    li.innerHTML = `
      <div class="flex items-center gap-3">
        <div id="icon_${docId}" class="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 text-teal transition-colors duration-300">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
          </svg>
        </div>
        <div class="flex flex-col">
            <span class="text-gray-800 font-medium text-sm sm:text-base">${doc}</span>
            <span id="status_${docId}" class="text-xs text-gray-400 font-medium mt-0.5">Waiting for upload...</span>
        </div>
      </div>
      
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <input type="file" id="${docId}" class="hidden" accept=".pdf,.jpg,.jpeg,.png" onchange="verifyUpload('${docId}')">
        
        <button onclick="document.getElementById('${docId}').click()" 
          id="btn_${docId}"
          class="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-teal bg-white border border-teal rounded-lg hover:bg-teal hover:text-white active:scale-95 transition-all shadow-sm">
          Upload
        </button>
      </div>
    `
    list.appendChild(li)
  })

  container.classList.remove("hidden")
}

/**
 * Handle File Upload Verification
 */
window.verifyUpload = function(docId) {
    const fileInput = document.getElementById(docId);
    const file = fileInput.files[0];
    const statusText = document.getElementById(`status_${docId}`);
    const iconContainer = document.getElementById(`icon_${docId}`);
    const uploadBtn = document.getElementById(`btn_${docId}`);

    if (!file) return;

    // 1. Simulate "Processing" State
    statusText.textContent = "AI Validating...";
    statusText.className = "text-xs text-blue-500 font-semibold animate-pulse";
    uploadBtn.textContent = "Scanning...";
    uploadBtn.disabled = true;
    uploadBtn.className = "w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-wait";

    // 2. Mock Delay for "AI" effect
    setTimeout(() => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
             handleVerificationError(docId, "Invalid file type. Use PDF/JPG.");
             return;
        }

        if (file.size > maxSize) {
             handleVerificationError(docId, "File too large (>5MB).");
             return;
        }

        // 4. Success State
        statusText.textContent = `Verified • ${formatFileSize(file.size)}`;
        statusText.className = "text-xs text-green-600 font-bold";
        
        iconContainer.className = "w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 shadow-sm transition-all scale-110";
        iconContainer.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
        
        uploadBtn.textContent = "Change";
        uploadBtn.disabled = false;
        uploadBtn.className = "w-full sm:w-auto px-3 py-2 text-xs text-gray-500 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors";

        showToast("success", "Document Verified", `${file.name} looks good!`);

    }, 1500); 
}

function handleVerificationError(docId, msg) {
    const statusText = document.getElementById(`status_${docId}`);
    const uploadBtn = document.getElementById(`btn_${docId}`);
    const fileInput = document.getElementById(docId);

    statusText.textContent = `Error: ${msg}`;
    statusText.className = "text-xs text-red-500 font-bold";
    
    uploadBtn.textContent = "Try Again";
    uploadBtn.disabled = false;
    uploadBtn.className = "w-full sm:w-auto px-4 py-2 text-xs font-semibold text-red-500 bg-white border border-red-200 rounded-lg hover:bg-red-50";
    
    fileInput.value = ""; 
    showToast("error", "Verification Failed", msg);
}

// ============================================
// DigiLocker
// ============================================

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
  if (!container) return; 

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
  if (typeof renderCommonDocs === "function") renderCommonDocs(); // Refresh profile if open
  showToast("success", "Deleted", "Document has been removed.")
}

document.getElementById("closePreviewBtn")?.addEventListener("click", () => {
  const modal = document.getElementById("previewModal")
  modal.classList.add("hidden")
  modal.classList.remove("flex")
})

// ============================================
// Application Status Tracker
// ============================================

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

// ============================================
// Appointment Scheduler
// ============================================

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

// ============================================
// Digital Signature
// ============================================

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

// ============================================
// PDF Export
// ============================================

function initializeFormExport() {
  const exportBtn = document.getElementById("exportPdfBtn")
  if (!exportBtn) return

  exportBtn.addEventListener("click", exportFormAsPdf)
}

function exportFormAsPdf() {
  const formContent = document.getElementById("sampleForm")
  
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

// ============================================
// Dashboard & Utilities
// ============================================

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
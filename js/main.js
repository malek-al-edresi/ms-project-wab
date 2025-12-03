// Helper to safely read/write JSON from localStorage
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Error reading from storage", key, e);
    return fallback;
  }
}

// Save Storage For Browser
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing to storage", key, e);
  }
}

// 1. Personal data
const personalForm = document.getElementById("personalForm");
const personalSummary = document.getElementById("personalSummary");

function renderPersonalData() {
  const data = loadFromStorage("msPersonalData", null);
  if (!data) {
    personalSummary.textContent = dict["k85"];
    return;
  }
  personalSummary.innerHTML = `
    <strong>${dict["k104"]}</strong><br>
    ${dict["k105"]}: ${data.fullName || "-"}<br>
    ${dict["k106"]}: ${data.msType || "-"}<br>
    ${dict["k107"]}: ${data.attackCount || "-"}<br>
    ${dict["k108"]}: ${data.attackLocation || "-"}
  `;
}

function handlePersonalFormSubmit(e) {
  e.preventDefault();
  const fullName = document.getElementById("fullName").value.trim();
  const msType = document.getElementById("msType").value;
  const attackCount = document.getElementById("attackCount").value;
  const attackLocation = document.getElementById("attackLocation").value.trim();

  const personalData = {
    fullName,
    msType,
    attackCount,
    attackLocation,
    updatedAt: new Date().toISOString(),
  };

  saveToStorage("msPersonalData", personalData);
  renderPersonalData();
  alert(dict["k86"]);
}

// 2. Daily symptoms log
const symptomsForm = document.getElementById("symptomsForm");
const symptomsTableBody = document.querySelector("#symptomsTable tbody");

function renderSymptoms() {
  const logs = loadFromStorage("msSymptomsLogs", []);
  symptomsTableBody.innerHTML = "";
  if (logs.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = dict["k87"];
    row.appendChild(cell);
    symptomsTableBody.appendChild(row);
    return;
  }
  logs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((entry) => {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      const symptomsCell = document.createElement("td");
      const notesCell = document.createElement("td");

      dateCell.textContent = entry.date;
      const joiner = dict["k109"] || ", "; // Use dict for joiner
      symptomsCell.textContent =
        entry.symptoms.length > 0 ? entry.symptoms.join(joiner) : (dict["k89"] || "No specific symptoms.");
      notesCell.textContent = entry.notes || "-";

      row.appendChild(dateCell);
      row.appendChild(symptomsCell);
      row.appendChild(notesCell);
      symptomsTableBody.appendChild(row);
    });
}

function handleSymptomsFormSubmit(e) {
  e.preventDefault();
  const date = document.getElementById("logDate").value;
  const notes = document.getElementById("notes").value.trim();
  const symptomCheckboxes = document.querySelectorAll('#symptomsForm input[type="checkbox"]:checked');
  const symptoms = Array.from(symptomCheckboxes).map(c => c.value);

  const logs = loadFromStorage("msSymptomsLogs", []);
  logs.push({ date, symptoms, notes });
  saveToStorage("msSymptomsLogs", logs);
  renderSymptoms();
  document.getElementById("symptomsForm").reset(); // Reset the form
  alert(dict["k90"] || "Daily log saved."); // Use dict for alert message
}

// --- Functions for Injection Reminder ---
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function renderInjectionInfo() {
  const injectionInfo = document.getElementById("injectionInfo");
  if (!injectionInfo) return; // Exit if element doesn't exist

  const lastDateStr = loadFromStorage("msLastInjectionDate", null);
  if (!lastDateStr) {
    injectionInfo.textContent = dict["k91"] || "No last injection date saved.";
    return;
  }
  const lastDate = new Date(lastDateStr);
  const nextDate = new Date(lastDate);
  nextDate.setMonth(nextDate.getMonth() + 6);
  const today = new Date();
  const diffMs = nextDate - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let statusMessage = "";
  if (diffDays > 0) {
    statusMessage = (dict["injectionFuture"] || "Next dose in {days} days.").replace("{days}", diffDays);
  } else if (diffDays === 0) {
    statusMessage = dict["injectionToday"] || "Next dose is today!";
  } else {
    statusMessage = (dict["injectionPast"] || "Next dose was {days} days ago.").replace("{days}", Math.abs(diffDays));
  }

  injectionInfo.innerHTML = `
    <div>
      <div>${dict["injectionLastLabel"] || "Last dose date"}: <strong>${formatDate(lastDate)}</strong></div>
      <div>${dict["injectionNextLabel"] || "Next dose date"}: <strong>${formatDate(nextDate)}</strong></div>
      <div>${statusMessage}</div>
    </div>
  `;
}

function handleInjectionFormSubmit(e) {
  e.preventDefault();
  const lastInjectionDate = document.getElementById("lastInjectionDate").value;
  saveToStorage("msLastInjectionDate", lastInjectionDate);
  renderInjectionInfo();
  alert(dict["k92"] || "Last injection date saved and next dose calculated."); // Use dict for alert message
}

// --- Functions for Water Reminder ---
function getWaterKeyForToday() {
  const today = new Date().toISOString().split("T")[0];
  return `msWater_${today}`;
}

function renderWater() {
  const waterCountEl = document.getElementById("waterCount");
  const waterMessageEl = document.getElementById("waterMessage");
  if (!waterCountEl || !waterMessageEl) return; // Exit if elements don't exist

  const count = loadFromStorage(getWaterKeyForToday(), 0);
  waterCountEl.textContent = count;

  if (count < 6) {
    waterMessageEl.textContent = dict["k93"] || "Try to reach 6-8 cups today.";
  } else if (count <= 8) {
    waterMessageEl.textContent = dict["k94"] || "Well done! You are in the ideal range today.";
  } else {
    waterMessageEl.textContent = dict["k95"] || "It's okay to drink more, but avoid excess.";
  }
}

function handleAddWaterClick() {
  let count = loadFromStorage(getWaterKeyForToday(), 0);
  count += 1;
  saveToStorage(getWaterKeyForToday(), count);
  renderWater();
}

function handleResetWaterClick() {
  saveToStorage(getWaterKeyForToday(), 0);
  renderWater();
}

// --- Functions for Motivation Quotes ---
function updateMotivationQuote() {
  const motivationText = document.getElementById("motivationText");
  if (!motivationText) return; // Exit if element doesn't exist

  const quotes = [
    dict["k96"],
    dict["k97"],
    dict["k98"],
    dict["k99"],
    dict["k100"],
    dict["k101"],
    dict["k102"],
    dict["k103"],
  ].filter(q => q); // Filter out any undefined values from dict

  if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      motivationText.textContent = quotes[index];
  } else {
      motivationText.textContent = dict["k70"] || "Keep going, one step at a time."; // Fallback
  }
}

function handleNewQuoteClick() {
  updateMotivationQuote();
}

// --- Function to Handle Tab Navigation ---
function attachNavigationListeners() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.card[id]'); // Only select cards with an id attribute

  // Function to show the selected section and hide others
  function showSection(targetId) {
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.remove('hidden-section');
        section.classList.add('active-section');
      } else {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
      }
    });

    // Update active button state
    navButtons.forEach(button => {
      if (button.getAttribute('data-target') === targetId) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Add click event listeners to navigation buttons
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      showSection(targetId);
    });
  });

  // Show the first section by default (e.g., 'support') if no section is active
  if (!sections.length || !document.querySelector('.active-section')) {
    showSection('support'); // أو أي معرف تريده كافتراضي
  }
}

// --- Function to Attach All Event Listeners ---
function attachEventListeners() {
  const personalForm = document.getElementById("personalForm");
  if (personalForm) {
    personalForm.addEventListener("submit", handlePersonalFormSubmit);
  }

  const symptomsForm = document.getElementById("symptomsForm");
  if (symptomsForm) {
    symptomsForm.addEventListener("submit", handleSymptomsFormSubmit);
  }

  const injectionForm = document.getElementById("injectionForm");
  if (injectionForm) {
    injectionForm.addEventListener("submit", handleInjectionFormSubmit);
  }

  const addWaterBtn = document.getElementById("addWater");
  if (addWaterBtn) {
    addWaterBtn.addEventListener("click", handleAddWaterClick);
  }

  const resetWaterBtn = document.getElementById("resetWater");
  if (resetWaterBtn) {
    resetWaterBtn.addEventListener("click", handleResetWaterClick);
  }

  const newQuoteBtn = document.getElementById("newQuoteBtn");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", handleNewQuoteClick);
  }
    if (typeof attachChatbotEventListeners === 'function') {
      attachChatbotEventListeners();
  } else {
      console.warn("attachChatbotEventListeners function not found. Make sure chatbot.js is loaded.");
  }
}

// --- Initialize the application when the DOM is fully loaded ---
document.addEventListener('DOMContentLoaded', function() {
  renderPersonalData();
  renderSymptoms();
  renderInjectionInfo();
  renderWater();
  updateMotivationQuote(); // Set initial quote
  attachEventListeners(); // Attach form, button, etc. listeners
  attachNavigationListeners(); // Attach navigation (tab switching) listeners
});

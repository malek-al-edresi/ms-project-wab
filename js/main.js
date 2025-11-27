<<<<<<< HEAD
=======
// js/main.js
// --- Move all logic inside functions and use the global 'dict' object ---

>>>>>>> 36bdc56 (update for adding chatbot)
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

<<<<<<< HEAD

// Save Storge For Bowores 
=======
// Save Storage For Browser
>>>>>>> 36bdc56 (update for adding chatbot)
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error writing to storage", key, e);
  }
}

<<<<<<< HEAD
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


//
if (personalForm) {
  personalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const msType = document.getElementById("msType").value;
    const attackCount = document.getElementById("attackCount").value;
    const attackLocation = document
      .getElementById("attackLocation")
      .value.trim();

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
  });
}

// 2. Daily symptoms log
const symptomsForm = document.getElementById("symptomsForm");
const symptomsTableBody = document.querySelector("#symptomsTable tbody");

function renderSymptoms() {
  const logs = loadFromStorage("msSymptomsLogs", []);
=======
// --- Functions for Personal Data ---
function renderPersonalData() {
  const data = loadFromStorage("msPersonalData", null);
  const personalSummary = document.getElementById("personalSummary");
  if (!personalSummary) return; // Exit if element doesn't exist

  if (!data) {
    personalSummary.textContent = dict["k85"] || "No data saved yet."; // Fallback to key or English
    return;
  }
  personalSummary.innerHTML = `
    <strong>${dict["k104"] || "Last saved data:"}</strong><br>
    ${dict["k105"] || "Name"}: ${data.fullName || "-"}<br>
    ${dict["k106"] || "MS type"}: ${data.msType || "-"}<br>
    ${dict["k107"] || "Number of relapses"}: ${data.attackCount || "-"}<br>
    ${dict["k108"] || "Last relapse location"}: ${data.attackLocation || "-"}
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
  alert(dict["k86"] || "Personal data saved on this device."); // Use dict for alert message
}

// --- Functions for Symptoms Log ---
function renderSymptoms() {
  const logs = loadFromStorage("msSymptomsLogs", []);
  const symptomsTableBody = document.querySelector("#symptomsTable tbody");
  if (!symptomsTableBody) return; // Exit if element doesn't exist

>>>>>>> 36bdc56 (update for adding chatbot)
  symptomsTableBody.innerHTML = "";
  if (logs.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
<<<<<<< HEAD
    cell.textContent = dict["k87"];
=======
    cell.textContent = dict["k87"] || "No logs yet.";
>>>>>>> 36bdc56 (update for adding chatbot)
    row.appendChild(cell);
    symptomsTableBody.appendChild(row);
    return;
  }
<<<<<<< HEAD

=======
>>>>>>> 36bdc56 (update for adding chatbot)
  logs
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((entry) => {
      const row = document.createElement("tr");
      const dateCell = document.createElement("td");
      const symptomsCell = document.createElement("td");
      const notesCell = document.createElement("td");

      dateCell.textContent = entry.date;
<<<<<<< HEAD
      const joiner = dict["k109"];
      symptomsCell.textContent =
        entry.symptoms.length > 0 ? entry.symptoms.join(joiner) : dict["k89"];
=======
      const joiner = dict["k109"] || ", "; // Use dict for joiner
      symptomsCell.textContent =
        entry.symptoms.length > 0 ? entry.symptoms.join(joiner) : (dict["k89"] || "No specific symptoms.");
>>>>>>> 36bdc56 (update for adding chatbot)
      notesCell.textContent = entry.notes || "-";

      row.appendChild(dateCell);
      row.appendChild(symptomsCell);
      row.appendChild(notesCell);
      symptomsTableBody.appendChild(row);
    });
}

<<<<<<< HEAD
if (symptomsForm) {
  symptomsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("logDate").value;
    const notes = document.getElementById("notes").value.trim();
    const symptomCheckboxes = symptomsForm.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const symptoms = Array.from(symptomCheckboxes).map((c) => c.value);

    const logs = loadFromStorage("msSymptomsLogs", []);
    logs.push({
      date,
      symptoms,
      notes,
    });
    saveToStorage("msSymptomsLogs", logs);
    renderSymptoms();
    symptomsForm.reset();
    alert(dict["k90"]);
  });
}

// 3. Injection reminder every 6 months
const injectionForm = document.getElementById("injectionForm");
const injectionInfo = document.getElementById("injectionInfo");

=======
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
>>>>>>> 36bdc56 (update for adding chatbot)
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function renderInjectionInfo() {
<<<<<<< HEAD
  const lastDateStr = loadFromStorage("msLastInjectionDate", null);
  if (!lastDateStr) {
    injectionInfo.textContent = dict["k91"];
=======
  const injectionInfo = document.getElementById("injectionInfo");
  if (!injectionInfo) return; // Exit if element doesn't exist

  const lastDateStr = loadFromStorage("msLastInjectionDate", null);
  if (!lastDateStr) {
    injectionInfo.textContent = dict["k91"] || "No last injection date saved.";
>>>>>>> 36bdc56 (update for adding chatbot)
    return;
  }
  const lastDate = new Date(lastDateStr);
  const nextDate = new Date(lastDate);
  nextDate.setMonth(nextDate.getMonth() + 6);
<<<<<<< HEAD

  const today = new Date();
  const diffMs = nextDate - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  let statusMessage = "";

  if (diffDays > 0) {
    statusMessage = getMsg("injectionFuture").replace("{days}", diffDays);
  } else if (diffDays === 0) {
    statusMessage = getMsg("injectionToday");
  } else {
    statusMessage = getMsg("injectionPast").replace("{days}", Math.abs(diffDays));
=======
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
>>>>>>> 36bdc56 (update for adding chatbot)
  }

  injectionInfo.innerHTML = `
    <div>
<<<<<<< HEAD
      <div>${getMsg("injectionLastLabel")}: <strong>${formatDate(lastDate)}</strong></div>
      <div>${getMsg("injectionNextLabel")}: <strong>${formatDate(nextDate)}</strong></div>
=======
      <div>${dict["injectionLastLabel"] || "Last dose date"}: <strong>${formatDate(lastDate)}</strong></div>
      <div>${dict["injectionNextLabel"] || "Next dose date"}: <strong>${formatDate(nextDate)}</strong></div>
>>>>>>> 36bdc56 (update for adding chatbot)
      <div>${statusMessage}</div>
    </div>
  `;
}

<<<<<<< HEAD
if (injectionForm) {
  injectionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const lastInjectionDate = document.getElementById("lastInjectionDate").value;
    saveToStorage("msLastInjectionDate", lastInjectionDate);
    renderInjectionInfo();
    alert(dict["k92"]);
  });
}

// 5. Water reminder
const waterCountEl = document.getElementById("waterCount");
const waterMessageEl = document.getElementById("waterMessage");
const addWaterBtn = document.getElementById("addWater");
const resetWaterBtn = document.getElementById("resetWater");

=======
function handleInjectionFormSubmit(e) {
  e.preventDefault();
  const lastInjectionDate = document.getElementById("lastInjectionDate").value;
  saveToStorage("msLastInjectionDate", lastInjectionDate);
  renderInjectionInfo();
  alert(dict["k92"] || "Last injection date saved and next dose calculated."); // Use dict for alert message
}

// --- Functions for Water Reminder ---
>>>>>>> 36bdc56 (update for adding chatbot)
function getWaterKeyForToday() {
  const today = new Date().toISOString().split("T")[0];
  return `msWater_${today}`;
}

function renderWater() {
<<<<<<< HEAD
  const count = loadFromStorage(getWaterKeyForToday(), 0);
  waterCountEl.textContent = count;
  if (count < 6) {
    waterMessageEl.textContent = dict["k93"];
  } else if (count <= 8) {
    waterMessageEl.textContent = dict["k94"];
  } else {
    waterMessageEl.textContent = dict["k95"];
  }
}

if (addWaterBtn && resetWaterBtn) {
  addWaterBtn.addEventListener("click", () => {
    let count = loadFromStorage(getWaterKeyForToday(), 0);
    count += 1;
    saveToStorage(getWaterKeyForToday(), count);
    renderWater();
  });

  resetWaterBtn.addEventListener("click", () => {
    saveToStorage(getWaterKeyForToday(), 0);
    renderWater();
  });
}

// 7. Motivation quotes
const motivationText = document.getElementById("motivationText");
const newQuoteBtn = document.getElementById("newQuoteBtn");

const quotes = [
  dict["k96"],
  dict["k97"],
  dict["k98"],
  dict["k99"],
  dict["k100"],
  dict["k101"],
  dict["k102"],
  dict["k103"],
];

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

if (newQuoteBtn && motivationText) {
  newQuoteBtn.addEventListener("click", () => {
    motivationText.textContent = pickRandomQuote();
  });
}

// Initial renders
document.addEventListener("DOMContentLoaded", () => {
  renderPersonalData();
  renderSymptoms();
  renderInjectionInfo();
  renderWater();
});
=======
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


>>>>>>> 36bdc56 (update for adding chatbot)

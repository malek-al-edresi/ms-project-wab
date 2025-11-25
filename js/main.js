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


// Save Storge For Bowores 
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
      const joiner = dict["k109"];
      symptomsCell.textContent =
        entry.symptoms.length > 0 ? entry.symptoms.join(joiner) : dict["k89"];
      notesCell.textContent = entry.notes || "-";

      row.appendChild(dateCell);
      row.appendChild(symptomsCell);
      row.appendChild(notesCell);
      symptomsTableBody.appendChild(row);
    });
}

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

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function renderInjectionInfo() {
  const lastDateStr = loadFromStorage("msLastInjectionDate", null);
  if (!lastDateStr) {
    injectionInfo.textContent = dict["k91"];
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
    statusMessage = getMsg("injectionFuture").replace("{days}", diffDays);
  } else if (diffDays === 0) {
    statusMessage = getMsg("injectionToday");
  } else {
    statusMessage = getMsg("injectionPast").replace("{days}", Math.abs(diffDays));
  }

  injectionInfo.innerHTML = `
    <div>
      <div>${getMsg("injectionLastLabel")}: <strong>${formatDate(lastDate)}</strong></div>
      <div>${getMsg("injectionNextLabel")}: <strong>${formatDate(nextDate)}</strong></div>
      <div>${statusMessage}</div>
    </div>
  `;
}

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

function getWaterKeyForToday() {
  const today = new Date().toISOString().split("T")[0];
  return `msWater_${today}`;
}

function renderWater() {
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

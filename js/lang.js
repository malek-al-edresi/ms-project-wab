// js/lang.js
// --- Add this function to the end of lang.js ---
// This function will be called after the language dictionary is loaded and applied.
// It ensures that all dynamic content (like alerts) uses the correct language.
function onLanguageLoaded() {
  // Render initial content after language is loaded
<<<<<<< HEAD
  if (typeof renderPersonalData === 'function') renderPersonalData();
  if (typeof renderSymptoms === 'function') renderSymptoms();
  if (typeof renderInjectionInfo === 'function') renderInjectionInfo();
  if (typeof renderWater === 'function') renderWater();
  if (typeof updateMotivationQuote === 'function') updateMotivationQuote(); // Renamed function for clarity

  // Attach event listeners after language is loaded
  if (typeof attachEventListeners === 'function') attachEventListeners();
}

const langSelect = document.getElementById('langSelect');
=======
  if (typeof renderPersonalData === "function") renderPersonalData();
  if (typeof renderSymptoms === "function") renderSymptoms();
  if (typeof renderInjectionInfo === "function") renderInjectionInfo();
  if (typeof renderWater === "function") renderWater();
  if (typeof updateMotivationQuote === "function") updateMotivationQuote(); // Renamed function for clarity

  // Attach event listeners after language is loaded
  if (typeof attachEventListeners === "function") attachEventListeners();
  // Update chatbot language if function exists
  if (typeof updateChatbotLanguage === "function") updateChatbotLanguage();
}

const langSelect = document.getElementById("langSelect");
>>>>>>> 36bdc56 (update for adding chatbot)
const htmlTag = document.documentElement;
let dict = {}; // Global dictionary object

function applyTranslations(localDict) {
  dict = localDict; // Update the global dictionary
  // text content
<<<<<<< HEAD
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
=======
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
>>>>>>> 36bdc56 (update for adding chatbot)
    if (localDict[key]) {
      el.textContent = localDict[key];
    }
  });
  // placeholders
<<<<<<< HEAD
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
=======
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
>>>>>>> 36bdc56 (update for adding chatbot)
    if (localDict[key]) {
      el.placeholder = localDict[key];
    }
  });
  // title
<<<<<<< HEAD
  if (localDict['k80']) {
    document.title = localDict['k80'];
=======
  if (localDict["k80"]) {
    document.title = localDict["k80"];
>>>>>>> 36bdc56 (update for adding chatbot)
  }
  // Call the function to handle dynamic content after translations are applied
  onLanguageLoaded();
}

function loadLang(lang) {
  fetch(`js/lang-${lang}.json`) // Assuming lang-ar.json and lang-en.json exist
<<<<<<< HEAD
    .then(response => {
      if (!response.ok) {
         console.error('Language file not found for:', lang);
         // Fallback: try loading English if Arabic fails, or vice versa
         const fallbackLang = lang === 'ar' ? 'en' : 'ar';
         return fetch(`js/lang-${fallbackLang}.json`);
      }
      return response.json();
    })
    .then(localDict => {
      applyTranslations(localDict);
      htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
      htmlTag.lang = lang;
    })
    .catch(err => {
      console.error('Error loading language file', err);
=======
    .then((response) => {
      if (!response.ok) {
        console.error("Language file not found for:", lang);
        // Fallback: try loading English if Arabic fails, or vice versa
        const fallbackLang = lang === "ar" ? "en" : "ar";
        return fetch(`js/lang-${fallbackLang}.json`);
      }
      return response.json();
    })
    .then((localDict) => {
      applyTranslations(localDict);
      htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
      htmlTag.lang = lang;
    })
    .catch((err) => {
      console.error("Error loading language file", err);
>>>>>>> 36bdc56 (update for adding chatbot)
      // Optionally load a default language or show an error message
      // loadLang('en'); // Fallback to English
    });
}

if (langSelect) {
<<<<<<< HEAD
  langSelect.addEventListener('change', (e) => {
    loadLang(e.target.value);
  });
  // Load the initial language based on select value or default to 'ar'
  loadLang(langSelect.value || 'ar');
}
=======
  langSelect.addEventListener("change", (e) => {
    loadLang(e.target.value);
  });
  // Load the initial language based on select value or default to 'ar'
  loadLang(langSelect.value || "ar");
}
>>>>>>> 36bdc56 (update for adding chatbot)

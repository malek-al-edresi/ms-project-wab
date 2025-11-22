MS_Website - Multiple Sclerosis Support Website
===============================================

Description
-----------
This is a simple, responsive, and fully client-side website to support
Multiple Sclerosis (MS) patients. It was built using **HTML, CSS, and
JavaScript only**, with **localStorage** used to store data on the
patient's device.

Required Features Implemented
-----------------------------
1. Personal data form:
   - Fields: full name, MS type, number of attacks, last attack location.
   - Data is saved to localStorage and displayed in a summary box.

2. Daily symptom log:
   - Tracks date, symptoms (loss of balance, dizziness, fatigue,
     visual weakness, numbness), and notes.
   - Saved in localStorage and displayed in a table.

3. Injection reminder every 6 months:
   - User saves the last injection date.
   - The next date (last + 6 months) is calculated and displayed with
     remaining days and status.

4. Diet section:
   - Lists recommended and to-be-avoided foods for MS patients.

5. Water reminder:
   - Tracks cups of water for the current day (target 6–8).
   - Uses localStorage to persist today's count.

6. Bright lights effect:
   - Educational section explaining the effect of bright lights on MS
     patients and simple tips.

7. Support & motivation:
   - Motivational text with a button to show random encouraging quotes.

8. Medical links:
   - A list of 10 trusted external links about MS.
   - You can edit these links inside `index.html` to exactly match the
     links required by your original PDF if they are different.

Project Structure
-----------------
MS_Website/
├── index.html       # Main page
├── css/
│   └── style.css    # Styling and responsive design
├── js/
│   └── main.js      # All logic + localStorage
└── README.txt       # This file

How to Run
----------
No installation is required. This is a pure frontend project.

1. Extract the project folder.
2. Open `index.html` directly in your browser (Chrome, Edge, Firefox, etc.).
3. Make sure that:
   - JavaScript is enabled in your browser.
   - You keep using the same browser/device to preserve localStorage data.

Notes
-----
- All data is stored locally in the browser using localStorage.
- This website is for educational purposes only and does not replace
  professional medical advice.

dev by
------
Eng.Malek Mohamed Al-Edresi

Call Me  
-------
Linkedin  : www.linkedin.com/in/malek-al-edresi
Call      : +967-778888730
Instagram : dde.mt


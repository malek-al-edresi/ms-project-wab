const symptomResponses = {
    'ar': {
        'دوخة': 'هجوم محتمل - نوصي بالراحة وتجنب الحركة المفاجئة',
        'دوار': 'هجوم محتمل - نوصي بالراحة وتجنب الحركة المفاجئة',
        'توازن': 'مشكلة في التوازن - حاول الجلوس واستخدم مساند عند المشي',
        'ارهاق': 'إرهاق شائع - احصل على قسط من الراحة واشرب الماء',
        'تعب': 'إرهاق شائع - احصل على قسط من الراحة واشرب الماء',
        'ضعف': 'ضعف العضلات - قد تحتاج للراحة ومراجعة الطبيب',
        'تشوش': 'مشكلة في الرؤية - تجنب الأضواء الساطعة واسترح',
        'رؤية': 'مشكلة في الرؤية - تجنب الأضوات الساطعة واسترح',
        'تنميل': 'تنميل الأطراف - حاول تحريك المنطقة برفق',
        'خدر': 'تنميل الأطراف - حاول تحريك المنطقة برفق'
    },
    'en': {
        'dizziness': 'Possible attack - recommend rest and avoiding sudden movements',
        'vertigo': 'Possible attack - recommend rest and avoiding sudden movements',
        'balance': 'Balance issues - try to sit down and use support when walking',
        'fatigue': 'Common fatigue - get some rest and drink water',
        'tired': 'Common fatigue - get some rest and drink water',
        'weakness': 'Muscle weakness - may need rest and doctor consultation',
        'blur': 'Vision issues - avoid bright lights and rest your eyes',
        'vision': 'Vision issues - avoid bright lights and rest your eyes',
        'numbness': 'Limb numbness - try gentle movement of the area',
        'tingling': 'Limb numbness - try gentle movement of the area'
    }
};

// دالة للحصول على اللغة الحالية من العلامة html
function getCurrentChatbotLang() {
    return document.documentElement.lang || 'ar';
}

// دالة لتبديل ظهور/إخفاء الـ Chatbot (تحديث ليدعم التصميم الجديد)
function toggleChat() {
    const chatbotSection = document.getElementById('ms-chatbot');
    if (!chatbotSection) return;

    // نفترض أن العرض مبدئياً مفتوح، ونخفيه/نظهره حسب الحالة
    // نستخدم class CSS للتحكم في العرض (يمكنك تعريفه في style.css)
    // مثلاً: .chatbot-section.hidden { display: none; }
    // أو نستخدم style مباشرة إذا لم ترغب في CSS إضافي
    if (chatbotSection.style.display === 'none' || chatbotSection.style.display === '') {
        chatbotSection.style.display = 'block';
        // يمكنك تغيير النص إذا كنت تستخدم زر تبديل
    } else {
        chatbotSection.style.display = 'none';
    }
}

function handleChatbotKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = userInput.value.trim();

    if (message === '') return;

    // إضافة رسالة المستخدم
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);

    // مسح المدخلات
    userInput.value = '';

    // تحليل الأعراض وإضافة رد البوت
    setTimeout(() => {
        const botResponse = analyzeSymptoms(message);
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.textContent = botResponse;
        chatMessages.appendChild(botMessageDiv);

        // التمرير للأسفل
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function analyzeSymptoms(message) {
    const lang = getCurrentChatbotLang();
    const lowerMessage = message.toLowerCase();
    const responses = symptomResponses[lang];

    // البحث عن كلمات مفتاحية في الرسالة
    for (const [symptom, response] of Object.entries(responses)) {
        if (lowerMessage.includes(symptom.toLowerCase())) {
            return response;
        }
    }

    // رد افتراضي إذا لم يتم التعرف على الأعراض
    return lang === 'ar'
        ? 'لم أتعرف على الأعراض بوضوح. يرجى وصف ما تشعر به بشكل أوضح أو استشارة طبيبك.'
        : 'I did not recognize the symptoms clearly. Please describe what you feel more clearly or consult your doctor.';
}

// دالة لربط أحداث الـ Chatbot
function attachChatbotEventListeners() {
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', handleChatbotKeyPress);
    }
    // ربط زر الإرسال (موجود في HTML)
    // نستخدم onclick من HTML، لكن يمكن ربطه هنا أيضاً
    const sendButton = document.querySelector('#ms-chatbot .chat-input button');
    if (sendButton) {
        // لا نحتاج لربطه هنا إذا كان onclick موجوداً في HTML
        // sendButton.addEventListener('click', sendMessage);
    }
}

// دالة لتحديث لغة الـ Chatbot عند تغيير اللغة العامة
function updateChatbotLanguage() {
    const chatMessages = document.getElementById('chatMessages');
    const lang = getCurrentChatbotLang();
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message bot-message';
    welcomeMessage.textContent = lang === 'ar'
        ? 'مرحباً! أنا مساعد التصلب المتعدد. اذكر لي الأعراض التي تشعر بها وسأحاول مساعدتك.'
        : 'Hello! I am your MS assistant. Tell me the symptoms you feel and I will try to help you.';

    // نعوض أول رسالة للبوت
    const firstBotMsg = chatMessages.querySelector('.bot-message');
    if (firstBotMsg) {
        firstBotMsg.textContent = welcomeMessage.textContent;
    } else {
        // إذا لم تكن هناك أي رسائل، نضيفها
        chatMessages.appendChild(welcomeMessage);
    }
}
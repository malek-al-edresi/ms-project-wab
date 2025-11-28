// Symptom analysis responses
const symptomResponses = {
    ar: {
        'دوخة|دوار': 'هجوم محتمل - نوصي بالراحة وتجنب الحركة المفاجئة',
        'توازن': 'مشكلة في التوازن - حاول الجلوس واستخدم مساند عند المشي',
        'ارهاق|تعب': 'إرهاق شائع - احصل على قسط من الراحة واشرب الماء',
        'ضعف': 'ضعف العضلات - قد تحتاج للراحة ومراجعة الطبيب',
        'تشوش|رؤية': 'مشكلة في الرؤية - تجنب الأضواء الساطعة واسترح',
        'تنميل|خدر': 'تنميل الأطراف - حاول تحريك المنطقة برفق'
    },
    en: {
        'dizziness|vertigo': 'Possible attack - recommend rest and avoiding sudden movements',
        'balance': 'Balance issues - try to sit down and use support when walking',
        'fatigue|tired': 'Common fatigue - get some rest and drink water',
        'weakness': 'Muscle weakness - may need rest and doctor consultation',
        'blur|vision': 'Vision issues - avoid bright lights and rest your eyes',
        'numbness|tingling': 'Limb numbness - try gentle movement of the area'
    }
};

// Get current language
const getCurrentLang = () => document.documentElement.lang || 'ar';

// Toggle chatbot visibility
const toggleChat = () => {
    const chatbot = document.getElementById('ms-chatbot');
    if (chatbot) chatbot.style.display = chatbot.style.display === 'none' ? 'block' : 'none';
};

// Send message handler
const sendMessage = () => {
    const input = document.getElementById('userInput');
    const messages = document.getElementById('chatMessages');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessage(message, 'user-message');
    input.value = '';

    // Process and respond
    setTimeout(() => {
        const response = analyzeSymptoms(message);
        addMessage(response, 'bot-message');
    }, 1000);
};

// Add message to chat
const addMessage = (text, className) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    document.getElementById('chatMessages').appendChild(messageDiv);
    scrollToBottom();
};

// Analyze symptoms in message
const analyzeSymptoms = (message) => {
    const lang = getCurrentLang();
    const responses = symptomResponses[lang];
    const lowerMsg = message.toLowerCase();
    
    for (const [symptoms, response] of Object.entries(responses)) {
        if (symptoms.split('|').some(symptom => lowerMsg.includes(symptom.toLowerCase()))) {
            return response;
        }
    }
    
    return lang === 'ar' 
        ? 'لم أتعرف على الأعراض بوضوح. يرجى وصف ما تشعر به بشكل أوضح.' 
        : 'I did not recognize the symptoms clearly. Please describe what you feel more clearly.';
};

// Scroll to bottom of chat
const scrollToBottom = () => {
    const messages = document.getElementById('chatMessages');
    messages.scrollTop = messages.scrollHeight;
};

// Initialize chatbot
const initChatbot = () => {
    const input = document.getElementById('userInput');
    if (input) input.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
    updateWelcomeMessage();
};

// Update welcome message based on language
const updateWelcomeMessage = () => {
    const lang = getCurrentLang();
    const welcome = lang === 'ar' 
        ? 'مرحباً! أنا مساعد التصلب المتعدد. اذكر لي الأعراض التي تشعر بها.' 
        : 'Hello! I am your MS assistant. Tell me your symptoms.';
    addMessage(welcome, 'bot-message');
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initChatbot);
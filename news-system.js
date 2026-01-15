/* =========================================
   CORE DE INTELIGENCIA DELEONNET V4.0
   GEMINI INTEGRACIÓN TOTAL + FEED VELOZ
   ========================================= */

// CONFIGURACIÓN DE ACCESO
const GEMINI_API_KEY = "TU_API_KEY_AQUÍ"; // <--- ASEGÚRATE DE PEGAR TU CLAVE AQUÍ

// 1. GESTIÓN DEL DEFCON FEED (VELOCIDAD CORREGIDA)
async function fetchGlobalIntelligence() {
    const feedElement = document.getElementById('news-feed');
    const sources = [
        'https://thehackernews.com/feeds/posts/default',
        'https://www.bleepingcomputer.com/feed/',
        'https://www.aljazeera.com/xml/rss/all.xml'
    ];
    
    const apiService = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    try {
        let headlines = [];
        for (let source of sources) {
            const response = await fetch(apiService + encodeURIComponent(source));
            const data = await response.json();
            if (data.status === 'ok') {
                data.items.slice(0, 2).forEach(item => headlines.push(item.title.toUpperCase()));
            }
        }
        feedElement.innerText = " [!] ALERTA: " + headlines.join(" [+++] ") + " [!] ";
    } catch (e) {
        feedElement.innerText = " +++ CONEXIÓN SATELITAL ACTIVA - MONITOREO DE AMENAZAS EN TIEMPO REAL +++ ";
    }
}

// 2. MOTOR DE RESOLUCIÓN TÉCNICA (CONEXIÓN PURA A GEMINI)
async function callGemini(prompt, topic) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    // Instrucción estricta para la IA
    const systemInstruction = `Instrucción: Eres un Ingeniero de Infraestructura Senior. 
    Tu tema es: ${topic}. 
    Resuelve el siguiente problema técnico de forma específica, real y profesional. 
    No uses saludos genéricos largos ni menciones que eres una IA. 
    Ve directo a la solución técnica.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemInstruction + " Pregunta del usuario: " + prompt }] }]
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            return "ERROR DE API: " + data.error.message;
        }
        
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "FALLO CRÍTICO: No hay respuesta del motor Gemini. Verifique la API KEY y la conexión de red.";
    }
}

// 3. INTERFAZ DINÁMICA
document.getElementById('expert-access-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const topic = document.getElementById('reg-topic').value;
    
    document.getElementById('current-topic-display').innerText = topic.toUpperCase();
    document.getElementById('gate-form-container').style.display = 'none';
    document.getElementById('active-live-chat').style.display = 'block';

    const log = document.getElementById('expert-chat-log');
    log.innerHTML = `<p class="bot-msg">> Bienvenido al sistema de asesoría técnica 24/7.</p>`;
    log.innerHTML += `<p class="bot-msg">> [SISTEMA] Conexión establecida. Área: <strong>${topic}</strong>. Hola ${name}, describa su requerimiento técnico.</p>`;
});

async function sendExpertMessage() {
    const input = document.getElementById('chat-msg-input');
    const log = document.getElementById('expert-chat-log');
    const topic = document.getElementById('reg-topic').value;
    const sendBtn = document.getElementById('send-btn');
    
    if(input.value.trim() !== "") {
        const userQuery = input.value;
        log.innerHTML += `<p class="user-msg">> ${userQuery}</p>`;
        input.value = "";
        
        // Estado de carga
        sendBtn.disabled = true;
        const loadingId = "loading-" + Date.now();
        log.innerHTML += `<p class="bot-msg" id="${loadingId}">> [IA] Generando resolución técnica real...</p>`;
        log.scrollTop = log.scrollHeight;

        // Respuesta real de Gemini
        const aiResponse = await callGemini(userQuery, topic);
        
        document.getElementById(loadingId).remove();
        log.innerHTML += `<p class="bot-msg">> [RESOLUCIÓN] ${aiResponse}</p>`;
        log.scrollTop = log.scrollHeight;
        sendBtn.disabled = false;
    }
}

fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 300000); // Actualiza cada 5 min

/* =========================================
   CORE DE INTELIGENCIA DELEONNET V3.5
   INTEGRACIÓN GEMINI + SEGURIDAD .ENV
   ========================================= */

// 1. CONFIGURACIÓN
// Si usas un servidor local, puedes cargar process.env. Si es estático, 
// pega tu clave aquí sabiendo que el .gitignore la protege de subidas a la nube.
const GEMINI_API_KEY = "TU_API_KEY_AQUÍ"; 

// 2. GESTIÓN DEL DEFCON FEED GEOPOLÍTICO
async function fetchGlobalIntelligence() {
    const feedElement = document.getElementById('news-feed');
    const sources = [
        'https://thehackernews.com/feeds/posts/default',
        'https://www.bleepingcomputer.com/feed/',
        'https://www.aljazeera.com/xml/rss/all.xml',
        'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
        'https://www.oilprice.com/rss/main'
    ];
    
    const apiService = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    try {
        let headlines = [];
        for (let i = 0; i < sources.length; i++) {
            const response = await fetch(apiService + encodeURIComponent(sources[i]));
            const data = await response.json();
            if (data.status === 'ok') {
                data.items.slice(0, 2).forEach(item => headlines.push(item.title.toUpperCase()));
            }
        }
        feedElement.innerText = " [!] INTELIGENCIA EN VIVO: " + headlines.join(" [---] ") + " [!] ";
    } catch (e) {
        feedElement.innerText = " +++ MONITOREO DE EMERGENCIA ACTIVO - CONEXIÓN SATELITAL ESTABLE +++ ";
    }
}

// 3. CONEXIÓN REAL CON GEMINI AI (RESOLUCIÓN TÉCNICA)
async function callGemini(prompt, topic) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const contextPrompt = `Eres Panchisco, ingeniero experto en infraestructura trabajando para Edgar De Leon. 
    Estamos hablando de: ${topic}. 
    INSTRUCCIÓN: Resuelve el problema del usuario de forma técnica y directa. 
    Usa un tono profesional de ingeniero de campo. 
    Usuario pregunta: ${prompt}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: contextPrompt }] }]
            })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Falla en el núcleo de IA:", error);
        return "ERROR DE ENLACE: No se pudo conectar con el motor de resolución. Por favor, contacte directamente a soportedeleonnet@gmail.com";
    }
}

// 4. LÓGICA DEL INTERFAZ DE CHAT
document.getElementById('expert-access-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const topic = document.getElementById('reg-topic').value;
    
    document.getElementById('current-topic-display').innerText = topic.toUpperCase();
    document.getElementById('gate-form-container').style.display = 'none';
    document.getElementById('active-live-chat').style.display = 'block';

    const log = document.getElementById('expert-chat-log');
    log.innerHTML += `<p class="bot-msg">> Bienvenido al sistema de asesoría técnica 24/7 de Edgar De Leon.</p>`;
    log.innerHTML += `<p class="bot-msg">> [IA] Hola ${name}. Estoy listo en el área de <strong>${topic}</strong>. ¿Qué problema vamos a resolver hoy?</p>`;
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
        
        // Efecto visual de carga
        sendBtn.disabled = true;
        sendBtn.innerText = "...";
        const loadingMsg = document.createElement("p");
        loadingMsg.className = "bot-msg";
        loadingMsg.innerText = "> [IA] Procesando resolución técnica...";
        log.appendChild(loadingMsg);
        log.scrollTop = log.scrollHeight;

        // Llamada a Gemini
        const aiResponse = await callGemini(userQuery, topic);
        
        log.removeChild(loadingMsg);
        log.innerHTML += `<p class="bot-msg">> [IA] RESOLUCIÓN: ${aiResponse}</p>`;
        log.scrollTop = log.scrollHeight;
        sendBtn.disabled = false;
        sendBtn.innerText = "RESOLVER";
    }
}

// Inicialización de sistemas
fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 600000); 

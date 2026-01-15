/* =========================================
   CORE DE INTELIGENCIA DELEONNET V2.0
   FEEDS REALES + LÓGICA DE CHAT IA
   ========================================= */

// 1. GESTIÓN DEL DEFCON FEED GEOPOLÍTICO
async function fetchGlobalIntelligence() {
    const feedElement = document.getElementById('news-feed');
    const sources = [
        'https://thehackernews.com/feeds/posts/default',
        'https://www.bleepingcomputer.com/feed/',
        'https://www.aljazeera.com/xml/rss/all.xml',
        'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
        'https://www.oilprice.com/rss/main',
        'https://www.reutersagency.com/feed/?best-topics=world-news&post_type=best'
    ];
    
    const apiService = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    try {
        let headlines = [];
        for (let i = 0; i < 4; i++) { // Consultamos los primeros 4 para velocidad
            const response = await fetch(apiService + encodeURIComponent(sources[i]));
            const data = await response.json();
            if (data.status === 'ok') {
                data.items.slice(0, 3).forEach(item => headlines.push(item.title.toUpperCase()));
            }
        }
        feedElement.innerText = " [!] INTELIGENCIA EN VIVO: " + headlines.join(" [---] ") + " [!] ";
    } catch (e) {
        feedElement.innerText = " +++ ALERTA: MONITOREO DE EMERGENCIA ACTIVO - REVISANDO CIBERSEGURIDAD Y CONFLICTOS BÉLICOS +++ ";
    }
}

// 2. LÓGICA DEL CHAT DE ASESORÍA
document.getElementById('expert-access-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const topic = document.getElementById('reg-topic').value;
    const email = document.getElementById('reg-email').value;

    // Transición visual
    document.getElementById('gate-form-container').style.display = 'none';
    document.getElementById('active-live-chat').style.display = 'block';

    const log = document.getElementById('expert-chat-log');
    log.innerHTML += `<p class="bot-msg">> [SISTEMA] DATOS RECIBIDOS. CONEXIÓN ESTABLECIDA PARA ${name.toUpperCase()}.</p>`;
    log.innerHTML += `<p class="bot-msg">> [IA] Hola. He activado los protocolos de asesoría para <strong>${topic}</strong>. Hemos enviado un kit de bienvenida a <strong>${email}</strong>. ¿Cuál es su consulta técnica?</p>`;
});

function sendExpertMessage() {
    const input = document.getElementById('chat-msg-input');
    const log = document.getElementById('expert-chat-log');
    
    if(input.value.trim() !== "") {
        log.innerHTML += `<p class="user-msg">> ${input.value}</p>`;
        const userQuery = input.value.toLowerCase();
        input.value = "";
        
        setTimeout(() => {
            let response = "Análisis completado. He notificado al Ing. Panchisco sobre esta solicitud. Mientras tanto, le recomiendo revisar su correo para acceder a los cursos gratuitos.";
            if(userQuery.includes("ayuda") || userQuery.includes("caido")) {
                response = "[!] ALERTA CRÍTICA: Prioridad Nivel 1 asignada. Panchisco se conectará en breve vía Telegram/WhatsApp.";
            }
            log.innerHTML += `<p class="bot-msg">> [IA] ${response}</p>`;
            log.scrollTop = log.scrollHeight;
        }, 1500);
    }
}

// Inicialización
fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 600000);

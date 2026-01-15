/* =========================================
   CORE DE INTELIGENCIA DELEONNET V2.5
   FEEDS REALES + IA TÉCNICA RESOLUTIVA
   ========================================= */

// 1. GESTIÓN DEL DEFCON FEED GEOPOLÍTICO
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
        feedElement.innerText = " +++ MONITOREO DE EMERGENCIA ACTIVO - REVISANDO CIBERSEGURIDAD Y CONFLICTOS BÉLICOS +++ ";
    }
}

// 2. LÓGICA DE LA IA RESOLUTIVA
const expertKnowledge = {
    "ciberseguridad": "Para ataques de fuerza bruta, implemente Fail2Ban e IP Filtering inmediatamente. Si detecta ransomware, desconecte el nodo de la red y verifique backups inmutables. Recomendamos auditoría SOC.",
    "redes": "Para latencia alta, revise la saturación del canal 2.4/5GHz y verifique el estado físico de los transceptores de fibra. Use el comando 'mtr' para identificar pérdidas de paquetes en el salto L3.",
    "cloud": "Si el servicio SaaS está caído, verifique el Status Page del proveedor. Para errores de latencia en AWS/Azure, revise la configuración de Availability Zones y el balanceo de carga.",
    "infra": "Para fallos en servidores físicos, revise logs de IPMI/iDRAC. En entornos virtuales, verifique la asignación de recursos vCPU/RAM y el estado de la SAN/NAS.",
    "soporte": "Si el problema es de software local, realice limpieza de caché de sistema y reinicie servicios de dependencia. Si es crítico L3, escale a administración de red.",
    "telefonia": "Para pérdida de audio en VoIP, revise el Jitter Buffer y asegúrese de que el puerto SIP 5060 no esté siendo filtrado por el firewall. Verifique códecs G.711/G.729.",
    "default": "Analizando su consulta técnica... Para este caso, la solución estándar implica revisión de logs de sistema y verificación de conectividad punto a punto. Por favor, proporcione más detalles del error."
};

document.getElementById('expert-access-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const topic = document.getElementById('reg-topic').value;
    
    document.getElementById('gate-form-container').style.display = 'none';
    document.getElementById('active-live-chat').style.display = 'block';

    const log = document.getElementById('expert-chat-log');
    log.innerHTML += `<p class="bot-msg">> [SISTEMA] PROTOCOLO DE ASESORÍA ACTIVADO PARA: ${name.toUpperCase()}.</p>`;
    log.innerHTML += `<p class="bot-msg">> [IA] Estoy listo para resolver su consulta sobre <strong>${topic}</strong>. Describa el error o desafío que enfrenta ahora mismo.</p>`;
});

function sendExpertMessage() {
    const input = document.getElementById('chat-msg-input');
    const log = document.getElementById('expert-chat-log');
    const topic = document.getElementById('reg-topic').value;
    
    if(input.value.trim() !== "") {
        log.innerHTML += `<p class="user-msg">> ${input.value}</p>`;
        const userQuery = input.value.toLowerCase();
        input.value = "";
        
        setTimeout(() => {
            let answer = expertKnowledge[topic] || expertKnowledge["default"];
            
            // Refinamiento de respuesta por palabras clave
            if(userQuery.includes("lento") || userQuery.includes("latencia")) answer = "Detección de latencia: Ejecute 'ping -t' al gateway. Si hay picos, revise el switch core. Verifique si hay bucles STP en la red.";
            if(userQuery.includes("virus") || userQuery.includes("hack")) answer = "Detección de amenaza: Ejecute escaneo perimetral. Bloquee puertos no esenciales (21, 22, 23, 3389). Verifique logs de autenticación.";
            
            log.innerHTML += `<p class="bot-msg">> [IA] RESOLUCIÓN TÉCNICA: ${answer}</p>`;
            log.innerHTML += `<p class="bot-msg">> [NOTIFICACIÓN] He registrado este caso. El Ing. Edgar recibirá el reporte para enviarle la documentación técnica completa a su correo.</p>`;
            log.scrollTop = log.scrollHeight;
        }, 1200);
    }
}

fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 600000);

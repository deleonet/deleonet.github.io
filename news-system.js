 async function fetchGlobalIntelligence() {
    const feed = document.getElementById('news-feed');
    const now = new Date();
    const time = `[${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}]`;

    const masterFeeds = [
        { c: "GUERRA", t: "Ataque masivo a nodos de comunicación en frontera Este." },
        { c: "DINERO", t: "Escasez de semiconductores eleva precios de racks en 30%." },
        { c: "INFRA", t: "Nueva fibra submarina 800Gbps une continentes." },
        { c: "CIBER", t: "Ransomware detectado en sistemas CRM; parche crítico L3." },
        { c: "SAAS", t: "HubSpot y Salesforce integran IA nativa para marketing 2026." },
        { c: "MOVILIDAD", t: "Logística móvil clase B optimizada por IA en tiempo real." },
        { c: "DINERO", t: "Inversión récord en centros de datos verdes." },
        { c: "TECH", t: "Servidores cuánticos reducen latencia WAN en 90%." },
        { c: "REDES", t: "Certificación masiva de nodos IPV6 en zonas rurales." },
        { c: "MONITOREO", t: "Zabbix y PRTG anuncian fusión de alertas proactivas." },
        { c: "GLOBAL", t: "99.999% uptime reportado en infraestructura crítica." },
        { c: "SEGURIDAD", t: "SOC/NOC automatizados detienen intrusión nivel estatal." },
        { c: "FINANZAS", t: "Acciones de NVIDIA suben tras lanzamiento de GPU H200." },
        { c: "TECH", t: "Baterías de grafeno extienden soporte móvil a 72h." },
        { c: "CIBER", t: "Nueva ley de identidad digital afecta despliegues SaaS." },
        { c: "DINERO", t: "Recortes en hardware físico aceleran migración a nube híbrida." },
        { c: "GUERRA", t: "Guerra electrónica afecta telefonía IP en zonas de conflicto." },
        { c: "TECH", t: "Nodos de borde (Edge) mejoran respuesta de CRM móvil." },
        { c: "SISTEMAS", t: "Linux Kernel 7.2 optimizado para misiones críticas." },
        { c: "ALERTA", t: "Inestabilidad eléctrica afecta racks en nodos secundarios." }
    ];

    try {
        const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const data = await res.json();
        const apiNews = data.Data.slice(0, 10).map(i => `${time} | DINERO | > ${i.title.toUpperCase()}`);
        const localNews = masterFeeds.map(f => `${time} | ${f.c} | > ${f.t.toUpperCase()}`);
        const all = [...localNews, ...apiNews].join(" --- ");
        feed.innerText = `${all} --- ${all}`;
    } catch {
        const backup = masterFeeds.map(f => `${time} | ${f.c} | > ${f.t.toUpperCase()}`).join(" --- ");
        feed.innerText = `${backup} --- ${backup}`;
    }
}
fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 120000);

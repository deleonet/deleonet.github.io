async function iniciarFeedNoticias() {
    const feedDisplay = document.getElementById('news-feed');
    // Fuentes: Seguridad, Finanzas, Geopolítica
    const fuentes = [
        "https://www.bleepingcomputer.com/feed/",
        "https://thehackernews.com/feeds/posts/default",
        "https://www.reutersagency.com/feed/?best-topics=political-general&format=rss",
        "https://finance.yahoo.com/news/rssindex"
    ];

    async function obtenerNoticias() {
        let todasLasNoticias = [];
        
        for (let url of fuentes) {
            try {
                const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl);
                const data = await response.json();
                
                if (data.status === 'ok') {
                    const items = data.items.map(item => {
                        let prefix = "[ALERTA TECNOLÓGICA]";
                        if (url.includes("reuters")) prefix = "[GEOPOLÍTICA/GUERRA]";
                        if (url.includes("finance")) prefix = "[MERCADOS/ECONOMÍA]";
                        
                        return ` ${prefix}: ${item.title.toUpperCase()} `;
                    });
                    todasLasNoticias = [...todasLasNoticias, ...items];
                }
            } catch (e) {
                console.error("Fallo en nodo de noticias:", url);
            }
        }

        if (todasLasNoticias.length > 0) {
            // Mezclamos las noticias para que no salgan siempre las mismas primero
            todasLasNoticias.sort(() => Math.random() - 0.5);
            feedDisplay.innerHTML = todasLasNoticias.join(' --- ') + " --- " + todasLasNoticias.join(' --- ');
        } else {
            feedDisplay.innerHTML = "SISTEMA DEFCON: MODO DE EMERGENCIA ACTIVO --- MONITOREO DE RED ESTABLE --- SIN ALERTAS CRÍTICAS EN EL RADAR.";
        }
    }

    obtenerNoticias();
    // Actualiza el feed cada 10 minutos
    setInterval(obtenerNoticias, 600000);
}

window.addEventListener('load', iniciarFeedNoticias);

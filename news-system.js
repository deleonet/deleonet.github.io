 /* =========================================
   SISTEMA DE INTELIGENCIA GEOPOLÍTICA 2026
   ALIMENTACIÓN: CONFLICTOS, ECONOMÍA & DEFCON
   ========================================= */

async function fetchGlobalIntelligence() {
    const feedElement = document.getElementById('news-feed');
    
    // Lista de 10 Feeds estratégicos filtrados por temas
    const feeds = [
        'https://www.reutersagency.com/feed/?best-topics=world-news&post_type=best', // Geopolítica Global
        'https://www.aljazeera.com/xml/rss/all.xml', // Oriente Medio y Conflictos
        'https://feeds.bbci.co.uk/news/world/asia/rss.xml', // China, Taiwán, Rusia
        'https://thehackernews.com/feeds/posts/default', // DEFCON Informático / Ciberseguridad
        'https://www.reutersagency.com/feed/?best-topics=business&post_type=best', // Economía & Petróleo
        'https://noticieros.televisa.com/rss/mexico/', // México (Actualidad local/frontera)
        'https://www.elnacional.com/venezuela/rss/', // Venezuela (Contexto regional)
        'https://14ymedio.com/rss/', // Cuba (Contexto Caribe)
        'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?max=10', // Pentagono / Conflictos Bélicos
        'https://www.oilprice.com/rss/main' // Mercado de Petróleo y Energía
    ];

    // Usamos el servicio rss2json (Free Tier)
    const apiService = 'https://api.rss2json.com/v1/api.json?rss_url=';
    
    try {
        let combinedHeadlines = [];
        
        // Consultamos los primeros 5 feeds para no saturar el rendimiento inicial
        for (let i = 0; i < feeds.length; i++) {
            const response = await fetch(apiService + encodeURIComponent(feeds[i]));
            const data = await response.json();
            
            if (data.status === 'ok') {
                data.items.slice(0, 3).forEach(item => {
                    // Limpiamos el texto y lo ponemos en mayúsculas para estilo DEFCON
                    combinedHeadlines.push(item.title.toUpperCase());
                });
            }
        }

        if (combinedHeadlines.length > 0) {
            // Unimos todo con separadores de grado militar
            feedElement.innerText = " [!] " + combinedHeadlines.join(" [---] ") + " [!] ";
        }

    } catch (error) {
        console.warn("Falla en enlace satelital de noticias. Usando caché local.");
        feedElement.innerText = " +++ ALERTA: MONITOREO DE EMERGENCIA ACTIVO - REVISANDO CIBERSEGURIDAD Y MERCADOS ENERGÉTICOS +++ ";
    }
}

// Ejecución inicial y refresco cada 5 minutos (300000 ms)
fetchGlobalIntelligence();
setInterval(fetchGlobalIntelligence, 300000);

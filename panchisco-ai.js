const API_KEY = "TU_API_KEY_AQUI"; // REEMPLAZA ESTO

async function sendToGemini() {
    const input = document.getElementById('ai-user-input');
    const log = document.getElementById('ai-chat-log');
    const btn = document.getElementById('ai-send-btn');
    
    if (!input.value.trim()) return;

    const userMsg = input.value;
    log.innerHTML += `<p class="user-msg">> ${userMsg}</p>`;
    input.value = "";
    btn.disabled = true;
    btn.innerText = "PROCESANDO...";

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Eres Panchisco AI, experto en infraestructura de Edgar De Leon. Responde técnico y breve: ${userMsg}` }] }]
            })
        });
        const data = await res.json();
        const response = data.candidates[0].content.parts[0].text;
        log.innerHTML += `<p class="bot-msg">> ${response}</p>`;
    } catch (e) {
        log.innerHTML += `<p class="bot-msg" style="color:red">> ERROR DE CONEXIÓN AL NODO CENTRAL.</p>`;
    }
    
    btn.disabled = false;
    btn.innerText = "EJECUTAR";
    log.scrollTop = log.scrollHeight;
}

function handleKeyPress(e) { if (e.key === 'Enter') sendToGemini(); }

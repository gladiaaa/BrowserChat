const ws = new WebSocket(`ws://${window.location.host}/ws`);
ws.binaryType = 'blob';

const messagesDiv = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// 🔐 Protection XSS - échappement HTML
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Affichage d’un message dans la zone de chat
function displayMessage(msg) {
  const p = document.createElement('p');
  p.innerHTML = escapeHTML(msg);
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Envoi d’un message via WebSocket
function sendMessage() {
  const msg = input.value.trim();
  if (msg !== '' && msg.length < 500) {
    ws.send(msg);
    input.value = '';
  }
}

// Gestion des événements WebSocket
ws.onopen = () => {
  console.log('✅ Connexion WebSocket établie');
  startPing(); // Lancer le ping régulier
};

ws.onmessage = async (event) => {
  const msg = typeof event.data === 'string' ? event.data : await event.data.text();
  if (msg.startsWith("ping-")) {
    const pingId = msg.split("-")[1];
    const latency = Date.now() - Number(pingId);
    document.getElementById('pingValue').textContent = `Ping : ${latency} ms`;
    return;
  }
  displayMessage(msg);
};

ws.onclose = () => {
  console.log('❌ Connexion WebSocket fermée');
};

// Envoi via bouton ou touche Entrée
sendBtn.onclick = sendMessage;
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

// 🔁 Envoi de ping toutes les 5 secondes
function startPing() {
  setInterval(() => {
    const pingId = `ping-${Date.now()}`;
    ws.send(pingId);
  }, 5000);
}

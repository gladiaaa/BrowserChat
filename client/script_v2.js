// Début de script_v2.js

// Sélection des éléments du DOM
const socket = new WebSocket(`ws://${window.location.host}/`); // Utilise l'URL relative
const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');

// Gestion de la connexion WebSocket ouverte
socket.addEventListener('open', () => {
    console.log('Connected to server');
});

// Gestion des messages reçus du serveur
socket.addEventListener('message', event => {
    const message = document.createElement('p');
    message.textContent = 'Server: ' + event.data;
    messages.appendChild(message);
});

// Gestion des erreurs WebSocket
socket.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

// Gestion de la fermeture de la connexion WebSocket
socket.addEventListener('close', (event) => {
    console.log('WebSocket Closed:', event);
});

// Gestion de l'envoi de messages au serveur
send.addEventListener('click', () => {
    if (input.value) {
        socket.send(input.value);
        const message = document.createElement('p');
        message.textContent = `Client: ${input.value}`;
        messages.appendChild(message);
        input.value = '';
    }
});

// Fin de script_v2.js
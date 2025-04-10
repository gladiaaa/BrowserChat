const socket = new WebSocket(`ws://${window.location.host}/`);
const messages = document.getElementById('messages');
const input = document.getElementById('input');
const send = document.getElementById('send');

socket.addEventListener('open', () => {
  console.log('Connected to server');
});
socket.addEventListener('message', event => {
  const message = document.createElement('p');
  message.textContent = 'Server: ' + event.data;
  messages.appendChild(message);
});

send.addEventListener('click', () => {
  if (input.value) {
    socket.send(input.value);
    const message = document.createElement('p');
    message.textContent = 'Client: ' + input.value;
    messages.appendChild(message);
    input.value = '';
  }
});
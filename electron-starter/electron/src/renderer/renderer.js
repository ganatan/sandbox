const socket = new WebSocket('ws://localhost:8080')

const input = document.getElementById('messageInput')
const button = document.getElementById('sendButton')
const messages = document.getElementById('messages')

socket.addEventListener('open', () => {
  console.log('WebSocket connecté')
})

socket.addEventListener('message', (event) => {
  const div = document.createElement('div')
  div.textContent = `Serveur : ${event.data}`
  messages.appendChild(div)
})

button.addEventListener('click', () => {
  const text = input.value
  socket.send(text)
  const div = document.createElement('div')
  div.textContent = `Vous : ${text}`
  messages.appendChild(div)
  input.value = ''
})

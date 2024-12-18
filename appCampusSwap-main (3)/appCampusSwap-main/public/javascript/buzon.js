const socket = io();

let currentChatUserId = null;

// Función para formatear la fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para buscar usuarios
document.getElementById('searchUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const response = await fetch('/buzon/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    const data = await response.json();
    if (data.success) {
        const userResults = document.getElementById('userResults');
        userResults.innerHTML = '';
        data.users.forEach(user => {
            userResults.innerHTML += `
            <div class="user-result-item">
                <span>${user.username}</span>
                <button onclick="startChat(${user.id_user}, '${user.username}')">
                    <i class="fas fa-comment"></i> Chatear
                </button>
            </div>`;
        });
    } else {
        alert(data.message);
    }
});

// Función para iniciar un chat
async function startChat(userId, username, initialMessage = '') {
    document.getElementById('receiverId').value = userId;
    document.getElementById('sendMessageForm').style.display = 'block';
    document.getElementById('boton-valoraciones').setAttribute('onclick', 
        `fetch("buzon/get-user-valoraciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": ${userId}
            })
        })
        .then(response => response.json())
        .then(data => {
            const modalValoraciones = document.getElementById('modalValoraciones');
            const contenidoModal = modalValoraciones.querySelector('.contenido-modal');
            const listaValoraciones = document.getElementById('valoraciones-lista');
    
            contenidoModal.innerHTML = "<span id='cerrarModal' class='cerrar'>&times;</span>" + 
            "<h2 class='modalTitle'>Valoraciones</h2>";
            if (data && data.length > 0) {
                data.forEach(valoracion => {
                    const valoracionItem = document.createElement('div');
                    valoracionItem.classList.add('valoracion-item');
                    valoracionItem.innerHTML = \`
                    <p><strong>Producto: </strong> \${valoracion.producto}</p>
                    <p><strong>Valoración: </strong> \${valoracion.valoracion} estrellas</p>
                    <p><strong>Comentario: </strong> \${valoracion.comentario}</p>
                    <p><strong>Fecha: </strong> \${formatDate(valoracion.FechaValoracion)}</p>\`;
                    contenidoModal.appendChild(valoracionItem);
                });
            } else {
                contenidoModal.innerHTML += "<p>No hay valoraciones disponibles.</p>";
            }
    
            modalValoraciones.style.display = 'block';
            document.getElementById('cerrarModal').onclick = () => {
                modalValoraciones.style.display = 'none';
    };
        })
        .catch(error => console.error('Error:', error));
    `);
    document.getElementById('chatUsername').textContent = username;
    document.querySelector('.delete-chat-button').style.display = 'block';
    await loadChat(userId);

    if (initialMessage) {
        await sendMessage(userId, initialMessage, false);
    }
}

// Función para cargar un chat específico
async function loadChat(userId) {
    currentChatUserId = userId;
    const response = await fetch(`/buzon/messages/${userId}`);
    const data = await response.json();
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    
    if (data.success) {
        data.messages.forEach(message => {
            const messageClass = message.sender_id === currentChatUserId ? 'received' : 'sent';
            const deleteButton = message.sender_id !== currentChatUserId ? `<button class="delete-button" onclick="deleteMessage(${message.id_message})">Eliminar</button>` : '';
            messagesList.innerHTML += `
                <div class="message ${messageClass}" data-message-id="${message.id_message}" onclick="toggleDeleteButton(this)">
                    <div class="message-content">${message.content}</div>
                    <div class="message-timestamp">${formatDate(message.timestamp)}</div>
                    ${deleteButton}
                </div>`;
        });
        messagesList.scrollTop = messagesList.scrollHeight;
        document.getElementById('sendMessageForm').style.display = 'block';
    }
}

// Función para mostrar/ocultar el botón de eliminación
function toggleDeleteButton(messageElement) {
    const deleteButton = messageElement.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.style.display = deleteButton.style.display === 'none' ? 'block' : 'none';
    }
}

// Función para enviar mensajes
async function sendMessage(receiverId, content, addToUI = true) {
    if (!content.trim()) return;

    const response = await fetch('/buzon/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId, content })
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById('messageContent').value = '';
        if (addToUI) {
            const messagesList = document.getElementById('messagesList');
            const messageClass = 'sent';
            const newMessage = `
                <div class="message ${messageClass}" data-message-id="${data.messageId}" onclick="toggleDeleteButton(this)">
                    <div class="message-content">${content}</div>
                    <div class="message-timestamp">${formatDate(new Date().toISOString())}</div>
                    <button class="delete-button" onclick="deleteMessage(${data.messageId})">Eliminar</button>
                </div>`;
            messagesList.innerHTML += newMessage;
            messagesList.scrollTop = messagesList.scrollHeight;
        }
        await loadConversations();
        socket.emit('newMessage', { receiverId, content });
    } else {
        alert(data.message);
    }
}

document.getElementById('sendMessageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const receiverId = e.target.receiverId.value;
    const content = e.target.content.value;
    await sendMessage(receiverId, content);
});

// Enviar mensaje al presionar Enter en el chat
document.getElementById('messageContent').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('sendMessageForm').requestSubmit();
    }
});

const modal = document.getElementById('modalValoraciones');
const boton = document.getElementById('boton-valoraciones');
const cerrarModal = document.getElementById('cerrarModal');

boton.addEventListener("click",function() {
    modal.style.display = "block";
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener("click",function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
});

// Función para eliminar un mensaje
async function deleteMessage(messageId) {
    const response = await fetch(`/buzon/delete-message/${messageId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.success) {
        socket.emit('messageDeleted', { messageId, userId: currentChatUserId });
        removeMessageFromUI(messageId);
    } else {
        alert(data.message);
    }
}

// Función para eliminar un mensaje de la interfaz de usuario
function removeMessageFromUI(messageId) {
    const messageElement = document.querySelector(`.message[data-message-id="${messageId}"]`);
    if (messageElement) {
        messageElement.remove();
    }
}

// Escuchar la eliminación de mensajes en tiempo real
socket.on('messageDeleted', (data) => {
    if (data.userId === currentChatUserId) {
        removeMessageFromUI(data.messageId);
    }
});

// Función para cargar las conversaciones
async function loadConversations() {
    const response = await fetch('/buzon/conversations');
    const data = await response.json();
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = '';

    if (data.success && data.conversations.length > 0) {
        data.conversations.forEach(conversation => {
            const lastMessageTime = formatDate(conversation.last_message_time);
            conversationList.innerHTML += `
                <div class="chat-item ${currentChatUserId === conversation.id_user ? 'active' : ''}" 
                     onclick="startChat(${conversation.id_user}, '${conversation.username}')">
                    <div class="chat-item-content">
                        <i class="fas fa-user-circle"></i>
                        <div class="chat-item-info">
                            <span class="chat-item-name">${conversation.username}</span>
                            <span class="chat-item-time">${lastMessageTime}</span>
                        </div>
                    </div>
                </div>`;
        });
    } else {
        conversationList.innerHTML = '<div class="no-conversations">No hay conversaciones.</div>';
    }
}

// Función para confirmar la eliminación del chat
function confirmDeleteChat() {
    if (confirm("¿Estás seguro de que quieres borrar este chat?")) {
        deleteConversation(currentChatUserId);
    }
}

// Función para eliminar una conversación
async function deleteConversation(userId) {
    const response = await fetch(`/buzon/delete-conversation/${userId}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    if (data.success) {
        loadConversations();
        document.getElementById('chatHeader').innerHTML = `<h2>Selecciona un chat para comenzar</h2>`;
        document.getElementById('messagesList').innerHTML = '';
        document.getElementById('sendMessageForm').style.display = 'none';
        document.querySelector('.delete-chat-button').style.display = 'none';
    } else {
        alert(data.message);
    }
}

// Actualizar conversaciones cada 30 segundos
setInterval(() => {
    if (currentChatUserId) {
        loadChat(currentChatUserId);
    }
    loadConversations();
}, 30000);

// Cargar conversaciones al inicio
loadConversations();

// Iniciar chat automáticamente si el parámetro chatWith está presente
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const chatWith = urlParams.get('chatWith');
    const productName = urlParams.get('productName');
    if (chatWith && productName) {
        startChat(chatWith, '', `Contactado por el anuncio de ${productName}`);
    }
});

// Escuchar nuevos mensajes en tiempo real
socket.on('messageReceived', async (message) => {
    if (message.sender_id === currentChatUserId || message.receiver_id === currentChatUserId) {
        const messagesList = document.getElementById('messagesList');
        const messageClass = message.sender_id === currentChatUserId ? 'received' : 'sent';
        const newMessage = `
            <div class="message ${messageClass}" data-message-id="${message.id_message}" onclick="toggleDeleteButton(this)">
                <div class="message-content">${message.content}</div>
                <div class="message-timestamp">${formatDate(new Date().toISOString())}</div>
            </div>`;
        messagesList.innerHTML += newMessage;
        messagesList.scrollTop = messagesList.scrollHeight;
    }
    await loadConversations();
});
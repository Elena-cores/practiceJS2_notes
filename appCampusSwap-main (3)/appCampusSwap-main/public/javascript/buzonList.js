document.addEventListener("DOMContentLoaded", () => {
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
        function startChat(userId, username) {
            document.getElementById('receiverId').value = userId;
            document.getElementById('sendMessageForm').style.display = 'block';
            document.getElementById('chatUsername').textContent = username;
            document.querySelector('.delete-chat-button').style.display = 'block';
            loadChat(userId);
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
                    const deleteButton = message.sender_id !== currentChatUserId ? `<button class="delete-button" onclick="deleteMessage(${message.id_message})" style="display:none;">Eliminar</button>` : '';
                    messagesList.innerHTML += `
                        <div class="message ${messageClass}" onclick="toggleDeleteButton(this)">
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
        document.getElementById('sendMessageForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const receiverId = e.target.receiverId.value;
            const content = e.target.content.value;
            
            if (!content.trim()) return;

            const response = await fetch('/buzon/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ receiverId, content })
            });
            
            const data = await response.json();
            if (data.success) {
                e.target.content.value = '';
                loadChat(receiverId);
                loadConversations();
            } else {
                alert(data.message);
            }
        });

        // Enviar mensaje al presionar Enter en el chat
        document.getElementById('messageContent').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('sendMessageForm').requestSubmit();
            }
        });

        // Función para eliminar un mensaje
        async function deleteMessage(messageId) {
            const response = await fetch(`/buzon/delete-message/${messageId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.success) {
                loadChat(currentChatUserId);
            } else {
                alert(data.message);
            }
        }

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
                                <div class="chat-item-options">
                                    <button class="options-button" onclick="event.stopPropagation(); toggleOptionsMenu(this)">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div class="options-menu" style="display:none;">
                                        <button class="delete-button" onclick="deleteConversation(${conversation.id_user})">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });
            } else {
                conversationList.innerHTML = '<div class="no-conversations">No hay conversaciones.</div>';
            }
        }

        // Función para mostrar/ocultar el menú de opciones
        function toggleOptionsMenu(buttonElement) {
            const optionsMenu = buttonElement.nextElementSibling;
            optionsMenu.style.display = optionsMenu.style.display === 'none' ? 'block' : 'none';
        }

        // Función para mostrar/ocultar el botón de eliminación de conversación
        function toggleDeleteButton(conversationElement) {
            const deleteButton = conversationElement.querySelector('.delete-button');
            if (deleteButton) {
                deleteButton.style.display = deleteButton.style.display === 'none' ? 'block' : 'none';
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

        // Función para confirmar la eliminación del chat
        function confirmDeleteChat() {
            if (confirm("¿Estás seguro de que quieres borrar este chat?")) {
                deleteConversation(currentChatUserId);
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
});

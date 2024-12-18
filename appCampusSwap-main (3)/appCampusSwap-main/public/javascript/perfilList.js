let estadoActual = 'en-venta';
const barraBusqueda = document.querySelector('.barra-busqueda');
barraBusqueda.addEventListener('input', () => {
  mostrarProductos(estadoActual, barraBusqueda.value);
});

function mostrarProductos(tipo, query = '') {
    fetch(`/perfil/${tipo}?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; 
            if (data.length > 0) {
                data.forEach(ad => {
                    productList.innerHTML += `
                        <div class="product-item">
                            <div class="product">
                                <div class="product-info">
                                    <h3>${ad.title}</h3>
                                    <p>
                                        ${ad.university}
                                        <br>Precio: ${ad.price} euros
                                        <br>Estado: ${ad.state}
                                    </p>
                                </div>
                                <div class="product-actions">
                                    ${
                                        ad.state !== 'Vendido'
                                        ? `<button class="mark-sold-button" onclick="openMarkSoldModal(${ad.id_ad})">Marcar como Vendido</button>`
                                        : ''
                                    }
                                    <button class="mark-sold-button" onclick="modifyProduct(${ad.id_ad})">
                                        Modificar anuncio
                                    </button>
                                    <button class="delete-button" onclick="deleteProduct(${ad.id_ad})">
                                        <img src="../images/eliminar.png" alt="Eliminar" class="delete-icon">
                                    </button>
                                </div>
                            </div>
                        </div>`;
                });
            } else {
                productList.innerHTML = '<p>No hay productos en esta categoría.</p>';
            }
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function cambiarEstado(nuevoEstado) {
    estadoActual = nuevoEstado;
    mostrarProductos(nuevoEstado, barraBusqueda.value);
}

function deleteProduct(adId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        fetch(`/perfil/delete/${adId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Producto eliminado con éxito');
                    location.reload(); 
                } else {
                    alert('Error al eliminar el producto');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
            });
    }
}

function modifyProduct(adId) {
    window.location.href = `/modificarPublicacion?id_ad=${adId}`;
}


function openMarkSoldModal(adId) {
    const modal = document.getElementById('modal-mark-sold');
    const userList = document.getElementById('user-list');
    const searchBar = document.getElementById('search-users');

    userList.innerHTML = '';

    
    fetch('/perfil/conversaciones')
        .then(response => response.json())
        .then(users => {
            if (users.length > 0) {
                userList.innerHTML = users.map(user => `
                    <li>
                        <span>${user.username}</span>
                        <button class="btn btn-select" onclick="markAsSold(${adId}, ${user.id_user})">Seleccionar</button>
                    </li>
                `).join('');

                
                searchBar.addEventListener('input', () => {
                    const query = searchBar.value.toLowerCase(); 
                    const items = userList.querySelectorAll('li'); 

                    // Filtra los elementos de la lista
                    items.forEach(item => {
                        const username = item.querySelector('span').textContent.toLowerCase();
                        item.style.display = username.includes(query) ? '' : 'none'; 
                    });
                });
            } else {
                userList.innerHTML = '<li>No tienes conversaciones abiertas.</li>';
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            userList.innerHTML = '<li>Error al cargar usuarios.</li>';
        });

    
    modal.style.display = 'block';
}


document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal-mark-sold').style.display = 'none';
});

function markAsSold(adId, buyerId) {
    fetch(`/perfil/marcar-vendido/${adId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto marcado como vendido');
                location.reload();
            } else {
                alert(data.message || 'Error al marcar como vendido');
            }
        })
        .catch(error => console.error('Error al marcar como vendido:', error));
}

document.addEventListener('DOMContentLoaded', () => mostrarProductos('en-venta'));
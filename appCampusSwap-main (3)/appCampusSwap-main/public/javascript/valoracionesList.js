//Valoraciones

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup-nueva-valoracion');
    popup.classList.add('hidden');
    popup.style.display = 'none';
    cargarValoraciones('comprado');
});

function cerrarTodosLosPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.classList.add('hidden');
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
    });
}

async function mostrarPopupNuevaValoracion() {
    cerrarTodosLosPopups();
    const popup = document.getElementById('popup-nueva-valoracion');
    const lista = document.querySelector('.lista-compras-no-valoradas');
    lista.innerHTML = '<p>Cargando compras no valoradas...</p>';
    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden', 'false');

    try {
        const response = await fetch('/valoraciones/noValoradas');
        const compras = await response.json();

        if (compras.length > 0) {
            lista.innerHTML = '';
            compras.forEach(c => {
                lista.innerHTML += `
                    <div class="compra">
                        <h4>${c.producto}</h4>
                        <p>Vendedor: ${c.vendedor}</p>
                        <button onclick="valorarCompra(${c.id_venta})" aria-label="Valorar ${c.producto}">Valorar</button>
                    </div>
                `;
            });
        } else {
            lista.innerHTML = '<p>No tienes compras sin valorar.</p>';
        }
    } catch (error) {
        console.error('Error al cargar compras no valoradas:', error);
        lista.innerHTML = '<p>Error al cargar compras no valoradas.</p>';
    }
}

function valorarCompra(idVenta) {
    cerrarTodosLosPopups(); 
    const popupDetalles = document.getElementById('popup-detalles-valoracion');
    const inputIdVenta = document.getElementById('id-venta');

    inputIdVenta.value = idVenta;
    popupDetalles.classList.remove('hidden');
    popupDetalles.style.display = 'flex';
    popupDetalles.setAttribute('aria-hidden', 'false');
}

async function enviarValoracion(event) {
event.preventDefault();

const idVenta = document.getElementById('id-venta').value;
const calificacion = document.getElementById('calificacion').value;
const comentario = document.getElementById('comentario').value;

if (!idVenta || !calificacion || !comentario) {
alert('Por favor, completa todos los campos.');
return;
}

try {
const response = await fetch('/valoraciones/valorar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idVenta, calificacion, comentario }),
});

const data = await response.json();

if (response.ok) {
    alert(data.message);
    cerrarPopupDetalles();
} else {
    alert('Error: ' + data.error);
}
} catch (error) {
console.error('Error en la solicitud:', error);
alert('Error al enviar la valoración.');
}
}

document.addEventListener('click', (event) => {

    const isInsidePopup = event.target.closest('.popup') !== null;

    if (!isInsidePopup && !event.target.matches('[onclick]')) {
        cerrarTodosLosPopups();
    }
});


function cerrarPopup() {
    cerrarTodosLosPopups();
}

function cerrarPopupDetalles() {
    cerrarTodosLosPopups();
}


function cargarValoraciones(tipo) {
    const container = document.querySelector('.valoraciones-list');
    const mensaje = document.querySelector('.mensaje');

  
    mensaje.textContent = 'Cargando valoraciones...';
    container.innerHTML = '';

    fetch(`/valoraciones/${tipo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la carga (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            mensaje.textContent = ''; 

            if (data.length > 0) {
                data.forEach(v => {
                    const valoracionDiv = document.createElement('div');
                    valoracionDiv.classList.add('valoracion');

                    valoracionDiv.innerHTML = `
                        <div class="valoracion-header">
                            <h3>${v.producto}</h3>
                            <p><strong>${tipo === 'comprado' ? 'Vendedor' : 'Comprador'}:</strong> ${tipo === 'comprado' ? v.vendedor : v.comprador}</p>
                        </div>
                        <div class="valoracion-body">
                            <p><strong>Valoración:</strong> ${'★'.repeat(v.valoracion)}</p>
                            <p><strong>Comentario:</strong> ${v.comentario || 'Sin comentarios'}</p>
                        </div>
                        <div class="valoracion-footer">
                            <p class="fecha"><strong>Fecha:</strong> ${new Date(v.FechaValoracion).toLocaleString()}</p>
                        </div>
                    `;
                    container.appendChild(valoracionDiv);
                });
            } else {
                mensaje.textContent = 'No hay valoraciones disponibles.';
            }
        })
        .catch(err => {
            mensaje.textContent = 'Error al cargar las valoraciones.';
            console.error('Error al cargar valoraciones:', err);
        });
}


document.getElementById('form-detalles-valoracion').addEventListener('submit', enviarValoracion);

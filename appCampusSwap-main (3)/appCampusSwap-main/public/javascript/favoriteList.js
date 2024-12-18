// alternar el favorito (agregar o eliminar)
function toggleFavorite(event, adId) {
    // evitar que el clic se abra el pop-up
    event.stopPropagation();

    fetch(`/favoritos/toggle/${adId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                location.reload(); // Recargar la página para reflejar los cambios
            } else {
                alert('Error al actualizar el estado de favorito.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el estado de favorito.');
        });
}

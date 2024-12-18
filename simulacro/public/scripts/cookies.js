document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.getElementById('cookie-popup');
    if (cookiePopup) {
      document.getElementById('accept-cookies').addEventListener('click', () => {
        // Al aceptar, guarda las preferencias y oculta el popup
        setCookiePreferences({ accepted: true });
        cookiePopup.style.display = 'none'; // Oculta el popup
      });
  
      document.getElementById('reject-cookies').addEventListener('click', () => {
        // Redirige a Google si rechaza
        window.location.href = 'https://www.google.com';
      });
    }
  
    function setCookiePreferences(preferences) {
      fetch('/set-cookie-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      })
        .then((response) => response.json())
        .catch((err) => {
          console.error('Error al guardar preferencias:', err);
        });
    }
  });
  
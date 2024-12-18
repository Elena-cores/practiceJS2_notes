const alerts = [
    {
        grade: 'Ingeniería Informática',
        course: '3º',
        notesName: 'Apuntes de Redes',
        description: 'Apuntes detallados de redes de comunicación',
        price: 'Gratis'
    },
    {
        grade: 'Ingeniería Informática',
        course: '4º',
        notesName: 'Apuntes de IA',
        description: 'Introducción a los conceptos de IA',
        price: '15€'
    },
    // Añade más alertas aquí
];

// Función para renderizar las alertas en la tabla
function renderAlerts(alertList) {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = ''; // Limpiar contenido previo

    alertList.forEach(alert => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${alert.grade}</td>
            <td>${alert.course}</td>
            <td>${alert.notesName}</td>
            <td>${alert.description}</td>
            <td>${alert.price}</td>
            <td><a class='danger' href='#'>Eliminar</a></td>
        `;
        tbody.appendChild(tr);
    });
}

// Cargar las primeras 10 alertas
renderAlerts(alerts.slice(0, 10));

// Manejo del botón "Ver Más" (actualmente sin funcionalidad adicional)
document.getElementById('load-more').addEventListener('click', () => {
    alert('Funcionalidad de cargar más próximamente');
});

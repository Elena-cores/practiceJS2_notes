const users = [
    {
        userName: 'Carlos',
        email: 'carlos@example.com',
        alerts: [
            { description: 'Alerta 1', link: '#' },
            { description: 'Alerta 2', link: '#' }
        ]
    },
    {
        userName: 'Ana',
        email: 'ana@example.com',
        alerts: [
            { description: 'Alerta 3', link: '#' }
        ]
    },
    // Añade más usuarios aquí
];

users.forEach(user => {
    const tr = document.createElement('tr');
    const totalAlerts = user.alerts.length;
    const lastAlert = user.alerts[totalAlerts - 1]; // Última alerta

    tr.innerHTML = `
        <td>${user.userName}</td>
        <td>${user.email}</td>
        <td>
            <a href="${lastAlert.link}">
                <span class="alert">${totalAlerts}</span> 
                ${lastAlert.description}
            </a>
        </td>
        <td class="warning"><a href="#">Bloquear</a></td>
        <td class="danger"><a href="#">Eliminar</a></td>
        
    `;
    
    document.querySelector('table tbody').appendChild(tr);
});

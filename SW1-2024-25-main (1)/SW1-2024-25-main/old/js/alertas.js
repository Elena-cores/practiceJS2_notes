const Orders = [
    {
        userName: 'Jack',
        publication: ['#', 'SWEB1'],
        tiquetNum: '0001',
        status: 'Pending'
    },
    {
        userName: 'Paul',
        publication: ['#', 'SIPD'],
        tiquetNum: '0002',
        status: 'Declined'
    },
    {
        userName: 'Jack',
        publication: ['#', 'ISO'],
        tiquetNum: '0003',
        status: 'Active'
    },
]

Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.userName}</td>
        <td> <a href='${order.publication[0]}'>${order.publication[1]}</a></td>
        <td>${order.tiquetNum}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary"><a href='#'>Details</a></td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});
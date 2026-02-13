function loadRiders() {
    fetch('/riders')
        .then(response => response.json())
        .then(riders => {
            const tbody = document.querySelector('#rider-table tbody');
            tbody.innerHTML = '';
            riders.forEach(rider => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${rider.riderId}</td>
                    <td>${rider.firstName}</td>
                    <td>${rider.lastName}</td>
                    <td>${rider.age}</td>
                    <td>${rider.totalTime}</td>
                    <td>${rider.sprintPoint}</td>
                    <td>${rider.mountainPoint}</td>
                    <td>${countryName}</td>
                    <td>${teamName}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading riders table', error));
}

// load riders when page loads
document.addEventListener('DOMContentLoaded', loadRiders);

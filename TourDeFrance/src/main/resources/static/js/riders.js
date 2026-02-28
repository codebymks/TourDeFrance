console.log("riders script loaded!");

async function populateTeamSelect() {
    try {
        const res = await fetch(`${API_BASE_URL}/teams`);
        const teams = await res.json();

        const createSelect = document.getElementById("teamSelect");
        const updateSelect = document.getElementById("updateTeamSelect");

        [createSelect, updateSelect].forEach(select => {
            select.innerHTML = '<option value="">Select Team</option>';
        });

        teams.forEach(team => {
            const option1 = document.createElement("option");
            option1.value = team.teamId;
            option1.textContent = team.teamName;
            createSelect.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = team.teamId;
            option2.textContent = team.teamName;
            updateSelect.appendChild(option2);
        });

    } catch (error) {
        console.error("Error loading teams:", error);
    }
}

// CREATE RIDER
async function createRider(event) {
    event.preventDefault();

    const rider = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: Number(document.getElementById("age").value),
        totalTime: Number(document.getElementById("totalTime").value),
        sprintPoint: Number(document.getElementById("sprintPoint").value),
        mountainPoint: Number(document.getElementById("mountainPoint").value),
        country: document.getElementById("country").value,
        team: { teamId: Number(document.getElementById("teamSelect").value) }
    };

    try {
        const res = await fetch(`${API_BASE_URL}/riders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rider)
        });

        if (res.ok) {
            alert("Rider created successfully.");
            document.getElementById("riderForm").reset();
            loadRiders();
        }
    } catch (error) {
        console.error(error);
        alert("Error occurred trying to create rider.");
    }
}

// READ RIDERS
async function loadRiders() {
    try {
        const res = await fetch(`${API_BASE_URL}/riders`);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();

        const tbody = document.querySelector("#riderTable tbody");
        tbody.innerHTML = "";

        data.forEach(rider => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${rider.riderId}</td>
                <td>${rider.firstName}</td>
                <td>${rider.lastName}</td>
                <td>${rider.age}</td>
                <td>${rider.totalTime}</td>
                <td>${rider.sprintPoint}</td>
                <td>${rider.mountainPoint}</td>
                <td>${rider.country}</td>
                <td>${rider.team ? rider.team.teamName : "No team"}</td>
                <td>
                    <button class="updateRider">Edit</button>
                    <button class="deleteRider">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);

            tr.querySelector(".updateRider").addEventListener("click", () => showUpdateRiderForm(rider));
            tr.querySelector(".deleteRider").addEventListener("click", () => deleteRider(rider.riderId));
        });

    } catch (error) {
        console.error(error);
        alert("Error loading riders.");
    }
}

// SHOW UPDATE RIDER FORM
function showUpdateRiderForm(rider) {
    document.getElementById("updateRiderFormContainer").style.display = "block";

    document.getElementById("updateRiderId").value = rider.riderId;
    document.getElementById("updateFirstName").value = rider.firstName;
    document.getElementById("updateLastName").value = rider.lastName;
    document.getElementById("updateAge").value = rider.age;
    document.getElementById("updateTotalTime").value = rider.totalTime;
    document.getElementById("updateSprintPoint").value = rider.sprintPoint;
    document.getElementById("updateMountainPoint").value = rider.mountainPoint;
    document.getElementById("updateCountry").value = rider.country;

    const teamSelect = document.getElementById("updateTeamSelect");
    fetch(`${API_BASE_URL}/teams`)
        .then(res => res.json())
        .then(teams => {
            teamSelect.innerHTML = '<option value="">Select Team</option>';
            teams.forEach(team => {
                const option = document.createElement("option");
                option.value = team.teamId;
                option.textContent = team.teamName;
                if (rider.team && team.teamId === rider.team.teamId) {
                    option.selected = true;
                }
                teamSelect.appendChild(option);
            });
        });
}

// UPDATE RIDER
async function updateRider(event) {
    event.preventDefault();

    const id = document.getElementById("updateRiderId").value;
    const updateRider = {
        firstName: document.getElementById("updateFirstName").value,
        lastName: document.getElementById("updateLastName").value,
        age: Number(document.getElementById("updateAge").value),
        totalTime: Number(document.getElementById("updateTotalTime").value),
        sprintPoint: Number(document.getElementById("updateSprintPoint").value),
        mountainPoint: Number(document.getElementById("updateMountainPoint").value),
        country: document.getElementById("updateCountry").value,
        team: { teamId: Number(document.getElementById("updateTeamSelect").value) }
    };

    try {
        const res = await fetch(`${API_BASE_URL}/riders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateRider)
        });

        if (res.ok) {
            document.getElementById("updateRiderForm").reset();
            document.getElementById("updateRiderFormContainer").style.display = "none";
            loadRiders();
        } else {
            const errorText = await res.text();
            console.error(errorText);
            alert("Error updating rider: " + errorText);
        }
    } catch (error) {
        console.error(error);
        alert("Error occurred trying to update rider.");
    }
}

// DELETE RIDER
async function deleteRider(id) {
    if (!confirm("Are you sure you want to delete this rider?")) return;

    try {
        const res = await fetch(`${API_BASE_URL}/riders/${id}`, { method: "DELETE" });
        if (res.ok) {
            alert("Rider deleted successfully.");
            loadRiders();
        } else {
            const errorText = await res.text();
            console.error(errorText);
            alert("Error deleting rider: " + errorText);
        }
    } catch (error) {
        console.error(error);
        alert("Error occurred trying to delete rider.");
    }
}

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    populateTeamSelect();
    loadRiders();

    document.getElementById("riderForm").addEventListener("submit", createRider);
    document.getElementById("updateRiderForm").addEventListener("submit", updateRider);
});
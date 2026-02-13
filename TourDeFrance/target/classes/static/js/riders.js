console.log("riders script loaded!");

//CREATE RIDER
async function createRider(event) {
    event.preventDefault();

    const rider = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: Number(document.getElementById("age").value),
        totalTime: Number(document.getElementById("totalTime").value),
        mountainPoint: document.getElementById("mountainPoint").value,
        sprintPoint: document.getElementById("sprintPoint").value,
        country: document.getElementById("country").value,
        teamName: document.getElementById("teamName").value,
    };

    try {
        const res = await fetch(`${API_BASE_URL}/riders`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(rider),
        });
        if (res.ok) {
            alert("riders created successfully.");
            loadRiders();
        }
    } catch (error) {
        console.error(error);
        alert("error occurred trying to create riders.");
    }
}

//READ RIDER
async function loadRiders() {
    try {
        const rest = await fetch(`${API_BASE_URL}/riders`);
        if (!rest.ok) {
            throw new Error("HTTP " + rest.status);
        }
        const data = await rest.json();
        console.log(data);
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
        alert("error occurred trying to load riders.");
    }
}


// UPDATE RIDER FORM
function showUpdateRiderForm(rider) {
    document.getElementById("updateRiderFormContainer").style.display = "block";
    document.getElementById("updateRiderId").value = rider.riderId;
    document.getElementById("updateFirstName").value = rider.firstName;
    document.getElementById("updateLastName").value = rider.lastName;
    document.getElementById("updateAge").value = rider.age;
    document.getElementById("updateTotalTime").value = rider.totalTime;
}


// UPDATE RIDER
async function updateRider() {

    const id = document.getElementById("updateRiderId").value;
    const updateRider = {
        firstName: document.getElementById("updateFirstName").value,
        lastName: document.getElementById("updateLastName").value,
        age: Number(document.getElementById("updateAge").value),
        totalTime: Number(document.getElementById("updateTotalTime").value)
    };

    const res = await fetch(`${API_BASE_URL}/riders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateRider)
    });
    if (res.ok) {
        document.getElementById("updateRiderForm").reset();
        document.getElementById("updateRiderFormContainer").style.display = "none";
        loadRiders();
    } else {
        const error = await res.text();
        console.error(error);
        alert("error occurred trying to update riders.");
    }
}


//DELETE RIDER
async function deleteRider(id) {

    if (!confirm("Are you sure you want to delete this rider?")) return;

    try {
        const res = await fetch(`${API_BASE_URL}/riders/${id}`, {method: "DELETE",});
        if (res.ok) {
            alert("rider deleted successfully.");
            loadRiders();
        } else {
            const error = await res.text();
            console.error(error);
            alert("error occurred trying to delete riders.");
        }
    } catch (error) {
        console.error(error);
        alert("error occurred trying to delete rider.");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadRiders();
    // Create rider
    document.getElementById("riderForm")
        .addEventListener("submit", createRider);

    // Update rider
    document.getElementById("updateRiderForm")
        .addEventListener("submit", updateRider);
});

console.log("teams loaded");

//CREATE TEAMS
async function createTeams(event) {
    event.preventDefault();

    const teams = {
        teamName: document.getElementById("teamNameInput").value,
        country: document.getElementById("teamCountry").value,
    };

    console.log(teams);

    try {
        const response = await fetch(`${API_BASE_URL}/teams`, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(teams),
        });

        if (response.ok) {
            alert("Team created successfully.");
            document.getElementById("teamForm").reset();
            loadTeams();
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

// READ TEAMS
async function loadTeams() {
    try {
        const response = await fetch(`${API_BASE_URL}/teams`);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();

        const tbody = document.querySelector("#teamsTable tbody");
        tbody.innerHTML = '';

        data.forEach(team => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${team.teamId}</td>
                <td>${team.teamName}</td>
                <td>${team.country}</td>
                <td>
                    <button class="editTeam">Edit</button>
                    <button class="deleteTeam">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);

            tr.querySelector(".editTeam").addEventListener("click", () => showUpdateTeamForm(team));
            tr.querySelector(".deleteTeam").addEventListener("click", () => deleteTeam(team.teamId));
        });
    } catch (error) {
        console.error(error);
        alert("Error loading teams");
    }
}


//UPDATE FORM FOR TEAMS
function showUpdateTeamForm(team) {
    document.getElementById("updateTeamFormContainer").style.display = "block";
    document.getElementById("updateTeamId").value = team.teamId;
    document.getElementById("updateTeamNameInput").value = team.teamName;
    document.getElementById("updateTeamCountry").value = team.country;
}

//UPDATE TEAM
async function updateTeam(event) {
    event.preventDefault();

    const id = document.getElementById("updateTeamId").value;

    const updateTeam = {
        teamName: document.getElementById("updateTeamNameInput").value.trim(),
        country: document.getElementById("updateTeamCountry").value,
    };

    try {
        const res = await fetch(`${API_BASE_URL}/teams/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateTeam)
        });

        if (res.ok) {
            alert("Team updated successfully.");
            document.getElementById("updateTeamForm").reset();
            document.getElementById("updateTeamFormContainer").style.display = "none";
            loadTeams();
        }
    } catch (error) {
        console.error(error);
        alert("Error updating team");
    }
}

// DELETE TEAM
async function deleteTeam(id) {

    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
        const response = await fetch(`${API_BASE_URL}/teams/${id}`, {method: "DELETE"});
        if (response.ok) {
            alert("Team deleted successfully.");
            loadTeams();
        } else {
            alert("Delete failed");
        }
    } catch (error) {
        console.error(error);
        alert("error occurred trying to delete rider.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadTeams();

    // Create team
    document.getElementById("teamForm").addEventListener("submit", createTeams);

    // Update team
    document.getElementById("updateTeamForm").addEventListener("submit", updateTeam)
});

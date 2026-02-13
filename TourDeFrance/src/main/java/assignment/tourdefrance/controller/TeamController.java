package assignment.tourdefrance.controller;

import assignment.tourdefrance.model.Team;
import assignment.tourdefrance.repository.TeamRepository;
import assignment.tourdefrance.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping()
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public Team getTeamById(@PathVariable int id) {
        return teamService.getTeamById(id);
    }

    @PostMapping
    public Team createTeam(@RequestBody Team team) {
        return teamService.createTeam(team);
    }

    @PutMapping("/{id}")
    public Team updateTeam(@RequestBody Team newteam, @PathVariable int id) {
        return teamService.updateTeam(id, newteam);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable int id) {
        teamService.deleteTeam(id);
    }
}

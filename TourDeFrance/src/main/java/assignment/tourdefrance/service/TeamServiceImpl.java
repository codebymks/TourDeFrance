package assignment.tourdefrance.service;

import assignment.tourdefrance.model.Team;
import assignment.tourdefrance.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Team createTeam(Team team) {
        if (team.getCountry() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Country is required");
        }
        if (team.getTeamName() == null || team.getTeamName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team name is required");
        }
        return teamRepository.save(team);
    }

    @Override
    public Team updateTeam(int id, Team team) {
        Team oldTeam = teamRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));

        if (team.getCountry() != null) oldTeam.setCountry(team.getCountry());
        if (team.getTeamName() != null && !team.getTeamName().trim().isEmpty()) oldTeam.setTeamName(team.getTeamName());

        return teamRepository.save(oldTeam);
    }

    @Override
    public void deleteTeam(int id) {
        teamRepository.deleteById(id);
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public Team getTeamById(int id) {
        return teamRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
    }
}

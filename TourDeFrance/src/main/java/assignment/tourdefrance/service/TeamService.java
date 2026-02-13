package assignment.tourdefrance.service;

import assignment.tourdefrance.model.Team;

import java.util.List;

public interface TeamService {
    Team createTeam(Team team);
    Team updateTeam(int id, Team team);
    void deleteTeam(int id);
    List<Team> getAllTeams();
    Team getTeamById(int id);
}

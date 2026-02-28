package assignment.tourdefrance.initData;

import assignment.tourdefrance.model.Country;
import assignment.tourdefrance.model.Rider;
import assignment.tourdefrance.model.Team;
import assignment.tourdefrance.repository.RiderRepository;
import assignment.tourdefrance.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class initData implements CommandLineRunner {

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Override
    public void run(String... args) throws Exception {
        Team team1 = new Team();
        team1.setTeamName("Team 1");
        team1.setCountry(Country.DANMARK);
        teamRepository.save(team1);

        Rider rider1 = new Rider();
        rider1.setFirstName("Jonas");
        rider1.setLastName("Vingegaard");
        rider1.setAge(29);
        rider1.setTotalTime(0);
        rider1.setSprintPoint(0);
        rider1.setMountainPoint(0);
        rider1.setTeam(team1);
        rider1.setCountry(Country.DANMARK);
        riderRepository.save(rider1);
    }
}

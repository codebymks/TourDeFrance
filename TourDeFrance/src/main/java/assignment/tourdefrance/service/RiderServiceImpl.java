package assignment.tourdefrance.service;

import assignment.tourdefrance.model.Rider;
import assignment.tourdefrance.model.Team;
import assignment.tourdefrance.repository.RiderRepository;
import assignment.tourdefrance.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RiderServiceImpl implements RiderService {

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private TeamRepository teamRepository;


    @Override
    public Rider createRider(Rider rider) {
        if (rider.getTeam() != null && rider.getTeam().getTeamId() != 0) {
            Team team = teamRepository.findById(rider.getTeam().getTeamId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
            rider.setTeam(team);
        }
        return riderRepository.save(rider);
    }

    @Override
    public List<Rider> getAllRiders() {
        return riderRepository.findAll();
    }

    @Override
    public Rider getRiderById(int riderId) {
        return riderRepository.findById(riderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "rider not found"));
    }

    @Override
    public Rider updateRider(int id, Rider rider) {
        Rider oldRider = riderRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rider not found"));

        oldRider.setFirstName(rider.getFirstName());
        oldRider.setLastName(rider.getLastName());
        oldRider.setAge(rider.getAge());
        oldRider.setMountainPoint(rider.getMountainPoint());
        oldRider.setSprintPoint(rider.getSprintPoint());
        oldRider.setCountry(rider.getCountry());

        if (rider.getTeam() != null && rider.getTeam().getTeamId() != 0) {
            Team team = teamRepository.findById(rider.getTeam().getTeamId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found"));
            oldRider.setTeam(team);
        } else {
            oldRider.setTeam(null);
        }
        return riderRepository.save(oldRider);
    }

    @Override
    public void deleteRider(int riderId) {
        riderRepository.deleteById(riderId);
    }
}

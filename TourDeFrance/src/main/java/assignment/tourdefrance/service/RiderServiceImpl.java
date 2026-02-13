package assignment.tourdefrance.service;

import assignment.tourdefrance.model.Rider;
import assignment.tourdefrance.repository.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RiderServiceImpl implements RiderService {

    @Autowired
    private RiderRepository riderRepository;

    @Override
    public Rider createRider(Rider rider) {
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
        Rider oldRider = riderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "rider not found"));
        oldRider.setFirstName(rider.getFirstName());
        oldRider.setLastName(rider.getLastName());
        oldRider.setAge(rider.getAge());
        oldRider.setMountainPoint(rider.getMountainPoint());
        oldRider.setSprintPoint(rider.getSprintPoint());
        oldRider.setCountry(rider.getCountry());
        oldRider.setTeam(rider.getTeam());
        return riderRepository.save(oldRider);
    }

    @Override
    public void deleteRider(int riderId) {
        riderRepository.deleteById(riderId);
    }
}

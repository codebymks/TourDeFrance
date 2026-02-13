package assignment.tourdefrance.repository;

import assignment.tourdefrance.model.Rider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiderRepository extends JpaRepository<Rider, Integer> {

    List<Rider> findByTeam(String team);
}

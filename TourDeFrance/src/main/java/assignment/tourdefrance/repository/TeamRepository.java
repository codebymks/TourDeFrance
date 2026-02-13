package assignment.tourdefrance.repository;

import assignment.tourdefrance.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}

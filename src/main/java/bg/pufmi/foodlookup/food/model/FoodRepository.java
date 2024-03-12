package bg.pufmi.foodlookup.food.model;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodRepository extends JpaRepository<Food, Long>, JpaSpecificationExecutor<Food> {

  Optional<Food> findByDescription(String description);
}

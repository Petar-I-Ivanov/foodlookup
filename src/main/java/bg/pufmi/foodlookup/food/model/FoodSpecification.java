package bg.pufmi.foodlookup.food.model;

import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;

public class FoodSpecification {

  private FoodSpecification() {}

  public static Specification<Food> fromCriteria(FoodSearchCriteria criteria) {
    return Specification.where(likeDescription(criteria.getDescription()));
  }

  private static Specification<Food> likeDescription(String description) {
    return (root, query, builder) ->
        Optional.ofNullable(description)
            .map(desc -> builder.like(root.get("description"), "%" + desc + "%"))
            .orElse(builder.conjunction());
  }
}

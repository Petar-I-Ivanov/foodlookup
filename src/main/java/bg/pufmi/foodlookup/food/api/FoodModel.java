package bg.pufmi.foodlookup.food.api;

import static lombok.AccessLevel.PRIVATE;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.server.core.Relation;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
@Relation("food")
public class FoodModel extends RepresentationModel<FoodModel> {

  String id;
  String description;
  BigDecimal kcal;
  BigDecimal protein;
  BigDecimal fat;
  BigDecimal carbs;
}

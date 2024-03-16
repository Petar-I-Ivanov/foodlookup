package bg.pufmi.foodlookup.food.model;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class Food {

  @Id
  @GeneratedValue
  @Column(name = "food_id")
  Long id;

  @Column(length = 255, unique = true, nullable = true)
  String description;

  @Column(precision = 10, scale = 2)
  BigDecimal kcal;

  @Column(precision = 10, scale = 2)
  BigDecimal protein;

  @Column(precision = 10, scale = 2)
  BigDecimal fat;

  @Column(precision = 10, scale = 2)
  BigDecimal carbs;
}

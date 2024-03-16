package bg.pufmi.foodlookup.food.model;

import static lombok.AccessLevel.PRIVATE;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class FoodCreateEditRequest {

  @NotBlank(message = "Food description cannot be blank!")
  @Size(max = 250, message = "Food description cannot be larger than 250 symbols!")
  String description;

  @DecimalMin(value = "0.00", message = "Food kcal should be more than 0!")
  BigDecimal kcal;

  @DecimalMin(value = "0.00", message = "Food protein should be more than 0!")
  BigDecimal protein;

  @DecimalMin(value = "0.00", message = "Food fat should be more than 0!")
  BigDecimal fat;

  @DecimalMin(value = "0.00", message = "Food carbs should be more than 0!")
  BigDecimal carbs;
}

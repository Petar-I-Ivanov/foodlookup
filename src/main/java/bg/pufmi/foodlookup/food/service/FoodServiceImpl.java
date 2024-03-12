package bg.pufmi.foodlookup.food.service;

import static lombok.AccessLevel.PRIVATE;

import bg.pufmi.foodlookup.food.model.Food;
import bg.pufmi.foodlookup.food.model.FoodCreateEditRequest;
import bg.pufmi.foodlookup.food.model.FoodRepository;
import bg.pufmi.foodlookup.food.model.FoodSearchCriteria;
import bg.pufmi.foodlookup.food.model.FoodSpecification;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class FoodServiceImpl implements FoodService {

  static DecimalFormat DECIMAL_FORMATTER = new DecimalFormat("0.00");

  FoodRepository foodRepository;

  @Override
  public Food create(FoodCreateEditRequest request) {
    validateExistingDescription(request.getDescription(), null);
    return foodRepository.save(requestIntoEntity(request, new Food()));
  }

  @Override
  public Food getById(Long id) {
    return foodRepository.getReferenceById(id);
  }

  @Override
  public List<Food> search(FoodSearchCriteria criteria) {
    return foodRepository.findAll(FoodSpecification.fromCriteria(criteria));
  }

  @Override
  public Food update(Long id, FoodCreateEditRequest request) {
    validateExistingDescription(request.getDescription(), id);
    return foodRepository.save(requestIntoEntity(request, getById(id)));
  }

  @Override
  public void delete(Long id) {
    foodRepository.deleteById(id);
  }

  private void validateExistingDescription(String description, Long expectedId) {
    foodRepository
        .findByDescription(description)
        .ifPresent(
            food -> {
              if (expectedId == null || expectedId != food.getId()) {
                throw new ConstraintViolationException("Food description already exists", Set.of());
              }
            });
  }

  private static Food requestIntoEntity(FoodCreateEditRequest request, Food food) {
    food.setDescription(request.getDescription());
    food.setKcal(formatBigDecimal(request.getKcal()));
    food.setProtein(formatBigDecimal(request.getProtein()));
    food.setFat(formatBigDecimal(request.getFat()));
    food.setCarbs(formatBigDecimal(request.getCarbs()));
    return food;
  }

  private static BigDecimal formatBigDecimal(BigDecimal decimal) {
    return Optional.ofNullable(decimal)
        .map(DECIMAL_FORMATTER::format)
        .map(BigDecimal::new)
        .orElse(null);
  }
}

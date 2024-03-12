package bg.pufmi.foodlookup.food.service;

import bg.pufmi.foodlookup.food.model.Food;
import bg.pufmi.foodlookup.food.model.FoodCreateEditRequest;
import bg.pufmi.foodlookup.food.model.FoodSearchCriteria;
import java.util.List;

public interface FoodService {

  Food create(FoodCreateEditRequest request);

  Food getById(Long id);

  List<Food> search(FoodSearchCriteria criteria);

  Food update(Long id, FoodCreateEditRequest request);

  void delete(Long id);
}

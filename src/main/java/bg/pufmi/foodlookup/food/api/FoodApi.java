package bg.pufmi.foodlookup.food.api;

import static bg.pufmi.foodlookup.utils.PublicIdUtils.decode;
import static lombok.AccessLevel.PRIVATE;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

import bg.pufmi.foodlookup.food.model.FoodCreateEditRequest;
import bg.pufmi.foodlookup.food.model.FoodSearchCriteria;
import bg.pufmi.foodlookup.food.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/foods")
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class FoodApi {

  FoodService foodService;
  FoodModelAssembler foodModelAssembler;

  @PostMapping
  @ResponseStatus(CREATED)
  public FoodModel create(@RequestBody @Valid final FoodCreateEditRequest request) {
    return foodModelAssembler.toModel(foodService.create(request));
  }

  @GetMapping("/{foodId}")
  @ResponseStatus(OK)
  public FoodModel getById(@PathVariable final String foodId) {
    return foodModelAssembler.toModel(foodService.getById(decode(foodId)));
  }

  @GetMapping
  @ResponseStatus(OK)
  public CollectionModel<FoodModel> getByCriteria(final FoodSearchCriteria criteria) {
    return foodModelAssembler.toCollectionModel(foodService.search(criteria));
  }

  @PutMapping("/{foodId}")
  @ResponseStatus(OK)
  public FoodModel update(
      @PathVariable final String foodId, @RequestBody @Valid final FoodCreateEditRequest request) {
    return foodModelAssembler.toModel(foodService.update(decode(foodId), request));
  }

  @DeleteMapping("/{foodId}")
  @ResponseStatus(NO_CONTENT)
  public ResponseEntity<Void> delete(@PathVariable final String foodId) {
    foodService.delete(decode(foodId));
    return ResponseEntity.noContent().build();
  }
}

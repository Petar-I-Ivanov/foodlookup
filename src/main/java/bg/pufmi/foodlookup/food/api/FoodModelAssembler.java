package bg.pufmi.foodlookup.food.api;

import static bg.pufmi.foodlookup.common.publicid.PublicIdUtils.encode;
import static bg.pufmi.foodlookup.utils.SecurityUtils.isAuthenticated;
import static lombok.AccessLevel.PRIVATE;
import static org.springframework.hateoas.server.core.DummyInvocationUtils.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

import bg.pufmi.foodlookup.food.model.Food;
import lombok.experimental.FieldDefaults;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

@Component
@FieldDefaults(level = PRIVATE)
public class FoodModelAssembler extends RepresentationModelAssemblerSupport<Food, FoodModel> {

  public FoodModelAssembler() {
    super(FoodApi.class, FoodModel.class);
  }

  @Override
  public FoodModel toModel(Food food) {
    var publicId = encode(food.getId());
    return FoodModel.builder()
        .id(publicId)
        .description(food.getDescription())
        .kcal(food.getKcal())
        .protein(food.getProtein())
        .fat(food.getFat())
        .carbs(food.getCarbs())
        .build()
        .addIf(
            isAuthenticated(),
            () -> linkTo(methodOn(FoodApi.class).update(publicId, null)).withRel("update"))
        .addIf(
            isAuthenticated(),
            () -> linkTo(methodOn(FoodApi.class).delete(publicId)).withRel("delete"));
  }

  @Override
  public CollectionModel<FoodModel> toCollectionModel(Iterable<? extends Food> entities) {
    return super.toCollectionModel(entities)
        .addIf(
            isAuthenticated(),
            () -> linkTo(methodOn(FoodApi.class).create(null)).withRel("create"));
  }
}

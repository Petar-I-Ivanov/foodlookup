import { HalLink } from "hateoas-hal-types";

interface Food {
  id: string;
  description: string;
  kcal?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  _links: {
    update: HalLink;
    delete: HalLink;
  };
}

export default Food;

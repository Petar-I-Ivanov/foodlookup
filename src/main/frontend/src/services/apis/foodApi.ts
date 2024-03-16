import useSWR, { mutate } from "swr";
import { HalLink } from "hateoas-hal-types";
import fetchClient, { stringifyUrl } from "../fetcher";
import Food from "../../models/food/Food";
import FoodCreateEdit from "../../models/food/FoodCreateEdit";
import FoodSearchCriteria from "../../models/food/FoodSearchCriteria";

const baseUrl = "/api/v1/foods";

export const createFood = async (url: string, food: FoodCreateEdit) =>
  await fetchClient
    .post(url, { body: JSON.stringify(food) })
    .then(() => mutate(baseUrl));

export const useFoodById = (foodId: string) => useSWR(`${baseUrl}/${foodId}`);

export const useFoodsByCriteria = (criteria: FoodSearchCriteria) => {
  const { data, error, isLoading } = useSWR(stringifyUrl(baseUrl, criteria));
  return {
    data: data?._embedded?.foods as Food[],
    links: data?._links as { create?: HalLink },
    isLoading,
    error,
  };
};

export const updateFood = async (oldFood: Food, newFood: FoodCreateEdit) =>
  oldFood._links?.update?.href &&
  (await fetchClient
    .put(oldFood._links?.update?.href, {
      body: JSON.stringify(newFood),
    })
    .then(() => mutate(baseUrl)));

export const deleteFood = async (food: Food) =>
  food._links?.delete?.href &&
  (await fetchClient
    .delete(food._links?.delete?.href)
    .then(() => mutate(baseUrl)));

import useSWR from "swr";
import { HalLink } from "hateoas-hal-types";
import fetchClient, { stringifyUrl } from "../base-fetch/fetcher";
import Food from "../../models/food/Food";
import FoodCreateEdit from "../../models/food/FoodCreateEdit";
import FoodSearchCriteria from "../../models/food/FoodSearchCriteria";

const baseUrl = "/api/v1/foods";

const reloadFoods = (
  matchMutate: (matcher: RegExp, ...args: any[]) => Promise<any[]>
) => matchMutate(new RegExp(baseUrl));

export const createFood = async (
  url: string,
  food: FoodCreateEdit,
  matchMutate: (matcher: RegExp, ...args: any[]) => Promise<any[]>
) =>
  await fetchClient
    .post(url, { body: JSON.stringify(food) })
    .then(() => reloadFoods(matchMutate));

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

export const updateFood = async (
  oldFood: Food,
  newFood: FoodCreateEdit,
  matchMutate: (matcher: RegExp, ...args: any[]) => Promise<any[]>
) =>
  oldFood._links?.update?.href &&
  (await fetchClient
    .put(oldFood._links?.update?.href, {
      body: JSON.stringify(newFood),
    })
    .then(() => reloadFoods(matchMutate)));

export const deleteFood = async (
  food: Food,
  matchMutate: (matcher: RegExp, ...args: any[]) => Promise<any[]>
) =>
  food._links?.delete?.href &&
  (await fetchClient
    .delete(food._links?.delete?.href)
    .then(() => reloadFoods(matchMutate)));

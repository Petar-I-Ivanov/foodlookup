import { useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import {
  createFood,
  deleteFood,
  updateFood,
  useFoodsByCriteria,
} from "../services/apis/foodApi";
import useMatchMutate from "../services/base-fetch/useMatchMutate";
import Food from "../models/food/Food";
import FoodSearchCriteria from "../models/food/FoodSearchCriteria";
import FoodTable from "../components/FoodTable";
import FoodCreateEditModal from "../components/FoodCreateEditModal";
import "./HomePage.css";

const HomePage = () => {
  const methods = useForm<FoodSearchCriteria>();
  const { data: foods, links } = useFoodsByCriteria({
    description: methods.watch("description"),
  });

  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [modalProps, setModalProps] = useState<
    { food?: Food; show: boolean } | undefined
  >();

  const mutate = useMatchMutate();

  return (
    <FormProvider {...methods}>
      <div className="HomePage-Wrapper">
        {links?.create && (
          <div className="AddFood-Wrapper">
            <Button
              variant="primary"
              onClick={() => setModalProps({ show: true })}
            >
              Add food
            </Button>
          </div>
        )}

        <FoodTable
          foods={selectedFoods}
          onClick={(food: Food) =>
            setSelectedFoods((prev) =>
              prev.filter((prevFood) => prevFood.id !== food.id)
            )
          }
          isSelected
        />
        <FoodTable
          foods={foods?.filter(
            (food) =>
              !selectedFoods
                .map((selectedFood) => selectedFood.id)
                .includes(food.id)
          )}
          onClick={(food) => setSelectedFoods((prev) => [food, ...prev])}
          onUpdate={(food) => setModalProps({ food: food, show: true })}
          onDelete={(food) =>
            deleteFood(food, mutate)
              .then(() => toast.success("Successfully deleted food"))
              .catch((e) => {
                console.log(e);
                toast.error(e?.error?.message || e?.message || "Error occured");
              })
          }
          isSelected={false}
        />

        {modalProps?.show && (
          <FoodCreateEditModal
            onSubmit={(food) =>
              (modalProps.food
                ? updateFood(modalProps.food, food, mutate)
                : createFood(links.create?.href || "", food, mutate)
              )
                .then(() =>
                  toast.success(
                    `Successfully ${
                      modalProps.food ? "updated" : "created"
                    } food!`
                  )
                )
                .catch(async (e) => {
                  console.log(e);
                  toast.error(
                    e?.error?.message || e?.message || "Error occured"
                  );
                })
                .finally(() => setModalProps(undefined))
            }
            onClose={() => setModalProps(undefined)}
            food={modalProps.food}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default HomePage;

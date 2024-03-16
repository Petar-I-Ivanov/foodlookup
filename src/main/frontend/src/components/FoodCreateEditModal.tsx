import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Food from "../models/food/Food";
import FoodCreateEdit from "../models/food/FoodCreateEdit";

const FoodCreateEditModal: React.FC<{
  onSubmit: (food: FoodCreateEdit) => void;
  onClose: () => void;
  food?: Food;
}> = ({ onSubmit, onClose, food }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodCreateEdit>({ mode: "onChange", defaultValues: food });

  return (
    <Modal show>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          {food ? `Update "${food.description}" food` : "Create food"}
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              {...register("description", {
                required: "This field is required!",
                maxLength: {
                  value: 250,
                  message: "This field cannot be more than 250 symbols!",
                },
              })}
            />
            {errors.description?.message && (
              <Form.Text className="text-muted">
                {errors.description.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Kcal</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              {...register("kcal", {
                min: {
                  value: 0.01,
                  message: "This field should be more than 0.00!",
                },
              })}
            />
            {errors.kcal?.message && (
              <Form.Text className="text-muted">
                {errors.kcal.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Protein</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step={0.01}
                {...register("protein", {
                  min: {
                    value: 0.01,
                    message: "This field should be more than 0.00!",
                  },
                })}
              />
              <InputGroupText>grams</InputGroupText>
            </InputGroup>
            {errors.protein?.message && (
              <Form.Text className="text-muted">
                {errors.protein.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Fat</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step={0.01}
                {...register("fat", {
                  min: {
                    value: 0.01,
                    message: "This field should be more than 0.00!",
                  },
                })}
              />
              <InputGroupText>grams</InputGroupText>
            </InputGroup>
            {errors.fat?.message && (
              <Form.Text className="text-muted">{errors.fat.message}</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Carbs</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step={0.01}
                {...register("carbs", {
                  min: {
                    value: 0.01,
                    message: "This field should be more than 0.00!",
                  },
                })}
              />
              <InputGroupText>grams</InputGroupText>
            </InputGroup>
            {errors.carbs?.message && (
              <Form.Text className="text-muted">
                {errors.carbs.message}
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FoodCreateEditModal;

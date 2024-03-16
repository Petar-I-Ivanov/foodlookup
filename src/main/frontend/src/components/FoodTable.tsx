import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import Food from "../models/food/Food";
import FoodSearchCriteria from "../models/food/FoodSearchCriteria";
import Highlighted from "./Highlighted";

const FoodTable: React.FC<{
  foods?: Food[];
  onUpdate?: (food: Food) => void;
  onDelete?: (food: Food) => void;
  onClick: (food: Food) => void;
  isSelected: boolean;
}> = ({ foods, onUpdate, onDelete, onClick, isSelected }) => {
  const { watch, register } = useFormContext<FoodSearchCriteria>();
  const hasActions = !!(onUpdate || onDelete);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={hasActions ? 6 : 5}>
              {isSelected ? (
                "Selected foods"
              ) : (
                <Form.Control
                  type="text"
                  placeholder="Search by description"
                  {...register("description")}
                />
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Kcal</TableCell>
            <TableCell>Protein (g)</TableCell>
            <TableCell>Fat (g)</TableCell>
            <TableCell>Carbs (g)</TableCell>
            <>{hasActions && <TableCell>Actions</TableCell>}</>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods?.map((food) => (
            <TableRow onClick={() => onClick(food)}>
              <TableCell>
                <Highlighted
                  text={food.description}
                  highlight={watch("description")}
                />
              </TableCell>
              <TableCell>{food?.kcal}</TableCell>
              <TableCell>{food?.protein}</TableCell>
              <TableCell>{food?.fat}</TableCell>
              <TableCell>{food?.carbs}</TableCell>
              <>
                {hasActions && (
                  <TableCell>
                    <ButtonGroup onClick={(e) => e.stopPropagation()}>
                      {onUpdate && (
                        <Button
                          variant="warning"
                          onClick={() => onUpdate(food)}
                        >
                          Update
                        </Button>
                      )}
                      {onDelete && (
                        <Button variant="danger" onClick={() => onDelete(food)}>
                          Delete
                        </Button>
                      )}
                    </ButtonGroup>
                  </TableCell>
                )}
              </>
            </TableRow>
          ))}
        </TableBody>
        {isSelected && foods && (
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{calc(foods, "kcal")}</TableCell>
              <TableCell>{calc(foods, "protein")}</TableCell>
              <TableCell>{calc(foods, "fat")}</TableCell>
              <TableCell>{calc(foods, "carbs")}</TableCell>
              {hasActions && <TableCell></TableCell>}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

const calc = (foods: Food[], key: keyof Food) =>
  Number(
    foods
      .reduce(
        (acc: number, food: Food) =>
          typeof food[key] === "number" && food[key] !== undefined
            ? acc + (food[key] as number)
            : NaN,
        0
      )
      .toFixed(2)
  );

export default FoodTable;

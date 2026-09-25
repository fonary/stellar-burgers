import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { removeIngredients, setIngredients } from '@slices';
import { selectConstructorIngredients } from '@selectors';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(selectConstructorIngredients);

    const handleMoveUp = () => {
      if (index === 0) return;
      const newIngredients = [...ingredients];
      [newIngredients[index - 1], newIngredients[index]] = [
        newIngredients[index],
        newIngredients[index - 1]
      ];
      dispatch(setIngredients(newIngredients));
    };

    const handleMoveDown = () => {
      if (index === ingredients.length - 1) return;
      const newIngredients = [...ingredients];
      [newIngredients[index], newIngredients[index + 1]] = [
        newIngredients[index + 1],
        newIngredients[index]
      ];
      dispatch(setIngredients(newIngredients));
    };

    const handleClose = () => {
      dispatch(removeIngredients(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

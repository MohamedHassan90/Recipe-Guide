import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new EventEmitter<number>();  // This event will emit once we click on an item to edit it

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];

  getIngredients() {
    // we can use a quick solution which is removing the slice() part
    // Or implement and an EventEmitter and listen to it in the Shopping list component.
    return this.ingredients.slice();
  }

  getIngredient(index: number) {  // This method is used to return back 1 ingredient of specific index (needed while editing an item)
    return this.ingredients[index];
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {  // This method is used when we updated an item.
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.emit(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientChanged.emit(this.ingredients);
  }
}

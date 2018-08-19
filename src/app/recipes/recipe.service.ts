import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {

  recipesChanges = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super tasty Schnitzel - Just Awesome',
      'https://lh3.googleusercontent.com/W13ceIzN8LAhfgQXnLQ2zMdur6akuYiima8B9VDzpiYvzE-XW2R0OqXOzjuvn2Ii9QKr8GGXxjq1LUafxQcDl5xTg3Zt-gDFJidFTK4=w600-l68',
       [new Ingredient('FriedChicken', 1), new Ingredient('lemon', 4)]
    ),
    new Recipe(
      'A Big Fat Burger',
      'A delicious Burger, this is all what you need!!',
      'https://i.amz.mshcdn.com/CJ_trgOS3CWBl7DzOTxuDYXa8u0=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F635122%2F0cc0ff70-8122-4536-91ae-fdcbc2b495ef.jpg',
      [new Ingredient('Buns', 2), new Ingredient('meat', 1)]
    )
  ];

  getRecipes() {
    // .slice() below returns a exact copy of the recipes (not the reference of the recipes[], so no one can change the Recipe
    // array here in the service)
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.emit(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.emit(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.emit(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.emit(this.recipes.slice());
  }
}

import { Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shoppingList.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDisplay: Recipe;
  id: number;

  constructor(private slService: ShoppingListService, private route: ActivatedRoute,
              private  recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id']; // This is a static approach
    this.route.params.subscribe(   // Dynamic approach, listening to any id in the route link and react to a new id
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDisplay = this.recipeService.getRecipe(this.id);   // Now if we enter URL: localhost:4200/recipes/0, the first item will be loaded on the right
      });
  }

  onAddToShoppingList(){
    for (let i = 0 ; i < this.recipeDisplay.ingredients.length; i++) {
      this.slService.onIngredientAdded(this.recipeDisplay.ingredients[i]);
    }
  }

  onEditRecipe(){
      this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

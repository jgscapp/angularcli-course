import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // recipeSelected = new EventEmitter<Recipe>(); remove after use observables
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
      new Recipe('A test Recipe', 'This is a test',
       'http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg',
      [
        new Ingredient('Chicken', 2),
        new Ingredient('Apples', 5)
      ]),
      new Recipe('A test Recipe2', 'This is a test', 
      'https://www.campbellsoup.co.uk/img/recipes/6-campbells-vegetarian-pizza-recipe.jpg',
      [ new Ingredient('Flower', 1),
      new Ingredient('Corn', 1),
      new Ingredient('Green Pepper', 3),
      new Ingredient('Onion', 1),

]),
      new Recipe('A test Recipe3', 'This is a test', 
      'http://www.mrshappyhomemaker.com/wp-content/uploads/2010/11/tacos3.jpg',
      [ new Ingredient('Tortillas', 10),
      new Ingredient('Avocado', 1),
      new Ingredient('Cilantro', 1),
      new Ingredient('Onion', 1),

])
    ];
  
  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();    //return a new array
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}

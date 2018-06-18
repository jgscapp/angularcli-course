import { Component, OnInit } from '@angular/core';

// import { Recipe } from './recipe.model';  remove after user observable
//import { RecipeService } from './recipe.service'; remove after user observable

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // selectedRecipe: Recipe;  remove after user observable

  // constructor(private recipeService: RecipeService) { }  change after usre observable
  constructor() { }

  ngOnInit() {
    // this.recipeService.recipeSelected
    //     .subscribe(
    //       (recipe: Recipe) => {
    //         this.selectedRecipe = recipe;
    //       }
    //     );   remove after use observables
  }

}

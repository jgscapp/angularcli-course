import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();    remove after add services

  recipes: Recipe[];
  subscription: Subscription
  //move this to the recipe service
  // recipes: Recipe[] = [
  //   new Recipe('A test Recipe', 'This is a test', 'http://s345780157.onlinehome.us/wp-content/uploads/2011/03/Rosh-Hashanah-chicken-with-apples.jpg'),
  //   new Recipe('A test Recipe2', 'This is a test', 'https://www.campbellsoup.co.uk/img/recipes/6-campbells-vegetarian-pizza-recipe.jpg'),
  //   new Recipe('A test Recipe3', 'This is a test', 'http://www.mrshappyhomemaker.com/wp-content/uploads/2010/11/tacos3.jpg')
  // ];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
       .subscribe(
         (recipes: Recipe[]) => {
           this.recipes = recipes;
         }
       );
    this.recipes = this.recipeService.getRecipes();
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  
  // onRecipeSelected(recipe: Recipe ) {
  //   this.recipeWasSelected.emit(recipe);
  // }   remove after add services

}

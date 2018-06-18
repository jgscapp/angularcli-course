import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe: Recipe; change after add rotuing
  recipe: Recipe;
  id: number;

  constructor(private recipeServices: RecipeService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
   //get the id from the recipe selected
  // const id = this.route.snapshot.params['id'];   //this will only work for the first time we load the detail component
  // this.recipe = this.recipeServices.getRecipe(id);
  this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeServices.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeServices.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
     this.router.navigate(['edit'], {relativeTo: this.route});
//     this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});  this is another way to navigate
  }

  onDeleteRecipe() {
    this.recipeServices.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }  
}

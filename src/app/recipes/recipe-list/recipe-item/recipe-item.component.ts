import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';  remove after add roiting

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  // @Output() recipeSelected = new EventEmitter<void>();    remove after add services

  // constructor(private recipeService: RecipeService) { } remove after add routing

  ngOnInit() {
  }

  // onSelected() {
  //   // this.recipeSelected.emit();   remove after add services
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }  remove after add routing


}

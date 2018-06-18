import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

// ingredientsChanged = new EventEmitter<Ingredient[]>();     //create an event to refresh the copy (slice()) of the ingredients when add a new ingredient
ingredientsChanged = new Subject<Ingredient[]>();     //change to user observable, subject

//add after use driven form
startedEditing = new Subject<number>();

private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ];  
  

  constructor() { }

 getIngredients() {
   return this.ingredients.slice();  //return a copy of the ingredients
 }

 //add after use driven forms
 getIngredient(index: number) {
   return this.ingredients[index];
 }

 addIngredient(ingredient: Ingredient) {
  this.ingredients.push(ingredient);
  this.ingredientsChanged.next(this.ingredients.slice());   // change to use observable
  // this.ingredientsChanged.emit(this.ingredients.slice());   // refresh the copy of ingredients with the new ingredient
}

addIngredients(ingredients: Ingredient[]) {
  //for (let ingredient of ingredients) {
  //  this.addIngredient(ingredient)
  //}
  this.ingredients.push(...ingredients);     //spread operator "..."  turn array or element into a list of elements
  this.ingredientsChanged.next(this.ingredients.slice());
  // this.ingredientsChanged.emit(this.ingredients.slice());  change to user observable
  }

 updateIngredient(index: number, newIngredient: Ingredient) {
   this.ingredients[index] = newIngredient;
   this.ingredientsChanged.next(this.ingredients.slice());
 }

 deleteIngredient(index: number) {
  this.ingredients.splice(index,1);
  this.ingredientsChanged.next(this.ingredients.slice());
}

}






import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { map } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer afklskjshlf');
      //user put to overwrite the data in my database in Firebase
    // return this.http.put('https://ng-recipe-book-8d328.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(),
    //  {observe: 'body',
    //   headers: headers});
   
    // return this.http.put('https://ng-recipe-book-8d328.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //   {observe: 'body',
    //    params: new HttpParams().set('auth', token)});

       //another way to send a request
    //    const req = new HttpRequest('PUT','https://ng-recipe-book-8d328.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //       {reportProgress: true, params: new HttpParams().set('auth', token)})
    //       return this.http.request(req);

    //using interceptor
       const req = new HttpRequest('PUT','https://ng-recipe-book-8d328.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
          {reportProgress: true})
          return this.http.request(req);
   }

 getRecipes() {

    const token = this.authService.getToken();

    // this code works ok, but if you don't have ingredients, firebase will crate the data without ingredients
    //   this.http.get('https://ng-recipe-book-8d328.firebaseio.com/recipes.json')
    //      .subscribe(
    //          (response: Response) => {
    //              const recipes: Recipe[] = response.json();
    //              this.recipeService.setRecipes(recipes);
    //          }
    //      );

    //replace the code above with this one,  this will use map to ensure that we will have the property ingredients even if it is empty
//         this.http.get<Recipe[]>('https://ng-recipe-book-8d328.firebaseio.com/recipes.json?auth=' + token,
     
       //using interceptor
       this.http.get<Recipe[]>('https://ng-recipe-book-8d328.firebaseio.com/recipes.json',
            { observe: 'body', responseType: 'json'})
           .pipe(
               map(
                (recipes) => {
                 for (let recipe of recipes) {
                  if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];   //if no ingredients add the ingredient property witn an empty array
                }
            }
            return recipes;
        }
    ))
    .subscribe(
        (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        }
    );
}


}
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;  //add after use driven form
  subscription: Subscription;  //add after use driven form
  editMode = false;  //add after use driven form
  editedItemIndex: number;  //add after use driven form
  editedItem: Ingredient;  //add after use driven form

  // @ViewChild('nameInput') nameInputRef: ElementRef;  remove after add driven form
  // @ViewChild('amountInput') amountInputRef: ElementRef; remove after add driven form
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();  remove afer add services

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // added after use driven forms
    this.subscription = this.slService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.slService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }
        );
  }

  // onAddItem() { change after add driven form
  onSubmit(form: NgForm) {
    const value = form.value;   //add after add driven form
    // const ingName = this.nameInputRef.nativeElement.value;  remove after add driven form
    // const ingAmount = this.amountInputRef.nativeElement.value; remove after add driven form
    // const newIngredient = new Ingredient(ingName, ingAmount);  change after add driven form
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);   remove after add services
    
    if (this.editMode) {
       this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shoppingList.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;  // Referencing our form so that we can access its Controls.
  editMode = false; // This property will be used to check if we are adding a new item or editing an existing one.
  editedItemIndex: number; // To store the index of the item we are editing.
  editedItem: Ingredient; // Storing the item itself we are editing now.

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing.subscribe(  // Here I am listening to the event emitted when we clicked on an item,
      (index: number) => {               // We will receive the index number of the item, set the editMode to true,
          this.editMode = true;                         // and store the index of the item we are editing, and retrieve the item itself we are editing
          this.editedItemIndex = index;                 // With that information we will load the item we want to edit.
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({        // Loading the item up to the Form
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
      }
    );
  }

  onAddItem(form: NgForm) {
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      } else {
        this.shoppingListService.onIngredientAdded(newIngredient);
      }
      this.editMode = false;
      form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}

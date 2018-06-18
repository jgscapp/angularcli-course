import { Component, Output, EventEmitter } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: "app-header",
    templateUrl: './header.component.html' 
})

export class HeaderComponent{
//  @Output() featureSelected = new EventEmitter<string>();  remove after add routing

//  onSelect(feature: string) {
//      this.featureSelected.emit(feature);
//  }  remove after add routing

 constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

 onSaveData() {
     this.dataStorageService.storeRecipes()
        .subscribe(
            (response) => {
                console.log(response);
            }
        );
 }

  onFetchData() {
      this.dataStorageService.getRecipes();
  }

  onLogout() {
      this.authService.logout();
  }


}
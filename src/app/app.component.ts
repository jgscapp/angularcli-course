import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
     firebase.initializeApp({
      apiKey: "AIzaSyBJM2Uh52cNq42P16n-4e72D5r75mVDJ9w",
      authDomain: "ng-recipe-book-8d328.firebaseapp.com",
     });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

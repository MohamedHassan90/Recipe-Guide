import {Component, OnInit} from '@angular/core';
import * as fireBase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //loadedFeature = 'recipe';

  onNavigate(feature:string){
    //this.loadedFeature = feature;
  }

  ngOnInit() {
    fireBase.initializeApp({
      apiKey: 'AIzaSyCC18buKgywmKROHjMwGNqWXcFDBXn5hpQ',
      authDomain: 'ng-recipe-book-d9642.firebaseapp.com'
    });
  }
}

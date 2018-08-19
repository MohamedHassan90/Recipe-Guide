import * as fireBase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor( private router: Router) {}

  signUpUser(email: string, password: string) {
    fireBase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => alert('Success: Your email is registered successfully'))
      .then( response => this.router.navigate(['/signIn']))
      .catch(error => alert(error));
  }

  signInUser(email: string, password: string) {
    fireBase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => fireBase.auth().currentUser.getIdToken()
          .then((token: string) => this.token = token)
      ).then(response => this.router.navigate(['/recipes']))
      .catch(
        error => alert('Error: Invalid email or password, Please try again!')
      );
  }

  logout() {
    fireBase.auth().signOut();
    this.token = null;
    this.router.navigate(['/recipes']);
  }

  getToken() {
    fireBase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') form: NgForm; // Capturing the form

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signInUser(email, password);
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') form: NgForm; // Capturing the form

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signUpUser(email, password);
  }

}

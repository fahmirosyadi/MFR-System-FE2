import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(public cs: CommonService) { }

  ngOnInit(): void {
  }

  login(): void {
    // Login logic here
    console.log(this.loginForm.value);
    this.cs.login(this.loginForm.value);
  }
}

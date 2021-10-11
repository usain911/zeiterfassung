import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from '../service/auth.service'
import { Login } from '../shared/login';
import { Mitarbeiter } from '../shared/mitarbeiter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  authForm!: FormGroup;
  isSubmitted  =  false;
  mitarbeiter!: Mitarbeiter;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth')) {
      this.router.navigateByUrl('/dashboard');
    }
    this.initForm();

  }
  private initForm() {
    if (this.authForm) {return;}

    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async signIn(){

    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    const formValue = this.authForm.value;
    const login = {
      ...this.authForm.value
    }
    //console.log(login);

    const newLogin: Login = {
      ...formValue
    }

    let mitarbeiter = await this.authService.signIn(newLogin).toPromise()
    //console.log("ma: "+ this.mitarbeiter.login);

    //console.log("nach");
       if(mitarbeiter.login && mitarbeiter.id) {
      localStorage.setItem('auth', mitarbeiter.id.toString());
      localStorage.setItem('name', mitarbeiter.name)
      if(mitarbeiter.rolle == 1) {
        let rolleE = window.btoa(mitarbeiter.rolle)
        //localStorage.setItem('rolle', mitarbeiter.rolle.toString());
        localStorage.setItem(window.btoa('rolle'), rolleE);
      }
      this.router.navigateByUrl('/dashboard');
    } else {
      alert("Fehler");
    }

  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/AuthRequest';
import { SignUpUserRequest } from 'src/app/models/interfaces/SignUpUserRequest';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  toggleForm = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService, private messageService: MessageService, private router: Router){}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['']
  });

  signupForm = this.formBuilder.group({
    name: [''],
    email: ['', Validators.required],
    password: ['']
  });

  onSubmitLogin(): void{

    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set("token", response.token);
            this.router.navigate(['/dashboard']);
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário autenticado com sucesso!', life: 2000});
            console.log(response);
          }
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: `${error.error.error}`})
        }
      })
    }

    console.log("Formulário enviado!", this.loginForm);
  }

  onSubmitSignUp(): void{

    if(this.signupForm.value && this.signupForm.valid){
      this.userService.createUser(this.signupForm.value as SignUpUserRequest).subscribe({
        next: (response) => {
          if(response){
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso!'});
            this.toggleForm = !this.toggleForm;
            console.log(response);
          }
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Erro', detail: `${error.error.error}`});
          console.log(error);
        }
      })
    }

    console.log("Formulário enviado!", this.signupForm);
  }

}

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/AuthRequest';
import { SignUpUserRequest } from 'src/app/models/interfaces/user/SignUpUserRequest';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

  ngDestroy$ = new Subject<void>();

  toggleForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router){}

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
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .pipe(takeUntil(this.ngDestroy$))//takeUntil vai concluir o fluxo quando o nosso Subject for concluído
      //Dizemos que vamos cancelar automaticamente a nossa inscrição nesse observable quando o componente for destruído, garantindo que não ocorram vazamentos de memória indesejados ou comportamentos inesperados
      .subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set("token", response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário autenticado com sucesso!'});
            
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
      this.userService.createUser(this.signupForm.value as SignUpUserRequest)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe({
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
  

  ngOnDestroy(): void {
    this.ngDestroy$.next(); //Quando o componente é destruído, o ngDestroy emitirá um valor e se desinscreverá de suas inscrições
    this.ngDestroy$.complete();  //Completamos nosso Subject
  }

}

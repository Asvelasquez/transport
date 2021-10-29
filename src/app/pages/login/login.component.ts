import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import {LoginService}from 'src/app/_service/login.service'
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User}from  '../../_model/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  resultadoHija: number;
  username: string;
  password: string;
  formul: FormGroup;
    hide = true;
  private usuarioL = new User;
  constructor(private progressBarService: ProgressBarService,
     private loginService:LoginService, 
     private formBuilder: FormBuilder, 
     private router: Router) { }

   ngOnInit():void {
    this.buildFrom();
     /*
    this.progressBarService.progressBarReactiva.next(false);
    this.loginService.login('admin','123456').subscribe(data =>{
     console.log(data);
     sessionStorage.setItem(environment.TOKEN, data.access_token);
    
   })
 */
  
    this.progressBarService.progressBarReactiva.next(true);
  }

  private buildFrom() {
    
    this.formul = this.formBuilder.group({    
      username: [this.usuarioL.username, [Validators.required,Validators.maxLength(15), Validators.minLength(3)]],
      password: [this.usuarioL.password, [Validators.required,Validators.minLength(4), Validators.maxLength(15)]],
    });
  }

  ingresar(event: Event){
    this.usuarioL = this.formul.value;
    this.username = this.usuarioL.username;
    this.password = this.usuarioL.password;
     this.loginService.login(this.username,this.password).subscribe(data =>{
      console.log(data);
     
      

      sessionStorage.setItem(environment.TOKEN, data.access_token);
      
      this.router.navigate(['']);
    }, err => {
      
        
    }) 
  }
}

import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from 'src/app/_service/progress-bar.service';
import { LoginService } from './_service/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagProgressBar: boolean =  true;
  public flagSesion: boolean = false;
  constructor(private progressBarService: ProgressBarService, private loginService: LoginService,){

  }
  ngOnInit(): void{
    this.progressBarService.progressBarReactiva.subscribe(data =>{
      this.flagProgressBar = data;
    });
  }
  logeo(){
    this.flagSesion = this.loginService.estaLogueado();

    console.log(this.flagSesion);
  }
  cerrarSession(){
    this.loginService.cerrarSesion();
  }
}

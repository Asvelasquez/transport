import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, retry } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProgressBarService } from '../_service/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  
  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private progressBarService: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(environment.REINTENTOS)).
    pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((err) => {
        this.progressBarService.progressBarReactiva.next(true);
          console.log(err);
          if (err.status === 400 && err.error.error_description === "Bad credentials"){
            this.openSnackBar('username o contraseña incorrectos');
          }else if (err.status === 401 && err.error.error_description === "----Nick o password incorecto"){
            this.openSnackBar('username o contraseña incorrecta');
          }else if (err.error.status === 400 && err.error.message === "----Placa ya se encuentra registrada.") {
            this.openSnackBar('Placa ya se encuentra registrada');
          } else if(err.status == 401) {
            this.router.navigate(['/nopermiso']);
          } else if(err.error.status == 404) {
                this.openSnackBar(err.error.message);
                
          } else if(err.error.status == 405) {
                this.router.navigate(['notAllowed']);
                this.openSnackBar(err.error.message);
              
          } else if(err.error.status == 415) {
                this.openSnackBar(err.error.message);
                
          } else  if(err.error.status == 500) {
                this.router.navigate(['/error']);
              
          }
         
          console.log("entro al interceptor");
          return EMPTY;
    }));

  }

  private openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
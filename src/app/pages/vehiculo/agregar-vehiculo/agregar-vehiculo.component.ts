import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {
form: FormGroup;
vehi: Vehiculo = new Vehiculo();
Tipo : string;
Marca : string;
vehiculo: any;

  constructor(private VehService: VehiculoService, 
              private formBuilder: FormBuilder, 
              public errorInterceptor: ErrorInterceptorService, 
              private router: Router, 
              public route: ActivatedRoute,
              private progressBarService: ProgressBarService) {
      this.buildForm();
    }
    private buildForm(): void{
      this.form = this.formBuilder.group(
        {
          idVehiculo: ['', []],
          placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
          marca: ['', [Validators.required]],
          modelo: ['', [Validators.required, Validators.min(1980), Validators.max(2021)]],
          tipoVehiculo: ['', [Validators.required]],
          capacidad: ['', [Validators.required]],
        });
  
    }
   ngOnInit() {
    this.progressBarService.progressBarReactiva.next(false);
   
    this.progressBarService.progressBarReactiva.next(true);
  }

  nuevoVehiculo(event: Event): void{
    event.preventDefault();

    const vehiculo: Vehiculo = new Vehiculo();

    vehiculo.placa = this.form.value.placa;
    vehiculo.marca = this.form.value.marca;
    vehiculo.modelo = this.form.value.modelo;
    vehiculo.tipoVehiuclo = this.form.value.tipoVehiculo;
    vehiculo.capacidad = this.form.value.capacidad;

    if (this.form.valid)
    {
      this.VehService.guardar(vehiculo).subscribe(success => {
        console.log(success);
        this.form.reset();
        this.router.navigate(['/vehiculo']);
      }, err => {
        console.log(err);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  
  
}

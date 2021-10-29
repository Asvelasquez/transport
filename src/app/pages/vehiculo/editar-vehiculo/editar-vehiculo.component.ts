import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';

@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
  styleUrls: ['./editar-vehiculo.component.css']
})
export class EditarVehiculoComponent implements OnInit {
  public Tipo: any;
  public Marca: string;

  form: FormGroup;

  vehicle: Vehiculo = new Vehiculo();

  vehiculo: any;
  constructor(private VehService: VehiculoService, 
    private formBuilder: FormBuilder, 
    public errorInterceptor: ErrorInterceptorService, 
    private router: Router, 
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService) {this.buildForm(); }

    private buildForm(): void{
      this.form = this.formBuilder.group(
        {
          idVehiculo: ['', []],
          placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
          marca: ['', [Validators.required]],
          modelo: ['', [Validators.required, Validators.min(1980), Validators.max(2021)]],
          tipoVehiculo: ['', [Validators.required]],
          capacidad: ['', [Validators.required,Validators.min(100), Validators.max(2000)]],
        });
    
    }
  ngOnInit() {
    this.progressBarService.progressBarReactiva.next(false);
   
    this.route.params.subscribe((params: Params) => {
      let idVehiculo = params.idVehiculo;
      this.cargarVehiculo(idVehiculo);
      this.progressBarService.progressBarReactiva.next(true);
    
  });
}


editarVehiculo(event: Event): void{
  event.preventDefault();

  const vehiculo: Vehiculo = new Vehiculo();

  vehiculo.idVehiculo = this.vehiculo.idVehiculo;
  vehiculo.placa = this.form.value.placa;
  vehiculo.marca = this.form.value.marca;
  vehiculo.modelo = this.form.value.modelo;
  vehiculo.tipoVehiuclo = this.form.value.tipoVehiculo;
  vehiculo.capacidad = this.form.value.capacidad;

  if (this.form.valid)
  {
    this.VehService.editar(vehiculo).subscribe(success => {
      console.log(success);
      this.router.navigate(['/vehiculo']);
      this.form.reset();
    }, err => {
      console.log(err);
    });
  }else{
    this.form.markAllAsTouched();
  }
}

cargarVehiculo(idVehiculo: number): void{
  this.VehService.listar(idVehiculo).subscribe(data => {
    this.vehiculo = data;
    console.log(this.vehiculo.placa);
  });
}

}
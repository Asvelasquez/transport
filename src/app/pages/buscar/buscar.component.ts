import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { DepartamentoService } from '../../_service/departamento.service'

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  //Inyecciones de dependencias o libreias
  constructor(private departamentoService: DepartamentoService,
              private progressBarService: ProgressBarService) { }

  ngOnInit()  {
   this.progressBarService.progressBarReactiva.next(false);
    
    //Iniciar Variables
    //Llamar metodos
    //Logica Inicial

    this.progressBarService.progressBarReactiva.next(true);
  }



}

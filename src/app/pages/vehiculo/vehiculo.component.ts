import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import {FormControl, Validators} from '@angular/forms';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})

export class VehiculoComponent implements  OnInit {
  displayedColumns: string[] = ['placa', 'modelo','marca','tipoVehiuclo','capacidad','editar'];
  dataSource = new MatTableDataSource<Vehiculo>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private vehiculoService: VehiculoService ,
              public route: ActivatedRoute,
              private progressBarService: ProgressBarService) { }
  //paginador
  cantidad : number;
  pageIndex : number = 0;
  pageSize: number = 5;


  ngOnInit() {  
    this.progressBarService.progressBarReactiva.next(false);
   
    this.listarPaginado();
    this.applyFilter;
    this.progressBarService.progressBarReactiva.next(true);
  }
  
  listarPaginado(){
    this.vehiculoService.listarVehiculo(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.cantidad = data.totalElements;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator;
      this.applyFilter;
    });
  }
  cambioPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
    this.applyFilter(e);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 
}

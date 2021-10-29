import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_model/Vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private url: string = `${environment.HOST}/vehiculos`;
  
  constructor(private http: HttpClient) { }

  public guardar(vehiculo: Vehiculo){
      return this.http.post(`${this.url}/guardar`, vehiculo);
  }
  public listarVehiculo(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }
  public listar(id:number) {
    return this.http.get(`${this.url}/listar/`+ id);
  }
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }
}

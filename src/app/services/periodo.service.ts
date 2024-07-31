import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovimientoPeriodoDtoIn, PeriodoDto, PeriodoDtoIn } from '../interfaces/periodo-dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  agregarMovimiento(id: string, movimiento: MovimientoPeriodoDtoIn):Observable<any> {
    return this.httpClient.post<any>(this.url + id +"/Movimientos", movimiento)
  }
  obtenerPorId(id: any): Observable<PeriodoDto> {
    return this.httpClient.get<PeriodoDto>(this.url + id)
  }
  obtener(): Observable<PeriodoDto[]> {
    return this.httpClient.get<PeriodoDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }

  agregar(periodo: PeriodoDtoIn): Observable<any> {
    return this.httpClient.post(this.url, periodo)
  }

  private url = environment.baseUrl + "Periodos/"
}

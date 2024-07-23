import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AhorroDto, AhorroDtoIn, MovimientoDtoIn } from '../interfaces/ahorro-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  obtenerPorId(ahorroId: string):Observable<AhorroDto> {
    return this.httpClient.get<any>(this.url+ ahorroId)
  }
  retirar(ahorroId: string, movimiento: MovimientoDtoIn) : Observable<any> {  
    return this.httpClient.post<any>(this.url+ ahorroId+ "/retiros", movimiento)
  }
  depositar(ahorroId: string, movimiento: MovimientoDtoIn): Observable<any> {  
    return this.httpClient.post<any>(this.url+ ahorroId+ "/depositos", movimiento)
  }
  agregar(ahorro: AhorroDtoIn):Observable<any> {
    return this.httpClient.post<any>(this.url, ahorro)
  }
  private url =  environment.baseUrl + 'Ahorros/'

  constructor(private httpClient: HttpClient) { }

  obtener():Observable<AhorroDto[]>{
    return this.httpClient.get<AhorroDto[]>(this.url)
  }
}

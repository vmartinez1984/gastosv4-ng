import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AhorroDto, AhorroDtoIn } from '../interfaces/ahorro-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  agregar(ahorro: AhorroDtoIn):Observable<any> {
    return this.httpClient.post<any>(this.url, ahorro)
  }
  private url =  environment.baseUrl + 'Ahorros'

  constructor(private httpClient: HttpClient) { }

  obtener():Observable<AhorroDto[]>{
    return this.httpClient.get<AhorroDto[]>(this.url)
  }
}

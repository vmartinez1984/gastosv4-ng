import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TipoDeAhorroDto } from '../interfaces/tipo-de-ahorro-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDeAhorroService {

  private url: string = environment.baseUrl + "TipoDeAhorros/"

  constructor(private httpClient: HttpClient) { }

  obtenerTodos(): Observable<TipoDeAhorroDto[]> {
    return this.httpClient.get<TipoDeAhorroDto[]>(this.url)
  }
}

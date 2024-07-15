import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AhorroDto } from '../interfaces/ahorro-dto';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  private url = 'https://localhost:7049/api/Ahorros'

  constructor(private httpClient: HttpClient) { }

  obtener():Observable<AhorroDto[]>{
    return this.httpClient.get<AhorroDto[]>(this.url)
  }
}

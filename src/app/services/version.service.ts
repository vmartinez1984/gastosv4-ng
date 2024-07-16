import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DetalleDto, VersionDtoIn } from '../interfaces/version-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private url = environment.baseUrl + "Versiones"
  constructor(private httpClient: HttpClient) { }

  agregar(version: VersionDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, version)
  }

  agregarDetalle(id: string, detalle: DetalleDto): Observable<any> {
    return this.httpClient.post<any>(this.url + id + "/detalles", detalle)
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DetalleDto, DetalleDtoIn, VersionDto, VersionDtoIn } from '../interfaces/version-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  actualizarDetalle(id: any, detalle: DetalleDtoIn):Observable<any> {
    return this.httpClient.put<any>(this.url + id + "/detalles", detalle)
  }
  actualizar(guid: string, version: VersionDtoIn): Observable<any> {
    return this.httpClient.put<any>(this.url + guid, version)
  }
  obtenerPorId(id: string): Observable<VersionDto> {
    return this.httpClient.get<VersionDto>(this.url + id)
  }
  obtener(): Observable<VersionDto[]> {
    return this.httpClient.get<VersionDto[]>(this.url)
  }
  private url = environment.baseUrl + "Versiones/"
  constructor(private httpClient: HttpClient) { }

  agregar(version: VersionDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, version)
  }

  agregarDetalle(id: string, detalle: DetalleDto): Observable<any> {
    return this.httpClient.post<any>(this.url + id + "/detalles", detalle)
  }
}

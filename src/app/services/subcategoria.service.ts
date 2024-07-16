import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcategoriaDto, SubcategoriaDtoIn } from '../interfaces/subcategoria-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  actualizar(id: string, subcategoria: SubcategoriaDtoIn):Observable<any> {
    return this.httpClient.put<any>(this.url + id, subcategoria)
  }
  obtener(id: string):Observable<SubcategoriaDto>{
    return this.httpClient.get<SubcategoriaDto>(this.url + id)
  }

  agregar(subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, subcategoria)
  }

  private url: string = environment.baseUrl + "Subcategorias/"

  constructor(private httpClient: HttpClient) { }

  obtenerTodos(): Observable<SubcategoriaDto[]> {
    return this.httpClient.get<SubcategoriaDto[]>(this.url)
  }
}

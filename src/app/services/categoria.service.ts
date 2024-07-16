import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDto } from '../interfaces/categoria-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = environment.baseUrl + 'Categorias'

  constructor(private httpClient: HttpClient){
  }

  obtenerTodos():Observable<CategoriaDto[]>{
    return this.httpClient.get<CategoriaDto[]>(this.url)
  }
  
}

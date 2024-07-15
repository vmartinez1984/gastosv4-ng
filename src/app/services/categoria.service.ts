import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDto } from '../interfaces/categoria-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = 'https://localhost:7049/api/Categorias'

  constructor(private httpClient: HttpClient){
  }

  obtenerTodos():Observable<CategoriaDto[]>{
    return this.httpClient.get<CategoriaDto[]>(this.url)
  }
  
}

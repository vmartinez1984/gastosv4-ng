import { Injectable } from '@angular/core';
import { SubcategoriaService } from './subcategoria.service';
import { HttpClient } from '@angular/common/http';
import { CategoriaService } from './categoria.service';
import { AhorroService } from './ahorro.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  subcategoria :SubcategoriaService
  categoria: CategoriaService
  ahorro: AhorroService

  constructor(private httpClient:HttpClient) { 
    this.subcategoria = new SubcategoriaService(this.httpClient)
    this.categoria = new CategoriaService(this.httpClient)
    this.ahorro = new AhorroService(this.httpClient)
  }
}

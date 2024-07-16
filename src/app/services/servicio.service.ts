import { Injectable } from '@angular/core';
import { SubcategoriaService } from './subcategoria.service';
import { HttpClient } from '@angular/common/http';
import { CategoriaService } from './categoria.service';
import { AhorroService } from './ahorro.service';
import { TipoDeAhorroService } from './tipo-de-ahorro.service';
import { VersionService } from './version.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  subcategoria :SubcategoriaService
  categoria: CategoriaService
  ahorro: AhorroService
  tipoDeAhorro: TipoDeAhorroService
  version: VersionService

  constructor(private httpClient:HttpClient) { 
    this.subcategoria = new SubcategoriaService(this.httpClient)
    this.categoria = new CategoriaService(this.httpClient)
    this.ahorro = new AhorroService(this.httpClient)
    this.tipoDeAhorro = new TipoDeAhorroService(this.httpClient)
    this.version = new VersionService(this.httpClient)
  }
}

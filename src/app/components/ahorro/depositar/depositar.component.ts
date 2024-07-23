import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovimientoDtoIn } from '../../../interfaces/ahorro-dto';
import { ServicioService } from '../../../services/servicio.service';
import { FormularioDeMovimientoComponent } from "../formulario-de-movimiento/formulario-de-movimiento.component";

@Component({
  selector: 'app-depositar',
  standalone: true,
  imports: [ReactiveFormsModule, FormularioDeMovimientoComponent, RouterLink],
  templateUrl: './depositar.component.html',
  styleUrl: './depositar.component.css'
})
export class DepositarComponent {
  formGroup: any
  ahorroId: string =''

  constructor(
    private formBuilder: FormBuilder, 
    private servicio: ServicioService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe({
      next:(data)=>{
        this.ahorroId = data['id']
      }
    })
    this.formGroup = this.formBuilder.group({
      cantidad: 0,
      concepto: '',
      referencia: ''
    })
  }

  depositar(movimiento: MovimientoDtoIn) {
    console.log(movimiento)    
    this.servicio.ahorro.depositar(this.ahorroId, movimiento).subscribe({
      next:(data)=>{
        console.log(data)
        this.router.navigate(['/', 'ahorros/',this.ahorroId])
      },
      error: (data)=>{
        console.log(data)
      }
    })
  }

}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientoPeriodoDtoIn } from '../../../interfaces/periodo-dto';

@Component({
  selector: 'app-formulario-de-movimiento-de-periodo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-de-movimiento-de-periodo.component.html',
  styleUrl: './formulario-de-movimiento-de-periodo.component.css'
})
export class FormularioDeMovimientoDePeriodoComponent {

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1)]],
      nota:''
    })
  }

  guardar() {
    //console.log(this.formGroup.valid)
    if (this.formGroup.valid) {
      var movimiento: MovimientoPeriodoDtoIn = {
        cantidad: this.formGroup.value.cantidad,
        detalleId: '',
        nota: this.formGroup.value.nota
      }
      //console.log(movimiento)
      this.eventEmitterMovimiento.emit(movimiento)
    }
  }

  formGroup: any
  @Output() eventEmitterMovimiento: EventEmitter<MovimientoPeriodoDtoIn> = new EventEmitter<MovimientoPeriodoDtoIn>()
  @Output() eventEmiterCancelar: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() nombreDelAhorro: string = ''
  @Input() cantidad: number = 0
  
  cancelar() {
    this.eventEmiterCancelar.emit(true)
  }
}

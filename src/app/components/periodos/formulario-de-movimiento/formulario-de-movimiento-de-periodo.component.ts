import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientoPeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-formulario-de-movimiento-de-periodo',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CurrencyPipe],
  templateUrl: './formulario-de-movimiento-de-periodo.component.html',
  styleUrl: './formulario-de-movimiento-de-periodo.component.css'
})
export class FormularioDeMovimientoDePeriodoComponent {

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1)]],
      nota: ''
    })
  }

  guardar() {
    this.submitted = true
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
  @Input() estaCargando: boolean = false
  @Input() limpiarFormulario: boolean = false
  @ViewChild('cantidad') inputCantidad!: ElementRef
  submitted: boolean = false

  cancelar() {
    this.eventEmiterCancelar.emit(true)
  }

  habilitarFormulario(estaCargando: boolean) {
    if (estaCargando) {
      this.formGroup.get('cantidad')?.disable()
      this.formGroup.get('nota')?.disable()
    } else {
      this.formGroup.get('cantidad')?.enable()
      this.formGroup.get('nota')?.enable()
    }
  }

  resetFormulario(){
    this.formGroup.get('cantidad').value = 0
    this.formGroup.value.nota = ''
  }

  ngOnInit() {
    setTimeout(() => {
      this.inputCantidad.nativeElement.focus()
    }, 1000)
  }

  ngOnChanges() {
    this.habilitarFormulario(this.estaCargando)
    //console.log(this.estaCargando)
    if(this.limpiarFormulario){
      this.limpiarFormulario = false
      this.resetFormulario()
    }  
  }
}
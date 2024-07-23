import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MovimientoDtoIn } from '../../../interfaces/ahorro-dto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-de-movimiento',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-de-movimiento.component.html',
  styleUrl: './formulario-de-movimiento.component.css'
})
export class FormularioDeMovimientoComponent {

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1)]],
      concepto: ['', Validators.required],
      referencia: ''
    })
  }

  ngOnInit(){
    setTimeout(() => {
      this.inputCantidad.nativeElement.focus()
    }, 500)    
  }

  ngOnChanges() {
    this.habilitarFormulario(this.estaCargando)
    console.log(this.estaCargando)
  }

  habilitarFormulario(estaCargando: boolean) {
    if (estaCargando) {
      this.formGroup.get('cantidad')?.disable()
      this.formGroup.get('concepto')?.disable()
      this.formGroup.get('referencia')?.disable()
    } else {
      this.formGroup.get('cantidad')?.enable()
      this.formGroup.get('concepto')?.enable()
      this.formGroup.get('referencia')?.enable()
    }
  }

  guardar() {
    this.submitted = true
    //console.log(this.formGroup.controls['cantidad'].errors?.min)
    if (this.formGroup.valid) {
      var movimiento: MovimientoDtoIn = {
        cantidad: this.formGroup.value.cantidad,
        concepto: this.formGroup.value.concepto,
        referencia: this.formGroup.value.referencia
      }
      this.eventEmiterMovimiento.emit(movimiento)
    } else {
      if (this.formGroup.get('cantidad')?.errors != null) {
        this.inputCantidad.nativeElement.focus()
      } else if (this.formGroup.get('concepto')?.errors != null) {
        this.inputConcepto.nativeElement.focus()
      }
    }
  }

  formGroup: any
  @Output() eventEmiterMovimiento: EventEmitter<MovimientoDtoIn> = new EventEmitter<MovimientoDtoIn>()
  estaCargando = false
  submitted: boolean = false
  get f() { return this.formGroup.controls }
  @ViewChild('cantidad') inputCantidad! :ElementRef  
  @ViewChild('concepto') inputConcepto! :ElementRef  
}

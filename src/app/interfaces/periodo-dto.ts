import { DetalleDto } from "./version-dto"

export interface PeriodoDtoIn {
    versionId: string
    guid: string
    nombre: string
    fechaInicial:string
    fechaFinal: string
}

export interface PeriodoDto {
    id: string
    versionId: string
    guid: string
    nombre: string
    fechaInicial:string
    fechaFinal: string
    detalles: DetalleDelPeriodoDto[]
}

export interface DetalleDelPeriodoDto{
    detalle: DetalleDto
    movimientos:MovimientoPeriodoDto[]
}

export interface MovimientoPeriodoDto
{
    cantidad: number
    guid: string
    nota: string
}

export interface MovimientoPeriodoDtoIn
{
    cantidad: number
    detalleId: string
    nota: string
}
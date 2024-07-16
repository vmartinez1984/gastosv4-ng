export interface VersionDto {
}

export interface VersionDtoIn {
    nombre: string
    fechaFinal: Date
    fechaInicial: Date
    guid: string
}

export interface DetalleDtoIn {
    cantidad: number
    nombre: string
    ahorroId: string
    guid: string
}

export interface DetalleDto {
    cantidad: number
    nombre: string
    ahorroId: string
    guid: string
}
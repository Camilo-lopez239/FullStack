export interface Pedido {
    id:number,
    cliente: string,
    productoId: number,
    cantidad: number,
    prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
    estado: 'PENDIENTE' | 'CONFIRMADO' | 'DESPACHADO' | 'CANCELADO';
}

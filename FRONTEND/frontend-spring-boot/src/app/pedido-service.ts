import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from './models/pedido';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/pedido'

  listarPedido(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
  buscarPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
  actualizarPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}`,
      pedido
    );
  }
  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
  confirmarPedido(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/confirmar`,
      {}
    );
  }
  cancelarPedido(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/cancelar`,
      {}
    );
  }
  despacharPedido(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/despachar`,
      {}
    );
  }
  pedidosPendientes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/pendientes`
    );
  }
  pedidosUrgentes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/urgentes`
    );
  }
  buscarPorEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/estado?estado=${estado}`
    );
  }
  resumenPedidos(): Observable<string> {
    return this.http.get(
      `${this.apiUrl}/resumen`,
      { responseType: 'text' }
    );
  }
  siguientePedido(): Observable<Pedido> {
    return this.http.get<Pedido>(
      `${this.apiUrl}/siguiente`
    );
  }
  PedidoEnRiesgo(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/en-riesgo`
    );
  }
  buscarPorCliente(nombre: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/buscar/cliente?nombre=${nombre}`
    );
  }
}

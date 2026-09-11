import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/producto';
  
  listar(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }
  buscar(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
  crear(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl, producto);
  }
  actualizar(id: number, producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }
  eliminar(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  existe(id: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/${id}/existe`)
  }
  buscarPorCategoria(categoria: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoria}`)
  }
  buscarPorNombre(nombre: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, 
      {params:
        {
          nombre:nombre
        }})
  }
  buscarPorStockBajo(limite: number):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiUrl}/stock-bajo`,
      {
        params: {
          limite: limite
        }
      }
    )
  }
}

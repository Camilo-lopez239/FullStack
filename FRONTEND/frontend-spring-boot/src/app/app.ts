import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from './models/producto';
import { ProductoService } from './producto-service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Pedido } from './models/pedido';
import { PedidoService } from './pedido-service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private cdr = inject(ChangeDetectorRef);
  public productoService = inject(ProductoService);
  public pedidoService = inject(PedidoService);
  resumenTexto: string = '';
  resumenItems: string[] = [];
  totalProductos = 0;

  pedidos: Pedido[] = [];
  productos: Producto[] = [];
  productoEditado: number | null =null;
  pedidoEditado:number | null = null;
  seccion: string = 'productos';

  pedidoNuevo: Pedido = {
  id: 0,
  cliente: '',
  productoId: 0,
  cantidad: 0,
  prioridad: 'BAJA',
  estado: 'PENDIENTE'
};


  productoNuevo: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    stock: 0
  }
  mostrarProductos(): void {
    this.seccion = 'productos';
  }

  mostrarPedidos(): void {
    this.seccion = 'pedidos';
  }
  ngOnInit(){
    console.log("Constructor ejecutado");
    this.cargarPedidos();
    this.cargarProductos();
  }
  
  //METODOS PRODUCTOS
  cargarProductos(): void{
    this.productoService.listar().subscribe({
      next: datos =>{ 
        this.productos = datos
        this.cdr.detectChanges();
      },
      error: error =>{ 
        console.error('Error consultando productos..', error)
      }
    })
  }

  buscarProducto(id: number): void{
    this.productoService.buscar(id).subscribe({
      next: producto => {
        console.log('Producto encontrado', producto);
      },
      error: error => {
        console.error('No se pudo encontrar el producto..', error);
      }
    })
  }
  crearProducto(producto: Producto): void{
    this.productoService.crear(producto).subscribe({
      next: productoCreado =>{
        this.productos.push(productoCreado);
        console.log('Producto creado correctamente: ', productoCreado);
        

        this.productoNuevo = {
        id: 0,
        nombre: '',
        categoria: '',
        stock: 0
      };
        this.cdr.detectChanges();
      },
      error: error =>{
        console.error('Error al crear el producto...', error);
        
      }
    })
  }

  actualizarProducto(id:number, producto: Producto):void{
    this.productoService.actualizar(id, producto).subscribe({
      next: productoActualizado =>{
        console.log('Producto actualizado: ', productoActualizado);
        const indice = this.productos.findIndex(producto => producto.id === id);
        if(indice !== -1){
          this.productos[indice] = productoActualizado;
        }
        this.productoEditado = null;

        this.cdr.detectChanges();
      }
    })
  }
  eliminarProducto(id: number):void{
    this.productoService.eliminar(id).subscribe({
      next: () =>{
        console.log('Producto eliminado correctamente');
        this.productos = this.productos.filter(
          producto => producto.id !== id
        )
        this.cdr.detectChanges();
      },
      error: error =>{
        console.error('No se pudo eliminar el producto: ', error);
        
      }
    })
  }
  verificarProducto(id: number): void{
    this.productoService.existe(id).subscribe({
      next: existe =>{
        console.log('Existe el producto', existe);
      },
      error: error=>{
        console.error('Error verificando el producto', error);
      }
    })
  }
  buscarCategoria(categoria: string): void{
    this.productoService.buscarPorCategoria(categoria).subscribe({
      next: productos =>{
        this.productos = productos;
        this.cdr.detectChanges();
      },
      error: error =>{
        console.error('Error buscando por la categoria indicada: ', error);
      }
    })
  }
  buscarNombre(nombre: string): void{
    this.productoService.buscarPorNombre(nombre).subscribe({
      next: productos =>{
        this.productos = productos;
        this.cdr.detectChanges();
      },
      error: error =>{
        console.error('Error buscando por el nombre seleccionado: ', error);
      }
    })
  }
  buscarStockBajo(limite: number):void{
    this.productoService.buscarPorStockBajo(limite).subscribe({
      next: productos =>{
        this.productos = productos;
        this.cdr.detectChanges();
      },
      error: error =>{
        console.error('Error buscando elementos de stock bajo', error);
      }
    })
  }

  //METODOS PEDIDOS
  cargarPedidos(): void {
    this.pedidoService.listarPedido().subscribe({
      next: datos => {
        this.pedidos = datos;
        console.log('Pedidos cargados:', datos);
      },
      error: error => {
        console.error('Error consultando pedidos:', error);
      }
    });
  }
  crearPedido(pedido: Pedido): void {
    this.pedidoService.crearPedido(pedido).subscribe({
      next: pedidoCreado => {
        console.log('Pedido creado correctamente:', pedidoCreado);
        this.pedidos.push(pedidoCreado);
        this.pedidoNuevo = {
          id: 0,
          cliente: '',
          productoId: 0,
          cantidad: 0,
          prioridad: 'BAJA',
          estado: 'PENDIENTE'
        };
      },
      error: error => {
        console.error('Error al crear el pedido:', error);
      }
    });
  }
  buscarPedido(id: number): void {
    this.pedidoService.buscarPedido(id).subscribe({
      next: pedido => {
        console.log('Pedido encontrado:', pedido);
      },
      error: error => {
        console.error('No se pudo encontrar el pedido:', error);
      }
    });
  }
  actualizarPedido(id: number, pedido: Pedido): void {
    this.pedidoService.actualizarPedido(id, pedido).subscribe({
      next: pedidoActualizado => {
        console.log('Pedido actualizado:', pedidoActualizado);
        const indice = this.pedidos.findIndex(pedido => pedido.id === id);

        if (indice !== -1) {
          this.pedidos[indice] = pedidoActualizado;
        }

      },
      error: error => {
        console.error('Error actualizando pedido:', error);
      }
    });
  }
  eliminarPedido(id: number): void {
    this.pedidoService.eliminarPedido(id).subscribe({
      next: () => {
        console.log('Pedido eliminado correctamente');
        this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
      },
      error: error => {
        console.error('No se pudo eliminar el pedido:', error);
      }
    });
  }
  confirmarPedido(id: number): void {
    this.pedidoService.confirmarPedido(id).subscribe({
      next: pedidoConfirmado => {
        console.log('Pedido confirmado:', pedidoConfirmado);
        const indice = this.pedidos.findIndex(pedido => pedido.id === id);

        if (indice !== -1) {
          this.pedidos[indice] = pedidoConfirmado;
        }
      },
      error: error => {
        console.error('Error confirmando pedido:', error);
      }
    });
  }
  cancelarPedido(id: number): void {
    this.pedidoService.cancelarPedido(id).subscribe({
      next: pedidoCancelado => {
        console.log('Pedido cancelado:', pedidoCancelado);

        const indice = this.pedidos.findIndex(pedido => pedido.id === id);
        if (indice !== -1) {
          this.pedidos[indice] = pedidoCancelado;
        }
      },
      error: error => {
        console.error('Error cancelando pedido:',error);
      }
    });
  }
  despacharPedido(id: number): void {
    this.pedidoService.despacharPedido(id).subscribe({
      next: pedidoDespachado => {

        console.log('Pedido despachado:',pedidoDespachado);

        const indice = this.pedidos.findIndex(pedido => pedido.id === id);

        if (indice !== -1) {
          this.pedidos[indice] = pedidoDespachado;
        }

      },
      error: error => {
        console.error('Error despachando pedido:', error);
      }
    });
  }
  cargarPendientes(): void {
    this.pedidoService.pedidosPendientes().subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
      },
      error: error => {
        console.error('Error obteniendo pedidos pendientes:', error);
      }
    });
  }
  cargarUrgentes(): void {
    this.pedidoService.pedidosUrgentes().subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
      },
      error: error => {
        console.error('Error obteniendo pedidos urgentes:', error);
      }
    });
  }
  buscarPedidosPorEstado(estado: string): void {
    this.pedidoService.buscarPorEstado(estado).subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
      },
      error: error => {
        console.error('Error buscando por estado:',error);
      }
    });
  }
  resumenPedidos(): void {
    this.pedidoService.resumenPedidos().subscribe({
      next: resumen => {
        console.log('Resumen de pedidos:', resumen);
      },
      error: error => {
        console.error('Error obteniendo resumen:', error);
      }
    });
  } 
  obtenerSiguientePedido(): void {
    this.pedidoService.siguientePedido().subscribe({
      next: pedido => {
        console.log('Siguiente pedido:', pedido);
      },
      error: error => {
        console.error('No hay siguiente pedido:', error);    
      }
    });
  }
  cargarPedidosEnRiesgo(): void {
    this.pedidoService.PedidoEnRiesgo().subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
      },
      error: error => {
        console.error('Error obteniendo pedidos en riesgo:', error);    
      }
    });
  }
  buscarPedidosPorCliente(nombre: string): void {
    this.pedidoService.buscarPorCliente(nombre).subscribe({
      next: pedidos => {
        this.pedidos = pedidos;
      },
      error: error => {
        console.error('Error buscando por cliente:', error);
      }
    });
  }
  mostrarDashboard(): void {
    this.seccion = 'dashboard';
    this.cargarResumenPedidos();
    this.cargarTotalProductos();
  }
  cargarResumenPedidos(): void {

    this.pedidoService.resumenPedidos().subscribe({

      next: resumen => {

        this.resumenItems = resumen.split('\n');

        this.cdr.detectChanges();

      },

      error: error => {

        console.error(error);

      }

    });

  }
  cargarTotalProductos(): void {

    this.productoService.listar().subscribe({

      next: productos => {

        this.totalProductos = productos.length;

        this.cdr.detectChanges();

      },

      error: error => {

        console.error(
          'Error obteniendo productos',
          error
        );

      }

    });

  }

}

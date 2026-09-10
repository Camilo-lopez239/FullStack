import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from './models/producto';
import { ProductoService } from './producto-service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private cdr = inject(ChangeDetectorRef);
  ngOnInit(){
    console.log("Constructor ejecutado");
    
    this.cargarProductos();
  }
  public productoService = inject(ProductoService);
  productos: Producto[] = [];
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
}

import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service'

@Component({
  moduleId: module.id,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  edit: boolean = false;
  products: Product[] = [];

  constructor(private dataService: ProductService) { }

  ngOnInit() {
        this.dataService.getProducts()
            .subscribe((data: Product[]) => this.products = data);
  }

}

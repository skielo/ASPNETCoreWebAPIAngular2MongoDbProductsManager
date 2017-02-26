import { Component } from '@angular/core';
import { ProductService } from './product.service'
import { ProductsComponent } from './products/products.component'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ProductService ]
})
export class AppComponent {
  title = 'app works!';
}

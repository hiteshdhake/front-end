import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy {
  productName = '';
  isDisabled = true;
  products = []
  private productsSubscription: Subscription;


  constructor(private productsService: ProductsService) {
      setTimeout(() => {
         this.isDisabled= false;
      }, 5000);
  }
 
  ngOnInit() {
    this.products = this.productsService.getProducts(); 
    this.productsSubscription = this.productsService.productUpdated.subscribe(() => {
        this.products = this.productsService.getProducts();
    })
  }

  handelClick(form) {
      if(form.valid) {
          this.productsService.addProducts(form.value.productName);
        // this.products = [...this.products, form.value.productName];
      }
  }

  onRemoveClicked(product) {
      this.products = this.products.filter(p => p !== product);
  }

  ngOnDestroy() {
      this.productsSubscription.unsubscribe();
  }
}
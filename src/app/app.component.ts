import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}
  products: Product[] = [];
  selectedProduct: Product;
  mode = 'add';
  token = localStorage.getItem('token');

  form = new FormGroup({
    category: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    id: new FormControl('')
  });

  loginForm = new FormGroup({
    email: new FormControl('test@test.com', [Validators.required, Validators.email]),
    password: new FormControl('Test', Validators.required),
  });

  ngOnInit() {
    this.token && this.handleGetAllProducts();
  }

  onSubmitLoginForm() {
    if (!this.loginForm.valid) {
      return false;
    }

    this.appService.login(this.loginForm.value)
      .subscribe(({token}: {token: string}) => {
        localStorage.setItem('token', token);
        this.token = token
      })
  }

  handleGetAllProducts() {
    this.appService.getAllProducts()
      .subscribe(
        (products: Product[]) => {
          this.products = products
        }
      );
  }

  onSubmit() {
    if (!this.form.valid) {
      return false;
    }

    let serviceObserver: Observable<any>;

    if (this.mode === 'add') {
      serviceObserver = this.appService.addProduct(this.form.value);
    }

    if (this.mode === 'edit') {
      serviceObserver = this.appService.updateProduct(this.form.value);
    }
    
    if (this.mode === 'delete') {
      serviceObserver = this.appService.deleteProduct(this.form.value);
    }

    serviceObserver.subscribe(
      (products: Product[]) => {
        this.products = products
      }
    );
    this.mode = "add";
    this.form.reset();
  }

  handleClickAdd() {
    this.mode = "add";
    this.form.reset();
  }

  handleClickEdit(product: Product) {
    this.mode = "edit";
    this.form.setValue({
      ...product
    });
  }

  handleClickDelete(product: Product) {
    this.mode = "delete"
    this.form.setValue({
      ...product
    });
  }
}

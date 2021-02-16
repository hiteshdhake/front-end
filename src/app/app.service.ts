import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "./product";

const BASE_URL = '/api'

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  login(formValue: {email: string, password: string}) {
    return this.httpClient.post(
      `${BASE_URL}/auth/login/`,
      formValue
    )
  }

  getAllProducts() {
    return this.httpClient.get(
      `${BASE_URL}/products/`,
    )
  }

  updateProduct(product: Product) {
    return this.httpClient.put(
      `${BASE_URL}/products/`,
      product
    )
  }

  deleteProduct(product: Product) {
    return this.httpClient.delete(
      `${BASE_URL}/products/${product.id}`,
    )
  }

  addProduct(product: Product) {
    return this.httpClient.post(
      `${BASE_URL}/products/`,
      product
    )
  }
}
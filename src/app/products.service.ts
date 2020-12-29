import { Subject } from "rxjs";

export class ProductsService {
    private products = ['Silk'];
    productUpdated = new Subject();

    addProducts(productName: string) {
        this.products.push(productName);
        this.productUpdated.next();
    }

    getProducts() {
        return [...this.products];
    }

    deleteProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName)
        this.productUpdated.next();
    }
}